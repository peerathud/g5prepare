
  import { CommonModule } from '@angular/common';
  import { Inject } from '@angular/core';
  import { Component, OnInit } from '@angular/core';
  import {MatDialogModule,MAT_DIALOG_DATA} from '@angular/material/dialog';
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
  selector: 'app-edit-user',
  imports: [FormsModule,ReactiveFormsModule,MatDialogModule,MatFormFieldModule,MatInputModule,CommonModule,MatSelectModule,MatTableModule,MatCheckboxModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent  implements OnInit {
  userForm: FormGroup;
  permissionsData:any;
  constructor( public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId:string },
    private fb: FormBuilder,
    private userService: UserService){
      this.userForm = this.fb.group({
        id: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        roleId: ['', Validators.required],
        username: ['', Validators.required],
        password: ['',],
        confirmPassword: ['',]
      });
    }
    displayedColumns:string[]=['module','Read','Write','Delete']
  ngOnInit(): void {
      if(this.data&&this.data.userId){
        this.userService.getUserById2(this.data.userId).subscribe(response=>{
          console.log(response.data)
          this.userForm.patchValue({
            id: response.data.id,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            phone: response.data.phone,
            roleId: response.data.role.roleId,
            username: response.data.username
          });;
          
this.permissionsData = [
  { 
    module: 'Super Admin', 
    isReadable: response.data.role.roleId === 'superadmin' ? response.data.permissions[0].isReadable : false,
    isWritable: response.data.role.roleId === 'superadmin' ? response.data.permissions[0].isWritable : false,
    isDeletable: response.data.role.roleId === 'superadmin' ? response.data.permissions[0].isDeletable : false,
    permissionsId: 'superadminP' 
  },
  { 
    module: 'Admin', 
    isReadable: response.data.role.roleId === 'admin' ? response.data.permissions[0].isReadable : false,
    isWritable: response.data.role.roleId === 'admin' ? response.data.permissions[0].isWritable : false,
    isDeletable: response.data.role.roleId === 'admin' ? response.data.permissions[0].isDeletable : false,
    permissionsId: 'adminP' 
  },
  { 
    module: 'Employee', 
    isReadable: response.data.role.roleId === 'employee' ? response.data.permissions[0].isReadable : false,
    isWritable: response.data.role.roleId === 'employee' ? response.data.permissions[0].isWritable : false,
    isDeletable: response.data.role.roleId === 'employee' ? response.data.permissions[0].isDeletable : false,
    permissionsId: 'employeeP' 
  },
  { 
    module: 'Lorem Ipsum', 
    isReadable: response.data.role.roleId === 'loremipsum' ? response.data.permissions[0].isReadable : false,
    isWritable: response.data.role.roleId === 'loremipsum' ? response.data.permissions[0].isWritable : false,
    isDeletable: response.data.role.roleId === 'loremipsum' ? response.data.permissions[0].isDeletable : false,
    permissionsId: 'loremipsumP' 
  }
];

          
          console.log("permssions check",response.data.permissions.isReadable)
        },error=>{
          console.log("can not found data",error)
        })
        
      }
  }
  onEditUser(){
    const password = this.userForm.get('password')?.value;
      const checkConfirmPassword = this.userForm.get('confirmPassword')?.value;
  
      if (password !== checkConfirmPassword) {
        console.log("Passwords do not match");
        this.userForm.get('confirmPassword')?.setErrors({ mismatch: true });
        return;
      }
      
      const {confirmPassword, id,...formValues}=this.userForm.value;
      
      const roleId =formValues.roleId
      let permissions: { permissionId: string; isReadable: boolean; isWritable: boolean; isDeletable: boolean; }[]=[];
      this.permissionsData.forEach((permission:any)=>{
        const permissionsId =permission.module.trim().toLowerCase().replace(' ', '')
        if(permissionsId ==roleId){
          permissions.push({
            permissionId:permission.permissionsId,
            isReadable:permission.isReadable,
            isWritable:permission.isWritable,
            isDeletable:permission.isDeletable
          });
         
        }
      });
      const updateData={
        ...formValues,
        permission:permissions
      };
      console.log("updateData: ",updateData)
      this.userService.updateUserById(updateData,id).subscribe(response=>{
        console.log(response)
         Swal.fire({
                  title: 'Success!',
                  text: 'User updated successfully!',
                  icon: 'success',
                  confirmButtonText: 'OK'
                });
                this.dialogRef.close();
               
      },error=>{
              console.log('Error update user',error)
              Swal.fire({
                title: 'Error!',
                text: 'There was an issue updating the user.',
                icon: 'error',
                confirmButtonText: 'OK'
              }).then(()=>{
                window.location.reload();
              })
            });
           
  }
  onCancel(){
    this.dialogRef.close();
  }
}
