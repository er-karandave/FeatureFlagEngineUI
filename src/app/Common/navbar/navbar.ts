import { Component, signal } from '@angular/core';
import { FeatureService } from '../../shared/services/Features/feature-service';
import { catchError, finalize, map, of, take, tap } from 'rxjs';


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

  constructor(private _featureService: FeatureService) {

  }

  ngOnInit() {


    this._featureService.getFeaturesByFeatureMasterId(1)
  .pipe(
    take(1),

    // Ensure API response is typed as Feature[]
    map((features: Feature[]) =>
      features.map((feature) => ({
        label: feature.featureDisplayName,
        link: feature.link,
        exact: false
      }))
    ),

    // Return proper type on error
    catchError(() => of<NavItem[]>([]))
  )
  .subscribe((navItems: NavItem[]) => {
    this.navItems.set(navItems);
  });
  }



}
