export class Todo {
	private constructor(
		private readonly id: string,
		private title: string,
		private completed = false,
	) {}

	static create(id: string, title: string): Todo {
		return new Todo(id, title);
	}

	static reconstruct(id: string, title: string, completed: boolean): Todo {
		return new Todo(id, title, completed);
	}
	getTitle(): string {
		return this.title;
	}

	getCompleted(): boolean {
		return this.completed;
	}

	toggleCompletion(): void {
		this.completed = !this.completed;
	}

	changeTitle(newTitle: string): void {
		if (newTitle.length === 0) {
			throw new Error("Title cannot be empty");
		}
		if (newTitle.length > 100) {
			throw new Error("Title cannot exceed 100 characters");
		}
		this.title = newTitle;
	}
}
