import { FilterQuery, Query } from "mongoose";

export class QueryBuilder<T> {
    public query: Record<string, unknown>; //payload
    public modelQuery: Query<T[], T>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.query = query;
        this.modelQuery = modelQuery;
    }

    search(searchableFields: string[]) {
        const searchTerm = this.query.searchTerm
        console.log(searchTerm, "searchTerm")
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map(
                    (field) =>
                        ({
                            [field]: { $regex: searchTerm, $options: 'i' },
                        }) as FilterQuery<T>,
                ),
            });
        }

        return this;
    }

    filter() {
        const queryObj = { ...this.query }; // Copy query object
        // console.log(queryObj)

        // Filtering out unwanted fields
        const excludeFields = ['searchTerm', 'sort'];
        excludeFields.forEach(el => delete queryObj[el]);

        // Handle price range filtering if defined
        const priceFilter: Record<string, unknown> = {};
        if (queryObj.minPrice !== undefined) {
            priceFilter.$gte = queryObj.minPrice;
            delete queryObj.minPrice;
        }
        if (queryObj.maxPrice !== undefined) {
            priceFilter.$lte = queryObj.maxPrice;
            delete queryObj.maxPrice;
        }

        if (Object.keys(priceFilter).length > 0) {
            queryObj.pricePerHour = priceFilter;
        }

        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
        return this;
    }

    sort() {
        const sort =
            (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort as string);

        return this;
    }
    paginate() {
        const page = Number(this?.query?.page) || 1;
        const limit = Number(this?.query?.limit) || 10;
        const skip = (page - 1) * limit;

        this.modelQuery = this.modelQuery.skip(skip).limit(limit);

        return this;
    }


}