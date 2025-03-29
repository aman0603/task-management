import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../types/task';
import { Pencil, Trash2, GripVertical } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleTask, deleteTask, editTask } from '../store/taskSlice';

interface TaskItemProps {
  task: Task;
}

const priorityColors = {
  low: 'border-blue-200',
  medium: 'border-yellow-200',
  high: 'border-red-200',
};

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSave = () => {
    dispatch(editTask({
      id: task.id,
      title: editedTitle,
      description: editedDescription,
      priority: editedPriority,
      dueDate: editedDueDate
    }));
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-4 mb-2 bg-white rounded-lg border ${priorityColors[task.priority]} shadow-sm`}
    >
      <button {...listeners} {...attributes} className="cursor-grab">
        <GripVertical className="w-4 h-4 text-gray-400" />
      </button>
      
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => dispatch(toggleTask(task.id))}
        className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
      />

      {isEditing ? (
        <div className="flex-1 flex flex-col gap-2">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-1 px-2 py-1 rounded border"
            placeholder="Task title"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full px-2 py-1 rounded border"
            placeholder="Task description"
            rows={3}
          />
          <div className="flex gap-2">
            <select
              value={editedPriority}
              onChange={(e) => setEditedPriority(e.target.value as Task['priority'])}
              className="px-2 py-1 rounded border"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              type="date"
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.target.value)}
              className="px-2 py-1 rounded border"
            />
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                {task.title}
              </span>
              <div className="flex items-center gap-2 ml-4">
                {task.dueDate && (
                  <span className="text-sm text-gray-500">
                    Due: {formatDate(task.dueDate)}
                  </span>
                )}
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => dispatch(deleteTask(task.id))}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            {task.description && (
              <p className="mt-1 text-sm text-gray-500 truncate">{task.description}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};