import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/models/userLogin';
import { PermissionService } from '../../../shared/services/Permission/permission-service';
import { ToastService } from '../../../shared/services/Toast/toast-service';

@Component({
  selector: 'app-add-edit-user',
  standalone: false,
  templateUrl: './add-edit-user.html',
  styleUrl: './add-edit-user.css',
})
export class AddEditUser {
  userForm!: FormGroup;

  user: Partial<User> = {};
  isEditMode = false;
  isViewMode = false;
  loading = false;
  userId: number | null = null;

 
  readonly PERMISSIONS = {
    USER_CREATE: 'USER_CREATE',
    USER_EDIT: 'USER_EDIT',
    USER_VIEW: 'USER_VIEW',
    USER_DELETE: 'USER_DELETE'
  } as const;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private permissionService = inject(PermissionService);
  private toastService = inject(ToastService);
  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const resposne = data;

      if (resposne['featureCheck']) {
        this.initForm();

        const currentRoute = this.route.routeConfig?.path || '';
        this.isViewMode = currentRoute.includes('view-user');
        this.isEditMode = currentRoute.includes('edit-user');

        const idParam = this.route.snapshot.paramMap.get('id');
        this.userId = idParam !== null ? +idParam : null;

        if (this.isEditMode && !this.permissionService.hasPermission(this.PERMISSIONS.USER_EDIT)) {
          this.toastService.error('You do not have permission to edit users.');
          this.router.navigate(['/user-list']);
          return;
        }

        if (this.isViewMode && !this.permissionService.hasPermission(this.PERMISSIONS.USER_VIEW)) {
          this.toastService.error('You do not have permission to view user details.');
          this.router.navigate(['/user-list']);
          return;
        }

        if (this.userId !== null && (this.isEditMode || this.isViewMode)) {
          this.loadUser(this.userId);
        }
      }
    });
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      UserName: ['', [Validators.required, Validators.minLength(3)]],
      Email: ['', [Validators.required, Validators.email]],
      FullName: ['', Validators.maxLength(100)],
      Phone: ['', [Validators.maxLength(20)]],
      isActive: [true]
    });
  }

  loadUser(userId: number): void {
    this.loading = true;

    setTimeout(() => {
      const userData = {
        idUser: userId,
        UserName: 'john.doe',
        Email: 'john@company.com',
        FullName: 'John Doe',
        Phone: '+1234567890',
        isActive: true,
        CreatedOn: new Date()
      };

      this.user = userData;

      this.userForm.patchValue({
        UserName: userData.UserName,
        Email: userData.Email,
        FullName: userData.FullName || '',
        Phone: userData.Phone || '',
        isActive: userData.isActive
      });

      this.loading = false;
    }, 500);
  }

  saveUser(): void {
    this.userForm.markAllAsTouched();

    if (this.userForm.invalid) {
      this.toastService.error('Please fill all required fields correctly.');
      return;
    }

    this.loading = true;

    const formValues = this.userForm.value;

    setTimeout(() => {
      this.toastService.success(
        this.isEditMode
          ? `User "${formValues.UserName}" updated successfully.`
          : `User "${formValues.UserName}" created successfully.`
      );
      this.router.navigate(['/user-list']);
    }, 500);
  }

  deleteUser(): void {
    if (!this.userId) return;

    const confirmed = confirm(`Are you sure you want to delete "${this.user.UserName}"?`);
    if (!confirmed) return;

   
    this.toastService.success(`User "${this.user.UserName}" deleted successfully.`);
    this.router.navigate(['/user-list']);
  }

  cancel(): void {
    this.router.navigate(['/user-list']);
  }

  hasPermission(code: string): boolean {
    return this.permissionService.hasPermission(code);
  }
  get f() {
    return this.userForm.controls;
  }

  get isFormDisabled(): boolean {
    return this.isViewMode || this.loading;
  }

  hasError(fieldName: string, errorCode: string): boolean {
    const control = this.userForm.get(fieldName);
    return !!(control?.touched && control?.hasError(errorCode));
  }

}
