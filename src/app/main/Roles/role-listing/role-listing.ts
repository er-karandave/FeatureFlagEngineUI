import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-role-listing',
  standalone: false,
  templateUrl: './role-listing.html',
  styleUrl: './role-listing.css',
})
export class RoleListing {

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

}
