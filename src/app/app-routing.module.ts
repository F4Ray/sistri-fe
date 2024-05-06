import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.guard';
import { MainComponent } from './pages/main/main.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ConsumerListComponent } from './pages/consumers/consumer-list/consumer-list.component';
import { ConsumerInComponent } from './pages/consumers/consumer-in/consumer-in.component';
import { PreventGuard } from './guards/prevent.guard';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { MerkListComponent } from './pages/merk/merk-list/merk-list.component';
import { CarListComponent } from './pages/cars/car-list/car-list.component';
import { ConsumerTestdriveListComponent } from './pages/consumers/consumer-testdrive-list/consumer-testdrive-list.component';
import { DasboardWaitingListComponent } from './pages/dashboard/dasboard-waiting-list/dasboard-waiting-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent, canActivate: [PreventGuard] },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'consumer', component: ConsumerListComponent },
      { path: 'user', component: UserListComponent },
      { path: 'merk', component: MerkListComponent },
      { path: 'car', component: CarListComponent },
      { path: 'testdrive', component: ConsumerTestdriveListComponent },
      { path: 'dashboard', component:DasboardWaitingListComponent}
    ],
  },
  { path: 'api/consumer/in/:id', component: ConsumerInComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
