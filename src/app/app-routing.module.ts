import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { UserHomeScreenComponent } from './user-home-screen/user-home-screen.component';
import { PiechartComponent } from './charts/piechart/piechart.component';
import { BarchartComponent } from './charts/barchart/barchart.component';
import { StatshomeComponent } from './Stats/statshome/statshome.component';
import { LinechartComponent } from './charts/linechart/linechart.component';
const routes: Routes = [
  {path: 'user', component: UserHomeScreenComponent },
  {path: 'analytics', component: StatshomeComponent },
  {path: 'pieChart', component: PiechartComponent},
  {path: 'barChart', component: BarchartComponent},
  {path: 'lineChart', component: LinechartComponent},
  {path: '', component: LoginScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingCompnents = [UserHomeScreenComponent, LoginScreenComponent];
