import { ManagerComponent } from './pages/admin/manager/manager.component';
import { StoreComponent } from './pages/store/store.component';
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
import { GerentesComponent } from './pages/gerentes/gerentes.component';
import { EconomicGroupComponent } from './pages/economic-group/economic-group.component';
import { ClientComponent } from './pages/client/client.component';
import { EconomicGroupDetailComponent } from './pages/economic-group-detail/economic-group-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component:  PageHomeComponent, children:[
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component:  DashboardComponent},
    { path: 'economic-group', component:  EconomicGroupComponent},
    { path: 'economic-group/:id', component:  EconomicGroupDetailComponent},
    { path: 'client', component:  ClientComponent},
    { path: 'store', component:  StoreComponent},
    { path: 'purchase', component:  PurchaseComponent},
    { path: 'stockRequests', component:  StockRequestsComponent},
    { path: 'users', component:  UsersComponent},
    { path: 'managers', component:  ManagerComponent},
    { path: 'admin', component:  AdminComponent},
    { path: 'gerentes', component:  GerentesComponent}
  ]},
  { path: 'login', component:  LoginComponent},
  { path: '**', component: PageNotFoundComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
