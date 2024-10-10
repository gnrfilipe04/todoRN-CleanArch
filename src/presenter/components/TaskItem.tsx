// src/features/task/presentation/components/TaskItem.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Task from '../../domain/entities/Task';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onRemoveTask: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onRemoveTask }) => {
  return (
    <TouchableOpacity onPress={() => onToggleComplete(task.id)} onLongPress={() => Alert.alert('Atenção', `Deseja realmente deletar a tarefa ${task.description}?`, [
        {   
            style: 'cancel',
            text: 'Cancelar',
            onPress: () => {}
        },
        {
            style: 'destructive',
            text: 'Deletar',
            onPress: () => onRemoveTask(task.id)
        }
    ])}>
      <View style={styles.task}>
        <Text style={task.isComplete ? styles.completed : styles.incomplete}>
          {task.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  task: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f8f9fa',
  },
  completed: {
    fontWeight: 'bold',
    color: '#50c878'
  },
  incomplete: {
    textDecorationLine: 'none',
  },
});

export default TaskItem;
