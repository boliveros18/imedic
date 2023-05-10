import procedureList from './assets/procedure.json';
import { findProcedureByNameAndCategoryName, compare } from './utils';

export function getProceduresOfCategory(categoryName = '') {
    if (!categoryName)
        return [];

    const procedures = procedureList.filter((value) => {
        return value.categoryName === categoryName;
    });
    return procedures.sort(compare);
}

export function getCategoryByNameAndCategory(name, categoryName) {
    if (!name)
        return undefined;
    if (!categoryName)
        return undefined;
    return findProcedureByNameAndCategoryName(procedureList, name, categoryName);
}

const exportProcedures = {
    getProceduresOfCategory,
    getCategoryByNameAndCategory,
}

export default exportProcedures;
