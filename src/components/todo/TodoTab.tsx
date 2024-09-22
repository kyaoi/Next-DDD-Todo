import type { TodoDTO } from "~/api/Application/TodoDTO";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "~/components/elements/tabs";

type TodoTabProps = {
	todos: TodoDTO[];
	fetchTodos: () => Promise<void>;
	setError: (error: string) => void;
};

export function TodoTab({ todos, fetchTodos, setError }: TodoTabProps) {
	const formatDate = (date: Date) => {
		return date.toLocaleDateString("ja-JP", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			timeZone: "Asia/Tokyo",
		});
	};
	const isPastDate = (date: Date) => {
		return date.getTime() < new Date().getTime();
	};

	const overdueTodos = todos.filter(
		(todo) => isPastDate(new Date(todo.dueDate)) && !todo.completed,
	);
	const completedTodos = todos.filter((todo) => todo.completed);
	const activeTodos = todos.filter(
		(todo) => !todo.completed && !isPastDate(new Date(todo.dueDate)),
	);
	const allTodos = todos;
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
		<Tabs defaultValue="all">
			<TabsList>
				<TabsTrigger value="all">すべて</TabsTrigger>
				<TabsTrigger value="active">未完了</TabsTrigger>
				<TabsTrigger value="overdue">期限切れ</TabsTrigger>
				<TabsTrigger value="completed">完了済み</TabsTrigger>
			</TabsList>

			<TabsContent value="all">
				<ul className="space-y-4">
					{allTodos.map((todo) => (
						<li
							className={`flex items-center justify-between p-4 rounded-lg shadow-sm ${
								todo.completed
									? "bg-green-100"
									: isPastDate(new Date(todo.dueDate))
										? "bg-red-100"
										: "bg-blue-100"
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
								<span className={`text-lg ${todo.completed && "line-through"}`}>
									{todo.title} - {formatDate(new Date(todo.dueDate))}
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
			</TabsContent>

			<TabsContent value="active">
				<ul className="space-y-4">
					{activeTodos.map((todo) => (
						<li
							className="flex items-center justify-between p-4 rounded-lg shadow-sm bg-blue-100"
							key={todo.id}
						>
							<div className="flex items-center">
								<input
									checked={todo.completed}
									className="mr-4 cursor-pointer "
									onChange={() => toggleCompletion(todo.id)}
									type="checkbox"
								/>
								<span className="text-lg">
									{todo.title} - {formatDate(new Date(todo.dueDate))}
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
			</TabsContent>

			<TabsContent value="overdue">
				<ul className="space-y-4">
					{overdueTodos.map((todo) => (
						<li
							className="flex items-center justify-between p-4 rounded-lg shadow-sm bg-red-100"
							key={todo.id}
						>
							<div className="flex items-center">
								<input
									checked={todo.completed}
									className="mr-4 cursor-pointer "
									onChange={() => toggleCompletion(todo.id)}
									type="checkbox"
								/>
								<span className="text-lg">
									{todo.title} - {formatDate(new Date(todo.dueDate))}
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
			</TabsContent>

			<TabsContent value="completed">
				<ul className="space-y-4">
					{completedTodos.map((todo) => (
						<li
							className="flex items-center justify-between p-4 rounded-lg shadow-sm bg-green-100"
							key={todo.id}
						>
							<div className="flex items-center">
								<input
									checked={todo.completed}
									className="mr-4 cursor-pointer "
									onChange={() => toggleCompletion(todo.id)}
									type="checkbox"
								/>
								<span className="text-lg line-through">
									{todo.title} - {formatDate(new Date(todo.dueDate))}
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
			</TabsContent>
		</Tabs>
	);
}
