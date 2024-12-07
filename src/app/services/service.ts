import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  withCredentials: true
};
@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  constructor(private http: HttpClient) { }
  Get<T>(url: string) {
    return this.http.get<T>(url, httpOptions);
  }
  Post<T>(url: string, body: any, headers: {key:string, value: string}[]) {
    let headersValue = new HttpHeaders;
    headers.forEach((i)=>{
      headersValue = headersValue.append(i.key, i.value);
    });
    return this.http.post<T>(url, body, {headers:headersValue});
  }
  Patch<T>(url: string, body?: any) {
    return this.http.patch<T>(url, body, { withCredentials: true });
  }
  Delete<T>(url: string) {
    return this.http.delete<T>(url, { withCredentials: true });
  }
}
