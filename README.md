# 🏡 JFSD Final: Home Renovation & Smart Home Theme Platform
### Java Full Stack Development (Spring Boot + React 18 + H2/MySQL + 3D Models)

[![Java](https://img.shields.io/badge/Java-17%2F21-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.4-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Database](https://img.shields.io/badge/Database-H2%20%2F%20MySQL-purple.svg)]()
[![Free Hosting](https://img.shields.io/badge/Hosting-Render%20%2B%20Vercel%20(Free)-green.svg)]()

A complete end-to-end full-stack web platform combining an enterprise **Spring Boot** backend with an interactive **React** Admin Dashboard, dynamic Thymeleaf views, 3D furniture models (`.glb`), user authentication, and automated email notifications.

---

## 🏗️ Project Architecture

```
jfsdFinal/
├── backend/                       # Java Spring Boot 3.3.4 Application
│   ├── src/main/java/             # Controllers, Models, Repositories, Services
│   ├── src/main/resources/
│   │   ├── application.properties # Zero-config database (H2 default + MySQL override)
│   │   ├── static/                # CSS, JS, Images & 3D WebGL Models (.glb)
│   │   └── templates/             # Thymeleaf User Portal Pages
│   ├── Dockerfile                 # Multi-stage Docker build for Render/Cloud
│   └── mvnw                       # Embedded Maven Wrapper (no local Maven needed)
│
├── frontend/                      # React 18 Admin Module
│   ├── src/components/            # Admin Dashboard, Theme Management, Protected Routes
│   └── package.json               # Axios, React Router v6
│
├── render.yaml                    # 1-Click Render.com free cloud deployment
├── run_backend.bat                # 1-Click Windows Backend Launcher
├── run_frontend.bat               # 1-Click Windows Frontend Launcher
├── run_backend.sh                 # 1-Click Mac/Linux Backend Launcher
└── run_frontend.sh                # 1-Click Mac/Linux Frontend Launcher
```

---

## 💻 1-Click Run on Any Laptop (Windows & Mac)

Zero database setup required. The application uses a pre-configured embedded database with full persistence out of the box!

### On Windows:
1. Double-click **`run_backend.bat`** (Starts Spring Boot on port 8080).
2. Double-click **`run_frontend.bat`** (Starts React Admin on port 3000).

### On macOS / Linux:
```bash
# Terminal 1: Start Backend
./run_backend.sh

# Terminal 2: Start Frontend
./run_frontend.sh
```

- **User Portal (Thymeleaf):** [http://localhost:8080/home](http://localhost:8080/home)
- **Admin Dashboard (React):** [http://localhost:3000/](http://localhost:3000/)
- **H2 Database Console:** [http://localhost:8080/h2-console](http://localhost:8080/h2-console) (JDBC URL: `jdbc:h2:file:./db/blogdb`, Username: `sa`, Password: empty)

---

## 🚀 Free Lifetime Cloud Deployment (Render + Vercel)

### Step 1: Deploy Backend for Free on [Render.com](https://render.com)
1. Sign up/Log in to Render using your GitHub account (`yashraj2408`).
2. Click **New +** → **Web Service**.
3. Select `yashraj2408/jfsdFinal`.
4. Render automatically detects `backend/Dockerfile` and `render.yaml`.
5. Select the **Free** instance type and click **Deploy Web Service**.
6. Render will build and provide your free live HTTPS backend URL (e.g., `https://jfsd-backend.onrender.com`).

### Step 2: Deploy Frontend for Free on [Vercel](https://vercel.com)
1. Log in to Vercel with your GitHub account.
2. Click **Add New** → **Project**, select `yashraj2408/jfsdFinal`.
3. Set **Root Directory** to `frontend`.
4. In Environment Variables, add:
   - `REACT_APP_API_URL` = `https://your-backend-app.onrender.com`
5. Click **Deploy**!
