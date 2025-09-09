import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Upload, 
  BarChart3, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Plus,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { useAuth } from '../../store/authStore';
import { DashboardStats, PerformanceForm } from '../../types';

export const FacultyDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentSubmissions, setRecentSubmissions] = useState<PerformanceForm[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch real data from API
    // For now, using mock data
    setTimeout(() => {
      setStats({
        total_submissions: 3,
        pending_approvals: 1,
        average_score: 87.5,
        recent_activity: [
          {
            id: '1',
            type: 'evaluation',
            description: 'AI evaluation completed for Q1 2024',
            timestamp: '2024-01-15T10:00:00Z',
          },
          {
            id: '2',
            type: 'submission',
            description: 'Performance form submitted for review',
            timestamp: '2024-01-10T14:30:00Z',
          },
        ],
      });

      setRecentSubmissions([
        {
          id: '1',
          user_id: user?.id || '',
          period_start: '2024-01-01',
          period_end: '2024-03-31',
          department_id: user?.department_id || '',
          status: 'approved',
          data: {} as any,
          proof_urls: [],
          ai_score: 92,
          created_at: '2024-01-10T14:30:00Z',
          updated_at: '2024-01-15T10:00:00Z',
        },
        {
          id: '2',
          user_id: user?.id || '',
          period_start: '2023-10-01',
          period_end: '2023-12-31',
          department_id: user?.department_id || '',
          status: 'pending',
          data: {} as any,
          proof_urls: [],
          created_at: '2024-01-05T09:00:00Z',
          updated_at: '2024-01-05T09:00:00Z',
        },
      ]);

      setIsLoading(false);
    }, 1000);
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
            <p className="text-muted-foreground mt-2">Welcome back, {user?.name}</p>
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
          <h1 className="text-3xl font-bold">Faculty Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {user?.name} • {user?.department_name || 'No Department'}
          </p>
        </div>
        <Button asChild>
          <Link to="/faculty/submit">
            <Plus className="mr-2 h-4 w-4" />
            New Submission
          </Link>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="academic-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">{stats?.total_submissions || 0}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="academic-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <span className="text-2xl font-bold">{stats?.pending_approvals || 0}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="academic-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span className={`text-2xl font-bold ${getScoreColor(stats?.average_score || 0)}`}>
                {stats?.average_score || 0}%
              </span>
            </div>
            <Progress value={stats?.average_score || 0} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="academic-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Performance Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">+5.2%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">vs last quarter</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="academic-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and shortcuts for performance management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button asChild variant="outline" className="h-auto p-4 flex-col space-y-2">
              <Link to="/faculty/submit">
                <FileText className="h-6 w-6" />
                <span>Submit Form</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4 flex-col space-y-2">
              <Link to="/faculty/uploads">
                <Upload className="h-6 w-6" />
                <span>Upload Proofs</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4 flex-col space-y-2">
              <Link to="/faculty/submissions">
                <CheckCircle className="h-6 w-6" />
                <span>My Submissions</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4 flex-col space-y-2">
              <Link to="/faculty/feedback">
                <BarChart3 className="h-6 w-6" />
                <span>AI Feedback</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Submissions */}
        <Card className="academic-card">
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
            <CardDescription>
              Your latest performance evaluations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSubmissions.map((submission) => (
                <div key={submission.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">
                      {submission.period_start} - {submission.period_end}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getStatusColor(submission.status)}>
                        {submission.status}
                      </Badge>
                      {submission.ai_score && (
                        <span className={`text-sm font-medium ${getScoreColor(submission.ai_score)}`}>
                          Score: {submission.ai_score}%
                        </span>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/faculty/submissions/${submission.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
              {recentSubmissions.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No submissions yet. <Link to="/faculty/submit" className="text-primary">Create your first submission</Link>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="academic-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates and notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.recent_activity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {(!stats?.recent_activity || stats.recent_activity.length === 0) && (
                <p className="text-muted-foreground text-center py-4">
                  No recent activity
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};