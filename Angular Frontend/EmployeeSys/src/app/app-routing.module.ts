import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './guard/auth.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'empform', loadChildren: () => import('./empform/empformmodule.module').then(p => p.EmpformModule),canActivate: [AuthGuard] },
  {path: 'login', loadChildren: () => import('./login/loginmodule.module').then(l => l.Loginmodule)},
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
