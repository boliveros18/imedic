import categoryList from './assets/category.json';

function getAllCategories() {
    return categoryList;
}

const exporteCategories = {
    getAllCategories,
}

export default exporteCategories;
