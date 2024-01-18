import { Injectable, inject } from '@angular/core';
import { Contact, ContactDetail, Label } from '../interface';
import { HttpClient } from '@angular/common/http';
import { CONTACT_URL, LABEL_URL } from '../../core/constants/apiEndpoints';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  labels: Label[] = [];
  totalContacts = 0;

  http = inject(HttpClient);

  private contactListLengthSource = new BehaviorSubject<number>(0);
  private searchTerm = new BehaviorSubject<string>('');

  contactListLength = this.contactListLengthSource.asObservable();

  updateContactListLength(length: number) {
    this.contactListLengthSource.next(length);
  }

  updateSearchTerm(term: string) {
    this.searchTerm.next(term);
  }

  getSearchTerm(): Observable<string> {
    return this.searchTerm.asObservable();
  }

  getContacts() {
    return this.http.get<{
      message: string;
      data: { contacts: Contact[] };
    }>(`${CONTACT_URL}/all`);
  }

  getContactById(contactId: string) {
    return this.http.get<{
      message: string;
      data: { contact: ContactDetail };
    }>(`${CONTACT_URL}/${contactId}/detail`);
  }

  getAllTrash() {
    return this.http.get<{ message: string; data: { contacts: Contact[] } }>(
      `${CONTACT_URL}/trash`
    );
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

  removeContact(contactId: string[]) {
    return this.http.delete<{ message: string }>(`${CONTACT_URL}/remove`, {
      body: contactId,
    });
  }

  updateContactById(
    contactId: string,
    data: ContactDetail
  ): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${CONTACT_URL}/${contactId}/update`,
      data
    );
  }

  recoverContact(contactId: string) {
    return this.http.put<{ message: string }>(
      `${CONTACT_URL}/${contactId}/recover`,
      {}
    );
  }

  clearTrash() {
    return this.http.delete<{ message: string }>(`${CONTACT_URL}/trash`);
  }
}
