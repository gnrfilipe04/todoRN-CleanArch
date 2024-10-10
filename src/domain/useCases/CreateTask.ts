import TaskRepository from '../repositories/TaskRepository';
import Task from '../entities/Task';

export default class CreateTask {
  constructor(private taskRepository: TaskRepository) {}

  async execute(task: Task): Promise<void> {
    if(task.description == '') throw Error('Tarefa sem descrição')
    await this.taskRepository.createTask(task);
  }
}