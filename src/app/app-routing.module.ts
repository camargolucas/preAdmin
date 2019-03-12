import { AdminComponent } from './pages/admin/admin.component';
import { StockRequestsComponent } from './pages/stock-requests/stock-requests.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PageNotFoundComponentComponent } from './pages/page-not-found-component/page-not-found-component.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component:  PageHomeComponent, children:[
    { path: 'dashboard', component:  DashboardComponent},
    { path: 'purchase', component:  PurchaseComponent},
    { path: 'stockRequests', component:  StockRequestsComponent},
    { path: 'users', component:  UsersComponent},
    { path: 'admin', component:  AdminComponent}
  ]},
  { path: 'login', component:  LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
