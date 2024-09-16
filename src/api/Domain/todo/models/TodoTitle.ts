export class TodoTitle {
	private _value: string;

	static MAX_LENGTH = 30;
	static MIN_LENGTH = 1;

	private constructor(value: string) {
		this.validate(value);
		this._value = value;
	}

	static create(value: string): TodoTitle {
		return new TodoTitle(value);
	}

	private validate(value: string): void {
		if (value.length < TodoTitle.MIN_LENGTH) {
			throw new Error(
				`Title must be at least ${TodoTitle.MIN_LENGTH} characters long`,
			);
		}
		if (value.length > TodoTitle.MAX_LENGTH) {
			throw new Error(`Title cannot exceed ${TodoTitle.MAX_LENGTH} characters`);
		}
	}

	get value(): string {
		return this._value;
	}

	equals(other: TodoTitle): boolean {
		return this._value === other.value;
	}
}
