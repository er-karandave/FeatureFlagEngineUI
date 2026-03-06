export class UserLogin{
    UserName?:string;
    Password?:string;
}

export class LoginDetails {
  password?: string;
  email?: string;
}

export interface User {
  idUser: number;
  UserName: string;
  Email: string;
  FullName?: string;
  Phone?: string;
  isActive: boolean;
  CreatedOn: Date;
  CreatedBy?: number;
  updatedOn?: Date;
  updatedBy?: number;
}
export interface Permission {
  idPermission: number;
  PermissionName: string;
  PermissionCode: string; 
  Description?: string;
  isActive: boolean;
}

export interface UserPermission {
  idUserPermission: number;
  UserId: number;
  PermissionId: number;
  AssignedBy: number;
  AssignedOn: Date;
  isActive: boolean;
  PermissionCode?: string; 
}

export interface RolePermission {
  idRolePermission: number;
  RoleId: number;
  PermissionId: number;
  CreatedOn: Date;
  isActive: boolean;
  PermissionCode?: string; 
}

export interface CurrentUser {
  idUser: number;
  UserName: string;
  Email: string;
  RoleId?: number;
  RoleName?: string;
  Permissions: string[]; 
  token?: string;
  FullName?: string;
}