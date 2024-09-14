import type { TodoTitle } from "./TodoTitle";

export class Todo {
	private constructor(
		private readonly id: string,
		private title: TodoTitle,
		private completed = false,
	) {}

	static create(id: string, title: TodoTitle): Todo {
		return new Todo(id, title);
	}

	static reconstruct(id: string, title: TodoTitle, completed: boolean): Todo {
		return new Todo(id, title, completed);
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

	toggleCompletion(): void {
		this.completed = !this.completed;
	}

	changeTitle(newTitle: TodoTitle): void {
		this.title = newTitle;
	}
}
