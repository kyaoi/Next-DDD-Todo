import type { TodoDTO } from "~/api/Application/TodoDTO";

import type { Todo } from "../models/Todo";

export interface TodoRepository {
	save(todo: Todo): Promise<void>;
	findById(id: string): Promise<TodoDTO | null>;
	findAll(): Promise<TodoDTO[]>;
	update(todo: Todo): Promise<void>;
	delete(id: string): Promise<void>;
}
