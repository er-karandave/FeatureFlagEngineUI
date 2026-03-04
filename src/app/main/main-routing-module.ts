import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { UserListing } from './User/user-listing/user-listing';
import { AddEditUser } from './User/add-edit-user/add-edit-user';
import { ViewUser } from './User/view-user/view-user';
import { PermissionListing } from './Permissions/permission-listing/permission-listing';
import { AddEditPermissions } from './Permissions/add-edit-permissions/add-edit-permissions';
import { PermissionUser } from './Permissions/permission-user/permission-user';
import { UserPermission } from './User/user-permission/user-permission';
import { RoleListing } from './Roles/role-listing/role-listing';
import { AddEditRole } from './Roles/add-edit-role/add-edit-role';
import { ViewRole } from './Roles/view-role/view-role';
import { PermissionRoles } from './Permissions/permission-roles/permission-roles';
import { authGuard } from '../Guards/auth-guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate:[authGuard]

  },
  {
    path: 'user-list',
    component: UserListing,
    canActivate:[authGuard]
  },
  {
    path: 'add-user',
    component: AddEditUser,
    canActivate:[authGuard]
  },
  {
    path: 'edit-user/:id',
    component: AddEditUser,
    canActivate:[authGuard]
  },
  {
    path: 'view-user/:id',
    component: ViewUser,
    canActivate:[authGuard]
  },
  {
    path: 'permission-list',
    component: PermissionListing
  },
  {
    path:'add-permission',
    component:AddEditPermissions
  },
  {
    path:'edit-permission/:id',
    component:AddEditPermissions
  },
  {
    path:'permission-user',
    component:PermissionUser
  },
  {
    path:'user-permission/:id',
    component:UserPermission
  },
  {
    path:'role-list',
    component:RoleListing
  },
  {
    path:'add-role',
    component:AddEditRole
  },
  {
    path:'edit-role/:id',
    component:AddEditRole
  },
  {
    path:'permission-role/:id',
    component:PermissionRoles
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
