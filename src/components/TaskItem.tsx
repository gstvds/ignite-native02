import React, { useState, useRef, useEffect } from 'react';
import { Image, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export interface EditTask {
  taskId: number;
  taskNewTitle: string;
}

interface TaskItemProps {
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (payload: EditTask) => void;
  task: Task;
}

export function TaskItem({ index, task, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
  const [editing, setEditing] = useState(false);
  const [taskNewTitle, setTaskNewTitle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setEditing(true);
  }

  function handleCancelEditing() {
    setEditing(false);
  }

  function handleSubmitEditing() {
    editTask({ taskId: task.id, taskNewTitle });
    setEditing(false);
  }

  useEffect(() => {
    if (editing) textInputRef.current?.focus();
    else textInputRef.current?.blur();
  }, [editing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={taskNewTitle}
            onChangeText={(text) => setTaskNewTitle(text)}
            editable={editing}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer} >
        {editing ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View
          style={styles.iconsDivider}
        />

        <TouchableOpacity
          disabled={editing}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} style={{ opacity: editing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  iconsDivider: {
    width: 1,
    height: 24,
    marginHorizontal: 12,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
  },
});
