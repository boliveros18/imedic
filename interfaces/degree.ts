export interface Degree {
  _id?: string;
  parent_id: string;
  name: string;
  university: string;
  diploma: string;
  certificated: boolean;
  to_approve: boolean;
  createdAt: string;
  updatedAt: string;
}
