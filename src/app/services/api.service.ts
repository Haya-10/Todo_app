import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http : HttpClient) { }
  postTodo(data : any){
    return this.http.post<any>("http://localhost:3000/todoList/",data);
    }
    getTodo(){
      return this.http.get<any>("http://localhost:3000/todoList/");
    }
    putTodo(data:any, id:number){
      return this.http.put<any>("http://localhost:3000/todoList/"+id,data );
    }
    deleteTodo(id:number){
      return this.http.delete<any>("http://localhost:3000/todoList/"+id);
    }
 
}
