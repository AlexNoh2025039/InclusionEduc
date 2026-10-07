import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page.component';
import { DashboardComponent } from './dashboard.component';

export const routes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: 'dashboard', component: DashboardComponent },
];
