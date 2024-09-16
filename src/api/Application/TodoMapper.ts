import { Todo } from "~/todo/models/Todo";

import { TodoTitle } from "../Domain/todo/models/TodoTitle";

import type { TodoDTO } from "./TodoDTO";

export function toDTO(todo: Todo): TodoDTO {
	return {
		id: todo.getId(),
		title: todo.getTitle().value,
		completed: todo.getCompleted(),
		createdAt: todo.getCreatedAt(),
		updatedAt: todo.getUpdatedAt(),
	};
}

export function toDomain(dto: TodoDTO): Todo {
	return Todo.reconstruct(
		dto.id,
		TodoTitle.create(dto.title),
		dto.completed,
		dto.createdAt,
		dto.updatedAt,
	);
}
