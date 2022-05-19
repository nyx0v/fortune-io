import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { AboutComponent } from './about/about.component';
import { AnalysesComponent } from './analyses/analyses.component';
import { AnalysisComponent } from './analysis/analysis.component';

import { AppComponent } from './app.component';
import { FeaturesComponent } from './features/features.component';
import { FieldComponent } from './field/field.component';
import { HomeComponent } from './home/home.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { SignupComponent } from './signup/signup.component';
import { ViewComponent } from './view/view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  {path:'',redirectTo:'home', pathMatch: 'full' },
  {path: "auth", component: LoginSignupComponent},
  {path: "projects/:username", component: ProjectsComponent},
  {path: "analyses/:projectid", component: AnalysesComponent},
  {path: "home", component: HomeComponent},
  {path: "about", component: AboutComponent},
  {path: "features", component: FeaturesComponent},
  {path: 'view/:analysisid', component: ViewComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginSignupComponent,
    ProjectsComponent,
    AnalysesComponent,
    HomeComponent,
    AboutComponent,
    FeaturesComponent,
    SignupComponent,
    LoginComponent,
    ProjectComponent,
    AnalysisComponent,
    FieldComponent,
    ViewComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    NgxCsvParserModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

