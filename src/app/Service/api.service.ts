import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private host1 = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  async Login(username: string, password: string): Promise<any> {
    const body = { username: username, password: password };
    return await firstValueFrom(
      this.http.post<any>(`${this.host1}/login/`, body)
    );
  }
}
