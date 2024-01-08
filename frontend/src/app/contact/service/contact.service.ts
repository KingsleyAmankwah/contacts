import { Injectable, inject } from '@angular/core';
import { Contact, ContactDetail } from '../interface';
import { HttpClient } from '@angular/common/http';
import { CONTACT_URL } from '../../core/constants/apiEndpoints';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  http = inject(HttpClient);


  getContacts() {
    let params: any = {};
    // if (search) {
    //   params.search = search;
    // }

    // if (labelId) {
    //   params.labelId = labelId;
    // }
    return this.http.get<{
      message: string;
      data: { contacts: Contact[]; count: number };
    }>(`${CONTACT_URL}/all`, { params });
  }

  getContactById(contactId: string) {
    return this.http.get<{
      message: string;
      data: { contact: ContactDetail };
    }>(`${CONTACT_URL}/${contactId}/detail`);
  }

  createContact(data: Partial<ContactDetail>) {
    return this.http.post<{
      message: string;
      data: { contact: Partial<ContactDetail> };
    }>(`${CONTACT_URL}/create`, data);
  }
}
