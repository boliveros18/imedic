import { Clinic, Degree, Product, Quote, Column } from "../interfaces";

export const clinic = {
  medic_id: "",
  finantial: "",
  technology: "",
  phone: "",
  name: "",
  address: "",
  instagram: "",
  country: "Select country",
  state: "Select state",
  city: "Select city",
  category: "Category"
} as Clinic;

export const certification = {
  name: "",
  description: "",
  logo_link: "",
}

export const degree = {
  name: "",
  university: "",
} as Degree;

export const product = {
  category: "Category",
  procedure: "Procedure",
  recovery_days: 0,
  procedure_hours: 0,
  surgical_facility: 0,
  facility_care: 0,
  medical_care: 0,
  anesthesia_fees: 0,
  medical_tests: 0,
  post_surgery_garments: 0,
  prescription_medication: 0,
  surgeon_fee: 0,
  surgeon_insurance: 0,
  additional_cost: 0,
  additional_cost_description: "",
  currency: "US",
} as Product;

export const quote = {
  price: 0,
  quantity: 0,
  unit: "cc",
  currency: "US",
} as Quote;

export const units = ["lb", "oz", "in", "sq.in", "ft", "cc", "unit"];

export const columns: readonly Column[] = [
  { id: "client_name", label: "Patient", minWidth: 70, align: "left" },
  { id: "product_procedure", label: "Procedure", minWidth: 60, align: "left" },
  {
    id: "date",
    label: "Date",
    minWidth: 70,
    align: "center",
    format: (value: number) => new Date(value).toLocaleDateString("en-GB"),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 70,
    align: "center",
  },
];