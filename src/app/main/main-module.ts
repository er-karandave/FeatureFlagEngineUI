import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing-module';
import { Dashboard } from './dashboard/dashboard';
import { UserListing } from './User/user-listing/user-listing';
import { AddEditUser } from './User/add-edit-user/add-edit-user';
import { ViewUser } from './User/view-user/view-user';
import { AddEditPermissions } from './Permissions/add-edit-permissions/add-edit-permissions';
import { AddEditFeatures } from './Features/add-edit-features/add-edit-features';
import { PermissionListing } from './Permissions/permission-listing/permission-listing';
import { ViewPermission } from './Permissions/view-permission/view-permission';
import { PermissionUser } from './Permissions/permission-user/permission-user';
import { UserPermission } from './User/user-permission/user-permission';
import { RoleListing } from './Roles/role-listing/role-listing';
import { AddEditRole } from './Roles/add-edit-role/add-edit-role';
import { RolePermission } from './Roles/role-permission/role-permission';
import { ViewRole } from './Roles/view-role/view-role';
import { PermissionRoles } from './Permissions/permission-roles/permission-roles';
import { SharedModule } from "../shared/shared-module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    Dashboard,
    UserListing,
    AddEditUser,
    ViewUser,
    AddEditPermissions,
    AddEditFeatures,
    PermissionListing,
    ViewPermission,
    PermissionUser,
    UserPermission,
    RoleListing,
    AddEditRole,
    RolePermission,
    ViewRole,
    PermissionRoles
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,FormsModule,ReactiveFormsModule
]
})
export class MainModule { }
