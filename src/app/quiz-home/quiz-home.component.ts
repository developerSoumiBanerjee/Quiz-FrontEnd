import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-quiz-home',
  templateUrl: './quiz-home.component.html',
  styleUrls: ['./quiz-home.component.css']
})
export class QuizHomeComponent implements OnInit {

  constructor(private route : Router,private quizService: QuizService) { }
  courses:any;
  viewresult:any;
  ngOnInit() {
 // this.courses=['1', '2', '3'];
  if(JSON.parse(localStorage.getItem('status'))>0){
    this.route.navigate(['/result']);
  }
  
  this.quizService.getCourses().subscribe(
        (data: any) => {
        console.log("data",data);
          this.courses = data;
          console.log(this.courses,"data");
        }
      );

  }
  startQuiz(options:any){
  console.log(options);
  var paramContent={
  		course:options
  }
  	this.route.navigate(['/quiz',paramContent]);
  }

  result(){
   var id=JSON.parse(localStorage.getItem('participantID'));
    this.quizService.getResult(id).subscribe(
        (data: any) => {
        console.log("data",data);
          this.viewresult = data;
          console.log(this.courses,"data");
        }
      );
  }
}
