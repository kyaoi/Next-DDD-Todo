import type { TodoContent } from "../Domain/todo/models/TodoContent";
import type { TodoTitle } from "../Domain/todo/models/TodoTitle";

export type TodoCreateDTO = {
	title: string;
	content: string;
	dueDate: Date;
};

export type TodoCreateDomain = {
	id: string;
	title: TodoTitle;
	content: TodoContent;
	dueDate: Date;
};
