export const findEntryByName = (source, name) => {
    if (name && source != null) {
        const namex = source.findIndex((c) => {
            return c.name === name;
        });
        return namex !== -1 ? source[namex] : undefined;
    }
    return undefined;
};
export const findProcedureByNameAndCategoryName = (source, name, categoryName) => {
    if (name && categoryName && source != null) {
        const namex = source.findIndex((c) => {
            return c.name === name && c.categoryName === categoryName;
        });
        return namex !== -1 ? source[namex] : undefined;
    }
    return undefined;
};
export const compare = (a, b) => {
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
};
