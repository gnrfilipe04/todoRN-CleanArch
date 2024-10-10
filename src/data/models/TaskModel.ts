import Task from '../../domain/entities/Task';

export default class TaskModel {
  constructor(
    public readonly id: string,
    public readonly description: string,
    public readonly isComplete: boolean
  ) {}

  static fromJson(json: any): TaskModel {
    return new TaskModel(json.id, json.description, json.isComplete);
  }

  toEntity(): Task {
    const task = new Task(this.id, this.description, this.isComplete);
    return task;
  }

  static fromEntity(entity: Task): TaskModel {
    return new TaskModel(entity.id, entity.description, entity.isComplete);
  }
}
