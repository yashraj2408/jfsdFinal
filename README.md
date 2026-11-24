# 📋 FeedBack Management System (FBS)
### Full-Stack Java (Spring Boot + React 18 + Material-UI + Redux + H2/MySQL)

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.4-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/MUI-v5-007FFF.svg)](https://mui.com/)
[![Database](https://img.shields.io/badge/Database-H2%20%2F%20MySQL-purple.svg)]()
[![Free Hosting](https://img.shields.io/badge/Hosting-Render%20%2B%20Vercel%20(Free)-green.svg)]()

A complete full-stack **FeedBack Management System** with a Material-UI React frontend and enterprise Spring Boot backend.

---

## 🏗️ Project Architecture

```
jfsdFinal/
├── backend/                       # Spring Boot 3.3.4 Backend (fbs13)
│   ├── src/main/java/com/example/demo/
│   │   ├── Fbs13Application.java # Spring Boot Main
│   │   ├── Service.java          # REST Controller (/login, /user, /all, /delete, /update)
│   │   ├── User.java             # Entity (name, role, email, password)
│   │   ├── DAO.java              # Data Access Object
│   │   ├── UserInterface.java    # JpaRepository interface
│   │   └── DataInitializer.java  # Auto-seeds default Admin & User accounts
│   ├── src/main/resources/
│   │   └── application.properties # Zero-config H2 embedded database + MySQL fallback
│   ├── Dockerfile                 # Multi-stage Docker container for Render
│   └── mvnw                       # Embedded Maven Wrapper
│
├── frontend/                      # React 18 Material-UI Frontend (s13)
│   ├── src/
│   │   ├── components/
│   │   │   ├── SignIn.js          # Material-UI Sign In + Quick Demo buttons + Sign Up link
│   │   │   ├── SignUp.js          # Material-UI Sign Up + Role Selection (Admin/User/Guest)
│   │   │   ├── Appbar.js          # Responsive Navigation Bar with Logout
│   │   │   ├── User.js            # User Search & Details View
│   │   │   ├── Show.js            # Admin Table View (Live Table, Edit Modal, Delete)
│   │   │   └── reducers/          # Redux State Management (RouteReducer)
│   │   ├── config.js              # Centralized API Base URL (Render / Local)
│   │   └── package.json           # MUI, Emotion, Axios, Redux
│
├── render.yaml                    # 1-Click Render.com Web Service Blueprint
├── run_backend.bat                # 1-Click Windows Backend Launcher
├── run_frontend.bat               # 1-Click Windows Frontend Launcher
├── run_backend.sh                 # 1-Click Mac/Linux Backend Launcher
└── run_frontend.sh                # 1-Click Mac/Linux Frontend Launcher
```

---

## 🔑 Default Login Credentials

| Role | Role ID | Email Address | Password | Permissions |
|---|---|---|---|---|
| **Administrator** | `1` | `admin@gmail.com` | `admin123` | Full access to User Management Table (`Show.js`), Edit & Delete |
| **User** | `2` | `user@gmail.com` | `user123` | User Search & Feedback Details (`User.js`) |
| **New Account** | Any | Any new email | Any | Can register dynamically on the **Sign Up** screen |

---

## 🚀 Cloud Deployment Guide

### Backend (Render):
* **Live URL:** `https://jfsdfinal.onrender.com`
* When configuring database or services, always use the public HTTPS URL: `https://jfsdfinal.onrender.com`.

### Frontend (Vercel):
1. Connect `yashraj2408/jfsdFinal` in Vercel.
2. Set **Root Directory** to `frontend`.
3. Add Environment Variable:
   * **Key:** `REACT_APP_API_URL`
   * **Value:** `https://jfsdfinal.onrender.com`
4. Click **Deploy**!

---

## 💻 1-Click Local Run

### Windows:
* Double-click `run_backend.bat`
* Double-click `run_frontend.bat`

### Mac / Linux:
```bash
./run_backend.sh   # Terminal 1: Backend on port 8080
./run_frontend.sh  # Terminal 2: Frontend on port 3000
```
