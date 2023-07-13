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
  clinic_id: "",
  name: "",
  description: "",
  logo_link: "",
}

export const degree = {
  name: "",
  university: "",
  level: "Level degree",
  file_id: ""
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

export const product_validation = {
  clinic_id: "",
  category: "Category",
  procedure: "Procedure",
  recovery_days: 0,
  procedure_hours: 0,
} as Product;

export const quote = {
  product_id: "",
  price: 0,
  quantity: 0,
  unit: "Select unit",
  currency: "",
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

export const clinic_img = [
  "https://clinicajaca.com/wp-content/uploads/2020/08/clinicajaca-22-scaled.jpg",
  "https://img.freepik.com/free-photo/worplace-modern-hospital_1098-18204.jpg?w=740&t=st=1688507309~exp=1688507909~hmac=a9022abb2f34eadee5a74ace94cd19548bc63991b16a6e07a334e50b3e248985",
  "https://clinicajaca.com/wp-content/uploads/2020/08/clinicajaca-15-scaled.jpg",
  "https://clinicajaca.com/wp-content/uploads/2020/08/clinicajaca-07-scaled.jpg", 
  "https://lh5.googleusercontent.com/p/AF1QipMZUJbE8nwyY0t89ayj3CBYCOqvl6hBO1ilgzau",
  "https://lh5.googleusercontent.com/p/AF1QipMLrmW_4Pg8D7YAji-4BqtowshXrnpy9Ia-Piv3",
  "https://dr-levy-dan.chirurgiens-dentistes.fr/wp-content/uploads/Salle-de-soins-dentaires.png",
  "https://img.freepik.com/fotos-premium/interior-blanco-nueva-oficina-clinica-moderna-sillas-azules-procedimientos-belleza_157754-905.jpg?w=740",
  "https://images.unsplash.com/photo-1524222928538-afb4409a0d70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
]

export const category_img = {
  "Audiology": "https://joearchitect.com/wp-content/uploads/2018/02/2018.2BNB-Dr.Schlicher-PleasantonWEB41.jpg",
  "Bariatric": "https://infraestructuramedica.mx/wp-content/uploads/2020/07/1212.png",
  "Colon & Rectal": "https://infraestructuramedica.mx/wp-content/uploads/2021/06/quirofano-construccion-de-quirofanos-infraestructura-especializada-en-mexico-1536x1152.jpg.webp",
  "Cardiovascular": "https://images.pexels.com/photos/4047073/pexels-photo-4047073.jpeg",
  "Dermatology": "https://i.pinimg.com/originals/7f/b3/6b/7fb36bef986c8b2c0b6f3ded1fef06b3.jpg",
  "Endocrine": "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "Gastroenterology & Hepatology": "https://images.pexels.com/photos/4031416/pexels-photo-4031416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "Hematology": "https://infraestructuramedica.mx/wp-content/uploads/2021/01/cam03_Laboratorios-scaled.jpg.webp",
  "Oncology": "https://oss.gooood.cn/uploads/2022/06/004-shanghai-guang-ci-memorial-hospital-by-shuishi-960x1287.jpg",
  "Ophthalmology": "https://images.pexels.com/photos/5752264/pexels-photo-5752264.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  "Oral & Maxillofacial": "https://i.pinimg.com/originals/b7/b6/4b/b7b64b33dae7ee95a1d76f00f92ba466.jpg",
  "Orthopedic": "https://www.apexdesignbuild.net/wp-content/uploads/2022/06/imageedit_14_2885281878.jpg",
  "Plastic": "https://cdn.homedsgn.com/wp-content/uploads/2011/04/Surgery-Clinic-02.jpg",
  "Radiology": "https://infraestructuramedica.mx/wp-content/uploads/2020/07/4-1.png",
  "Rheumatology": "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/1c419112789545.5626d25197c5d.jpg",
  "Urology": "https://images.pexels.com/photos/6627667/pexels-photo-6627667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "Fertility": "https://ourbodiesourselves.org/wp-content/uploads/nataliya-vaitkevich-5982466-4.jpg",
  "Neurology": "https://hasenstabinc.com/wp-content/uploads/2018/03/CC-Medina-OR-1-Full.jpg",
  "Obstetrics & Gynecology": "https://images.pexels.com/photos/7108389/pexels-photo-7108389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "Consultation": "https://img.freepik.com/free-photo/worplace-modern-hospital_1098-18204.jpg?w=740&t=st=1688507309~exp=1688507909~hmac=a9022abb2f34eadee5a74ace94cd19548bc63991b16a6e07a334e50b3e248985"
}

