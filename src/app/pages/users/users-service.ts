import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async, BehaviorSubject, map } from 'rxjs';
import { userData } from './users.data';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private getUsersData=new BehaviorSubject< userData[] |  null>(null);
  userData$=this.getUsersData.asObservable();
  constructor(private httpClient:HttpClient)
  {
      
  }

  getUsers()
  {
    return this.httpClient.get<userData[]>('https://jsonplaceholder.typicode.com/users').subscribe(data=>{
      return this.getUsersData.next(data);
    
    })
  }

}
