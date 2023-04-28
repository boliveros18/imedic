import { Size, IUser } from "./";

export interface Order {
  _id?: string;
  user?: IUser | string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentResult?: string;
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  isPaid: boolean;
  paidAt?: string;
  transactionId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderItem {
  _id: string;
  title: string;
  size: Size;
  quantity: number;
  slug: string;
  image: string;
  price: number;
  gender: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
}
