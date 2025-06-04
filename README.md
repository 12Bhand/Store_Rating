# StoreApp

A comprehensive store discovery and rating platform built with Next.js, featuring role-based access control for admins, store owners, and regular users.

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher (or yarn 1.22.0+)
- PostgreSQL database (we recommend [Neon](https://neon.tech))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/storeapp.git
   cd storeapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/storeapp"
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see your application running.

## 📁 Project Structure

```
storeapp/
├── app/                    # Next.js App Router
│   ├── admin/              # Admin dashboard and management
│   ├── store/              # Store owner dashboard
│   ├── user/               # User dashboard and profile
│   ├── login/              # Authentication pages
│   ├── register/           
│   └── page.tsx            # Landing page
├── components/             # Reusable UI components
│   ├── layouts/            # Layout components for different user roles
│   ├── ui/                 # shadcn/ui components
│   ├── data-table.tsx      # Sortable data table
│   └── store-card.tsx      # Store display card
├── lib/                    # Utilities and configurations
│   ├── schema.prisma       # Database schema
│   └── utils.ts            # Helper functions
└── hooks/                  # Custom React hooks
```

## 🎯 Features

### For Admins
- **User Management**: Add, view, and manage all users
- **Store Management**: Add, view, and manage all stores
- **Platform Analytics**: View comprehensive statistics
- **Search & Filter**: Find users and stores quickly

### For Store Owners
- **Performance Dashboard**: Monitor store ratings and reviews
- **Rating Analytics**: Detailed breakdown of customer feedback
- **Profile Management**: Update store information
- **Customer Insights**: View individual user ratings

### For Users
- **Store Discovery**: Browse and search available stores
- **Rating System**: Rate stores with 1-5 star system
- **Profile Management**: Update personal information
- **Personalized Experience**: Track your ratings and preferences

## 🛠 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS + shadcn/ui
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Type Safety**: TypeScript

## 🎨 User Interface

The application features a modern, responsive design with:
- **Role-based layouts** with dedicated sidebars
- **Interactive data tables** with sorting and pagination
- **Animated components** for enhanced user experience
- **Gradient backgrounds** and modern card designs
- **Mobile-first responsive design**

## 🔐 Authentication & Authorization

### User Roles
1. **Admin**: Full platform access and management capabilities
2. **Store Owner**: Store management and analytics access
3. **User**: Store discovery and rating capabilities

### Role-based Routing
- Admins → `/admin/dashboard`
- Store Owners → `/store/dashboard`
- Users → `/user/dashboard`

## 📊 Database Schema

### Core Entities
- **Users**: Store user information and roles
- **Stores**: Store details and ownership
- **Ratings**: User ratings for stores (1-5 stars)

### Key Relationships
- Users can rate multiple stores
- Store owners manage their stores
- Admins oversee all users and stores

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy automatically on every push

### Environment Variables for Production
```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.com"
```

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma database browser

### Code Style
- ESLint configuration for consistent code style
- Prettier for code formatting
- TypeScript for type safety
- Tailwind CSS for styling

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full sidebar navigation and data tables
- **Tablet**: Collapsible navigation and adapted layouts
- **Mobile**: Mobile-first design with touch-friendly interfaces

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or need help:
1. Check the [Issues](https://github.com/yourusername/storeapp/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Prisma](https://prisma.io/) for the excellent database toolkit
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

---

**StoreApp** - Connecting customers with local businesses through ratings and reviews.
```

This README.md provides comprehensive documentation for your StoreApp project [^1]. It includes:

- **Quick start guide** with step-by-step installation instructions
- **Project structure** overview for easy navigation
- **Feature breakdown** by user role (Admin, Store Owner, User)
- **Technology stack** details
- **Database schema** explanation
- **Deployment instructions** for production
- **Development guidelines** and available scripts
- **Responsive design** information
- **Contributing guidelines** for open source collaboration

The README follows best practices by being well-structured, informative, and easy to follow for both developers and users who want to understand or contribute to your project.
