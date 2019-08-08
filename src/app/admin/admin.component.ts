import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import { QuizService } from '../shared/quiz.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router:Router, private quizService:QuizService,private location:Location) { }

 
courses=[];
  ngOnInit() {

  this.quizService.getCourses().subscribe(
        (data: any) => {
        console.log("data",data);
         this.courses=data;
          console.log("data",this.courses.length);
        }
      );
    
  }
 public Update(){
  localStorage.clear();
  this.router.navigate(['/questions']);
 }
 addCourse(course:string){
 if(course.trim().length>=2)
  location.reload();
 	 this.quizService.addCourse(course).subscribe(
        (data: any) => {
        if(data==true){
          console.log(data);
        	 location.reload();
        }

    }
  );

 }
}
