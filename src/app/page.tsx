"use client";

import { useEffect, useState } from "react";

import type { TodoDTO } from "~/api/Application/TodoDTO";
import { TodoDialog, TodoTab } from "~/components/todo";

export default function Home() {
	const [todos, setTodos] = useState<TodoDTO[]>([]);
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
				const isPastA = new Date(a.dueDate).getTime() < new Date().getTime();
				const isPastB = new Date(b.dueDate).getTime() < new Date().getTime();

				if (a.completed !== b.completed) {
					return a.completed ? 1 : -1;
				}

				if (isPastA !== isPastB) {
					return isPastA ? -1 : 1;
				}

				return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
			});
			setTodos(sortedTodos);
			setError("");
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

				<TodoTab fetchTodos={fetchTodos} setError={setError} todos={todos} />

				<TodoDialog error={error} fetchTodos={fetchTodos} setError={setError} />
			</div>
		</div>
	);
}
