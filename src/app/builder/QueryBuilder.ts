import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
	public modelQuery: Query<T[], T>;
	public query: Record<string, unknown>;

	constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
		this.modelQuery = modelQuery;
		this.query = query;
	}

	// Search Operation
	search(searchableFields: string[]) {
		const searchTerm = this?.query?.searchTerm;

		if (searchTerm) {
			this.modelQuery = this.modelQuery.find({
				$or: searchableFields.map(
					(field) =>
						({
							[field]: {
								$regex: searchTerm,
								$options: 'i',
							},
						} as FilterQuery<T>)
				),
			});
		}

		return this;
	}

	// Filter Operation
	filter() {
		const queryObj = { ...this.query };

		const executableFields: string[] = [
			'searchTerm',
			'limit',
			'page',
			'sortBy',
			'sortOrder',
			'sort',
			'fields',
		];

		executableFields.forEach((field) => {
			delete queryObj[field];
		});

		this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

		return this;
	}

	// Sort Query
	sort() {
		const sort =
			(this?.query?.sort as string)?.split(',').join(' ') || '-createdAt';

		this.modelQuery = this.modelQuery.sort(sort as string);

		return this;
	}

	// Pagination Query
	paginate() {
		const page = Number(this?.query?.page) || 1;
		const limit = Number(this?.query?.limit) || 10;

		const skip = (page - 1) * limit;

		this.modelQuery = this.modelQuery.skip(skip).limit(limit);

		return this;
	}

	// Select Fields
	selectFields() {
		const fields = (this?.query?.fields as string)?.split(',').join(' ');
		this.modelQuery = this.modelQuery.select(fields);

		return this;
	}
}

export default QueryBuilder;
