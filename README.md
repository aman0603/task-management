# Task Manager

A modern, feature-rich task management application built with React, Redux, and TypeScript. Manage your tasks efficiently with a beautiful, intuitive interface.

## Features

- ✨ Create, edit, and delete tasks
- 🔄 Mark tasks as complete/incomplete
- 📋 Add descriptions and due dates
- ⚡ Set task priorities (Low, Medium, High)
- 🔍 Filter tasks by status (All, Active, Completed)
- 📊 Sort tasks by creation date, due date, or priority
- 🖱️ Drag and drop to reorder tasks
- 💾 Persistent storage using localStorage
- 📱 Fully responsive design

## Tech Stack

- React 18
- TypeScript
- Redux Toolkit
- Tailwind CSS
- DnD Kit (for drag and drop)
- Lucide React (for icons)
- Vite (for build tooling)

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aman0603/task-management.git
cd task-management
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/         # React components
│   ├── AddTaskModal.tsx
│   ├── Modal.tsx
│   ├── TaskFilters.tsx
│   ├── TaskItem.tsx
│   └── TaskList.tsx
├── store/             # Redux store and slices
│   ├── store.ts
│   └── taskSlice.ts
├── types/             # TypeScript type definitions
│   └── task.ts
├── App.tsx           # Main application component
└── main.tsx         # Application entry point
```

## Features in Detail

### Task Management
- Create new tasks with title, description, due date, and priority
- Edit existing tasks
- Delete tasks
- Mark tasks as complete/incomplete
- Drag and drop to reorder tasks

### Filtering and Sorting
- Filter tasks by status:
  - All tasks
  - Active tasks
  - Completed tasks
- Sort tasks by:
  - Creation date
  - Due date
  - Priority level

### Data Persistence
- All tasks are automatically saved to localStorage
- Tasks persist between page refreshes
- No backend required

### Responsive Design
- Works seamlessly on desktop and mobile devices
- Optimized layout for different screen sizes
- Touch-friendly interface

