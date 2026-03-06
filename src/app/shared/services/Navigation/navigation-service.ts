import { inject, Injectable } from '@angular/core';
import { TokenStorageService } from '../TokenStorage/token-storage-service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, shareReplay, tap, throwError } from 'rxjs';
import { NavigationResponse, NavItem } from '../../../Common/side-nav-bar/side-nav-bar';
import { GlobalComponent } from '../../../global-component';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private http = inject(HttpClient);
  private tokenStorage = inject(TokenStorageService);
  

  private navigationMenu$: Observable<NavItem[]> | null = null;
  private navItemsSubject = new BehaviorSubject<NavItem[]>([]);
  navItems$ = this.navItemsSubject.asObservable();

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  getNavigationMenu(forceRefresh: boolean = false): Observable<NavItem[]> {
    if (this.navigationMenu$ && !forceRefresh) {
      return this.navigationMenu$;
    }

    this.isLoadingSubject.next(true);

    this.navigationMenu$ =  this.http.get<any>(`${GlobalComponent.navigationMenu}`).pipe(
      shareReplay(1), // ✅ CRITICAL: Shares single HTTP call across all subscribers
      tap(response => {
        if (response.success && Array.isArray(response.data)) {
          this.navItemsSubject.next(response.data);
        } else {
          this.navItemsSubject.next([]);
        }
        this.isLoadingSubject.next(false);
      }),
      catchError(error => {
        console.error('Error loading navigation:', error);
        this.isLoadingSubject.next(false);
        this.navigationMenu$ = null; // ✅ Reset cache on error to allow retry
        const defaultItems = this.getDefaultNavItems();
        this.navItemsSubject.next(defaultItems);
        return throwError(() => error);
      })
    );

    return this.navigationMenu$;
  }

  // getNavigationMenu(forceRefresh: boolean = false): Observable<NavItem[]> {
  //   const cached = this.navItemsSubject.getValue();
    
  //   if (cached.length > 0 && !forceRefresh) {
  //     return this.navItems$;
  //   }

  //   this.isLoadingSubject.next(true);

  //   return this.http.get<any>(`${GlobalComponent.navigationMenu}`).pipe(
  //     shareReplay(1), 
  //     tap(response => {
  //       if (response.success) {
  //         this.navItemsSubject.next(response.data);
  //       }
  //       this.isLoadingSubject.next(false);
  //     }),
  //     catchError(error => {
  //       console.error('Error loading navigation:', error);
  //       this.isLoadingSubject.next(false);
  //       const defaultItems = this.getDefaultNavItems();
  //       this.navItemsSubject.next(defaultItems);
  //       return [defaultItems];
  //     })
  //   );
  // }

  getCurrentNavItems(): NavItem[] {
    return this.navItemsSubject.getValue();
  }

  // ✅ Clear cached navigation (on logout)
  clearNavigation(): void {
    this.navigationMenu$ = null; // ✅ Reset observable cache
    this.navItemsSubject.next([]); // ✅ Reset subject
  }

  // ✅ Force refresh navigation (e.g., after permission change)
  refreshNavigation(): Observable<NavItem[]> {
    this.navigationMenu$ = null; // ✅ Invalidate cache
    return this.getNavigationMenu(true); // ✅ Force new HTTP call
  }

  // ✅ Default fallback items
  getDefaultNavItems(): NavItem[] {
    return [
      { id: 0, label: 'Dashboard', link: '/dashboard', icon: 'bx bx-home', exact: true, children: [] },
      {
        id: 1,
        label: 'User Management',
        link: '/user-list',
        icon: 'bx bx-user',
        children: [
          { id: 11, label: 'User List', link: '/user-list', icon: 'bx bx-list-ul', parentId: 1, children: [] },
          { id: 12, label: 'Add User', link: '/add-user', icon: 'bx bx-user-plus', parentId: 1, children: [] }
        ]
      }
    ];
  }
}
