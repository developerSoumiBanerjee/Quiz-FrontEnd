import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router:Router, private quizService:QuizService) { }

  ngOnInit() {
  }
 public Update(){
  localStorage.clear();
  this.router.navigate(['/questions']);
 }
 addCourse(course:string){
 	 this.quizService.addCourse(course).subscribe(
        (data: any) => {
        if(data==true){
        	  window.location.reload();
        }

    }
  );

 }
}
