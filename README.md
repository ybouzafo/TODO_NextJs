# ✅ Todo List App – Built with Next.js & React Query

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

It’s a simple yet powerful **Todo List** application where you can create, display, update, and delete your tasks. The app uses [React Query](https://tanstack.com/query/latest) to handle asynchronous operations, and [json-server](https://github.com/typicode/json-server) to simulate a real backend API with a local JSON file.

---

## 🚀 Features

- ✅ Add new tasks
- 📝 Edit existing tasks
- ☑️ Toggle task completion
- 🗑️ Delete tasks
- 🔁 React Query for data fetching and automatic cache updates
- ⚡ Optimistic UI updates for better user experience
- 📁 Uses `json-server` as a fake REST API
- 🎨 Clean and minimal interface (with or without Tailwind)

---


---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:ybouzafo/TODO_NextJs.git
cd TODO_NextJs


###  2. Install dependencies

npm install
# or
yarn install

### 3. Start the JSON Server

npx json-server --watch db.json --port 4000

### 4. Start the Next.js development server
npm run dev
# or
yarn dev


Then, open http://localhost:3000 in your browser.



Sample db.json :
{
  "todos": [
    {
      "id": 1,
      "title": "Learn React Query",
      "completed": false
    },
    {
      "id": 2,
      "title": "Finish Todo App",
      "completed": true
    }
  ]
}


📦 Technologies Used

Next.js – React Framework

React Query – Data fetching & caching

json-server – Mock REST API

(Optional) Tailwind CSS – Utility-first CSS

🧠 Learn More
To learn more about Next.js:

Next.js Documentation

Learn Next.js

React Query Docs