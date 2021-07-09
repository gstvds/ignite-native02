import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { Task, EditTask } from '../components/TaskItem';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const findExistingTask = tasks.find((task) => task.title === newTaskTitle);

    if (findExistingTask) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((previousState: Task[]) => {
      return [...previousState, data]
    });
  }

  function handleToggleTaskDone(id: number) {
    const newState = tasks.map((item) => {
      if (item.id === id) return { ...item, done: !item.done };
      return item;
    });

    setTasks(newState);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        text: 'Não',
        onPress: () => null,
      },
      {
        text: 'Sim',
        onPress: () => {
          const newState = tasks.filter((item) => item.id !== id);
          setTasks(newState);
        }
      }
    ]);
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTask) {
    if (taskNewTitle === '') return;

    const newState = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, title: taskNewTitle };
      }
      return task;
    });

    setTasks(newState);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})