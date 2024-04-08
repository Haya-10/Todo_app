import { Component, Inject, OnInit } from '@angular/core';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule , } from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {FormGroup , FormBuilder, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms'
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [MatFormField, MatFormFieldModule,  MatLabel, MatInputModule,ReactiveFormsModule,FormsModule, MatDatepickerModule , MatButtonModule] ,
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css'
})
export class TodoFormComponent implements OnInit {
   todoForm !: FormGroup;
   actionBtn : string = "Add"
   constructor(private formBuilder : FormBuilder , private api : ApiService , private dialogref : MatDialogRef<TodoFormComponent> , @Inject(MAT_DIALOG_DATA) public editData : any){
   }
   
   ngOnInit(): void {
    // Initialize todoForm with form controls and validators
     this.todoForm = this.formBuilder.group({
      Id: [this.generateUniqueId(), Validators.required],
      Todo : ['',Validators.required],
      Status : ['',Validators.required],
      Date: ['',Validators.required],
     });

      // Set values of form controls based on editData
     if(this.editData){
      this.actionBtn = 'update';
      this.todoForm.controls['Id'].setValue(this.editData.Id);
      this.todoForm.controls['Todo'].setValue(this.editData.Todo);
      this.todoForm.controls['Status'].setValue(this.editData.Status);
      this.todoForm.controls['Date'].setValue(this.editData.Date);
     
     }
   
  }
   
  // Method to add or update todo based on editData availability
   addTodo(){
    if(!this.editData){
      if(this.todoForm.valid){
        this.api.postTodo(this.todoForm.value)
        .subscribe({
          next:(res)=>{
          alert("Todo added succesfully");
          this.todoForm.reset();
          this.dialogref.close('save');
          },
          error:()=>{
            alert("error while added todo")
          }
        })
       }
    }else{
      this.updateTodo()
    }
   }

   // Method to update the existing todo
   updateTodo(){
     this.api.putTodo(this.todoForm.value,this.editData.id)
     .subscribe({
       next:(res)=>{
        alert('Todo updated succesfully');
        this.todoForm.reset();
        this.dialogref.close('update');
       },
       error:()=>{
        alert("error while fetching todo")
       }
     })
   }
   //method to generate random id
   generateUniqueId(): number {
    return Math.floor(Math.random() * 1000000); 
  }
}

