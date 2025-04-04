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