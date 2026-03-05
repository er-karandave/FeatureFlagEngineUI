import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


declare var bootstrap: any;
@Component({
  selector: 'app-user-listing',
  standalone: false,
  templateUrl: './user-listing.html',
  styleUrl: './user-listing.css',
})
export class UserListing {

  constructor(private route: ActivatedRoute){
    
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const resposne = data;
      
      if (resposne['featureCheck']) {
        console.log('✅ Feature is active, loading component...');
      }
    });
  }

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
