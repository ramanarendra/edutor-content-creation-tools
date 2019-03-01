import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingCompnents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { UserHomeScreenComponent } from './user-home-screen/user-home-screen.component';
import { LoginserviceService } from './loginservice.service';
import { NavcomponentComponent } from './navcomponent/navcomponent.component';
import { PiechartComponent } from './charts/piechart/piechart.component';
import { BarchartComponent } from './charts/barchart/barchart.component';
import { InterceptorModule } from './interceptor.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { StatshomeComponent } from './Stats/statshome/statshome.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatStepperModule} from '@angular/material/stepper';
import { MatIconModule } from "@angular/material/icon";
import { ScoreComponent } from './Stats/score/score.component';
import { AccuracyComponent } from './Stats/accuracy/accuracy.component';
import { AttemptedComponent } from './Stats/attempted/attempted.component';
import { TimeComponent } from './Stats/time/time.component';
import { LinechartComponent } from './charts/linechart/linechart.component';

@NgModule({
  declarations: [
    AppComponent,
    routingCompnents,
    LoginScreenComponent,
    UserHomeScreenComponent,
    NavcomponentComponent,
    PiechartComponent,
    BarchartComponent,
    StatshomeComponent,
    ScoreComponent,
    AccuracyComponent,
    AttemptedComponent,
    TimeComponent,
    LinechartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    InterceptorModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatStepperModule,
    MatIconModule
  ],
  providers: [LoginserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
