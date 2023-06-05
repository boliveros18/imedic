import { Clinic, Degree, Product, Quote } from "../interfaces";

export const clinic = {
    finantial: "",
    technology: "",
    phone: "",
    name: "",
    address: "",
    instagram: "",
    country: "Select country",
    state: "Select state",
    province: "Select city",
  } as Clinic;

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