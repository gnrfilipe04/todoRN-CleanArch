import Task from '../entities/Task';
import TaskRepository from '../repositories/TaskRepository';

export default class RemoveTask {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskId: string): Promise<Task[]> {
    return await this.taskRepository.removeTask(taskId);
  }
}