import type { TodoContent } from "../Domain/todo/models/TodoContent";
import type { TodoTitle } from "../Domain/todo/models/TodoTitle";

export type TodoReconstructDTO = {
	id: string;
	title: string;
	content: string;
	dueDate: Date;
	completed: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export type TodoReconstructDomain = {
	id: string;
	title: TodoTitle;
	content: TodoContent;
	dueDate: Date;
	completed: boolean;
	createdAt: Date;
	updatedAt: Date;
};
