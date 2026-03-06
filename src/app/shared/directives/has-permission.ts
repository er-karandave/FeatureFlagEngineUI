import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionService } from '../services/Permission/permission-service';

@Directive({
  selector: '[appHasPermission]',
  standalone: false
})
export class HasPermission {
  @Input() appHasPermission: string | string[] = '';

  @Input() appHasPermissionAll: boolean = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    this.updateView();

    this.permissionService.currentUser$.subscribe(() => {
      this.updateView();
    });
  }

  private updateView(): void {
    this.viewContainer.clear();

    if (!this.appHasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      return;
    }

    const permissions = Array.isArray(this.appHasPermission)
      ? this.appHasPermission
      : [this.appHasPermission];

    const hasAccess = this.appHasPermissionAll
      ? this.permissionService.hasAllPermissions(permissions)
      : this.permissionService.hasAnyPermission(permissions);

    if (hasAccess) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

}
