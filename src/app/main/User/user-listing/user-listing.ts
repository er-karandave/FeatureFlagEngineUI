import { Component } from '@angular/core';


declare var bootstrap: any;
@Component({
  selector: 'app-user-listing',
  standalone: false,
  templateUrl: './user-listing.html',
  styleUrl: './user-listing.css',
})
export class UserListing {

  featureList = [
  {
    featureName: 'NavbarToggle',
    featureDisplayName: 'Navbar Toggle',
    isActive: true
  },
  {
    featureName: 'DarkMode',
    featureDisplayName: 'Dark Mode',
    isActive: false
  }
];


}
