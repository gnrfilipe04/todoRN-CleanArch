import TaskRepository from '../repositories/TaskRepository';
import Task from '../entities/Task';

export default class GetTasks {
  constructor(private taskRepository: TaskRepository) {}

  async execute(): Promise<Task[]> {
    return await this.taskRepository.getTasks();
  }
}