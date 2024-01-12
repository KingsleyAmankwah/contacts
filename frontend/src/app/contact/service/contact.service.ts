import { Injectable, inject } from '@angular/core';
import { Contact, ContactDetail, Label } from '../interface';
import { HttpClient } from '@angular/common/http';
import { CONTACT_URL, LABEL_URL } from '../../core/constants/apiEndpoints';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  labels: Label[] = [];
  totalContacts = 0;

  http = inject(HttpClient);

  getContacts() {
    let params: any = {};
    return this.http.get<{
      message: string;
      data: { contacts: Contact[] };
    }>(`${CONTACT_URL}/all`, { params });
  }

  getContactById(contactId: string) {
    return this.http.get<{
      message: string;
      data: { contact: ContactDetail };
    }>(`${CONTACT_URL}/${contactId}/detail`);
  }

  getContactCount(): Observable<number> {
    return this.http
      .get<{ message: string; data: { count: number } }>(`${CONTACT_URL}/count`)
      .pipe(map((response) => response.data.count));
  }

  createContact(data: ContactDetail) {
    return this.http.post<{
      message: string;
      data: { contact: ContactDetail };
    }>(`${CONTACT_URL}/create`, data);
  }

  createLabel(data: Label) {
    return this.http.post<{ message: string; data: { label: Label } }>(
      `${LABEL_URL}/create`,
      data
    );
  }

  // getAllLabels() {
  //   this.http
  //     .get<{ message: string; data: { labels: Label[] } }>(`${LABEL_URL}/all`)
  //     .subscribe(({ data: { labels } }) => {
  //       this.labels = labels;
  //     });
  // }

  // getLabels(): Observable<{ message: string; data: { labels: Label[] } }> {
  //   return this.http.get<{ message: string; data: { labels: Label[] } }>(
  //     `${LABEL_URL}/all`
  //   );
  // }

  removeContact(contactId: string[]) {
    return this.http.delete<{ message: string }>(`${CONTACT_URL}/remove`, {
      body: contactId,
    });
  }

  // updateContactById(contactId: string, data: ContactDetail) {
  //   return this.http.put(`${CONTACT_URL}/${contactId}/update`, data);
  // }

  updateContactById(
    contactId: string,
    data: ContactDetail
  ): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${CONTACT_URL}/${contactId}/update`,
      data
    );
  }
}
