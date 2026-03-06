import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './Common/login/login';
import { authGuard } from './Guards/auth-guard';
import { NotFoundPage } from './shared/components/not-found-page/not-found-page';

const routes: Routes = [
  { path: 'login', component: Login, canActivate: [authGuard] },
  {
    path: '',
    loadChildren: () => import('./main/main-module').then(m => m.MainModule),
    canActivate: [authGuard],  // ✅ ADD THIS - Protects all child routes
  },
  {
    path:'**',
    component:NotFoundPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
