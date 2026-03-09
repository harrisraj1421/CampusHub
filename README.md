# 🎓 CampusHub: The Ultimate University Ecosystem

CampusHub is a comprehensive, all-in-one digital platform designed to streamline campus life for students and administrators. From managing library resources to ordering from the canteen, CampusHub brings all essential university services into a single, sleek, and intuitive interface.

![CampusHub Banner](https://img.shields.io/badge/Campus-Hub-blueviolet?style=for-the-badge&logo=appveyor)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 🌟 Key Features

### 👨‍🎓 For Students
- **📚 Digital Library**: Browse books, check availability, and access digital study materials.
- **🍔 Smart Canteen**: Real-time menu browsing and easy ordering system.
- **💰 Seamless Payments**: Integrated portal for fee payments, canteen bills, and more.
- **🤝 Collaboration Hub**: Connect with peers for projects and group studies.
- **🛒 Campus Marketplace**: Buy and sell books, electronics, or other campus essentials.
- **🤖 AI Assistant**: Get instant help and academic guidance through our AI integration.
- **📅 Event Tracker**: Stay updated with the latest campus workshops, fests, and seminars.

### 🛡️ For Administrators
- **📊 Central Dashboard**: Overview of all campus activities and user metrics.
- **🛠️ Service Management**: Control library inventory, update canteen menus, and manage event listings.
- **👥 User Control**: Securely manage student profiles and permissions.

---

## 🛠️ Tech Stack

- **Frontend**: Modern HTML5, CSS3 with Glassmorphic UI, and Vanilla JavaScript.
- **Backend**: Node.js with Express.js framework.
- **Database**: MongoDB Atlas using Mongoose ODM.
- **Security**: JWT (JSON Web Tokens) for authentication and BcryptJS for password hashing.

---

## ⚡ Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB Account](https://www.mongodb.com/cloud/atlas) (for database connection)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/harrisraj1421/CampusHub.git
   cd CampusHub
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your credentials:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the Application**
   ```bash
   # Start in production mode
   npm start

   # Start in development mode (if nodemon is installed)
   npx nodemon server.js
   ```

The application will be accessible at `http://localhost:5000`.

---

## 📂 Project Structure

```text
├── controllers/    # API Request Handlers
├── middleware/     # Auth and Security Middleware
├── models/         # Mongoose Schemas (Database)
├── public/         # Frontend Assets (HTML, CSS, JS)
│   ├── views/      # Student and Admin pages
│   └── css/        # Custom Styles
├── routes/         # API Endpoint Definitions
├── server.js       # Main Entry Point
└── .env            # Environment Variables (ignored by Git)
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the ISC License. See `package.json` for more information.

---

**Built with ❤️ for the student community.**
