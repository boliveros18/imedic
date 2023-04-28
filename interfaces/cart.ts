export interface CartProduct {
  _id: string;
  image: string;
  price: number;
  size?: Size;
  slug: string;
  title: string;
  gender: "men" | "women" | "kid" | "unisex";
  quantity: number;
}

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
