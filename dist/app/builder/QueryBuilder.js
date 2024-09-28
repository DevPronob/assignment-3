"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
class QueryBuilder {
    constructor(modelQuery, query) {
        this.query = query;
        this.modelQuery = modelQuery;
    }
    search(searchableFields) {
        const searchTerm = this.query.searchTerm;
        console.log(searchTerm, "searchTerm");
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' },
                })),
            });
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query); // Copy query object
        // console.log(queryObj)
        // Filtering out unwanted fields
        const excludeFields = ['searchTerm', 'sort'];
        excludeFields.forEach(el => delete queryObj[el]);
        // Handle price range filtering if defined
        const priceFilter = {};
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
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    sort() {
        var _a, _b, _c;
        const sort = ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sort) === null || _b === void 0 ? void 0 : _b.split(',')) === null || _c === void 0 ? void 0 : _c.join(' ')) || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    paginate() {
        var _a, _b;
        const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
}
exports.QueryBuilder = QueryBuilder;
