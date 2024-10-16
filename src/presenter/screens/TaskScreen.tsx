import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, TextInput, Button, Alert, Text } from 'react-native';

import TaskItem from '../components/TaskItem';
import { useTodos } from '../contexts/TaskContext';
import Task from '../../domain/entities/Task';
import TitlePage from '../components/TitlePage';

const TaskScreen = () => {
    const { state, toggleComplete, createTask, removeTask } = useTodos();
    const [ value, setValue ] = useState('')

    if (state.loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <TitlePage text='Todo App' />
            <View style={styles.inputContainer}>
                <TextInput placeholder='Digit your task...' style={styles.input} value={value} onChangeText={setValue}/>
                <Text style={{ color: '#ff0000'}}>{state.createError}</Text>
                <View style={styles.buttonContainer}>
                    <Button title='Add Task' onPress={() => {
                        createTask(Task.create(value))
                        setValue('')
                    }} />
                </View>
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
        marginTop: 50
    },
    inputContainer: {
        marginTop: 40,
    },
    input: {
        borderWidth: 1, 
        padding: 10, 
        borderRadius: 8,
        borderColor: 'grey'
    },
    buttonContainer: {
        alignSelf: 'flex-end'
    }
});

export default TaskScreen;
