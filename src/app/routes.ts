import {Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {QuizComponent} from './quiz/quiz.component';
import {ResultComponent} from './result/result.component';
import {QuizHomeComponent} from './quiz-home/quiz-home.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { QuestionsComponent } from './questions/questions.component';
import { ViewResultComponent } from './view-result/view-result.component';


export const appRoutes : Routes =[
	{path:'register',component:RegisterComponent},
	{path:'quiz',component:QuizComponent,canActivate : [AuthGuard]},
	{path:'startquiz',component:QuizHomeComponent,canActivate : [AuthGuard]},
	{path:'result',component:ResultComponent,canActivate : [AuthGuard]},
	{path:'viewresult',component:ViewResultComponent,canActivate : [AuthGuard]},
	{path:'admin',component:AdminComponent},
	{path: 'questions',component: QuestionsComponent},
	{path:'',redirectTo:'/register',pathMatch:'full'}
]