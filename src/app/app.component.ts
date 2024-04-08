import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDialog,MAT_DIALOG_DATA,MatDialogTitle, MatDialogContent,} from '@angular/material/dialog';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { ApiService } from './services/api.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatFormFieldModule,
    TodoFormComponent,
    MatSelectModule, MatLabel, MatFormField,
    MatTableModule,
    MatInputModule
    

    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'todo-app';
  displayedColumns: string[] = ['Id','Todo', 'Status', 'Date', 'Operation'];
  dataSource!: MatTableDataSource<any>;
  row : any;
  constructor(private dialog : MatDialog , private api : ApiService ,){

  }
  ngOnInit(): void {
    this.getAllTodos();
  }
   // Open dialog for adding new todo
  openDialog() {
    this.dialog.open(TodoFormComponent, {
      width : "40%", 
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllTodos();
      }
    })
  }
  // Fetch all todos from the API
    getAllTodos(){
   this.api.getTodo()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        
      },
      error:(err)=>{
        alert("error")
      }
    })
   }
   // Open dialog for editing a todo
   editTodo(row : any){
    this.dialog.open(TodoFormComponent,{
      width:"30%",
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllTodos();
      }
    })
   }
  // Delete a todo by its ID
   deleteTodo(id:number){
    this.api.deleteTodo(id)
    .subscribe({
      next:(res)=>{
        alert("Todo deleted succesfully")
        this.getAllTodos();
      },
      error:()=>{
        alert("error while deleting the todo")
      }
    })
   }
  
   }
    
    




