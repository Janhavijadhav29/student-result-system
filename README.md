# Student Result Management System

Full-stack Student Result Management System to manage students and their exam marks.

## Tech Stack

- **Backend:** Java 17, Spring Boot 3, Spring Data JPA (Hibernate), Bean Validation
- **Database:** MySQL
- **Frontend:** React 18 (Vite), Axios
- **Build tools:** Maven, npm

## Features

- Full CRUD (Create, Read, Update, Delete) for Student, Result
- Search with case-insensitive keyword matching
- Input validation with clear error messages
- Global exception handling with proper HTTP status codes
- Layered architecture: Controller → Service → Repository → Entity
- Responsive React UI with tabbed navigation

## Project Structure

```
student-result-system/
├── backend/                 # Spring Boot REST API
│   ├── pom.xml
│   └── src/main/java/com/results/
│       ├── config/          # CORS configuration
│       ├── controller/      # REST controllers
│       ├── entity/          # JPA entities
│       ├── exception/       # Custom exceptions & global handler
│       ├── repository/      # Spring Data JPA repositories
│       └── service/         # Business logic
└── frontend/                # React + Vite UI
    └── src/
        ├── components/
        ├── api.js
        └── App.jsx
```

## Getting Started

### Prerequisites

- Java 17+
- Maven 3.8+
- MySQL 8+
- Node.js 18+

### 1. Database

The database `student_result_db` is created automatically. Update the MySQL username and password in
`backend/src/main/resources/application.properties` if they are not `root` / `root`.

### 2. Run the backend

```bash
cd backend
mvn spring-boot:run
```

The API runs on `http://localhost:8080`.

### 3. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## REST API Endpoints

### Student

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all |
| GET | `/api/students/{id}` | Get by ID |
| GET | `/api/students/search?keyword=` | Search by name |
| POST | `/api/students` | Create |
| PUT | `/api/students/{id}` | Update |
| DELETE | `/api/students/{id}` | Delete |

### Result

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/results` | Get all |
| GET | `/api/results/{id}` | Get by ID |
| GET | `/api/results/search?keyword=` | Search by rollNo |
| POST | `/api/results` | Create |
| PUT | `/api/results/{id}` | Update |
| DELETE | `/api/results/{id}` | Delete |

## Author

Built as a Java Full Stack portfolio project.
