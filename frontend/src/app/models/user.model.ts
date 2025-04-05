export interface AddUserRequest{
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    phone:string;
    roleId:string;
    username:string;
    password:string;
    permissions:AddUserPermissionRequest[];
}
export interface AddUserPermissionRequest{
    permissionsId:string;
    isReadable:boolean;
    isWritable:boolean;
    isDeletable:boolean;
}

//----GetAllUserInterface
export interface GetAllUserRequest{
    orderBy?:string;
    orderDirection?:string;
    pageNumber?:number;
    search?:string;
    pageSize?:number;
}
export interface GetAllUserResponse{
    dataSource:GetAllUserDataSource[];
    page:number;
    pageSize:number;
    totalCount:number;
}
export interface GetAllUserDataSource{
    userId:string;
    firstName:string;
    LastName:string;
    email:string;
    role:GetAllUserRoleResponse[];
    username:string;
    permission:PermissionsResponse[];
    createdDate:string;
    
}
export interface GetAllUserRoleResponse{
    roleId:string;
    rolseName:string;
}
export interface PermissionsResponse{
    permissionId:string;
    permissionName:string;
}
//------------updateUser
export interface Permission {
    permissionId: string;
    isReadable: boolean;
    isWritable: boolean;
    isDeletable: boolean;
  }
  
  export interface UpdateUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    roleId: string;
    username: string;
    password: string;
    permission: Permission[]; // เนื่องจาก permission เป็นอาร์เรย์
  }
  