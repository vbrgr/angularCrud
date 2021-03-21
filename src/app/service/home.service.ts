import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api'
@Injectable({
  providedIn: 'root'
})
export class HomeService implements InMemoryDbService{

  constructor() { }
    createDb(){

      let  users =  [{ "id":1,"firstname":"John","lastname":"Mike" },
      { "id":2,"firstname":"Grifiths","lastname":"Mike" },
      { "id":3 ,"firstname":"Mike","lastname":"Robert" }
      ];
   
      return {users};
   
     }
  
}
