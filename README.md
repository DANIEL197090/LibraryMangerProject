# School Library Management API

A RESTful API built with Node.js, Express, and MongoDB for managing a school library system.

## 🚀 Features
- **MVC Architecture**: Organized codebase for scalability.
- **RESTful Endpoints**: Complete CRUD for Authors, Books, Students, and Attendants.
- **Borrow & Return Logic**: Business logic for tracking book status.
- **Authentication**: JWT-based authentication for Library Attendants.
- **Bonus Capabilities**:
  - Pagination for book listings.
  - Search by book title.
  - Overdue book checks.
  - Duplicate ISBN and Student ID prevention.
  - Population of related entities (Authors, Students, Attendants).

---

## 🛠️ Setup Instructions

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### 2. Clone and Install
```bash
git clone <repository-url>
cd library-system
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5050
MONGO_URI=mongodb://127.0.0.1:27017/library-manager
JWT_SECRET=your_jwt_secret_here
```

### 4. Run the Application
```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

---

## 📖 API Documentation

### Base URL: `http://localhost:5050/api/v1`
### POSTMAN URL: https://crimson-spaceship-329387.postman.co/workspace/My-Workspace~930e10cb-3a70-4402-8c8c-0f462b54d4c4/collection/19389668-787c619a-c496-4714-9c15-78c413e93554?action=share&creator=19389668

#### 🔐 Authentication
- **POST `/auth/register/libraryAttendant`**: Register a new attendant.
- **POST `/auth/login/libraryAttendant`**: Authenticate and receive a JWT.

#### 🖋️ Authors
- **GET `/authors`**: Get all authors.
- **POST `/authors`**: Create a new author (Private).
- **GET `/authors/:id`**: Get a single author.
- **PUT `/authors/:id`**: Update an author (Private).
- **DELETE `/authors/:id`**: Delete an author (Private).

#### 📚 Books
- **GET `/books`**: Get books (supports `page`, `limit`, and `search`).
- **POST `/books`**: Create a book (Private).
- **GET `/books/:id`**: Get a book with full details (populated).
- **POST `/books/:id/borrow`**: Borrow a book (Private).
- **POST `/books/:id/return`**: Return a book (Private).
- **GET `/books/overdue`**: List all books past their return date (Private).

#### 🎓 Students
- **GET `/students`**: Get all students.
- **POST `/students`**: Register a student (Private).
- **GET `/students/:id`**: Get student details.

#### 👨‍💼 Library Attendants
- **GET `/attendants`**: List all staff.
- **GET `/attendants/:id`**: View staff details.

---

## 🧩 Relationship Logic
- **ABook → has many Authors** (Populated on retrieval)
- **ABook → belongs to one Student** (When status is "OUT")
- **ABook → is issued by one Attendant** (When status is "OUT")

---

## 📁 Project Structure
```text
/library-system
|-- /config        # DB config
|-- /controllers   # Request logic
|-- /middleware    # Auth protection
|-- /models        # Mongoose schemas
|-- /routes        # Endpoint definitions
|-- server.js      # Entry point
```
