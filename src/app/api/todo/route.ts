import { NextResponse } from "next/server";

import { TodoService } from "~/api/Application/TodoService";
import { PrismaTodoRepository } from "~/api/Infrastructure/PrismaTodoRepository";

const todoService = new TodoService(new PrismaTodoRepository());

export async function GET() {
	try {
		const todos = await todoService.getAllTodos();

		return NextResponse.json(todos, { status: 200 });
	} catch (error) {
		console.error("Error fetching todos:", error);
		return NextResponse.json(
			{ message: "Failed to fetch todos" },
			{ status: 500 },
		);
	}
}

export async function POST(req: Request) {
	try {
		const { title, content, dueDate } = await req.json();
		if (!title) {
			return NextResponse.json(
				{ message: "Title is required" },
				{ status: 400 },
			);
		}

		if (!dueDate) {
			return NextResponse.json(
				{ message: "Due date is required" },
				{ status: 400 },
			);
		}

		await todoService.createTodo({
			title: title,
			content: content || "",
			dueDate: new Date(dueDate),
		});
		return NextResponse.json({ message: "Todo created" }, { status: 201 });
	} catch (error) {
		console.error("Error creating todo:", error);
		return NextResponse.json(
			{ message: "Failed to create todo" },
			{ status: 500 },
		);
	}
}
