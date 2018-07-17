import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
 
 questionsAdmin:any;
 courses:any;
  constructor(private router : Router,private quizService:QuizService) { }
  isEditable  = false;
  myVar = false;
  selectedOption:any;
  ngOnInit() {

    this.quizService.getCourses().subscribe(
        (data: any) => {
        console.log("data",data);
         this.courses=data;
        }
      );

  }
 
  questions = [
    { sno :'' , question :'', correct : '' }
  ]
   
  public edit(question:any){
   
   this.isEditable=true;
  
  }
  
  public save(question:any){
  this.isEditable=false;
     this.quizService.updateQuestionsAdmin(question).subscribe(
        (data: any) => {
           this.router.navigate(['/questions']);
        }
      );
  }

   public del(question:any){
   this.isEditable=false;
     this.quizService.delQuestionsAdmin(question).subscribe(
        (data: any) => {
         window.location.reload();

        }
      );
  }
  viewQues(){
  console.log(this.myVar, this.selectedOption);

  if( this.selectedOption!=undefined){
    this.quizService.getQuestionsAdmin(this.selectedOption).subscribe(
        (data: any) => {
        this.myVar=true;
        console.log("data",data);
          this.questionsAdmin = data;
          console.log(this.questionsAdmin,"data");
        }
      );
  }
  }

 addQues(question:string,answer:string,course:string,option1:string,option2:string,option3:string,option4:string){
console.log(question,answer,course);
  this.isEditable=false;
     this.quizService.addQuestionsAdmin(question,answer,course,option1,option2,option3,option4).subscribe(
        (data: any) => {
         window.location.reload();

        }
      );

  }
 
}
