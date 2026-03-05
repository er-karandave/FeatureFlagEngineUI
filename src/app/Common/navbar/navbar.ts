import { Component, signal } from '@angular/core';
import { FeatureService } from '../../shared/services/Features/feature-service';
import { catchError, finalize, map, of, Subscription, take, tap } from 'rxjs';
import { FeatureState } from '../../shared/services/FeatureState/feature-state';


export interface NavItem {
  label: string;
  link: string;
  exact?: boolean;
}

export interface Feature {
  idFeature: number;
  featureDisplayName: string;
  link: string;
}

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {


  navItems = signal<NavItem[]>([]);
  private refreshSubscription?: Subscription;

  constructor(private _featureService: FeatureService,
    private _featureStateService: FeatureState,
  ) {

  }

  ngOnInit() {
    this.loadNavItems();
    this.refreshSubscription = this._featureStateService.featureRefresh$.subscribe(
      (shouldRefresh) => {
        if (shouldRefresh) {
          console.log('🔄 Navbar refresh triggered');
          this.loadNavItems();
        }
      }
    );

  }

  loadNavItems() {
    this._featureService.getFeaturesByFeatureMasterId(1)
      .pipe(
        take(1),
        map((features: Feature[]) =>
          features.map((feature) => ({
            label: feature.featureDisplayName,
            link: feature.link,
            exact: false
          }))
        ),

        catchError(() => of<NavItem[]>([]))
      )
      .subscribe((navItems: NavItem[]) => {
        this.navItems.set(navItems);
      });
  }

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe();
  }



}
