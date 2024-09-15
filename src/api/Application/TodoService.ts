import { v4 as uuidv4 } from "uuid";

import { Todo } from "~/todo/models/Todo";
import { TodoTitle } from "~/todo/models/TodoTitle";
import type { TodoRepository } from "~/todo/repositories/TodoRepository";

import { toDomain } from "./TodoMapper";

import type { TodoDTO } from "./TodoDTO";

export class TodoService {
	constructor(private readonly todoRepository: TodoRepository) {}

	async createTodo(title: string): Promise<void> {
		const todoTitle = TodoTitle.create(title);
		const todo = Todo.create(uuidv4(), todoTitle);
		await this.todoRepository.save(todo);
	}

	async getTodoById(id: string): Promise<TodoDTO | null> {
		return this.todoRepository.findById(id);
	}

	async getAllTodos(): Promise<TodoDTO[]> {
		return this.todoRepository.findAll();
	}

	async changeTodoTitle(id: string, newTitle: string): Promise<void> {
		const todo = await this.findTodoOrThrow(id);
		todo.changeTitle(TodoTitle.create(newTitle));
		await this.todoRepository.update(todo);
	}

	async toggleTodoCompletion(id: string): Promise<void> {
		const todo = await this.findTodoOrThrow(id);
		todo.toggleCompletion();
		await this.todoRepository.update(todo);
	}

	async deleteTodoById(id: string): Promise<void> {
		await this.todoRepository.delete(id);
	}

	private async findTodoOrThrow(id: string): Promise<Todo> {
		const todoDTO = await this.todoRepository.findById(id);
		if (!todoDTO) {
			throw new Error("Todo not found");
		}
		return toDomain(todoDTO);
	}
}
