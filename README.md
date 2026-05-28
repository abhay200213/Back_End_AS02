# M2-0403439 - Ticket Urgency Calculator API

## Student Information
- Name: Abhay Singh
- Student ID: 0403439

## Project Description
This project is a REST API built using Node.js, Express, and TypeScript.

The API manages support tickets and calculates ticket urgency levels based on:
- ticket priority
- ticket age
- ticket status

The project also includes:
- automated testing using Jest and Supertest
- CI workflow using GitHub Actions
- error handling and boundary testing

---

## Technologies Used
- Node.js
- Express.js
- TypeScript
- Jest
- Supertest
- Nodemon

---

## Installation

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

Server runs on:

```bash
http://localhost:3000
```

---

## Build Project

```bash
npm run build
```

---

## Run Tests

```bash
npm test
```

---

## API Endpoints

### Health Check
GET `/api/v1/health`

### Get All Tickets
GET `/api/v1/tickets`

### Get Ticket By ID
GET `/api/v1/tickets/:id`

### Calculate Ticket Urgency
GET `/api/v1/tickets/:id/urgency`

---

## Test Cases Included
- Health endpoint testing
- Urgency calculation testing
- Boundary testing
- Error handling
- CRUD route testing

---

## GitHub Actions
GitHub Actions workflow is configured to:
- install dependencies
- build project
- run automated tests
