import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Upload,
  CheckSquare,
  BarChart3,
  Users,
  Settings,
  Building2,
  UserCheck,
  FileBarChart,
  ChevronDown,
  X,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { useAuth } from '../../store/authStore';
import { UserRole } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  roles: UserRole[];
  children?: NavItem[];
}

const navigation: NavItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    roles: ['faculty', 'hod', 'director', 'registrar', 'office_head', 'admin'],
  },
  // Faculty specific
  {
    title: 'Performance',
    icon: FileText,
    href: '/faculty',
    roles: ['faculty'],
    children: [
      {
        title: 'Submit Form',
        icon: FileText,
        href: '/faculty/submit',
        roles: ['faculty'],
      },
      {
        title: 'My Submissions',
        icon: CheckSquare,
        href: '/faculty/submissions',
        roles: ['faculty'],
      },
      {
        title: 'Upload Proofs',
        icon: Upload,
        href: '/faculty/uploads',
        roles: ['faculty'],
      },
      {
        title: 'AI Feedback',
        icon: BarChart3,
        href: '/faculty/feedback',
        roles: ['faculty'],
      },
    ],
  },
  // HoD specific
  {
    title: 'Department',
    icon: Building2,
    href: '/hod',
    roles: ['hod'],
    children: [
      {
        title: 'Pending Approvals',
        icon: UserCheck,
        href: '/hod/approvals',
        roles: ['hod'],
      },
      {
        title: 'Department Summary',
        icon: FileBarChart,
        href: '/hod/summary',
        roles: ['hod'],
      },
    ],
  },
  // Director specific
  {
    title: 'Institution Reports',
    icon: BarChart3,
    href: '/director/reports',
    roles: ['director'],
  },
  // Registrar/Office Head
  {
    title: 'Monitoring',
    icon: BarChart3,
    href: '/registrar/monitor',
    roles: ['registrar', 'office_head'],
  },
  // Admin specific
  {
    title: 'Administration',
    icon: Settings,
    href: '/admin',
    roles: ['admin'],
    children: [
      {
        title: 'User Management',
        icon: Users,
        href: '/admin/users',
        roles: ['admin'],
      },
      {
        title: 'System Settings',
        icon: Settings,
        href: '/admin/settings',
        roles: ['admin'],
      },
      {
        title: 'AI Metrics',
        icon: BarChart3,
        href: '/admin/metrics',
        roles: ['admin'],
      },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [openSections, setOpenSections] = useState<string[]>(['Performance', 'Department', 'Administration']);

  const toggleSection = (title: string) => {
    setOpenSections(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const filterNavByRole = (items: NavItem[]): NavItem[] => {
    if (!user) return [];
    
    return items.filter(item => item.roles.includes(user.role)).map(item => ({
      ...item,
      children: item.children ? filterNavByRole(item.children) : undefined,
    }));
  };

  const isActiveLink = (href: string) => {
    if (href === '/dashboard') {
      return location.pathname === '/dashboard' || 
             location.pathname === `/${user?.role}/dashboard`;
    }
    return location.pathname.startsWith(href);
  };

  const filteredNavigation = filterNavByRole(navigation);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 transform bg-sidebar border-r transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Mobile close button */}
          <div className="flex h-14 items-center justify-between px-4 md:hidden">
            <span className="text-sm font-medium text-sidebar-foreground">Navigation</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {filteredNavigation.map((item) => {
              if (item.children) {
                return (
                  <Collapsible
                    key={item.title}
                    open={openSections.includes(item.title)}
                    onOpenChange={() => toggleSection(item.title)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      >
                        <div className="flex items-center">
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.title}
                        </div>
                        <ChevronDown className="h-4 w-4 transition-transform" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1 pl-6">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.href}
                          to={child.href}
                          onClick={onClose}
                          className={({ isActive }) =>
                            cn(
                              "flex items-center rounded-lg px-3 py-2 text-sm transition-colors",
                              isActive || isActiveLink(child.href)
                                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            )
                          }
                        >
                          <child.icon className="mr-2 h-4 w-4" />
                          {child.title}
                        </NavLink>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                );
              }

              return (
                <NavLink
                  key={item.href}
                  to={item.href === '/dashboard' ? `/${user?.role}/dashboard` : item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive || isActiveLink(item.href)
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )
                  }
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </NavLink>
              );
            })}
          </nav>

          {/* User info footer */}
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center">
                <span className="text-xs font-medium text-sidebar-primary-foreground">
                  {user?.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-sidebar-foreground/70 truncate">
                  {user?.department_name || 'No Department'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};