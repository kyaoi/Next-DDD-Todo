import { Todo } from "~/todo/models/Todo";

import { TodoContent } from "../Domain/todo/models/TodoContent";
import { TodoTitle } from "../Domain/todo/models/TodoTitle";

import type { TodoDTO } from "./TodoDTO";

export function toDTO(todo: Todo): TodoDTO {
	return {
		id: todo.getId(),
		title: todo.getTitle().value,
		content: todo.getContent().value,
		completed: todo.getCompleted(),
		createdAt: todo.getCreatedAt(),
		updatedAt: todo.getUpdatedAt(),
		dueDate: todo.getDueDate(),
	};
}

export function toDomain(dto: TodoDTO): Todo {
	return Todo.reconstruct({
		id: dto.id,
		title: TodoTitle.create(dto.title),
		content: TodoContent.create(dto.content || ""),
		completed: dto.completed,
		createdAt: dto.createdAt,
		updatedAt: dto.updatedAt,
		dueDate: dto.dueDate,
	});
}
