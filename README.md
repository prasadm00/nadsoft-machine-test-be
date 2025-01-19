# Nadsoft Student Management API

This is a backend API for managing students and their marks. The API allows creating, updating, deleting, and fetching student details along with their marks. It also supports pagination for listing students.

## Features

- Create, update, and delete student records
- Add and update student marks for different subjects
- Fetch a list of students with pagination support
- Retrieve detailed information about a student (including marks)
- Built with Node.js, Express, and PostgreSQL

## Prerequisites

- [Node.js](https://nodejs.org/) 
- [PostgreSQL](https://www.postgresql.org/)

## Setting up the Database

### Step 1: Open PostgreSQL shell

Run the following command to access PostgreSQL:
```bash
sudo -u postgres psql
```

### Step 2: Create a new database

Execute the following SQL commands to create the database and tables:

```bash
-- Create database
CREATE DATABASE nadsoft_mt_db;

-- Connect to the newly created database
\c nadsoft_mt_db;

```

```bash

-- Enable the uuid-ossp extension to generate UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the "students" table
CREATE TABLE students (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    date_of_birth DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the "marks" table
CREATE TABLE marks (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id uuid NOT NULL,
    subject VARCHAR(100) NOT NULL,
    marks INT NOT NULL CHECK (marks >= 0 AND marks <= 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Add a unique constraint on student_id and subject in the marks table
ALTER TABLE marks
ADD CONSTRAINT unique_student_subject UNIQUE (student_id, subject);
```

### Step 3: Set up and run the application

.env file:

```bash

POSTGRES_USERNAME=postgres
POSTGRES_HOST=localhost
POSTGRES_DATABASE=nadsoft_mt_db
POSTGRES_PASSWORD=Pm@12345
POSTGRES_PORT=5432
PORT=3000
```

Install the necessary dependencies:

```bash
npm install
```

Running the Project

To start the API server, run the following command:

```bash
npm start
```
The API will be accessible at http://localhost:3000.

API Endpoints

    Create Student
    POST /students
    Creates a new student record.

    Get Students (Paginated)
    GET /students?page=1&limit=10
    Retrieves a paginated list of students.

    Get Student by ID
    GET /students/:id
    Retrieves detailed information about a student by their ID.

    Update Student
    PUT /students/:id
    Updates the details of a student by their ID.

    Delete Student
    DELETE /students/:id
    Deletes a student by their ID.

    Add/Update Marks
    POST /students/:id/marks
    Adds or updates marks for a student.
