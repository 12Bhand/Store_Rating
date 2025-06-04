# StoreApp - Complete Documentation

## Table of Contents
1. [Installation and Setup](#installation-and-setup)
2. [Project Structure](#project-structure)
3. [Component Documentation](#component-documentation)
4. [File Usage](#file-usage)
5. [Application Flow](#application-flow)
6. [User Roles and Features](#user-roles-and-features)
7. [Styling and Theming](#styling-and-theming)
8. [Database Schema](#database-schema)

## Installation and Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher) or yarn (v1.22.0 or higher)
- Git

### Step 1: Clone the Repository
\`\`\`bash
git clone https://github.com/yourusername/storeapp.git
cd storeapp
\`\`\`

### Step 2: Install Dependencies
\`\`\`bash
npm install
# or
yarn install
\`\`\`

### Step 3: Set Up Environment Variables
Create a `.env.local` file in the root directory with the following variables:
\`\`\`
DATABASE_URL="postgresql://username:password@localhost:5432/storeapp"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

### Step 4: Set Up the Database
If you're using Neon PostgreSQL:

1. Create an account at [neon.tech](https://neon.tech)
2. Create a new project
3. Get your connection string and add it to the DATABASE_URL in your .env.local file
4. Run the database migrations:
\`\`\`bash
npx prisma migrate dev
\`\`\`

### Step 5: Run the Development Server
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

The application will be available at [http://localhost:3000](http://localhost:3000).

### Step 6: Build for Production
\`\`\`bash
npm run build
# or
yarn build
\`\`\`

To start the production server:
\`\`\`bash
npm start
# or
yarn start
\`\`\`

## Project Structure

\`\`\`
storeapp/
├── app/                    # Next.js App Router
│   ├── admin/              # Admin routes
│   │   ├── add-store/      # Add store page
│   │   ├── add-user/       # Add user page
│   │   └── dashboard/      # Admin dashboard
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   ├── store/              # Store owner routes
│   │   ├── dashboard/      # Store dashboard
│   │   └── profile/        # Store profile
│   ├── user/               # Regular user routes
│   │   ├── dashboard/      # User dashboard
│   │   └── profile/        # User profile
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # Reusable components
│   ├── layouts/            # Layout components
│   │   ├── admin-layout.tsx
│   │   ├── store-layout.tsx
│   │   └── user-layout.tsx
│   ├── ui/                 # UI components (shadcn/ui)
│   ├── data-table.tsx      # Data table component
│   └── store-card.tsx      # Store card component
├── hooks/                  # Custom React hooks
│   ├── use-mobile.tsx      # Mobile detection hook
│   └── use-toast.ts        # Toast notification hook
├── lib/                    # Utility functions and libraries
│   ├── schema.prisma       # Prisma schema
│   └── utils.ts            # Utility functions
├── public/                 # Static files
├── tailwind.config.ts      # Tailwind CSS configuration
└── next.config.mjs         # Next.js configuration
\`\`\`

## Component Documentation

### Layout Components

#### `AdminLayout`
**File:** `components/layouts/admin-layout.tsx`

**Purpose:** Provides the layout structure for admin pages with a sidebar navigation.

**Props:**
- `children`: React nodes to be rendered within the layout

**Usage:**
\`\`\`tsx
import AdminLayout from "@/components/layouts/admin-layout"

export default function AdminPage() {
  return (
    <AdminLayout>
      <div>Admin page content</div>
    </AdminLayout>
  )
}
\`\`\`

**Features:**
- Responsive sidebar that collapses on mobile
- Navigation links to admin sections
- User profile section
- Logout functionality

#### `UserLayout`
**File:** `components/layouts/user-layout.tsx`

**Purpose:** Provides the layout structure for regular user pages.

**Props:**
- `children`: React nodes to be rendered within the layout

**Usage:**
\`\`\`tsx
import UserLayout from "@/components/layouts/user-layout"

export default function UserPage() {
  return (
    <UserLayout>
      <div>User page content</div>
    </UserLayout>
  )
}
\`\`\`

**Features:**
- Right-positioned sidebar
- Navigation links to user sections
- User profile section
- Logout functionality

#### `StoreLayout`
**File:** `components/layouts/store-layout.tsx`

**Purpose:** Provides the layout structure for store owner pages.

**Props:**
- `children`: React nodes to be rendered within the layout

**Usage:**
\`\`\`tsx
import StoreLayout from "@/components/layouts/store-layout"

export default function StorePage() {
  return (
    <StoreLayout>
      <div>Store page content</div>
    </StoreLayout>
  )
}
\`\`\`

**Features:**
- Right-positioned sidebar
- Navigation links to store sections
- Store profile section
- Logout functionality

### UI Components

#### `DataTable`
**File:** `components/data-table.tsx`

**Purpose:** Renders a sortable, paginated table for displaying data.

**Props:**
- `columns`: Column definitions for the table
- `data`: Array of data objects to display

**Usage:**
\`\`\`tsx
import { DataTable } from "@/components/data-table"
import type { ColumnDef } from "@tanstack/react-table"

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  // More columns...
]

const data = [
  { name: "John Doe", email: "john@example.com" },
  // More data...
]

export default function MyTable() {
  return <DataTable columns={columns} data={data} />
}
\`\`\`

**Features:**
- Sortable columns
- Pagination
- Customizable cell rendering
- Responsive design

#### `StoreCard`
**File:** `components/store-card.tsx`

**Purpose:** Displays store information in a card format with rating functionality.

**Props:**
- `store`: Store object with id, name, address, rating, and userRating properties

**Usage:**
\`\`\`tsx
import { StoreCard } from "@/components/store-card"

const store = {
  id: 1,
  name: "Store Name",
  address: "123 Main St",
  rating: 4.5,
  userRating: null,
}

export default function StoreDisplay() {
  return <StoreCard store={store} />
}
\`\`\`

**Features:**
- Visual display of store information
- Star rating display
- User rating submission
- Gradient background based on store ID

## File Usage

### Page Files

#### `app/page.tsx`
The landing page of the application. It introduces users to the StoreApp platform and provides links to register or log in.

**Key Features:**
- Hero section with call-to-action buttons
- Feature showcase with animated elements
- Responsive design for all screen sizes
- Gradient background with decorative elements

#### `app/register/page.tsx`
User registration page with form validation.

**Key Features:**
- Form with validation for name, email, address, and password
- Password strength requirements
- Error messaging
- Responsive layout with grid for larger screens

#### `app/login/page.tsx`
Login page with role-based redirection.

**Key Features:**
- Email and password authentication
- Role-based redirection (admin, store owner, user)
- Password recovery link
- Animated background elements

#### `app/admin/dashboard/page.tsx`
Admin dashboard for managing users and stores.

**Key Features:**
- Search functionality for users and stores
- Tabbed interface for switching between users and stores
- Data tables with sorting
- Statistics cards with animations
- Add user and add store buttons

#### `app/user/dashboard/page.tsx`
User dashboard for discovering and rating stores.

**Key Features:**
- Store cards with rating functionality
- Search functionality for finding stores
- Visual feedback for user ratings
- Responsive grid layout

#### `app/store/dashboard/page.tsx`
Store owner dashboard for monitoring ratings and performance.

**Key Features:**
- Rating statistics
- User reviews table
- Performance metrics
- Data visualization

### Utility Files

#### `lib/schema.prisma`
Prisma schema defining the database structure.

**Key Entities:**
- User
- Store
- Rating

**Relationships:**
- One-to-many between User and Rating
- One-to-many between Store and Rating
- One-to-one between User and Store (for store owners)

#### `lib/utils.ts`
Utility functions used throughout the application.

**Key Functions:**
- `cn`: Combines class names with conditional logic
- Other utility functions for data formatting and manipulation

## Application Flow

### Authentication Flow

1. **Registration**:
   - User fills out the registration form
   - Form validation occurs on the client side
   - On submission, the data is sent to the server
   - Server creates a new user record in the database
   - User is redirected to the login page

2. **Login**:
   - User enters email and password
   - Credentials are validated against the database
   - Based on the user's role, they are redirected to the appropriate dashboard:
     - Admin → `/admin/dashboard`
     - Store Owner → `/store/dashboard`
     - Regular User → `/user/dashboard`

### User Flows

#### Admin User Flow
1. Admin logs in and is directed to the admin dashboard
2. Admin can:
   - View all users and stores
   - Add new users
   - Add new stores
   - Search for specific users or stores
   - View statistics about the platform

#### Store Owner Flow
1. Store owner logs in and is directed to the store dashboard
2. Store owner can:
   - View their store's rating statistics
   - See individual ratings from users
   - Update their store profile
   - Manage store settings

#### Regular User Flow
1. User logs in and is directed to the user dashboard
2. User can:
   - Browse available stores
   - Search for specific stores
   - Rate stores they've visited
   - Update their profile information

## User Roles and Features

### Admin
- **Dashboard**: Overview of platform statistics
- **User Management**: Add, view, and manage users
- **Store Management**: Add, view, and manage stores
- **Settings**: Configure platform settings

### Store Owner
- **Dashboard**: View store performance metrics
- **Ratings**: See detailed ratings from users
- **Profile**: Update store information
- **Settings**: Configure store settings

### Regular User
- **Store Discovery**: Browse and search for stores
- **Rating**: Rate stores they've visited
- **Profile**: Update personal information
- **Settings**: Configure account settings

## Styling and Theming

### Color Palette
- **Primary Colors**: Teal and Cyan gradients
- **Secondary Colors**: Sky blue, purple accents
- **Background**: White/light gray for content areas
- **Text**: Dark gray for main text, white for text on dark backgrounds
- **Accents**: Yellow for ratings, green for positive indicators

### UI Components
The application uses shadcn/ui components, which are built on top of Radix UI and styled with Tailwind CSS. These components provide:

- Consistent styling across the application
- Accessibility features
- Dark mode support (when enabled)
- Responsive design

### Tailwind Configuration
The `tailwind.config.ts` file extends the default Tailwind configuration with:

- Custom colors for the application's color palette
- Animation definitions for interactive elements
- Extended border radius values for consistent rounding
- Custom shadows for depth and elevation

## Database Schema

### User Table
- `id`: String (Primary Key, CUID)
- `name`: String
- `email`: String (Unique)
- `password`: String (Hashed)
- `address`: String
- `role`: Enum (ADMIN, USER, STORE_OWNER)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Store Table
- `id`: String (Primary Key, CUID)
- `name`: String
- `email`: String (Unique)
- `address`: String
- `ownerId`: String (Foreign Key to User)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Rating Table
- `id`: String (Primary Key, CUID)
- `value`: Integer (1-5)
- `userId`: String (Foreign Key to User)
- `storeId`: String (Foreign Key to Store)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- Unique constraint on `[userId, storeId]` to prevent duplicate ratings

### Relationships
- A User can have many Ratings
- A Store can have many Ratings
- A User (with role STORE_OWNER) can own one Store
- A Store belongs to one User

## Conclusion

StoreApp is a comprehensive platform for store discovery and rating. With its role-based access control, users can interact with the platform in different ways depending on their role. The application is built with modern web technologies and follows best practices for performance, accessibility, and user experience.

For further assistance or feature requests, please contact the development team.
\`\`\`

To convert this documentation to a PDF, you have several options:

### Option 1: Use an Online Markdown to PDF Converter
1. Copy the content above
2. Visit a website like [MD2PDF](https://md2pdf.netlify.app/) or [Markdown to PDF](https://www.markdowntopdf.com/)
3. Paste the content and convert to PDF

### Option 2: Use VS Code Extension
1. Install the "Markdown PDF" extension in VS Code
2. Open the markdown file
3. Right-click and select "Markdown PDF: Export (pdf)"

### Option 3: Use Pandoc (Command Line)
If you're comfortable with command line:
\`\`\`bash
# Install pandoc and a PDF engine
npm install -g pandoc
# Then convert
pandoc documentation.md -o storeapp-documentation.pdf
\`\`\`

### Installation Quick Start

For a quick start, here are the essential commands to get the application running on your local machine:

1. Clone and install dependencies:
\`\`\`bash
git clone https://github.com/yourusername/storeapp.git
cd storeapp
npm install
\`\`\`

2. Set up your database (using Neon or any PostgreSQL provider)

3. Create a `.env.local` file with your database connection string:
\`\`\`
DATABASE_URL="your-connection-string"
\`\`\`

4. Run database migrations:
\`\`\`bash
npx prisma migrate dev
\`\`\`

5. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

The application will be available at http://localhost:3000
