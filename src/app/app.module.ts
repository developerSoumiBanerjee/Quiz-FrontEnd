import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthGuard } from './auth/auth.guard';
import {AppComponent } from './app.component';
import {CertificateService } from './certificate.service';
import { NavbarComponent } from './navbar/navbar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {RegisterComponent} from './register/register.component';
import {appRoutes} from './routes';
import { QuizComponent } from './quiz/quiz.component';
import { QuizService } from './shared/quiz.service';
import { ResultComponent } from './result/result.component';
import { QuizHomeComponent } from './quiz-home/quiz-home.component';
import { AdminComponent } from './admin/admin.component';
import { QuestionsComponent } from './questions/questions.component';
import * as $ from 'jquery';
import { ViewResultComponent } from './view-result/view-result.component';
import { LoadingModule } from 'ngx-loading';
import { ClickOutsideModule } from 'ng-click-outside';    

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    QuizComponent,
    NavBarComponent,
    ResultComponent,
    QuizHomeComponent,
    AdminComponent,
    QuestionsComponent,
    ViewResultComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,{useHash: true}),
    HttpClientModule,
    LoadingModule,
    FormsModule,
    ModalModule.forRoot(),
    ClickOutsideModule
  ],
  providers: [QuizService,AuthGuard,CertificateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
