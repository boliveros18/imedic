export interface Procedure {
  _id: string;
  product_id: string;
  product_procedure: string;
  client_id: string;
  client_name: string;
  surgical_facility: boolean;
  facility_care: boolean;
  medical_care: boolean;
  anesthesia_fees: boolean;
  medical_tests: boolean;
  post_surgery_garments: boolean;
  prescription_medication: boolean;
  surgeon_fee: boolean;
  surgeon_insurance: boolean;
  additional_cost: boolean;
  status: string;
  date: {};
  createdAt: number;
  updatedAt: number;
}
