import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from './pages/auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ConsumerListComponent } from './pages/consumers/consumer-list/consumer-list.component';
import { MainComponent } from './pages/main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';
import { CustomerCreateComponent } from './widgets/customers/customer-create/customer-create.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConsumerInComponent } from './pages/consumers/consumer-in/consumer-in.component';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { MerkListComponent } from './pages/merk/merk-list/merk-list.component';
import { MerkDetailsComponent } from './widgets/merk/merk-details/merk-details.component';
import { MerkCreateComponent } from './widgets/merk/merk-create/merk-create.component';
import { CarListComponent } from './pages/cars/car-list/car-list.component';
import { CarCreateComponent } from './widgets/car/car-create/car-create.component';
import { PagingComponent } from './components/paging/paging/paging.component';
import { MerkCreateBatchComponent } from './widgets/merk/merk-create-batch/merk-create-batch.component';
import { ConsumerTestdriveListComponent } from './pages/consumers/consumer-testdrive-list/consumer-testdrive-list.component';
import { CustomerQrComponent } from './widgets/customers/customer-qr/customer-qr.component';
import { ClipboardModule } from 'ngx-clipboard';
import { DasboardWaitingListComponent } from './pages/dashboard/dasboard-waiting-list/dasboard-waiting-list.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent,
    NotFoundComponent,
    ConsumerListComponent,
    NavbarComponent,
    MenuComponent,
    CustomerCreateComponent,
    ConsumerInComponent,
    UserListComponent,
    MerkListComponent,
    MerkDetailsComponent,
    MerkCreateComponent,
    CarListComponent,
    CarCreateComponent,
    PagingComponent,
    MerkCreateBatchComponent,
    ConsumerTestdriveListComponent,
    CustomerQrComponent,
    DasboardWaitingListComponent,
  ],
  imports: [
    NgSelectModule,
    BrowserModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    ClipboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
