# 🌍 Country Info App

An API service to fetch country data and manage user holiday calendars.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/OlegKorniychuk/country-info-app.git
cd country-info-app
```

### 2. Run with Docker

```bash
docker-compose up --build
```

> 📡 API will be available at: [http://localhost:3000/api/v1/](http://localhost:3000/api/v1/)

---

## 📚 API Endpoints

### 🌐 Country

- `GET /country`  
  → Get a list of countries from an external API

- `GET /country/{code}`  
  → Get detailed info for a country  
  Includes: **neighbours**, **population**, **flag image URL**

---

### 👤 Users

- `GET /users`  
  → Retrieve all users

- `POST /users`  
  → Create a user  
  **Request Body:**
  ```json
  {
    "login": "andrew"
  }
  ```

---

### 📅 User Holiday Calendar

- `POST /users/{userId}/calendar/holidays`  
  → Add holidays with dates for a specific user  
  **Request Body:**
  ```json
  {
    "countryCode": "US",
    "year": 2025,
    "holidays": ["Independence Day"]
  }
  ```

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (via Mongoose)
- Docker & Docker Compose

---
