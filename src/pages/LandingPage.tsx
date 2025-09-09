import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Shield, Users, Zap } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Header } from '../components/layout/Header';

const features = [
  {
    icon: BarChart3,
    title: 'AI-Powered Evaluation',
    description: 'Advanced AI algorithms analyze performance data to provide comprehensive, unbiased evaluations.',
  },
  {
    icon: Shield,
    title: 'Secure & Compliant',
    description: 'Enterprise-grade security with role-based access control and audit trails.',
  },
  {
    icon: Users,
    title: 'Multi-Role Support',
    description: 'Designed for faculty, HoDs, directors, and administrators with tailored interfaces.',
  },
  {
    icon: Zap,
    title: 'Streamlined Workflow',
    description: 'Automated processes reduce administrative burden and improve efficiency.',
  },
];

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="hero-gradient absolute inset-0" />
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Faculty Performance
              <span className="block text-primary">Evaluation System</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Streamline academic performance evaluation with AI-powered insights, 
              comprehensive reporting, and role-based workflows designed for modern institutions.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-4">
                <Link to="/login">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-4">
                <Link to="#features">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Powerful Features for Academic Excellence
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to manage faculty performance evaluation efficiently and effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="academic-card text-center">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg primary-gradient mx-auto flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Transform Your Institution?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join leading academic institutions in modernizing their performance evaluation process.
            </p>
            <div className="mt-10">
              <Button size="lg" asChild className="text-lg px-8 py-4">
                <Link to="/login">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg primary-gradient flex items-center justify-center">
                <span className="text-white font-bold text-sm">FP</span>
              </div>
              <span className="text-lg font-semibold">Faculty Performance Evaluation System</span>
            </div>
            <p className="text-muted-foreground">
              Empowering academic institutions with intelligent performance evaluation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};