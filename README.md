Here's a README template in English that provides a comprehensive overview of your project, including setup, usage, and Docker instructions:

---

# Node.js Course API

This project is a **RESTful API for managing courses** built with **Node.js** and **TypeScript**. The API includes full **CRUD functionality** for courses and integrates **JWT authentication** for secure access to endpoints. It uses **SQLite** as a lightweight database with **TypeORM** for ORM functionality.

## Features

- **JWT Authentication**: Secure endpoints that require authentication.
- **CRUD Operations**: Create, read, update, and delete courses.
- **Data Validation**: Request validation using `express-validator`.
- **Dockerized Environment**: Simplified deployment with Docker.
- **Environment Configuration**: Configure environment variables using `.env`.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **TypeScript**: JavaScript with strong typing.
- **Express.js**: Web framework for Node.js.
- **SQLite**: Lightweight database for development.
- **TypeORM**: ORM for database management.
- **JWT**: Secure token-based authentication.
- **Docker**: Containerization for easy deployment.

## Setup

### Prerequisites

- **Node.js** (version 18 or later)
- **Docker** (optional, if running in a container)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/tarcisiosilva/course-api.git
   cd course-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the application**:


   - In production mode (compile TypeScript first):

     ```bash
     npm run build
     npm start
     ```

### Database Setup

The application uses SQLite by default, configured through TypeORM. Upon running, it will create an in-memory or local `database.sqlite` file in the root of the project.

## API Endpoints

### Authentication

- **POST** `/auth/register`: Register a new user.
- **POST** `/auth/login`: Authenticate a user and retrieve a JWT token.

### Courses (JWT Authentication Required)

- **POST** `/api/courses`: Create a new course.
- **GET** `/api/courses`: Retrieve all courses, with optional filtering.
- **GET** `/api/courses/:id`: Retrieve a specific course by ID.
- **PUT** `/api/courses/:id`: Update a specific course by ID.
- **DELETE** `/api/courses/:id`: Delete a specific course by ID.

## Running with Docker

This project includes a `Dockerfile` and can be easily run in a Docker container.

1. **Build the Docker image**:

   ```bash
   docker build -t course-api .
   ```

2. **Run the Docker container**:

   ```bash
   docker run -p 3000:3000 --env-file .env course-api
   ```

The application will be accessible at `http://localhost:3000`.

### Docker Compose (Optional)

To run with Docker Compose, create a `docker-compose.yml` file as described in the project documentation and run:

```bash
docker-compose up
```

## Testing

The project uses **Mocha**, **Chai**, and **Supertest** for integration testing. Tests include authentication and CRUD operations for courses.

1. **Run tests**:

   ```bash
   npm test
   ```

