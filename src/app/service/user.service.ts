import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  SERVER_URL: string = "http://localhost:8080/api/";
  constructor(private httpClient: HttpClient) { }

  public getUsers(){ 
       return this.httpClient.get(this.SERVER_URL + 'users');
  }

  public getUser(Id){
       return this.httpClient.get(`${this.SERVER_URL + 'users'}/${Id}`); 
  }
  public createUser(user: {id: number, amount: number, clientId: number, userId: number, description: string}){
      return this.httpClient.post(`${this.SERVER_URL + 'users'}`, user)
  }

  public deleteUser(Id){
      return this.httpClient.delete(`${this.SERVER_URL + 'users'}/${Id}`);
  }
  public updateUser(user: {id: number, amount: number, clientId: number, userId: number, description: string}){
      return this.httpClient.put(`${this.SERVER_URL + 'users'}/${user.id}`, user)
  }

}