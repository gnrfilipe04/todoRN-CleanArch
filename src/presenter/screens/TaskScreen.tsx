import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, TextInput, Button, Alert, Text } from 'react-native';

import TaskItem from '../components/TaskItem';
import { useTodos } from '../contexts/TaskContext';
import Task from '../../domain/entities/Task';

const TaskScreen = () => {
    const { state, toggleComplete, createTask, removeTask } = useTodos();
    const [ value, setValue ] = useState('')

    if (state.loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 40}}>
                <TextInput style={{borderWidth: 1, padding: 10, borderRadius: 8}} value={value} onChangeText={setValue}/>
                <Text style={{ color: '#ff0000'}}>{state.createError}</Text>
                <Button title='New Task' onPress={() => {
                    createTask(Task.create(value))
                    setValue('')
                }} />
            </View>
            <FlatList
                data={state.tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => 
                    <TaskItem 
                        task={item} 
                        onToggleComplete={toggleComplete} 
                        onRemoveTask={removeTask}
                    />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default TaskScreen;
