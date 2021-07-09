import React from 'react';
import { FlatList } from 'react-native';

import { ItemWrapper } from './ItemWrapper';

import { Task, EditTask, TaskItem } from './TaskItem';

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (payload: EditTask) => void;
}

export function TasksList({ tasks, toggleTaskDone, removeTask, editTask }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem index={index} task={item} toggleTaskDone={toggleTaskDone} removeTask={removeTask} editTask={editTask} />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  );
}
