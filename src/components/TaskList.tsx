import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { TaskItem } from './TaskItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { updateTaskOrder } from '../store/taskSlice';
import { FilterType, SortType } from '../types/task';

interface TaskListProps {
  filter: FilterType;
  sort: SortType;
}

export const TaskList: React.FC<TaskListProps> = ({ filter, sort }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sort === 'dueDate') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = sortedTasks.findIndex(task => task.id === active.id);
      const newIndex = sortedTasks.findIndex(task => task.id === over.id);
      const newTasks = arrayMove(sortedTasks, oldIndex, newIndex);
      dispatch(updateTaskOrder(newTasks));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={sortedTasks} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {sortedTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};