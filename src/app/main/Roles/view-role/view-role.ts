import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-role',
  standalone: false,
  templateUrl: './view-role.html',
  styleUrl: './view-role.css',
})
export class ViewRole {

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
