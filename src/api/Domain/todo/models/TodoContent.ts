export class TodoContent {
	private _value: string | null;

	static MAX_LENGTH = 1000;

	private constructor(value: string) {
		this.validate(value);
		this._value = value;
	}

	static create(value: string): TodoContent {
		return new TodoContent(value);
	}

	private validate(value: string): void {
		if (value.length > TodoContent.MAX_LENGTH) {
			throw new Error(
				`Content cannot exceed ${TodoContent.MAX_LENGTH} characters`,
			);
		}
	}

	get value(): string {
		return this._value || "";
	}

	equals(other: TodoContent): boolean {
		return this._value === other.value;
	}
}
