import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private urls = {
    v1: `${environment.urls.api.v1}/item`
  }
  
  constructor(private http: HttpClient) { }

  getList(filter?: string): Observable<any> {
    return this.http.get<any>(filter == null ? `${this.urls.v1}` : `${this.urls.v1}?filter=${filter}`).pipe(map(resp => resp));
  }

  get(itemCode: string): Observable<any> {
    return this.http.get<any>(`${this.urls.v1}/${itemCode}`).pipe(map(resp => resp));
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.urls.v1}`, data).pipe(map(resp => resp));
  }

  update(data: any): Observable<any> {
    return this.http.put<any>(`${this.urls.v1}`, data).pipe(map(resp => resp));
  }

  remove(itemCode: string): Observable<any> {
    return this.http.delete<any>(`${this.urls.v1}/${itemCode}`).pipe(map(resp => resp));
  }
}
