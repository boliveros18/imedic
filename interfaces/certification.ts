export interface Certification {
  _id?: string;
  parent_id: string;
  name: string;
  approved: boolean;
  certificate: string;
  description: string;
  to_approve: boolean;
  logo: string;
}
