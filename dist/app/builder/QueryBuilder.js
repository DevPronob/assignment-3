"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
class QueryBuilder {
    constructor(modelQuery, query) {
        this.query = query;
        this.modelQuery = modelQuery;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        if (queryObj.carId) {
            queryObj.car = queryObj.carId;
            delete queryObj.carId;
        }
        console.log(queryObj);
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
}
exports.QueryBuilder = QueryBuilder;
