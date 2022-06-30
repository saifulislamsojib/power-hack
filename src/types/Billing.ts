export interface BillingInfo {
  fullName: string;
  email: string;
  phone: string;
  paidAmount: string;
}

export interface Billing extends BillingInfo {
  _id: string;
}

export interface addBillingResponse {
  errors?: {};
  message?: string;
  billing?: Billing;
}
