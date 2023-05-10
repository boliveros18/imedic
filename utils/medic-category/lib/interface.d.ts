export interface ICategory {
  name: string;
  getAllCategories?(): ICategory[];
}

export interface IProcedure {
  name: string;
  getProceduresOfCategory?(): IProcedure[];
  getProcedureByNameAndCategory?(): IProcedure;
}
