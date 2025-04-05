import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddUserRequest, GetAllUserRequest, GetAllUserResponse, UpdateUserRequest } from '../models/user.model';
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

  getAllUsers(Data:GetAllUserRequest):Observable<GetAllUserResponse>{
    return this.http.post<GetAllUserResponse>(`${this.apiUrl}/users/DataTable`,Data)
  }
  getUserById2(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users2/${userId}`);
  }
  updateUserById(updateData:UpdateUserRequest,id:string):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/users/${id}`,updateData)
  }
  deleteUser(id:string):Observable<any>{
    console.log("deleteUserSErvice",id)
    return this.http.delete(`${this.apiUrl}/users/${id}`)
  }
}
