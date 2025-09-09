import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Settings, 
  BarChart3, 
  Shield, 
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { useAuth } from '../../store/authStore';

interface SystemStats {
  total_users: number;
  active_evaluations: number;
  completion_rate: number;
  ai_accuracy: number;
  recent_alerts: Array<{
    id: string;
    type: 'warning' | 'error' | 'info';
    message: string;
    timestamp: string;
  }>;
}

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch real data from API
    // For now, using mock data
    setTimeout(() => {
      setStats({
        total_users: 156,
        active_evaluations: 23,
        completion_rate: 89.5,
        ai_accuracy: 94.2,
        recent_alerts: [
          {
            id: '1',
            type: 'warning',
            message: 'High server load detected during peak hours',
            timestamp: '2024-01-15T10:00:00Z',
          },
          {
            id: '2',
            type: 'info',
            message: 'Monthly backup completed successfully',
            timestamp: '2024-01-14T02:00:00Z',
          },
          {
            id: '3',
            type: 'error',
            message: 'Failed to send email notifications to 3 users',
            timestamp: '2024-01-13T16:30:00Z',
          },
        ],
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">System overview and management</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="academic-card animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {user?.name} • System Administrator
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/settings">
            <Settings className="mr-2 h-4 w-4" />
            System Settings
          </Link>
        </Button>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="academic-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">{stats?.total_users || 0}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across all roles</p>
          </CardContent>
        </Card>

        <Card className="academic-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Evaluations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span className="text-2xl font-bold">{stats?.active_evaluations || 0}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">In progress</p>
          </CardContent>
        </Card>

        <Card className="academic-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">
                {stats?.completion_rate || 0}%
              </span>
            </div>
            <Progress value={stats?.completion_rate || 0} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="academic-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              AI Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">
                {stats?.ai_accuracy || 0}%
              </span>
            </div>
            <Progress value={stats?.ai_accuracy || 0} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="academic-card">
        <CardHeader>
          <CardTitle>Admin Actions</CardTitle>
          <CardDescription>
            Common administrative tasks and system management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button asChild variant="outline" className="h-auto p-4 flex-col space-y-2">
              <Link to="/admin/users">
                <Users className="h-6 w-6" />
                <span>User Management</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4 flex-col space-y-2">
              <Link to="/admin/settings">
                <Settings className="h-6 w-6" />
                <span>System Settings</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4 flex-col space-y-2">
              <Link to="/admin/metrics">
                <BarChart3 className="h-6 w-6" />
                <span>AI Metrics</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4 flex-col space-y-2">
              <Link to="/admin/audit">
                <Shield className="h-6 w-6" />
                <span>Audit Logs</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Alerts */}
        <Card className="academic-card">
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>
              Recent system notifications and alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats?.recent_alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`flex items-start space-x-3 p-3 rounded-lg border ${getAlertColor(alert.type)}`}
                >
                  {getAlertIcon(alert.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs opacity-75">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              {(!stats?.recent_alerts || stats.recent_alerts.length === 0) && (
                <p className="text-muted-foreground text-center py-4">
                  No recent alerts
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="academic-card">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>
              Key performance indicators and system status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Database Performance</span>
                <div className="flex items-center space-x-2">
                  <Progress value={92} className="w-20" />
                  <span className="text-sm text-green-600 font-medium">92%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">API Response Time</span>
                <div className="flex items-center space-x-2">
                  <Progress value={88} className="w-20" />
                  <span className="text-sm text-green-600 font-medium">88ms</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Storage Usage</span>
                <div className="flex items-center space-x-2">
                  <Progress value={67} className="w-20" />
                  <span className="text-sm text-blue-600 font-medium">67%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">AI Model Uptime</span>
                <div className="flex items-center space-x-2">
                  <Progress value={99.8} className="w-20" />
                  <span className="text-sm text-green-600 font-medium">99.8%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};