# 🎬 My-Media

A full-stack social media platform inspired by **YouTube and Twitter**, built to practice and demonstrate full-stack web development.

My-Media allows users to create accounts, upload and watch videos, interact through comments and subscriptions, create user profiles, and publish tweet-style posts.

> 🚧 **Project Status:** Initial Version (v1)
> working live demo  https://my-media-pi.vercel.app/

## 🤖 AI Assistance & Credits

AI tools were used during the development of My-Media as a learning and development aid.

In particular, AI assistance was used for:

* UI/UX design ideas and layout suggestions
* Tailwind CSS styling and component styling
* Improving the visual presentation of component
AND FOR README.md 

The application's architecture, backend logic, API integration, database design, feature implementation, and overall development were developed and understood by me as part of the project.

AI was used as a **development assistant and learning resource**, not as a replacement for understanding the code.


---

##   Features

###   Authentication

* User registration and login
* JWT-based authentication
* Access token and refresh token handling
* Protected routes
* Persistent authentication using cookies

### 🎥 Video Platform

* Upload videos and thumbnails
* Display uploaded videos on the home page
* Search videos by title
* Watch individual videos
* Track video views
* Display video owner information
* Video creation timestamps
* Published/unpublished video support

### 💬 Comments

* Add comments to videos
* Display comments with username and avatar
* Display comment timestamps

### 🔔 Subscriptions

* Subscribe / unsubscribe from channels
* Display subscription status
* Display subscriber count
* Persist subscription state after page refresh

### 👤 User Profiles

* User avatar
* Cover image
* Username
* Full name
* Subscriber count
* Display user's uploaded videos

### 🐦 Tweets

* Create tweet-style posts
* Display tweets
* Associate tweets with their owners

---

## 🛠️ Tech Stack

### Frontend

* React
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Cookie-based authentication

### Media Storage

* Cloudinary

---

##   Project Architecture

```text
My-Media
│
├── frontend
│   ├── components
│   ├── pages
│   ├── api
│   └── App.jsx
│
└── backend
    ├── controllers
    ├── models
    ├── routes
    ├── middlewares
    └── utils
```

The application follows a client-server architecture:

```text
React Frontend
      │
      │ REST API
      ▼
Express.js Backend
      │
      ▼
MongoDB
      │
      └── Cloudinary
           (Media Storage)
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/RoshankumarF/My-media.git
cd My-media
```

### 2. Install dependencies

Install dependencies for the frontend:

```bash
cd frontend
npm install
```

Install dependencies for the backend:

```bash
cd ../backend
npm install
```

### 3. Environment Variables

Create a `.env` file in the backend directory.

Example:

```env
PORT=8000

MONGODB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=your_access_token_expiry

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Create the required frontend environment variables according to your API configuration.

 

---

## ▶️ Running Locally

### Start the backend

```bash
cd backend
npm run dev
```

### Start the frontend

```bash
cd frontend
npm run dev
```

The frontend and backend will run on their respective development ports.

---

## 📌 API Functionality

Some of the major API operations include:

```text
Authentication
├── Register
├── Login
├── Logout
└── Current User

Videos
├── Upload Video
├── Get All Videos
├── Get Video
└── Increase Views

Comments
├── Add Comment
└── Get Comments

Subscriptions
├── Subscribe / Unsubscribe
├── Check Subscription
└── Get Subscriber Count

Users
└── Get User Profile

Tweets
├── Create Tweet
└── Get Tweets
```

---

## 🧠 What I Learned

This project was built as a practical full-stack learning project. Through My-Media, I worked with:

* REST API design
* React component architecture
* React state management
* React Router
* Axios and API integration
* JWT authentication
* Protected backend routes
* MongoDB and Mongoose
* Database relationships using references
* Mongoose `populate()`
* File and media uploads
* Subscription relationships
* Frontend/backend debugging
* Handling asynchronous operations
* Authentication persistence
* Connecting frontend and backend in a production-style application

---

## 🔮 Future Improvements

Planned improvements for future versions:

* ❤️ Like system
* 💬 Tweet comments
* 🔁 Tweet reposts
* 📜 Watch history
* 🔍 Improved search
* ♾️ Pagination / infinite scrolling
* ✏️ Edit profile
* 🗑️ Edit and delete videos
* 🎯 Video recommendations
* 📱 Improved responsive design
* 🔔 Notifications
* 🌙 Dark mode

---

## 👨‍💻 Author

Built by Roshan Kumar as a full-stack development project.

If you found the project interesting, feel free to explore the repository and provide feedback.

---

## ⭐ Project Goal

The goal of My-Media is to continuously evolve the application while strengthening practical knowledge of **frontend development, backend development, databases, authentication, APIs, and full-stack system design**.
