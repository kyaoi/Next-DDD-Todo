import { Todo } from "~/todo/models/Todo";
import { TodoTitle } from "~/todo/models/TodoTitle";
import type { TodoRepository } from "~/todo/repositories/TodoRepository";
import { prisma } from "./PrismaClient";

export class PrismaTodoRepository implements TodoRepository {
	async save(todo: Todo): Promise<void> {
		await prisma.todo.upsert({
			where: { id: todo.getId() },
			create: {
				id: todo.getId(),
				title: todo.getTitle().value,
				completed: todo.getCompleted(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			update: {
				title: todo.getTitle().value,
				completed: todo.getCompleted(),
				updatedAt: new Date(),
			},
		});
	}

	async findById(id: string): Promise<Todo | null> {
		const todoData = await prisma.todo.findUnique({
			where: { id },
		});

		if (!todoData) return null;

		return Todo.reconstruct(
			todoData.id,
			TodoTitle.create(todoData.title),
			todoData.completed,
		);
	}

	async findAll(): Promise<Todo[]> {
		const todosData = await prisma.todo.findMany();

		return todosData.map((todoData) =>
			Todo.reconstruct(
				todoData.id,
				TodoTitle.create(todoData.title),
				todoData.completed,
			),
		);
	}

	async update(todo: Todo): Promise<void> {
		await prisma.todo.update({
			where: { id: todo.getId() },
			data: {
				title: todo.getTitle().value,
				completed: todo.getCompleted(),
				updatedAt: new Date(),
			},
		});
	}

	async delete(id: string): Promise<void> {
		await prisma.todo.delete({
			where: { id },
		});
	}
}
