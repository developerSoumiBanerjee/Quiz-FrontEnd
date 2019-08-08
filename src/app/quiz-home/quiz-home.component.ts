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
 
  opt:boolean;
  java:boolean;
  auto:boolean;
  mainframe:boolean;
  courses:any;
  viewresult:any;
  ngOnInit() {
  //this.java=true;
  this.quizService.seconds=undefined;
 localStorage.setItem('qnProgress', "0");
    localStorage.setItem('opt', "0");
    localStorage.setItem('status', null);
    localStorage.setItem('qns', "");
  if(JSON.parse(localStorage.getItem('status'))>0){
    this.route.navigate(['/result']);
  }
  
  this.quizService.getCoursesUser().subscribe(
        (data: any) => {
        //console.log("data",data);

          this.courses = data;
        //  console.log(this.courses,"data");
        }
      );
     // console.log(this.java,this.mainframe,this.auto);
    if((localStorage.getItem('opt'))==='java'){
    this.java=true;
    }
     if((localStorage.getItem('opt'))==='mainframe'){
    this.mainframe=true;
    }
     if((localStorage.getItem('opt'))==='auto'){
    this.auto=true;
    }


  }
  startQuiz(options:any){
  console.log(options);
  var paramContent={
  		course:options,

      
  }

   console.log(this.java,this.mainframe,this.auto);
   if(this.java==true){
   localStorage.setItem('opt', "java");
   }
    if(this.mainframe==true){
   localStorage.setItem('opt', "mainframe");
   }
    if(this.auto==true){
   localStorage.setItem('opt', "auto");
   }
      console.log((localStorage.getItem('opt')));
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

   Signout(){
   localStorage.clear();
   this.route.navigate(['/register']);

 }
  /* public onClick(targetElement) {
    const clickedInside = this.insideElement.nativeElement.contains(targetElement);
    if (!clickedInside) {
      console.log('outside clicked');
    }
  }*/
}
