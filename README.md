# Hall of Thanks

## 📌 Overview
Hall of Thanks is a **modern gratitude-sharing platform** where users can publicly express appreciation for others. Built with a **modular and scalable architecture**, this project ensures easy adaptability and future-proofing.

## 🚀 Features
- **User Authentication**: Secure login and signup.
- **Post & View Thanks**: Users can create, view, and manage gratitude posts.
- **Comment System**: Engage with posts through comments.
- **Like & Share**: Boost visibility with likes and shares.
- **Search & Filter**: Easily find posts by name, date, or category.

## 🏗️ Tech Stack
- **Frontend**: React, Tailwind CSS, Redux Toolkit
- **Backend**: Appwrite (BaaS) for database, authentication, and storage
- **State Management**: Redux Toolkit
- **Deployment**: Vercel (Frontend), Appwrite Cloud (Backend)

## 📦 Architecture & Code Quality
This project follows **production-level coding standards**:
- **Modular Architecture**: Well-structured codebase for maintainability.
- **Separation of Concerns**: Clear distinction between UI, state management, and API services.
- **Scalability & Flexibility**: Appwrite is used as BaaS, but the design allows easy migration to Firebase, Supabase, or a custom backend.
- **Error Handling**: Proper try-catch blocks for handling API errors.
- **Optimized Performance**: Efficient data fetching and caching.

## 📜 How to Set Up Locally

### Prerequisites
- Node.js (>=16.x)
- NPM or Yarn
- Appwrite account

### Installation
```sh
# Clone the repository
git clone https://github.com/your-username/hall-of-thanks.git
cd hall-of-thanks

# Install dependencies
npm install  # or yarn install

# Set up environment variables
cp .env.example .env
# Fill in Appwrite credentials in .env

# Run the app
npm run dev  # or yarn dev
```

## 🛠 API Services (Modular Approach)
API interactions are handled through a dedicated service layer:
- **AuthService**: Manages authentication.
- **CommentService**: Handles comment creation and deletion.
- **PostService**: Manages gratitude posts.

If needed, replacing Appwrite with Firebase or a custom backend requires minimal changes.

## 📌 Future Enhancements
- **Notifications System**
- **Dark Mode**
- **Real-time Updates**
- **Mobile App Version**

## 🤝 Contributing
PRs and suggestions are welcome! Please follow the **contribution guidelines**.

## 📜 License
MIT License

## 🏆 Acknowledgments
Special thanks to all contributors and open-source libraries that made this project possible! 🙌

