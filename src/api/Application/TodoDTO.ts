export interface TodoDTO {
	id: string;
	title: string;
	content: string;
	completed: boolean;
	createdAt: Date;
	updatedAt: Date;
	dueDate: Date;
}
