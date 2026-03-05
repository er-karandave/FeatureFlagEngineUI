import { Component, signal } from '@angular/core';
import { UserService } from './shared/services/User/user-service';
import { Router } from '@angular/router';
import { RouteHistoryService } from './shared/services/RouteHistory/route-history-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('FeatureFlagEngine');
  isUserLoggedIn: boolean = false;


  constructor(private _userService: UserService,
    private router: Router,
    private _routeHistory: RouteHistoryService,

  ) {

  }

  ngOnInit() {
    this._userService.isLoggedIn$.subscribe(status => {
      this.isUserLoggedIn = status;
      console.log(this.router.url)
      console.log(this._routeHistory.getPreviousUrl())
      if (status && this.router.url == '/login') {
        this.router.navigate(['/dashboard']);
        return;
      }
    });
  }
}
