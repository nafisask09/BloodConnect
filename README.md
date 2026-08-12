# 🩸 BloodConnect - Blood Donor Management System

## 🌟 Live Demo
> **Frontend:** https://bloodconnect-frontend-ywkj.onrender.com
> **Backend:** https://bloodconnect-backend-thin.onrender.com

## 📌 Overview
BloodConnect is a full-stack web application that connects blood donors with people in need. Users can search for available donors by blood group and location, and register as donors to help save lives.

**Why BloodConnect?**
- ⚡ **Emergency Ready** - No login required, instant access
- 🎯 **Accurate Search** - Find donors by blood group and location
- 📱 **Mobile Friendly** - Works on all devices
- 🔒 **Secure** - Full validation on both frontend and backend

---

## 🚀 Features

### 🔍 Search Donors
- Search by blood group (A+, A-, B+, B-, AB+, AB-, O+, O-)
- Search by location with autocomplete suggestions
- View donor details (name, age, phone, location, availability)

### 📝 Register as Donor
- Register with name, age, blood group, phone, location
- Set availability status
- Track last donation date
- Full validation on all fields

### 🎨 User Experience
- Clean, responsive UI
- Real-time search results
- Location autocomplete
- Mobile-friendly design

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI Library
- **Vite** - Build Tool
- **CSS3** - Styling

### Backend
- **Spring Boot** - REST API Framework
- **Java** - Programming Language

### Database
- **MongoDB** - NoSQL Database

### Tools
- **Eclipse IDE** - Backend Development
- **VS Code** - Frontend Development
- **Git** - Version Control

---

## 📦 Project Structure

```
bloodconnect/
├── backend/                    # Spring Boot Backend
│   ├── src/main/java/         # Java Source Code
│   │   └── com.bloodconnect.backend/
│   │       ├── controller/    # REST Controllers
│   │       ├── model/         # MongoDB Models
│   │       ├── repository/    # MongoDB Repositories
│   │       └── service/       # Business Logic
│   └── src/main/resources/    # Config Files
│       └── application.properties
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── App.jsx           # Main Component
│   │   ├── Register.jsx      # Registration Component
│   │   └── App.css           # Styling
│   └── package.json          # Dependencies
│
└── README.md                  # This File
```

---

## 🔧 Installation & Setup

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- MongoDB 6.0 or higher
- Eclipse IDE (or any Java IDE)
- VS Code (or any code editor)

### Step 1: Clone the Repository
```bash
git clone https://github.com/nafisask09/BloodConnect.git
cd bloodconnect
```

### Step 2: Setup Backend
```bash
# Open project in Eclipse
# Run as Spring Boot Application
# Or use terminal:
cd backend
./mvnw spring-boot:run
```

### Step 3: Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### Step 4: Access Application
```
**Frontend (Website):**
http://localhost:5173

**Backend API (REST Endpoints):**
http://localhost:8081/api/donors
```
---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/donors` | Get all donors |
| GET | `/api/donors/{id}` | Get donor by ID |
| POST | `/api/donors` | Register new donor |
| PUT | `/api/donors/{id}` | Update donor |
| DELETE | `/api/donors/{id}` | Delete donor |
| GET | `/api/donors/search?bloodGroup=A+&location=Tenali` | Search donors |
| GET | `/api/donors/locations?query=Te` | Location suggestions |

---

## 🚀 Deployment

### Backend Deployment (Render.com)
1. Push code to GitHub
2. Create Web Service on Render.com
3. Connect GitHub repository
4. Build Command: `./mvnw clean install`
5. Start Command: `java -jar target/*.jar`

### Frontend Deployment (Vercel)
1. Push code to GitHub
2. Create Static Site on Render.com and connect GitHub repo
3. Follow prompts

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Nafisa**
- GitHub: [@nafisask09](https://github.com/nafisask09)

---

## 🙏 Acknowledgments

- Thanks to all blood donors who save lives every day
- Inspired by real-world need for quick blood donor access

---

## 📊 Project Status

**Status:** Complete ✅
**Version:** 1.0
**License:** MIT

---

## ⭐ Star the Project

If you found this project helpful, please give it a star on GitHub!

---

**Made with ❤️ to help save lives**