export interface Procedure {
  _id: string;
  product_id: string;
  client_id: string;
  extra_cost: number;
  extra_cost_description: string;
  surgical_facility: boolean;
  facility_care: boolean;
  medical_care: boolean;
  anesthesia_fees: boolean;
  medical_tests: boolean;
  post_surgery_garments: boolean;
  prescription_medication: boolean;
  surgeon_fee: boolean;
  surgeon_insurance: boolean;
  date: number;
  createdAt: number;
  updatedAt: number;
}
