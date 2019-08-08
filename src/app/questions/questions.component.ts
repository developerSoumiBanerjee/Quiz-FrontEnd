import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
 
 //numPattern = "^[1-9]+[0-9]*$";
 questionsAdmin=[];
 courses=[];
 options=[];
 finalOptions=[];
 ans=[];
 qNo:number;
 question:string;
 courseName:string;
  constructor(private router : Router,private quizService:QuizService) { }
  isEditable  = false;
  myVar = false;
  selectedOption:any;
  ngOnInit() {
  //this.selectedOption="Sele";
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
  console.log(question);
     this.quizService.updateQuestionsAdmin(question).subscribe(

        (data: any) => {
           this.router.navigate(['/questions']);
        }
      );
  }

   public del(qid:number){
   this.isEditable=false;
     this.quizService.delQuestionsAdmin(qid).subscribe(
        (data: any) => {
         window.location.reload();

        }
      );
  }
  viewQues(){
   this.myVar=false;
  console.log(this.myVar, this.selectedOption);
  console.log(this.courses.length);
  for(var i=0;i<this.courses.length;i++)
  {
   console.log(this.courses[i].course_id,this.courses[i]);
    if(this.courses[i].course_id===parseInt(this.selectedOption))
    {
      this.courseName=this.courses[i].course_name;
      console.log(this.courseName);
    }
    
  }

  if( this.selectedOption!=undefined){
    this.quizService.getQuestionsAdmin(this.selectedOption).subscribe(
        (data: any) => {
       
        console.log("data",data);
          this.questionsAdmin = data;
           if( this.questionsAdmin.length>0)
              this.myVar=true;
          console.log(this.questionsAdmin,"data");
        }
      );
  }
  }

 addQues(question:string,answer:string,course:string,option1:string,option2:string,option3:string,option4:string){
console.log(question,answer,course);
  this.isEditable=false;
     

  }

 OptionNumber(qNo:number,question:string,num:number,courseid:number){
  for(var i=0;i<num;i++)
  {
    var body={value:""};
    this.options.push(body);
  }
    this.qNo=qNo;
    this.question=question;
    this.selectedOption=courseid;
    console.log(this.courses,this.courses[courseid-1],courseid);
    //this.courseName=this.courses[courseid-1].course_name;
    console.log(this.options);
    $(document).ready(function(){
      $('#quesModal').hide("slow");
      $('#Optmodal').show("slow");
  });
 }
 optionsGiven(options:any)
 {
    console.log(options,this.ans);
    $(document).ready(function(){
      $('#Optmodal').hide("slow");
  });
  for(var i=0;i<this.options.length;i++){
    this.finalOptions[i]=this.options[i].value;
  }
  var body=[{
    qNo:this.qNo,
    question:this.question,
    options:this.finalOptions,
    answers:this.ans,
    courseId:this.selectedOption,
    courseName:this.courseName
  }]
   this.quizService.addQuestionsAdmin(body).subscribe(
        (data: any) => {
         window.location.reload();

        }
      );
  
 }
 
  checkValue(event,i){
  
  if(event.target.checked){
    console.log(i,this.options[i].value);
    if(this.ans.includes(this.options[i].value)==false)
     this.ans.push(this.options[i].value);
  }
  else{
  var n=this.ans.indexOf(this.options[i].value);
     this.ans.splice(n, 1);;
  }
  console.log(this.ans);
  }

}
