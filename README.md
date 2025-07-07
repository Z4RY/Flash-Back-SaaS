# 🧠 FlashNote - Learn Through Notes

FlashNote is a powerful and intuitive flashcard app built to help learners revise concepts through active recall. Whether you're preparing for interviews, learning a language, or revising academic subjects, FlashNote lets you turn your **notes into bite-sized flashcards**, track progress, and reinforce knowledge more effectively.

---

## 🚀 Features

- ✅ Create, edit, and delete flashcards
- 📁 Organize cards into subjects or decks
- 🔁 Shuffle & test mode for self-assessment
- 🔎 Smart search to quickly find notes
- 🌐 Responsive design for web and mobile
- 📊 Track learning progress (coming soon)
- ☁️ Cloud sync with Firebase (for login, data storage)
- 💳 Premium access with Stripe (optional)
- 🔒 User authentication (email/password)

---

## 🛠 Tech Stack

| Frontend    | Backend/Services  | Styling    | Deployment |
|-------------|------------------|------------|------------|
| Next.js     | Firebase Auth     | TailwindCSS| Vercel     |
| React Hooks | Firebase Firestore| ShadCN UI  |            |
| Stripe      | Firebase Storage  |            |            |

---

## 📸 Screenshots

> _(Add screenshots here to show your UI. You can drag image files into this README if using GitHub.)_

---

## 🧑‍💻 Getting Started (Local Development)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/flashnote.git
cd flashnote
2. Install Dependencies
bash
Copy code
npm install
3. Configure Environment Variables
Create a .env.local file in the root directory and add:

env
Copy code
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
For Firebase setup, visit Firebase Console.
For Stripe keys, go to Stripe Dashboard.

4. Run the Development Server
bash
Copy code
npm run dev
Now open http://localhost:3000 to see your app in action.

🧪 Project Structure
vbnet
Copy code
📁 components/        → UI components (Card, Navbar, etc.)
📁 pages/             → App routes (Next.js routing)
📁 lib/               → Firebase config, utils
📁 styles/            → Global styles
📁 hooks/             → Custom React hooks
📝 Roadmap
 Add spaced repetition algorithm

 Enable image and markdown support in notes

 Add dark mode toggle

 Export/import flashcards as JSON

 AI note summarizer & auto-flashcard generator (future feature 😎)

🤝 Contributing
Contributions, ideas, and bug reports are welcome!
Fork this repo, create a new branch and raise a PR with your improvements.

📄 License
This project is open source and available under the MIT License.
