import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { TaskList } from './components/TaskList';
import { TaskFilters } from './components/TaskFilters';
import { AddTaskModal } from './components/AddTaskModal';
import { FilterType, SortType } from './types/task';
import { Plus } from 'lucide-react';

function TaskApp() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('date');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Plus className="w-5 h-5" />
            Add Task
          </button>
        </div>

        <TaskFilters
          filter={filter}
          sort={sort}
          onFilterChange={setFilter}
          onSortChange={setSort}
        />

        <TaskList filter={filter} sort={sort} />

        <AddTaskModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <TaskApp />
    </Provider>
  );
}

export default App;