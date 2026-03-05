import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-user',
  standalone: false,
  templateUrl: './add-edit-user.html',
  styleUrl: './add-edit-user.css',
})
export class AddEditUser {

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
