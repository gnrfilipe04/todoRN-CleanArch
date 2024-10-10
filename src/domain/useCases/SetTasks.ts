import TaskRepository from '../repositories/TaskRepository';
import Task from '../entities/Task';

export default class SetTasks {
  constructor(private taskRepository: TaskRepository) {}

  async execute(tasks: Task[]): Promise<void> {
    if(!tasks.length) return
    return await this.taskRepository.setTasks(tasks);
  }
}