export interface Label {
  _id: string;
  name: string;
}

export interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  company: string;
  isFavourite: boolean;
  colorCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactDetail {
  _id: string;
  firstName: string;
  lastName: string;
  nickName: string;
  company: string;
  jobTitle: string;
  department: string;
  email: string;
  phone: string;
  country: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  city: string;
  pincode: string;
  birthday: string;
  website: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  isFavourite: boolean;
  colorCode: string;
  labels: Label[];
}
