export interface Procedure {
  _id: string;
  product_id: string;
  client_id: string;
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
  accepted: boolean;
  date: {};
  createdAt: number;
  updatedAt: number;
}
