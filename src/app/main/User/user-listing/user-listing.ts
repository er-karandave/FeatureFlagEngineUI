import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/models/userLogin';
import { UserService } from '../../../shared/services/User/user-service';
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

  // ✅ Permission codes (centralized for easy management)
  readonly PERMISSIONS = {
    USER_VIEW: 'USER_VIEW',
    USER_EDIT: 'USER_EDIT',
    USER_DELETE: 'USER_DELETE',
    USER_CREATE: 'USER_CREATE'
  } as const;
  private router = inject(Router);
  private userService = inject(UserService);
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

    // ✅ In real app: call API
    // this.userService.getUsers().subscribe({...});

    // ✅ Mock data for demo
    setTimeout(() => {
      this.users = [
        { idUser: 1, UserName: 'admin', Email: 'admin@company.com', FullName: 'Admin User', isActive: true, CreatedOn: new Date() },
        { idUser: 2, UserName: 'john.doe', Email: 'john@company.com', FullName: 'John Doe', isActive: true, CreatedOn: new Date() },
        { idUser: 3, UserName: 'jane.smith', Email: 'jane@company.com', FullName: 'Jane Smith', isActive: false, CreatedOn: new Date() }
      ];
      this.loading = false;
    }, 500);
  }

  // ✅ Navigate to Add User (same component, different route)
  addUser(): void {
    this.router.navigate(['/add-user']);
  }

  // ✅ Navigate to Edit User
  editUser(userId: number): void {
    this.router.navigate(['/edit-user', userId]);
  }

  // ✅ Navigate to View User
  viewUser(userId: number): void {
    this.router.navigate(['/view-user', userId]);
  }

  // ✅ Delete User with Confirmation
  deleteUser(user: User): void {
    const confirmed = confirm(`Are you sure you want to delete user "${user.UserName}"?`);

    if (!confirmed) return;

    // ✅ In real app: call API
    // this.userService.deleteUser(user.idUser).subscribe({...});

    // ✅ Mock delete
    this.users = this.users.filter(u => u.idUser !== user.idUser);
    this.toastService.success(`User "${user.UserName}" deleted successfully.`);
  }

  // ✅ Helper: Check permission (for template)
  hasPermission(code: string): boolean {
    return this.permissionService.hasPermission(code);
  }

  // ✅ Helper: Get permission array (for directive)
  getPermissions(): string[] {
    return this.permissionService.getUserPermissions();
  }

  // Add this to UserListing component
  hasAnyActionPermission(): boolean {
    return this.hasPermission(this.PERMISSIONS.USER_VIEW) ||
      this.hasPermission(this.PERMISSIONS.USER_EDIT) ||
      this.hasPermission(this.PERMISSIONS.USER_DELETE);
  }


}
