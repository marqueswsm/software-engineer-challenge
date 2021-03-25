declare type PaginateParams = {
    entity: string;
    values: Array<Object>;
    page: string;
};
export declare function paginate(params: PaginateParams): {
    [x: string]: number | Object[];
    totalRegisters: number;
    limit: number;
};
export {};
