export interface Column {
    id: "client_name" | "product_procedure" | "date" | "status";
    label: string;
    minWidth?: number;
    align?: "right" | "left" | "center";
    format?: (value: number) => string;
  }