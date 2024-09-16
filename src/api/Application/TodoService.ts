import { v4 as uuidv4 } from "uuid";

import type { TodoCreateDTO } from "~/shared/TodoCreate";
import { Todo } from "~/todo/models/Todo";
import { TodoTitle } from "~/todo/models/TodoTitle";
import type { TodoRepository } from "~/todo/repositories/TodoRepository";

import { TodoContent } from "../Domain/todo/models/TodoContent";

import { toDomain } from "./TodoMapper";

import type { TodoDTO } from "./TodoDTO";

export class TodoService {
	constructor(private readonly todoRepository: TodoRepository) {}

	async createTodo({ title, content, dueDate }: TodoCreateDTO): Promise<void> {
		const todoTitle = TodoTitle.create(title);
		const todoContent = TodoContent.create(content);
		const todo = Todo.create({
			id: uuidv4(),
			title: todoTitle,
			content: todoContent,
			dueDate,
		});
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

	async changeTodoContent(id: string, newContent: string): Promise<void> {
		const todo = await this.findTodoOrThrow(id);
		todo.changeContent(TodoContent.create(newContent));
		await this.todoRepository.update(todo);
	}

	async changeTodoDueDate(id: string, newDueDate: Date): Promise<void> {
		const todo = await this.findTodoOrThrow(id);
		todo.changeDueDate(newDueDate);
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
