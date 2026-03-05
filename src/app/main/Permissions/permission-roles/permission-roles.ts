import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-permission-roles',
  standalone: false,
  templateUrl: './permission-roles.html',
  styleUrl: './permission-roles.css',
})
export class PermissionRoles {
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
