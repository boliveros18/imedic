export interface Medic {
  _id: string;
  type: string;
  parent_id: string;
  certified: boolean;
  card_id: string;
  to_approve: boolean;
  contract_signature: string;
  available_days: string;
  curriculum: string;
  qualification: number;
  comments: number;
  instagram: string;
  country: string;
  state: string;
  province: string;
  createdAt: number;
  updatedAt: number;
}
