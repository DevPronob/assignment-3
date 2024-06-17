import { FilterQuery, Query } from "mongoose";

export class QueryBuilder<T> {
    public query: Record<string, unknown>; //payload
    public modelQuery: Query<T[], T>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.query = query;
        this.modelQuery = modelQuery;
    }

    filter(): this {
        const queryObj = { ...this.query };
        if (queryObj.carId) {
            queryObj.car = queryObj.carId
            delete queryObj.carId
        }
        console.log(queryObj)

        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

        return this;
    }


}