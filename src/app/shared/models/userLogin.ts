export class UserLogin{
    UserName?:string;
    Password?:string;
}


export class LoginDetails {
  password?: string;
  email?: string;
}


// models/user.model.ts
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

// models/permission.model.ts
export interface Permission {
  idPermission: number;
  PermissionName: string;
  PermissionCode: string;  // e.g., 'USER_EDIT', 'USER_DELETE'
  Description?: string;
  isActive: boolean;
}

// models/user-permission.model.ts
export interface UserPermission {
  idUserPermission: number;
  UserId: number;
  PermissionId: number;
  AssignedBy: number;
  AssignedOn: Date;
  isActive: boolean;
  PermissionCode?: string;  // Denormalized for easy lookup
}

// models/role-permission.model.ts
export interface RolePermission {
  idRolePermission: number;
  RoleId: number;
  PermissionId: number;
  CreatedOn: Date;
  isActive: boolean;
  PermissionCode?: string;  // Denormalized for easy lookup
}

// models/current-user.model.ts (stored in localStorage)
export interface CurrentUser {
  idUser: number;
  UserName: string;
  Email: string;
  RoleId?: number;
  RoleName?: string;
  Permissions: string[];  // Array of PermissionCodes the user has access to
  token?: string;
  FullName?: string;
}