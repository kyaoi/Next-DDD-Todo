import { Todo } from "~/todo/models/Todo";
import { TodoTitle } from "~/todo/models/TodoTitle";
import type { TodoRepository } from "~/todo/repositories/TodoRepository";
import { v4 as uuidv4 } from "uuid";

export class TodoService {
	constructor(private readonly todoRepository: TodoRepository) {}

	async createTodo(title: string): Promise<void> {
		const todoTitle = TodoTitle.create(title);
		const todo = Todo.create(uuidv4(), todoTitle);
		await this.todoRepository.save(todo);
	}

	async getTodoById(id: string): Promise<Todo | null> {
		return await this.todoRepository.findById(id);
	}

	async getAllTodos(): Promise<Todo[]> {
		return await this.todoRepository.findAll();
	}

	async changeTodoTitle(id: string, newTitle: string): Promise<void> {
		const todo = await this.todoRepository.findById(id);
		if (!todo) {
			throw new Error("Todo not found");
		}

		const newTodoTitle = TodoTitle.create(newTitle);
		todo.changeTitle(newTodoTitle);
		await this.todoRepository.update(todo);
	}

	async toggleTodoCompletion(id: string): Promise<void> {
		const todo = await this.todoRepository.findById(id);
		if (!todo) {
			throw new Error("Todo not found");
		}

		todo.toggleCompletion();
		await this.todoRepository.update(todo);
	}

	async deleteTodoById(id: string): Promise<void> {
		await this.todoRepository.delete(id);
	}
}
