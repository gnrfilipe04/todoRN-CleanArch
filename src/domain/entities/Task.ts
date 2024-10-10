export default class Task {
    constructor(
        public readonly id: string,
        private _description: string,
        private _isComplete: boolean = false
    ){}

    get description(): string {
        return this._description;
    }

    get isComplete(): boolean {
        return this._isComplete;
    }

    markAsComplete() {
        this._isComplete = true;
    }

    markAsIncomplete() {
        this._isComplete = false;
    }

    static create(description: string): Task {
        return new Task(new Date().getTime().toString(), description);
    }
}