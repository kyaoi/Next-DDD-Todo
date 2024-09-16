import type { TodoTitle } from "./TodoTitle";

export class Todo {
	private constructor(
		private readonly id: string,
		private title: TodoTitle,
		private completed = false,
		private createdAt = new Date(),
		private updatedAt = new Date(),
	) {}

	static create(id: string, title: TodoTitle): Todo {
		return new Todo(id, title);
	}

	static reconstruct(
		id: string,
		title: TodoTitle,
		completed: boolean,
		createdAt: Date,
		updatedAt: Date,
	): Todo {
		return new Todo(id, title, completed, createdAt, updatedAt);
	}

	getId(): string {
		return this.id;
	}

	getTitle(): TodoTitle {
		return this.title;
	}

	getCompleted(): boolean {
		return this.completed;
	}

	getCreatedAt(): Date {
		return this.createdAt;
	}

	getUpdatedAt(): Date {
		return this.updatedAt;
	}

	toggleCompletion(): void {
		this.completed = !this.completed;
	}

	changeTitle(newTitle: TodoTitle): void {
		this.title = newTitle;
	}
}
