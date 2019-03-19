import { UserFilterPipe } from "./pages/users/user-filter.pipe";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { PageHomeComponent } from "./pages/page-home/page-home.component";
import { NavbarDefaultComponent } from "./component/navbar-default/navbar-default.component";
import { PurchaseComponent } from "./pages/purchase/purchase.component";
import { StockRequestsComponent } from "./pages/stock-requests/stock-requests.component";
import { UsersComponent } from "./pages/users/users.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { LoginComponent } from "./pages/login/login.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { PageNotFoundComponentComponent } from "./pages/page-not-found-component/page-not-found-component.component";
import { LoginService } from "./services/login.service";
import { FormsModule } from "@angular/forms";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreComponent } from "./pages/store/store.component";
import { GerentesComponent } from "./pages/gerentes/gerentes.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatInputModule
} from "@angular/material";
import { EconomicGroupComponent } from "./pages/economic-group/economic-group.component";
import { ClientComponent } from "./pages/client/client.component";

@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    NavbarDefaultComponent,
    PurchaseComponent,
    StockRequestsComponent,
    UsersComponent,
    AdminComponent,
    LoginComponent,
    DashboardComponent,
    PageNotFoundComponentComponent,
    UserFilterPipe,
    StoreComponent,
    GerentesComponent,
    EconomicGroupComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ScrollingModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {}