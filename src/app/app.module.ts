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
import {UsersComponent} from "./pages/users/users.component";
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
  MatFormFieldModule,
  MAT_LABEL_GLOBAL_OPTIONS,
  MatInputModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
  MatSidenavModule,
  MatRippleModule,
  MatRadioModule
  
} from "@angular/material";
import { EconomicGroupComponent } from "./pages/economic-group/economic-group.component";
import { ClientComponent } from "./pages/client/client.component";
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { EconomicGroupDetailComponent } from './pages/economic-group-detail/economic-group-detail.component';
import { CreateManagerAccountDialogComponent } from './pages/admin/create-manager-account-dialog/create-manager-account-dialog.component';
import { CreateUserAccountDialogComponent } from './pages/admin/create-user-account-dialog/create-user-account-dialog.component';
import { BlockUserAccountDialogComponent } from './pages/admin/block-user-account-dialog/block-user-account-dialog.component';
import { ManagerComponent } from './pages/admin/manager/manager.component';
import { EditUserAccountDialogComponent } from './pages/admin/edit-user-account-dialog/edit-user-account-dialog.component';
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
    ClientComponent,
    EconomicGroupDetailComponent,
    CreateManagerAccountDialogComponent,
    CreateUserAccountDialogComponent,
    BlockUserAccountDialogComponent,
    ManagerComponent,
    EditUserAccountDialogComponent
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
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatRippleModule,
    MatRadioModule

  ],
  entryComponents: [
    CreateManagerAccountDialogComponent,
    CreateUserAccountDialogComponent,
    BlockUserAccountDialogComponent,
    EditUserAccountDialogComponent
  ],
  providers: [
    LoginService,
    [{ provide: MAT_DIALOG_DATA, useValue: { hasBackdrop: false } }]
    // { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: "always" } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}