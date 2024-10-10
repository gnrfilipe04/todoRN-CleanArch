import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskModel from '../models/TaskModel';

const TASKS_KEY = 'TASKS';

export default class TaskLocalDataSource {
  async getTasksFromLocal(): Promise<TaskModel[]> {
    const json = await AsyncStorage.getItem(TASKS_KEY);
    return json ? JSON.parse(json).map((task: any) => TaskModel.fromJson(task)) : [];
  }

  async saveTasksToLocal(tasks: TaskModel[]): Promise<void> {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }
}