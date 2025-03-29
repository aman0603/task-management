import React from 'react';
import { FilterType, SortType } from '../types/task';
import { ChevronDown } from 'lucide-react';

interface TaskFiltersProps {
  filter: FilterType;
  sort: SortType;
  onFilterChange: (filter: FilterType) => void;
  onSortChange: (sort: SortType) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filter,
  sort,
  onFilterChange,
  onSortChange,
}) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex gap-1">
        <button
          onClick={() => onFilterChange('all')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'all'
              ? 'bg-gray-900 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          All
        </button>
        <button
          onClick={() => onFilterChange('active')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'active'
              ? 'bg-gray-900 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => onFilterChange('completed')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'completed'
              ? 'bg-gray-900 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Completed
        </button>
      </div>

      <div className="flex-1" />

      <div className="relative">
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortType)}
          className="appearance-none bg-white pl-4 pr-10 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="date">Created Date</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
      </div>
    </div>
  );
};