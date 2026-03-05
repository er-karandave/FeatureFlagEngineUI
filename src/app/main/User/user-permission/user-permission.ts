import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-permission',
  standalone: false,
  templateUrl: './user-permission.html',
  styleUrl: './user-permission.css',
})
export class UserPermission {


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

}
