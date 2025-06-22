# 📝 My First Blog (Frontend)

This project is a full-stack blog application developed during a bootcamp at [TechUp](https://www.techupth.com/)  , with the frontend and [backend](https://github.com/Nantasit-2001/server-blog-post) maintained in separate Git repositories.  
Separating the frontend and backend allows for clearer code organization, easier maintenance, and independent development and deployment of each part.  
As my first full-stack project, this structure helped me better understand the distinct roles of client and server, and gave practical experience managing multiple repos.

---

## 🔗 Live Demo & Design

- Live Demo: [https://my-first-blog-lac.vercel.app](https://my-first-blog-lac.vercel.app)  
- UI Design (Figma): [My Personal Blog Project](https://www.figma.com/design/4LFRzDFgPl60EyEnYsiCSW/My-Personal-Blog-Project%3Fnode-id=19-2724&t=Ib22BRteomHeSl1z-1)  

---

## 📌 Description

This frontend app enables users to:

- Browse blog posts by category, with pagination and advanced search/filter to find content easily.
- Like and comment on posts (for authenticated users), encouraging interaction and community engagement.
- Manage their profile, including updating avatars and changing passwords.
- Receive real-time notifications for new posts and comments.
- Admin users can create, edit, and delete posts through a dedicated admin panel.

The app is designed to be fully responsive, providing a seamless experience across devices.

---

## 🌟 Features

- 📝 Article browsing with category filters, keyword search, and pagination.
- 🔐 Secure user authentication and authorization using JWT (handled on backend).
- 💬 Commenting and liking capabilities restricted to logged-in users.
- 👤 User profile management: avatar uploads via Cloudinary, and password updates.
- 🔔 Notifications system for new posts and comments.
- ⚡ Responsive UI built with Chakra UI components.
- 🎨 Clean, customizable icons using Lucide icon library.
- 🛠️ Communication with backend via RESTful APIs.
- 🔄 Smooth user experience powered by React state management and hooks.

---

## ⚙️ Client and Server Separation

The frontend and backend are maintained in **separate Git repositories** for better modularity and ease of maintenance.

- Frontend (this repo): handles UI, user interactions, and communicates with backend APIs.
- Backend: manages API routes, authentication, database operations, and business logic.

You can find the backend code and README here:  
### 🔗 Backend Repo: [https://github.com/Nantasit-2001/server-blog-post](https://github.com/Nantasit-2001/server-blog-post)

Ensure the frontend is configured with the correct backend API URL via environment variables.

---

## 🚦 Performance Notes: Loading Speed of Live Demo

Please note the **Live Demo may experience slower initial load times** due to:

- The frontend hosted on **Vercel's free tier**, which may cause cold starts of serverless functions or CDN caches after inactivity.
- The backend deployed on **Render's free tier**, which can introduce cold start latency and limited resources.
- The PostgreSQL database and Cloudinary storage are also on free-tier plans, possibly causing slower response times.
- Combined free-tier usage can lead to latency especially after idle periods.

Despite these limitations, this setup is cost-free and ideal for learning, testing, and demonstrations.

---

## ⚙️ Technologies Used

- **React** — modern, component-based UI development.
- **Chakra UI** — accessible and responsive UI components.
- **Lucide Icons** — clean and customizable icons.
- **Vite** — fast development and build tool.
- **Cloudinary** — image upload and management.
- **RESTful APIs** — frontend-backend communication.

---
