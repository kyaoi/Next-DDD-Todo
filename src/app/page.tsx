"use client";
import { useEffect, useState } from "react";

import type { TodoDTO } from "~/api/Application/TodoDTO";

export default function Home() {
	const [todos, setTodos] = useState<TodoDTO[]>([]);
	const [newTodo, setNewTodo] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = async () => {
		try {
			const response = await fetch("/api/todo");
			if (!response.ok) {
				throw new Error("Failed to fetch todos");
			}
			const data: TodoDTO[] = await response.json();
			const sortedTodos = data.sort((a, b) => {
				if (a.completed !== b.completed) {
					return a.completed ? 1 : -1;
				}
				return (
					new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
				);
			});
			setTodos(sortedTodos);
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unknown error occurred");
			}
		}
	};

	const createTodo = async () => {
		try {
			const response = await fetch("/api/todo", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title: newTodo }),
			});
			if (!response.ok) {
				throw new Error("Failed to create todo");
			}
			setNewTodo("");
			fetchTodos();
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unknown error occurred");
			}
		}
	};

	const toggleCompletion = async (id: string) => {
		try {
			const response = await fetch(`/api/todo/${id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
			});
			if (!response.ok) {
				throw new Error("Failed to toggle todo completion");
			}
			fetchTodos();
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unknown error occurred");
			}
		}
	};

	const deleteTodo = async (id: string) => {
		try {
			const response = await fetch(`/api/todo/${id}`, {
				method: "DELETE",
			});
			if (!response.ok) {
				throw new Error("Failed to delete todo");
			}
			fetchTodos();
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError("An unknown error occurred");
			}
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
				<h1 className="text-2xl font-bold text-center mb-6">Todo App</h1>

				{error && <p className="text-red-500 mb-4">{error}</p>}

				<ul className="space-y-4">
					{todos.map((todo) => (
						<li
							className={`flex items-center justify-between p-4 rounded-lg shadow-sm ${
								todo.completed ? "bg-green-100" : "bg-red-100"
							}`}
							key={todo.id}
						>
							<div className="flex items-center">
								<input
									checked={todo.completed}
									className="mr-4 cursor-pointer "
									onChange={() => toggleCompletion(todo.id)}
									type="checkbox"
								/>
								<span
									className={`text-lg ${todo.completed ? "line-through" : ""}`}
								>
									{todo.title}
								</span>
							</div>
							<div className="flex">
								<button
									className="text-red-500 hover:text-red-700 ml-4"
									onClick={() => deleteTodo(todo.id)}
									type="button"
								>
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>

				<div className="mt-6 flex">
					<input
						className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
						onChange={(e) => setNewTodo(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								createTodo();
							}
						}}
						placeholder="New Todo"
						type="text"
						value={newTodo}
					/>
					<button
						className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
						onClick={createTodo}
						type="button"
					>
						Add
					</button>
				</div>
			</div>
		</div>
	);
}
