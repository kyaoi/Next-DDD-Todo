import { useState } from "react";

import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from "~/components/elements/dialog";

type TodoDialogProps = {
	error: string;
	setError: (error: string) => void;
	fetchTodos: () => Promise<void>;
};

export function TodoDialog({ error, setError, fetchTodos }: TodoDialogProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [newTodo, setNewTodo] = useState({
		title: "",
		content: "",
		dueDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7)
			.toISOString()
			.split("T")[0],
	});

	const createTodo = async () => {
		setError("");
		try {
			if (!newTodo.title || !newTodo.dueDate) {
				setError("Title and Due Date are required");
				return;
			}

			const response = await fetch("/api/todo", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newTodo),
			});

			if (!response.ok) {
				throw new Error("Failed to create todo");
			}

			setIsDialogOpen(false);

			setNewTodo({
				title: "",
				content: "",
				dueDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7)
					.toISOString()
					.split("T")[0],
			});
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
		<Dialog onOpenChange={setIsDialogOpen} open={isDialogOpen}>
			<DialogTrigger className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
				Add Todo
			</DialogTrigger>
			<DialogContent>
				<h2 className="text-xl font-bold mb-4">Add New Todo</h2>
				{error && <p className="text-red-500 mb-4">{error}</p>}
				<input
					className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
					onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
					placeholder="Title"
					required
					type="text"
					value={newTodo.title}
				/>
				<textarea
					className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
					onChange={(e) => setNewTodo({ ...newTodo, content: e.target.value })}
					placeholder="Content"
					value={newTodo.content}
				/>
				<input
					className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
					min={new Date().toISOString().split("T")[0]}
					onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
					placeholder="Due Date"
					required
					type="date"
					value={newTodo.dueDate}
				/>
				<button
					className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
					onClick={createTodo}
					type="button"
				>
					Create
				</button>
			</DialogContent>
		</Dialog>
	);
}
