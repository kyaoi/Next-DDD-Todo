import type { TodoCreateDomain } from "~/shared/TodoCreate";
import type { TodoReconstructDomain } from "~/shared/TodoReconstruct";

import type { TodoContent } from "./TodoContent";
import type { TodoTitle } from "./TodoTitle";

export class Todo {
	private constructor(
		private readonly id: string,
		private title: TodoTitle,
		private content: TodoContent,
		private dueDate: Date,
		private completed = false,
		private createdAt = new Date(),
		private updatedAt = new Date(),
	) {}

	static create({ id, title, content, dueDate }: TodoCreateDomain) {
		return new Todo(id, title, content, dueDate);
	}

	static reconstruct({
		id,
		title,
		content,
		dueDate,
		completed,
		createdAt,
		updatedAt,
	}: TodoReconstructDomain): Todo {
		return new Todo(
			id,
			title,
			content,
			dueDate,
			completed,
			createdAt,
			updatedAt,
		);
	}

	getId(): string {
		return this.id;
	}

	getTitle(): TodoTitle {
		return this.title;
	}

	getContent(): TodoContent {
		return this.content || "";
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

	getDueDate(): Date {
		return this.dueDate;
	}

	toggleCompletion(): void {
		this.completed = !this.completed;
	}

	changeTitle(newTitle: TodoTitle): void {
		this.title = newTitle;
	}

	changeContent(newContent: TodoContent): void {
		this.content = newContent;
	}

	changeDueDate(newDueDate: Date): void {
		this.dueDate = newDueDate;
	}
}
