# Interview Tracker — Anuradha Harale

A community-driven interview preparation website built with **Node.js**, **Express**, **MongoDB**, and **EJS**.

## Features
- View & share interview coding questions by topic
- Read & submit first-hand interview experiences by company
- JWT-based login / signup with profile picture upload
- Admin panel: add/remove admins, approve questions & experiences

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (Mongoose)
- **Auth**: JWT + bcrypt
- **Frontend**: EJS, HTML, CSS, Vanilla JS

---

## Setup Instructions

### 1. Install Node.js
Download from https://nodejs.org (v14+)

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment (already set up)
The `.env` file is pre-configured with your MongoDB Atlas cluster:
```
MONGODB_URI=mongodb+srv://anuradhaharale:...@cluster0.oyqttry.mongodb.net/interview_tracker
JWT_SECRET=interviewTracker123
PORT=3000
```

### 4. Seed the database (RUN ONCE)
This creates the required documents in MongoDB (topics list, company list):
```bash
node seed.js
```
You only need to do this **once**. Running it again is safe — it skips existing data.

### 5. Start the server
```bash
npm start
```
or for auto-reload during development:
```bash
npm run dev
```

### 6. Open in browser
```
http://localhost:3000
```

---

## First-time Usage

1. Go to **Sign Up** and create an account
2. To make yourself an **admin**:
   - Sign up first, then open MongoDB Atlas
   - Find your user document and set `isAdmin: true`
   - OR: use the `/add` admin route once you have an existing admin
3. As admin, use the **Admin Panel** to approve submitted questions/experiences

---

## Project Structure
```
interview-tracker/
├── app.js              ← Entry point (connects MongoDB, starts server)
├── seed.js             ← Run once to seed DB with topics & companies
├── .env                ← Environment variables (MongoDB URI, JWT secret)
├── package.json
├── controllers/        ← Route handler logic
│   ├── authController.js
│   ├── mainController.js
│   ├── prepController.js
│   ├── adminController.js
│   └── expController.js
├── middleware/
│   ├── authMiddleware.js   ← JWT verification, checkUser, checkAdmin
│   ├── adminMiddleware.js  ← Provide users list to admin views
│   └── multerMiddleware.js ← Profile pic file upload
├── models/             ← Mongoose schemas
│   ├── User.js
│   ├── Approved_que.js
│   ├── Not_approved_que.js
│   └── Approved_exp.js
├── routes/
│   └── IT_Routes.js
├── views/              ← EJS templates
│   ├── index.ejs
│   ├── login.ejs
│   ├── signup.ejs
│   ├── dashboard.ejs
│   ├── questions.ejs
│   ├── interview_Experience.ejs
│   ├── Interview_Exp_Inner.ejs
│   ├── admin.ejs
│   └── partials/
└── public/
    ├── css/
    ├── js/
    └── img/
```

---

