export interface ICategory {
  name: string;
  photo: string;
  getAllCategories?(): ICategory[];
}

export interface IProcedure {
  name: string;
  getProceduresOfCategory?(): IProcedure[];
  getProcedureByNameAndCategory?(): IProcedure;
}
