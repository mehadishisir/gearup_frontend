# 🏋️ GearUp – Sports & Outdoor Gear Rental Platform

GearUp is a modern sports and outdoor gear rental platform where users can browse, rent, and manage rental equipment through a clean and responsive interface.

Built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and integrated with a RESTful backend API.

---

## 🚀 Live Demo

🌐 **Live Site:**  
https://gearup-frontend-ten.vercel.app/

🔗 **Frontend Repository:**  
https://github.com/mehadishisir/gearup_frontend

🔗 **Backend API:**  
https://gear-up-backend-one.vercel.app/api

---

## ✨ Features

- 🔐 JWT Authentication
- 🍪 HttpOnly Cookie-Based Authentication
- 👤 User Registration & Login
- 🏋️ Browse Sports & Outdoor Gear
- 📄 View Gear Details
- 📱 Fully Responsive Design
- 🎨 Modern UI with Shadcn UI
- ⚡ Next.js App Router
- 🛡️ Protected Routes using Middleware
- 📊 Role-Based Dashboard
- ✅ Form Validation with React Hook Form & Zod
- 🔥 REST API Integration

---

## 🛠️ Tech Stack

### Frontend

- Next.js 16 (App Router)
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Hook Form
- Zod
- Framer Motion
- Lucide React
- Sonner

### Backend

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication

---

## 📂 Folder Structure

```text
app/
│
├── (public)
│   ├── page.tsx
│   └── gear/
│       └── [id]/
│
├── auth/
│   ├── login/
│   └── register/
│
├── dashboard/
│
└── gear/

components/
providers/
services/
schemas/
types/
hooks/
lib/
middleware.ts
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/mehadishisir/gearup_frontend.git
```

### Navigate to Project

```bash
cd gearup_frontend
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://gear-up-backend-one.vercel.app/api
```

### Run Development Server

```bash
npm run dev
```

---

## 🔑 Environment Variables

```env
NEXT_PUBLIC_API_URL=https://gear-up-backend-one.vercel.app/api
```

---

## 📸 Project Pages

- 🏠 Home Page
- 🏋️ Gear Listing
- 📄 Gear Details
- 🔐 Login
- 📝 Register
- 📊 Dashboard
- 🚫 Protected Routes

---

## 👨‍💻 Developer

**Mehadi Hasan Shisir**

**GitHub**  
https://github.com/mehadishisir

**LinkedIn**  
https://www.linkedin.com/in/mehadishisir/

---

## 📄 License

This project was developed for educational purposes as part of the **Programming Hero Level-2 Assignment**.
