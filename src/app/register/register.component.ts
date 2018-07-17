import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private route : Router,private quizService: QuizService ) { }


  ngOnInit() {
      localStorage.clear();

 
  }

  OnSubmit(name:string,email:string,password:string){
      localStorage.clear();
      localStorage.setItem('participant',name);
        this.quizService.insertParticipant(name,email,password).subscribe(
        (data: any) => {
        console.log("data",data);
        if(data.user_id>0){
        localStorage.setItem('participantID',data.user_id);
        this.route.navigate(['/startquiz']);
        }
        else{
          console.log("Error")
        }
        }
      );
  }
  close() {
   $("#myModal").hide();
  }

  OnSubmitLogin(name:string,password:string,role:string){
    localStorage.clear();
    localStorage.setItem('participant',name);
    if(role==='User')
    {
    console.log(name,password,role);
        this.quizService.loginUser(name,password).subscribe(
        (data: any) => {
        console.log("data",data);
        if(data>0){
         localStorage.setItem('participantID',data);
        this.route.navigate(['/startquiz']);
        }
        else{
          console.log("Error");
          $("#myModal").show("slow");
        }
        }
      );
       
    }
    if(role==='Admin')
    {
    console.log(name,password);
         this.quizService.loginParticipant(name,password).subscribe(
        (data: any) => {
        console.log("data",data);
         console.log('Admin');
       if(data==true){
        this.route.navigate(['/admin']);
        }
        else{
          console.log("Error")
        }
        }
      );

      
    }

  }

}
