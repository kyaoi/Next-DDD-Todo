import type { Todo } from "~/todo/models/Todo";
import type { TodoRepository } from "~/todo/repositories/TodoRepository";

import { toDTO, toDomain } from "../Application/TodoMapper";

import { prisma } from "./PrismaClient";

import type { TodoDTO } from "../Application/TodoDTO";

export class PrismaTodoRepository implements TodoRepository {
	async save(todo: Todo): Promise<void> {
		await prisma.todo.upsert({
			where: { id: todo.getId() },
			create: {
				id: todo.getId(),
				title: todo.getTitle().value,
				content: todo.getContent().value,
				completed: todo.getCompleted(),
				createdAt: new Date(),
				updatedAt: new Date(),
				dueDate: todo.getDueDate(),
			},
			update: {
				title: todo.getTitle().value,
				content: todo.getContent().value,
				completed: todo.getCompleted(),
				updatedAt: new Date(),
				dueDate: todo.getDueDate(),
			},
		});
	}

	async findById(id: string): Promise<TodoDTO | null> {
		const todoData = await prisma.todo.findUnique({
			where: { id },
		});

		if (!todoData) {
			return null;
		}

		const todo = toDomain({
			id: todoData.id,
			title: todoData.title,
			content: todoData.content,
			completed: todoData.completed,
			createdAt: todoData.createdAt,
			updatedAt: todoData.updatedAt,
			dueDate: todoData.dueDate,
		});

		return toDTO(todo);
	}

	async findAll(): Promise<TodoDTO[]> {
		const todoDatas = await prisma.todo.findMany();

		return todoDatas.map((todoData) => {
			const todo = toDomain({
				id: todoData.id,
				title: todoData.title,
				content: todoData.content,
				completed: todoData.completed,
				createdAt: todoData.createdAt,
				updatedAt: todoData.updatedAt,
				dueDate: todoData.dueDate,
			});
			return toDTO(todo);
		});
	}

	async update(todo: Todo): Promise<void> {
		await prisma.todo.update({
			where: { id: todo.getId() },
			data: {
				title: todo.getTitle().value,
				content: todo.getContent().value,
				completed: todo.getCompleted(),
				updatedAt: new Date(),
				dueDate: todo.getDueDate(),
			},
		});
	}

	async delete(id: string): Promise<void> {
		await prisma.todo.delete({
			where: { id },
		});
	}
}
