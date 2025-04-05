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
import { AddUserPermissionRequest } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

  @Component({
    selector: 'app-add-user-modal',
    imports: [FormsModule,ReactiveFormsModule,MatDialogModule,MatFormFieldModule,MatInputModule,CommonModule,MatSelectModule,MatTableModule,MatCheckboxModule],
    templateUrl: './add-user-modal.component.html',
    styleUrl: './add-user-modal.component.css'
  })
  export class AddUserModalComponent implements OnInit {
    
    constructor(public dialogRef:MatDialogRef<AddUserModalComponent>,private fb:FormBuilder,private userService:UserService){
      this.userForm=this.fb.group({
        id:['',Validators.required],
        firstName:['',[Validators.required,Validators.minLength(3)]],
        lastName:['',[Validators.required,Validators.minLength(3)]],
        email:['',Validators.required],
        phone:[''],
        roleId:['',Validators.required],
        username:['',Validators.required],
        password:['',Validators.required],
        confirmPassword:['',Validators.required],
      });
    
    }
    ngOnInit() {
  
    }

   
    userForm:FormGroup;
    permissionsData = [
      { module: 'Super Admin', isReadable: true, isWritable: true, isDeletable: true,permissionsId:'superadminP' },
      { module: 'Admin', isReadable: true, isWritable: false, isDeletable: false ,permissionsId:'adminP'},
      { module: 'Employee', isReadable: true, isWritable: false, isDeletable: false,permissionsId:'employeeP' },
      { module: 'Lorem Ipsum', isReadable: true, isWritable: true, isDeletable: true,permissionsId:'loremipsumP' }
    ];
    displayedColumns:string[]=['module','Read','Write','Delete']

    onCancel(){
      this.dialogRef.close();
    }
    onAddUser(){
      console.log("user save");
      
      const password = this.userForm.get('password')?.value;
      const checkConfirmPassword = this.userForm.get('confirmPassword')?.value;
  
      if (password !== checkConfirmPassword) {
        console.log("Passwords do not match");
        this.userForm.get('confirmPassword')?.setErrors({ mismatch: true });
        return;
      }
      if(this.userForm.invalid){
        console.log("invlid form")
        return 
      }
      const {confirmPassword, ...formValues}=this.userForm.value;
      
      const roleId =formValues.roleId
      let permissions: { permissionsId: string; isReadable: boolean; isWritable: boolean; isDeletable: boolean; }[]=[];
      this.permissionsData.forEach((permission)=>{
        const permissionsId =permission.module.trim().toLowerCase().replace(' ', '')
        if(permissionsId ==roleId){
          permissions.push({
            permissionsId:permission.permissionsId,
            isReadable:permission.isReadable,
            isWritable:permission.isWritable,
            isDeletable:permission.isDeletable
          });
         
        }
      });
      const signUpData={
        ...formValues,
        permissions:permissions
      };
      console.log(signUpData)
      this.userService.AddUser(signUpData).subscribe(response=>{
        console.log(response)
        Swal.fire({
          title: 'Success!',
          text: 'User added successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(()=>{
          window.location.reload();
        })
        this.dialogRef.close();
      },error=>{
        console.log('Error add user',error)
        Swal.fire({
          title: 'Error!',
          text: 'There was an issue adding the user.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
      
    }
  }
