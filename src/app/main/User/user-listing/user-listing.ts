import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/models/userLogin';
import { PermissionService } from '../../../shared/services/Permission/permission-service';
import { ToastService } from '../../../shared/services/Toast/toast-service';


declare var bootstrap: any;
@Component({
  selector: 'app-user-listing',
  standalone: false,
  templateUrl: './user-listing.html',
  styleUrl: './user-listing.css',
})
export class UserListing {
  users: User[] = [];
  loading = false;

  readonly PERMISSIONS = {
    USER_VIEW: 'USER_VIEW',
    USER_EDIT: 'USER_EDIT',
    USER_DELETE: 'USER_DELETE',
    USER_CREATE: 'USER_CREATE'
  } as const;
  private router = inject(Router);
  private permissionService = inject(PermissionService);
  private toastService = inject(ToastService);

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const resposne = data;

      if (resposne['featureCheck']) {
        console.log('✅ Feature is active, loading component...');
      }
    });
  }

  loadUsers(): void {
    this.loading = true;

    setTimeout(() => {
      this.users = [
        { idUser: 1, UserName: 'admin', Email: 'admin@company.com', FullName: 'Admin User', isActive: true, CreatedOn: new Date() },
        { idUser: 2, UserName: 'john.doe', Email: 'john@company.com', FullName: 'John Doe', isActive: true, CreatedOn: new Date() },
        { idUser: 3, UserName: 'jane.smith', Email: 'jane@company.com', FullName: 'Jane Smith', isActive: false, CreatedOn: new Date() }
      ];
      this.loading = false;
    }, 500);
  }
  addUser(): void {
    this.router.navigate(['/add-user']);
  }

  editUser(userId: number): void {
    this.router.navigate(['/edit-user', userId]);
  }

  viewUser(userId: number): void {
    this.router.navigate(['/view-user', userId]);
  }
  deleteUser(user: User): void {
    const confirmed = confirm(`Are you sure you want to delete user "${user.UserName}"?`);

    if (!confirmed) return;

    this.users = this.users.filter(u => u.idUser !== user.idUser);
    this.toastService.success(`User "${user.UserName}" deleted successfully.`);
  }

  hasPermission(code: string): boolean {
    return this.permissionService.hasPermission(code);
  }

  getPermissions(): string[] {
    return this.permissionService.getUserPermissions();
  }

  hasAnyActionPermission(): boolean {
    return this.hasPermission(this.PERMISSIONS.USER_VIEW) ||
      this.hasPermission(this.PERMISSIONS.USER_EDIT) ||
      this.hasPermission(this.PERMISSIONS.USER_DELETE);
  }


}
