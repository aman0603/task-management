import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types/task';

interface TaskState {
  tasks: Task[];
}

const loadTasks = (): Task[] => {
  const saved = localStorage.getItem('tasks');
  return saved ? JSON.parse(saved) : [];
};

const initialState: TaskState = {
  tasks: loadTasks(),
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    updateTaskOrder: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    editTask: (state, action: PayloadAction<{
      id: string;
      title: string;
      description: string;
      priority: Task['priority'];
      dueDate: string;
    }>) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        task.description = action.payload.description;
        task.priority = action.payload.priority;
        task.dueDate = action.payload.dueDate;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
  },
});

export const { addTask, toggleTask, deleteTask, updateTaskOrder, editTask } = taskSlice.actions;
export default taskSlice.reducer;