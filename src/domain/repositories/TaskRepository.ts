import Task from "../entities/Task";


export default interface TaskRepository {
  getTasks(): Promise<Task[]>;
  toggleComplete(taskId: string): Promise<Task[]>;
  removeTask(taskId: string): Promise<Task[]>;
  createTask(task: Task): Promise<void>;
  setTasks(tasks: Task[]): Promise<void>
}