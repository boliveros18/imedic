export interface Product {
  _id: string;
  type: string;
  medic_id: string;
  clinic_id: string;
  category: string;
  procedure: string;
  recovery_days: number;
  procedure_hours: number;
  surgical_facility: number;
  facility_care: number;
  medical_care: number;
  anesthesia_fees: number;
  medical_tests: number;
  post_surgery_garments: number;
  prescription_medication: number;
  surgeon_fee: number;
  surgeon_insurance: number;
  additional_cost: number;
  additional_cost_description: string;
  currency: string;
  qualification: number;
  comments: number;
  likes: number;
  createdAt: number;
  updatedAr: number;
}
