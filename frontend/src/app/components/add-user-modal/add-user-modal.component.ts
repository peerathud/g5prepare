  import { CommonModule } from '@angular/common';
  import { Component, OnInit } from '@angular/core';
  import {MatDialogModule} from '@angular/material/dialog';
  import {MatDialogRef} from '@angular/material/dialog';
  import { MatFormFieldModule } from '@angular/material/form-field'; 
  import { MatInputModule } from '@angular/material/input'
  import { MatSelectModule } from '@angular/material/select'
  import { MatCheckboxModule } from '@angular/material/checkbox';
  import { FormBuilder, FormGroup, ReactiveFormsModule, Validators,FormsModule } from '@angular/forms';

  import {MatTableModule} from '@angular/material/table';
  @Component({
    selector: 'app-add-user-modal',
    imports: [FormsModule,ReactiveFormsModule,MatDialogModule,MatFormFieldModule,MatInputModule,CommonModule,MatSelectModule,MatTableModule,MatCheckboxModule],
    templateUrl: './add-user-modal.component.html',
    styleUrl: './add-user-modal.component.css'
  })
  export class AddUserModalComponent implements OnInit {
    
    constructor(public dialogRef:MatDialogRef<AddUserModalComponent>,private fb:FormBuilder){
      this.userForm=this.fb.group({
        userId:['',Validators.required],
        firstName:['',[Validators.required,Validators.minLength(3)]],
        lastName:['',[Validators.required,Validators.minLength(3)]],
        email:['',Validators.required],
        phone:[''],
        roleId:['',Validators.required],
        username:['',Validators.required],
        password:['',Validators.required],
        confirmPassword:['',Validators.required]
      });
    
    }
    ngOnInit() {
  
    }

   
    userForm:FormGroup;
    permissionsData = [
      { module: 'Super Admin', isReadable: true, isWritable: true, isDeletable: true },
      { module: 'Admin', isReadable: true, isWritable: false, isDeletable: false },
      { module: 'Employee', isReadable: true, isWritable: false, isDeletable: false },
      { module: 'Lorem Ipsum', isReadable: true, isWritable: true, isDeletable: true }
    ];
    displayedColumns:string[]=['module','Read','Write','Delete']

    onCancel(){
      this.dialogRef.close();
    }
    onAddUser(){
      console.log("user save");
      
      const password = this.userForm.get('password')?.value;
      const confirmPassword = this.userForm.get('confirmPassword')?.value;
  
      if (password !== confirmPassword) {
        console.log("Passwords do not match");
        this.userForm.get('confirmPassword')?.setErrors({ mismatch: true });
        return;
      }
      if(this.userForm.invalid){
        console.log("invlid form")
        return 
      }
      this.dialogRef.close();
    }
  }
