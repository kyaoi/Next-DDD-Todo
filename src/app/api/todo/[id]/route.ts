import { NextResponse } from "next/server";

import { TodoService } from "~/api/Application/TodoService";
import { PrismaTodoRepository } from "~/api/Infrastructure/PrismaTodoRepository";

const todoService = new TodoService(new PrismaTodoRepository());

export async function PUT(_: Request, { params }: { params: { id: string } }) {
	try {
		await todoService.toggleTodoCompletion(params.id);
		return NextResponse.json(
			{ message: "Todo completion toggled" },
			{ status: 200 },
		);
	} catch (error) {
		console.error("Error toggling todo:", error);
		return NextResponse.json(
			{ message: "Failed to toggle todo completion" },
			{ status: 500 },
		);
	}
}

export async function DELETE(
	_: Request,
	{ params }: { params: { id: string } },
) {
	try {
		await todoService.deleteTodoById(params.id);
		return new NextResponse(null, { status: 204 });
	} catch (error) {
		console.error("Error deleting todo:", error);
		return NextResponse.json(
			{ message: "Failed to delete todo" },
			{ status: 500 },
		);
	}
}
