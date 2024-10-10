import React, { createContext, useReducer, useEffect, ReactNode, useContext } from 'react';
import Task from '../../domain/entities/Task';
import TaskRepositoryImpl from '../../data/repositories/TaskRepositoryImpl';
import TaskLocalDataSource from '../../data/datasources/TaskLocalDataSource';
import GetTasks from '../../domain/useCases/GetTasks';
import CreateTask from '../../domain/useCases/CreateTask';
import ToggleComplete from '../../domain/useCases/ToggleComplete';
import RemoveTask from '../../domain/useCases/RemoveTask';

interface TaskState {
    tasks: Task[];
    loading: boolean;
    createError?: string
}

const initialState: TaskState = {
    tasks: [],
    loading: true,
    createError: ''
};

type TaskAction =
    | { type: 'LOAD_TASKS'; payload: Task[] }
    | { type: 'SET_TASKS'; payload: Task[] }
    | { type: 'CREATE_TASK'; payload: Task }
    | { type: 'SET_CREATE_ERROR'; payload: Error };

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {

    switch (action.type) {
        case 'LOAD_TASKS':
            return { ...state, tasks: action.payload, loading: false };
        case 'SET_TASKS':
            return {
                ...state,
                tasks: action.payload
            };
        case 'CREATE_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };
        case 'SET_CREATE_ERROR':
            return {
                ...state,
                createError: action.payload.message
            };
        default:
            return state;
    }
};

interface TaskContextProps {
    state: TaskState;
    toggleComplete: (taskId: string) => Promise<void>;
    removeTask: (taskId: string) => Promise<void>;
    createTask: (task: Task) => Promise<void>;
}

const TaskContext = createContext<TaskContextProps>({
    state: initialState,
    toggleComplete: async () => {},
    createTask: async () => {},
    removeTask: async () => {}
});

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    const taskRepository = (): TaskRepositoryImpl => {
        const taskLocalDataSource = new TaskLocalDataSource();
        const taskRepository = new TaskRepositoryImpl(taskLocalDataSource);

        return taskRepository
    }

    const repository = taskRepository()

    const createTask = async (task: Task) => {
        
        const createTask = new CreateTask(repository);

        try {
            await createTask.execute(task)
            dispatch({ type: 'CREATE_TASK', payload: task });
            dispatch({ type: 'SET_CREATE_ERROR', payload: Error() });
            
        } catch (error) {
            dispatch({ type: 'SET_CREATE_ERROR', payload: error as Error });
        }

    };

    const loadTasks = async () => {
        const getTasks = new GetTasks(repository);
        const tasks = await getTasks.execute();
        dispatch({ type: 'LOAD_TASKS', payload: tasks });
    };

    const toggleComplete = async (taskId: string) => {
        const toggleComplete = new ToggleComplete(repository)

        const tasks: Task[] = await toggleComplete.execute(taskId)
        dispatch({ type: 'SET_TASKS', payload: tasks });
    };

    const removeTask = async (taskId: string) => {
        const removeTask = new RemoveTask(repository)

        const tasks: Task[] = await removeTask.execute(taskId)
        dispatch({ type: 'SET_TASKS', payload: tasks });
    };

    useEffect(() => {

        (async () => await loadTasks())();

    }, []);

    return <TaskContext.Provider value={{ 
        state, 
        toggleComplete, 
        createTask,
        removeTask 
    }}>{children}</TaskContext.Provider>;
};

export const useTodos = () => useContext(TaskContext);
