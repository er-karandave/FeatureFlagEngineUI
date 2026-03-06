import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../../shared/services/User/user-service';
import { TokenStorageService } from '../../shared/services/TokenStorage/token-storage-service';
import { ToastService } from '../../shared/services/Toast/toast-service';
import { filter, Subject, take, takeUntil, tap } from 'rxjs';
import { AuthService } from '../../shared/services/Auth/auth-service';
import { NavigationService } from '../../shared/services/Navigation/navigation-service';


// models/nav-item.model.ts
export interface NavItem {
  id: number;
  label: string;
  link: string;
  icon?: string;
  exact?: boolean;
  parentId?: number | null;
  dimMasterId?: number | null;
  children: NavItem[];  // ✅ Required, default to []
  hasPermission?: boolean;
}

export interface NavigationResponse {
  success: boolean;
  message: string;
  data: NavItem[];
}

@Component({
  selector: 'app-side-nav-bar',
  standalone: false,
  templateUrl: './side-nav-bar.html',
  styleUrl: './side-nav-bar.css',
})
export class SideNavBar {
  navItems = signal<NavItem[]>([]);
  isCollapsed = signal(false);
  expandedMenus = signal<number[]>([]);
  currentUser = signal<any>(null);
  isLoading = signal(false);

  @Output() sidebarToggle = new EventEmitter<boolean>();

  // ✅ Prevent memory leaks
  private destroy$ = new Subject<void>();

  private router = inject(Router);
  private navigationService = inject(NavigationService);
  private tokenStorage = inject(TokenStorageService);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.currentUser.set(this.tokenStorage.getUser());
    this.loadNavItems();

    // ✅ Close sidebar on mobile after navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      if (window.innerWidth < 992) {
        this.setCollapsed(true);
      }
    });
  }

  // ✅ Load navigation items (grouped by DimMaster Feature)
  loadNavItems(): void {
  this.isLoading.set(true);
  
  this.navigationService.getNavigationMenu().pipe(
    takeUntil(this.destroy$),
    tap(response => console.log('✅ Navigation response:', response))
  ).subscribe({
    next: (response: any) => {
      // ✅ STEP 1: Extract array from response
      let items: NavItem[] = [];
      
      if (Array.isArray(response)) {
        // ✅ Direct array response
        items = response;
      } else if (response?.data && Array.isArray(response.data)) {
        // ✅ Wrapped response: { success, message, data: [...] }
        items = response.data;
      } else if (response?.success && Array.isArray(response.Data)) {
        // ✅ PascalCase variant: { Success, Message, Data: [...] }
        items = response.Data;
      } else {
        console.error('❌ Unexpected response format:', response);
        items = this.navigationService.getDefaultNavItems();
      }

      // ✅ STEP 2: Normalize children property for all items
      const normalizedItems = this.normalizeNavigationItems(items);

      // ✅ STEP 3: Update signal with normalized items
      if (Array.isArray(normalizedItems)) {
        this.navItems.set(normalizedItems);
        console.log('✅ Navigation loaded:', normalizedItems.length, 'items');
      } else {
        console.error('❌ Navigation data is not an array after normalization');
        this.navItems.set([]);
      }
      
      this.isLoading.set(false);
    },
    error: (err) => {
      console.error('❌ Failed to load navigation:', err);
      this.isLoading.set(false);
      this.navItems.set(this.navigationService.getDefaultNavItems());
    }
  });
}

// ✅ Helper: Normalize navigation items (handle missing/empty children)
private normalizeNavigationItems(items: NavItem[]): NavItem[] {
  return items.map(item => {
    // ✅ Ensure children is always an array (never undefined/null)
    const normalized: NavItem = {
      ...item,
      children: Array.isArray(item.children) ? item.children : []
    };

    // ✅ Recursively normalize nested children
    if (normalized.children && normalized.children.length > 0) {
      normalized.children = this.normalizeNavigationItems(normalized.children);
    }

    return normalized;
  });
}


  toggleSubMenu(parentId: number): void {
    const expanded = this.expandedMenus();
    const index = expanded.indexOf(parentId);
    if (index > -1) {
      this.expandedMenus.set(expanded.filter(id => id !== parentId));
    } else {
      this.expandedMenus.set([...expanded, parentId]);
    }
  }

  isMenuExpanded(parentId: number): boolean {
    return this.expandedMenus().includes(parentId);
  }

  // ✅ Toggle sidebar collapse (with event emission)
  toggleSidebar(): void {
    const newValue = !this.isCollapsed();
    this.setCollapsed(newValue);
  }

  setCollapsed(collapsed: boolean): void {
    this.isCollapsed.set(collapsed);
    this.sidebarToggle.emit(collapsed); // ✅ Notify parent
  }

  logout(): void {
    const confirmed = confirm('Are you sure you want to logout?');
    if (confirmed) {
      this.authService.logout().subscribe({
        next: () => {
          this.toastService.success('Logged out successfully.');
          this.navigationService.clearNavigation();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.tokenStorage.clearLocalStorage();
          this.toastService.warning('Session cleared. Please login again.');
          this.router.navigate(['/login']);
        }
      });
    }
  }

  // sidebar.component.ts (add this method)
  isMobile(): boolean {
    return window.innerWidth < 992;
  }

    ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
