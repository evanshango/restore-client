export interface IMetadata {
    currentPage: number
    totalPages: number
    pageSize: number
    totalCount: number
}

export class PaginatedResponse<T> {
    items: T
    metaData: IMetadata

    constructor(items: T, metaData: IMetadata) {
        this.items = items
        this.metaData = metaData
    }
}
