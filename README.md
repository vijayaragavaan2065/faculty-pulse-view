# Faculty Performance Evaluation System

A modern, AI-powered React frontend for faculty performance evaluation designed for educational institutions. This system provides comprehensive performance assessment tools with role-based access control for faculty, HoDs, directors, registrars, and administrators.

![Faculty Performance Evaluation System](https://img.shields.io/badge/React-18+-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-blue.svg)

## 🌟 Features

### Core Functionality
- **AI-Powered Evaluation**: Advanced algorithms for comprehensive performance assessment
- **Role-Based Access Control**: Tailored interfaces for different user roles
- **Multi-Section Forms**: Teaching, Research, Admin duties, Projects, Mentoring
- **File Upload System**: Cloudinary integration for proof documentation
- **Real-time Dashboard**: Interactive analytics and performance metrics
- **Mobile-First Design**: Responsive interface for all devices

### User Roles & Capabilities

#### Faculty
- Submit performance evaluation forms
- Upload supporting documents and proofs
- View AI-generated feedback and scores
- Track submission history and status
- Access personalized dashboard with analytics

#### Head of Department (HoD)
- Review and approve faculty submissions
- Department-wide performance analytics
- Bulk approval workflows
- Export departmental reports

#### Director
- Institution-wide reporting and analytics
- Cross-departmental performance comparison
- Strategic insights and recommendations

#### Registrar/Office Head
- Monitor submission status across departments
- Conflict resolution interface
- System-wide analytics

#### Administrator
- User management and role assignment
- System configuration and settings
- AI model performance monitoring
- Audit logs and security management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- A backend API server (FastAPI + MongoDB recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd faculty-performance-evaluation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   REACT_APP_API_URL=http://localhost:8000
   REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
   REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   REACT_APP_MOCK_MODE=false
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`

5. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand for auth, React Context for app state
- **Routing**: React Router v6 with role-based guards
- **Forms**: Formik + Yup for validation
- **HTTP Client**: Axios with interceptors
- **UI Components**: Custom components built on Radix UI
- **File Uploads**: Cloudinary integration
- **Testing**: React Testing Library + Jest

### Project Structure
```
src/
├── components/
│   ├── layout/          # Header, Sidebar, Layout components
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   └── ProtectedRoute.tsx
├── pages/
│   ├── dashboards/      # Role-specific dashboard pages
│   ├── LandingPage.tsx
│   └── LoginPage.tsx
├── store/
│   └── authStore.ts     # Zustand auth store
├── types/
│   └── index.ts         # TypeScript type definitions
├── lib/
│   ├── api.ts           # Axios configuration
│   └── utils.ts         # Utility functions
└── hooks/               # Custom React hooks
```

## 🔌 Backend Integration

This frontend is designed to work with a REST API backend. The expected API contract:

### Authentication Endpoints
```
POST /api/auth/login     # Login with email/password
POST /api/auth/register  # User registration
GET  /api/auth/me        # Get current user info
```

### Core Endpoints
```
GET    /api/users              # List users (admin)
POST   /api/users              # Create user (admin)
PUT    /api/users/:id          # Update user (admin)
DELETE /api/users/:id          # Delete user (admin)

GET    /api/forms/my           # User's forms
POST   /api/forms             # Create/save form
GET    /api/forms/:id         # Get form details
PUT    /api/forms/:id         # Update form
POST   /api/forms/:id/verify  # Approve/reject form

POST   /api/ai/evaluate       # AI evaluation
POST   /api/ai/plagiarism     # Plagiarism check
POST   /api/upload            # File upload
```

### Backend Requirements
- **Database**: MongoDB (MongoDB Atlas recommended)
- **Framework**: FastAPI recommended (any REST API framework works)
- **Authentication**: JWT tokens
- **File Storage**: Cloudinary integration
- **CORS**: Enable for frontend domain

## 🔐 Security Features

- JWT token authentication with automatic refresh
- Role-based route protection
- Secure file upload validation
- XSS protection via React's built-in escaping
- CSRF protection ready (when backend implements)
- Audit logging support

## 👥 Demo Accounts

For testing different user roles, use these demo credentials:

| Role | Email | Password |
|------|-------|----------|
| Faculty | faculty@example.com | password123 |
| HoD | hod@example.com | password123 |
| Director | director@example.com | password123 |
| Admin | admin@example.com | password123 |

## 🎨 Design System

The application uses a comprehensive design system built with Tailwind CSS:

- **Colors**: Professional academic color palette with blue primary
- **Typography**: Inter font family with semantic heading styles
- **Components**: Consistent spacing, shadows, and border radius
- **Responsive**: Mobile-first design with breakpoint utilities
- **Dark Mode**: Built-in support (toggle implementation ready)

## 📱 Responsive Design

- **Mobile**: Optimized for phones (320px+)
- **Tablet**: Enhanced layouts for tablets (768px+)
- **Desktop**: Full-featured interface (1024px+)
- **Large Screens**: Optimized for 4K displays (1920px+)

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

Example test files included:
- `src/components/__tests__/LoginForm.test.tsx`
- `src/pages/__tests__/FacultyDashboard.test.tsx`

## 🚀 Deployment

### Build Production Bundle
```bash
npm run build
```

### Deploy to Hosting Services

#### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables in Netlify dashboard

#### Vercel
1. Import project from GitHub
2. Configure build settings
3. Add environment variables
4. Deploy

#### Traditional Hosting
1. Build the project: `npm run build`
2. Upload the `build` folder contents to your web server
3. Configure server for SPA routing (serve `index.html` for all routes)

## 🔧 Configuration

### Environment Variables
```env
# Required
REACT_APP_API_URL=http://localhost:8000

# Optional
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
REACT_APP_MOCK_MODE=false
```

### Customization

#### Modify Role Permissions
Edit `src/components/ProtectedRoute.tsx` to adjust role-based access control.

#### Update API Endpoints
Modify `src/lib/api.ts` to match your backend API structure.

#### Customize Design System
Update `src/index.css` and `tailwind.config.ts` for branding changes.

## 📈 Performance Optimization

- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components and routes loaded on demand
- **Image Optimization**: Cloudinary auto-optimization
- **Bundle Analysis**: `npm run analyze` to check bundle size
- **Caching**: Service worker ready for PWA implementation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs via GitHub Issues
- **Backend Integration**: Follow the API contract documentation above

## 🔮 Roadmap

- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Bulk import/export functionality
- [ ] Multi-language support
- [ ] PWA implementation
- [ ] Advanced AI insights
- [ ] Integration with LMS systems

---

**Note**: This frontend is designed to be backend-agnostic. It can work with any REST API that follows the specified contract. MongoDB and Supabase are NOT required - use any database and backend framework of your choice.