# SmartPlanner

SmartPlanner is a full-stack web application designed for task scheduling and personal productivity management. The project is built using a microservices-oriented approach, focusing on infrastructure containerization, asynchronous messaging, and high-performance caching.

---

## Tech Stack

### Backend
* **Language & Platform:** C# (.NET Core / .NET 8)
* **API Architecture:** ASP.NET Core Web API, REST API
* **ORM:** Entity Framework Core

### Infrastructure & Data
* **Primary Database:** PostgreSQL 15
* **Caching:** Redis 7
* **Message Broker:** RabbitMQ
* **Containerization:** Docker, Docker Compose

### Frontend
* **Core:** JavaScript / TypeScript, React
* **Client-Server Communication:** Axios

---

## 🚀 Key Features & Architecture

* **Containerized Infrastructure:** The entire environment (backend, frontend, database, cache, and message broker) is orchestrated using Docker Compose for instant local deployment.
* **Database Resiliency:** PostgreSQL integration includes a strict healthcheck policy (`pg_isready`) ensuring the backend only boots up once the database is fully operational.
* **Distributed Caching (Cache-Aside):** Implemented Redis caching to store frequently accessed task lists, reducing primary database load and driving API response times down to single-digit milliseconds.
* **Asynchronous Event-Driven Processing:** Integrated RabbitMQ to decouple heavy background jobs (e.g., email notifications, deadline alerts) from the main HTTP request-response lifecycle.


## Getting Started (Local Deployment)

### Prerequisites
Make sure you have [Docker Desktop](https://docker.com) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com
cd SmartPlanner
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and specify your secret keys and database credentials (required by `docker-compose.yml`):
```env
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=smartplanner_db
DB_CONNECTION=Host=postgres;Database=smartplanner_db;Username=your_user;Password=your_password;
JWT_KEY=your_super_secret_jwt_key_here_at_least_32_chars
```

### 3. Build and Run the App
Launch the entire system with a single command:
```bash
docker-compose up --build
```

Once the containers are up and running:
* **Frontend:** Available at `http://localhost:5173`
* **Backend API (Swagger):** Available at `http://localhost:5058/swagger`
* **RabbitMQ Management Dashboard:** Available at `http://localhost:15672` (Login: `guest` / Pass: `guest`)
