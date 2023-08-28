# Workout Tracker

An efficient and user-friendly full-stack application to track and manage your workouts. Built with Django and React, integrated with JWT authentication.

## Features

- **Dynamic Workout Logging:** Create, update, and delete your workouts.
- **User Authentication:** Secure JWT authentication to ensure your data's safety.
- **Frontend Design:** An UI designed with React and styled using Material UI.
- **Backend:** RESTful API with Django to manage and access your workouts.

## Getting Started

### Prerequisites

- Please have `Node.js` and `Python` installed on your machine.

### Installation

1. **Backend Setup:**

   - Navigate to the Django project directory.
   - Install the required packages:
     ```
     pip install -r requirements.txt
     ```
   - Run migrations:
     ```
     python manage.py migrate
     ```
   - Start the server:
     ```
     python manage.py runserver
     ```

2. **Frontend Setup:**

   - Navigate to the React project directory.
   - Install the required packages:
     ```
     npm install
     ```
   - Start the React development server:
     ```
     npm start
     ```

## Authentication

The application uses JWT (JSON Web Tokens) for secure user authentication. 
