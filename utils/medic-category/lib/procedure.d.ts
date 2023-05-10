import { IProcedure } from './interface';
export declare function getProceduresOfCategory(categoryName?: string): IProcedure[];
export declare function getCategoryByNameAndCategory(name: string, categoryName: string): IProcedure | undefined;
declare const _default: {
    getProceduresOfCategory: typeof getProceduresOfCategory;
    getCategoryByNameAndCategory: typeof getCategoryByNameAndCategory;
};
export default _default;
