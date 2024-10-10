import TaskRepository from '../../domain/repositories/TaskRepository';
import TaskLocalDataSource from '../datasources/TaskLocalDataSource';
import Task from '../../domain/entities/Task';
import TaskModel from '../models/TaskModel';

export default class TaskRepositoryImpl implements TaskRepository {
    constructor(private taskLocalDataSource: TaskLocalDataSource) { }
    async removeTask(taskId: string): Promise<Task[]> {
        const tasks = await this.getTasks();
        const tasksFiltered = tasks.filter(task => task.id != taskId)

        await this.setTasks(tasksFiltered)
        return tasksFiltered
        
    }

    async setTasks(tasks: Task[]): Promise<void> {
        await this.taskLocalDataSource.saveTasksToLocal(tasks.map(TaskModel.fromEntity));
    }

    async getTasks(): Promise<Task[]> {
        const taskModels = await this.taskLocalDataSource.getTasksFromLocal();
        return taskModels.map((taskModel) => taskModel.toEntity());
    }

    async toggleComplete(taskId: string): Promise<Task[]> {
        const tasks = await this.getTasks();
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                task.isComplete ? task.markAsIncomplete() : task.markAsComplete();
            }
            return task;
        });

        await this.setTasks(updatedTasks)
        return updatedTasks
    }

    async createTask(task: Task): Promise<void> {
        const tasks = await this.getTasks();
        tasks.push(task);
        await this.setTasks(tasks)
    }
}
