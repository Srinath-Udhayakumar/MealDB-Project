# 🍽️ MealDB Project – Full CI/CD Demonstration

## 📌 Project Overview

The **MealDB Project** is a React-based web application that allows users to search meals by name using **TheMealDB public API**.  
This project is primarily built to demonstrate **real-world CI/CD concepts** using modern DevOps tools rather than just frontend development.

### The project showcases:
- Frontend development with **React + Vite**
- Docker-based containerization
- CI pipeline using **GitHub Actions**
- Jenkins integration and webhook learning
- Clear separation of **CI vs CD** concepts

---

## 🚀 Features

- Search meals by name  
- View meal details and ingredients  
- Identify the meal with the least number of ingredients  
- Responsive UI with component-based styling  
- Production-ready build using Vite  

---

## 🛠️ Tech Stack

### Frontend
- React (Hooks)
- Vite
- React Router DOM
- CSS (Global + Component-level)

### DevOps / CI-CD
- Docker (Multi-stage build)
- Nginx (for serving production build)
- GitHub Actions (CI pipeline)
- Jenkins (CI learning & demonstration)
- Ngrok (temporary webhook tunneling for Jenkins)

---

## 📂 Project Structure

```
MealDB-Project/
│
├── frontend/
│   └── mealdb-frontend/
│       ├── src/
│       │   ├── css/
│       │   │   ├── index.css        # Global styles
│       │   │   └── App.css          # App-level styles
│       │   ├── pages/
│       │   │   ├── Home.jsx
│       │   │   ├── MealDetails.jsx
│       │   │   └── App.jsx
│       │   └── main.jsx             # App entry point
│       ├── Dockerfile
│       ├── package.json
│       └── vite.config.js
│
├── .github/
│   └── workflows/
│       └── ci.yml                   # GitHub Actions CI pipeline
│
└── README.md
```

---

## 🧪 Local Development Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/MealDB-Project.git
cd MealDB-Project/frontend/mealdb-frontend
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Run development server
```bash
npm run dev
```

Access the app at:
```
http://localhost:5173
```

---

## 📦 Production Build

```bash
npm run build
```

The production-ready files will be generated in the `dist/` folder.

---

## 🐳 Docker Setup

### Dockerfile (Multi-stage Build)
- **Stage 1:** Build React app using Node
- **Stage 2:** Serve build files using Nginx

### Build Docker Image
```bash
docker build -t mealdb-react:latest .
```

### Run Docker Container
```bash
docker run -d -p 3000:80 --name mealdb mealdb-react:latest
```

Access the app at:
```
http://localhost:3000
```

---

## 🔁 CI Pipeline – GitHub Actions

The GitHub Actions pipeline automatically triggers on every push to the `main` branch.

### CI Workflow Includes:
- Checkout code
- Install Node.js
- Install dependencies
- Build React app
- Build Docker image
- Push Docker image to Docker Hub

> **Note:**  
> This pipeline performs **CI (Continuous Integration)** only.  
> It does **not deploy or run containers automatically**.

---

## ⚙️ Jenkins Integration (Learning Purpose)

Jenkins was configured to:
- Pull source code from GitHub
- Build the project manually
- Understand webhook-based automation

### Important Notes:
- Jenkins runs on `localhost:8080`
- GitHub webhooks require Jenkins to be publicly accessible
- Ngrok was used to expose Jenkins temporarily

> **Since Jenkins runs on a local machine:**
> - Ngrok must remain running  
> - URLs change on restart  
> - Not suitable for permanent automation  

For reliability, **GitHub Actions is used as the primary CI tool**.

---

## CI/CD Flow
1. Code pushed to GitHub
2. GitHub Actions triggers build
3. React app built
4. Docker image created
5. Image pushed to Docker Hub

---

## 🔄 CI vs CD – Key Understanding

| Concept | Status |
|------|------|
| Continuous Integration (CI) | ✅ Implemented |
| Docker Image Build | ✅ Implemented |
| Image Push to Docker Hub | ✅ Implemented |
| Continuous Deployment (CD) | ❌ Not implemented |

> **Reason:**  
> CD requires a permanent server or cloud VM.  
> This project focuses on **CI learning and correctness**, not production hosting.

---

## 🧠 Key Learnings from This Project

- Importance of correct relative imports in React
- Linux vs Windows file system differences
- Difference between CI and CD
- Docker image build vs container runtime
- Jenkins webhooks require public accessibility
- GitHub Actions is more suitable for cloud-based CI/CD

---

## 📌 Future Improvements

- Add Docker Compose
- Deploy to cloud VM like (AWS / Azure)
- Implement CD with self-hosted runner
- Add backend services
- Improve UI/UX

---

## 🙌 Conclusion

This project is not just a frontend application —  
it is a **complete CI/CD learning journey** demonstrating how real-world DevOps pipelines work, the limitations of local environments, and the correct usage of modern automation tools. Thank You
