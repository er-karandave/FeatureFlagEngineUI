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
import { featureActiveResolver } from '../shared/resolvers/feature-active-resolver';
import { permissionGuard } from '../Guards/permission-guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate:[authGuard]

  },
  {
    path: 'user-list',
    component: UserListing,
    canActivate:[authGuard,permissionGuard],
    resolve: {
      featureCheck: featureActiveResolver
    },
    data: {
      featureId: 1,
      permission: 'USER_LIST'
    }
  },
  {
    path: 'add-user',
    component: AddEditUser,
    canActivate:[authGuard, permissionGuard],
    resolve: {
      featureCheck: featureActiveResolver
    },
    data: {
      featureId: 5,
      permission: 'USER_CREATE'
    }
  },
  {
    path: 'edit-user/:id',
    component: AddEditUser,
    canActivate:[authGuard, permissionGuard],
    resolve: {
      featureCheck: featureActiveResolver
    },
    data: {
      featureId: 6,
      permission: 'USER_EDIT'
    }
  },
  {
    path: 'view-user/:id',
    component: ViewUser,
    canActivate:[authGuard, permissionGuard],
    resolve: {
      featureCheck: featureActiveResolver
    },
    data: {
      featureId: 7,
      permission: 'USER_VIEW'
    }
  },
  {
    path: 'permission-list',
    component: PermissionListing,
    canActivate:[authGuard, permissionGuard],
    resolve: {
      featureCheck: featureActiveResolver
    },
    data: {
      featureId: 8,
      permission: 'PERMISSION_LIST'
    }
  },
  {
    path:'add-permission',
    component:AddEditPermissions,
    canActivate:[authGuard, permissionGuard],
    resolve: {
      featureCheck: featureActiveResolver
    },
    data: {
      featureId: 9,
      permission: 'PERMISSION_CREATE'
    }
  },
  {
    path:'edit-permission/:id',
    component:AddEditPermissions,
    canActivate:[authGuard, permissionGuard],
    resolve: {
      featureCheck: featureActiveResolver
    },
    data: {
      featureId: 10,
      permission: 'PERMISSION_EDIT'
    }
  },
  {
    path:'permission-user',
    component:PermissionUser,
    canActivate:[authGuard, permissionGuard],
    resolve: {
      featureCheck: featureActiveResolver
    },
    data: {
      featureId: 11,
      permission: 'PERMISSION_USER'
    }
  },
  {
    path:'user-permission/:id',
    component:UserPermission,
    canActivate:[authGuard, permissionGuard],
    resolve: {
      featureCheck: featureActiveResolver
    },
    data: {
      featureId: 12,
      permission: 'USER_PERMISSION'
    }
  },
  {
    path:'role-list',
    component:RoleListing,
    canActivate:[authGuard, permissionGuard],
    resolve: {
      featureCheck: featureActiveResolver
    },
    data: {
      featureId: 13,
      permission: 'ROLE_LIST'
    }
  },
  {
    path:'add-role',
    component:AddEditRole,
    canActivate:[authGuard, permissionGuard],
    resolve: {
      featureCheck: featureActiveResolver
    },
    data: {
      featureId: 14,
      permission: 'ROLE_CREATE'
    }
  },
  {
    path:'edit-role/:id',
    component:AddEditRole,
    canActivate:[authGuard, permissionGuard],
    resolve: {
      featureCheck: featureActiveResolver
    },
    data: {
      featureId: 15,
      permission: 'ROLE_EDIT'
    }
  },
  {
    path:'permission-role/:id',
    component:PermissionRoles,
    canActivate:[authGuard, permissionGuard],
    resolve: {
      featureCheck: featureActiveResolver
    },
    data: {
      featureId: 16,
      permission: 'PERMISSION_ROLE'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
