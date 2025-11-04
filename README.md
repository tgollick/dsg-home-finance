# DSG Home Finance

A web application I built for my dad's mortgage advisory business to replace spreadsheets and Gmail chaos with actual digital tools.

![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)
![tRPC](https://img.shields.io/badge/tRPC-11.0-2596BE?style=flat&logo=trpc)
![Prisma](https://img.shields.io/badge/Prisma-6.4-2D3748?style=flat&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)

## 🎯 Project Overview

This is a full-stack website for DSG Home Finance, a small mortgage advisory business. It handles contact form submissions, enquiry management, and blog posts about the housing market. Before this, everything was done through Gmail and spreadsheets, which was a mess.

The site gives my dad a proper admin dashboard to manage enquiries, post blog updates, and keep track of potential clients without drowning in emails.

## 🚀 Core Features

**Public Website**
* Contact form for enquiries (name, email, phone, mortgage amount)
* Responsive mortgage calculator
* Blog with market updates and advice articles
* Mobile responsive design
* SEO optimised pages

**Admin Dashboard**
* View and manage all enquiries
* Mark enquiries as read/unread or completed
* Create, edit, and delete blog posts
* Draft system for unpublished posts
* Image upload for blog content

**Technical**
* Type-safe API routes with tRPC
* Server and client components optimised separately
* PostgreSQL database with Prisma ORM
* Email notifications for new enquiries
* Custom domain business email setup

## 🛠️ Tech Stack

**Frontend**
* Next.js 15 (App Router) with React 19
* TypeScript for type safety
* Tailwind CSS + ShadCN UI components
* TipTap for rich text editing
* React Hook Form for form validation

**Backend**
* tRPC for type-safe API endpoints
* Prisma as the database ORM
* Zod for runtime validation
* Server actions for mutations

**Infrastructure**
* Vercel for hosting
* PostgreSQL (Neon) for database
* Resend for transactional emails
* Custom domain email routing

## 📁 Project Structure

```
dsg-home-finance/
├── src/
│   ├── app/                      # Next.js app directory
│   │   ├── (public)/            # Public facing pages
│   │   ├── admin/               # Protected admin dashboard
│   │   ├── api/                 # API routes
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                  # ShadCN components
│   │   ├── forms/               # Form components
│   │   └── admin/               # Admin-specific components
│   ├── server/
│   │   ├── api/
│   │   │   ├── routers/         # tRPC routers
│   │   │   └── trpc.ts          # tRPC setup
│   │   └── db.ts                # Prisma client
│   ├── lib/
│   │   ├── validators/          # Zod schemas
│   │   └── utils.ts
│   └── styles/
├── prisma/
│   └── schema.prisma            # Database schema
└── public/
```

## 🔄 How It Works

**Contact Form Flow**
1. User fills out contact form on website
2. Form data validated with Zod schema
3. Enquiry saved to PostgreSQL via Prisma
4. Email notification sent via Resend
5. Enquiry appears in admin dashboard
6. Admin can mark as read/completed

**Blog System**
1. Admin creates post in TipTap editor
2. Post saved as draft or published
3. Published posts rendered statically at build time
4. Dynamic routes for individual blog posts
5. SEO metadata generated for each post

**Authentication**
* Simple email-based auth for admin access
* Protected routes using Next.js middleware
* Session management with cookies
* No user registration (single admin user)

## 💡 What I Learned

**tRPC Integration**
Getting tRPC working properly with Next.js 15 took a bit of trial and error. The type safety between client and server is brilliant once it's set up, but the initial configuration with the App Router was a bit fiddly.

**Server vs Client Components**
Understanding when to use server components vs client components was a learning curve. Forms need to be client components, but I could keep the enquiry list as a server component for better performance.

**Prisma Schema Design**
Initially stored dates as strings in the database which caused sorting issues. Had to migrate to proper DateTime fields and update all the queries. Learned the hard way that schema design matters from the start.

**Image Handling**
Implemented a simple image upload system for blog posts. Used Base64 encoding initially but switched to proper file uploads for better performance. Still stored in the database though, which probably isn't ideal at scale.

**Email Routing**
Set up proper business email (david@dsgmortgages.com) instead of forwarding to Gmail. Used custom domain DNS records and configured Resend for transactional emails. Much more professional than the Gmail forwarding mess.

## 🧱 Challenges Faced + Solutions

**Challenge: Blog posts rendering slowly**
Problem: All blog posts were being rendered dynamically on every request, which was slow.
Solution: Implemented static generation for published posts using `generateStaticParams`. Only draft posts are rendered dynamically now.

**Challenge: Admin authentication security**
Problem: Initially hardcoded admin email in the code, which is obviously not great.
Solution: Moved all sensitive data to environment variables. Set up proper session management with secure cookies.

**Challenge: Form spam**
Problem: Contact form was getting hit with spam submissions.
Solution: Added rate limiting (though it's pretty basic) and honeypot field. Proper CAPTCHA would be better but didn't want to force users through that.

**Challenge: Database schema migrations**
Problem: Changing the schema after deployment meant I had to migrate existing data.
Solution: Wrote custom migration scripts to convert string dates to DateTime fields. Learned to plan schema changes more carefully.

**Challenge: Mobile responsiveness**
Problem: Dashboard looked rubbish on mobile initially.
Solution: Used Tailwind's responsive utilities and tested on actual mobile devices. Made sure tables were scrollable and forms were easy to fill out on small screens.

## 🚀 Getting Started

### Prerequisites

* Node.js 18+ installed
* PostgreSQL database (local or hosted)
* Email service account (Resend, SendGrid, etc.)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/dsg-home-finance.git
cd dsg-home-finance
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Fill in your database URL, email credentials, and admin details.

### Configuration

Create a `.env` file with:

```env
# Database
DATABASE_URL="postgresql://..."

# Admin
ADMIN_EMAIL="your-email@example.com"

# Email
RESEND_API_KEY="your-resend-key"
EMAIL_FROM="noreply@yourdomain.com"

# Optional
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
```

### Database Setup

1. Push the Prisma schema to your database:
```bash
npx prisma db push
```

2. Generate Prisma client:
```bash
npx prisma generate
```

3. (Optional) Seed with test data:
```bash
npm run db:seed
```

## 💻 Usage

**Development**
```bash
npm run dev
```
Navigate to `http://localhost:3000`

**Production Build**
```bash
npm run build
npm start
```

**Admin Access**
Navigate to `/admin` and sign in with your configured admin email.

## 🐛 Troubleshooting

**Issue: tRPC errors on build**
Make sure your Prisma client is generated: `npx prisma generate`

**Issue: Database connection errors**
Check your `DATABASE_URL` is correct and the database is accessible.

**Issue: Email not sending**
Verify your Resend API key is valid and the sender email is verified.

**Issue: Images not loading**
Check file size limits and ensure the upload directory has write permissions.

## 📧 Contact

Built by Thomas Gollick for DSG Home Finance

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/thomasgollick)
[![Email](https://img.shields.io/badge/-Email-EA4335?style=flat&logo=gmail&logoColor=white)](mailto:thomasgollick@gmail.com)

---

*Built for real-world use • Deployed on Vercel • Powered by Next.js*
