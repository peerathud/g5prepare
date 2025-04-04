import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddUserRequest } from '../models/user.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl ='http://localhost:5238/api'
  constructor(private http:HttpClient) { }

  AddUser(user:AddUserRequest):Observable<any>{
    return this.http.post(`${this.apiUrl}/user`,user)
  }
}
