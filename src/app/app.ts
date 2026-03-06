import { Component, inject, signal, ViewChild } from '@angular/core';
import { UserService } from './shared/services/User/user-service';
import { NavigationEnd, Router } from '@angular/router';
import { RouteHistoryService } from './shared/services/RouteHistory/route-history-service';
import { TokenStorageService } from './shared/services/TokenStorage/token-storage-service';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/Auth/auth-service';
import { SideNavBar } from './Common/side-nav-bar/side-nav-bar';
import { NavigationService } from './shared/services/Navigation/navigation-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  @ViewChild(SideNavBar) sidebarComponent!: SideNavBar;
  protected readonly title = signal('FeatureFlagEngine');
  isUserLoggedIn: boolean = false;
  sidebarCollapsed = signal(false);

  private userService = inject(UserService);
  private tokenStorage = inject(TokenStorageService);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    // ✅ Check initial login status from token
    this.isUserLoggedIn = this.tokenStorage.isAuthenticated();

    // ✅ Subscribe to login status for UI updates (navbar show/hide)
    this.authService.isLoggedIn$.subscribe(status => {
      this.isUserLoggedIn = status;
      
    });

    // ✅ Optional: Log navigation for debugging
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe((event: any) => {
    //   console.log('🗺️ Navigation to:', event.urlAfterRedirects);
    // });
  }

  // ✅ Logout method (called from navbar)
  onSidebarToggle(collapsed: boolean): void {
    this.sidebarCollapsed.set(collapsed);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.isUserLoggedIn = false;
        this.router.navigate(['/login']);
      },
      error: () => {
        this.tokenStorage.clearLocalStorage();
        this.isUserLoggedIn = false;
        this.router.navigate(['/login']);
      }
    });
  }

  toggleSidebar(): void {
    const sidebar = document.querySelector('.sidebar-wrapper') as HTMLElement;
    if (sidebar) {
      sidebar.classList.toggle('collapsed');
    }
  }

  toggleMobileSidebar(): void {
    if (this.sidebarComponent) {
      this.sidebarComponent.toggleSidebar();
    }
  }
}
