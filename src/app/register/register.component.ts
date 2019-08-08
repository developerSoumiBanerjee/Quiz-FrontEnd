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
  public loading = false;

  ngOnInit() {
      localStorage.clear();
      (<HTMLElement>document.querySelector("#test2")).style.display="none";
	   $("#myModal").hide();
        

 
  }

  OnSubmit(name:string,email:string,password:string){
   this.loading = true;
      localStorage.clear();
      localStorage.setItem('participant',name);
        $("#myModalLoader").show("slow");
      
        this.quizService.insertParticipant(name,email,password).subscribe(
        (data: any) => {
        console.log("data",data.user_id);
        localStorage.setItem('name',name);
        localStorage.setItem('user_id',data.user_id);
         this.loading = false;
        console.log(localStorage.getItem('user_id'));
        // $("#myModalLoader").hide("slow");
        if(data!=null){
         
          //this.route.navigate(['/startquiz']);
        }
        else{
          console.log("Error");
          $("#myModal").show("slow");
        }
        }
      );
  }
  close() {
   $("#myModal").hide();
  }

  OnSubmitLogin(name:string,password:string){
  
  this.loading = true;
  setTimeout(function(){this.loading = false; }, 3000);
    localStorage.clear();
    localStorage.setItem('participant',name);
    
    console.log(name,password);
        this.quizService.loginUser(name,password).subscribe(
        (data: any) => {
        console.log("data",data);
        this.loading = false;
        if(data>0){
         localStorage.setItem('participantID',data);
         localStorage.setItem('name',name);
        this.route.navigate(['/startquiz']);
        }
        else{
          console.log("Error");
          $("#myModal").show("slow");
        }
        }
      );
       
    
   

  }

  verify(token:string){
      
      var id=(localStorage.getItem('user_id'));
      console.log(id,localStorage.getItem('user_id'));
        $("#myModalLoader").show("slow");
      
        this.quizService.verfiyToken(token,id).subscribe(
        (data: any) => {
        console.log("data",data);
         $("#myModalLoader").hide("slow");
        if(data==true){
        
          this.route.navigate(['/startquiz']);
        }
        else{
          console.log("Error");
          $("#myModal").show("slow");
        }
        }
      );
  }

  onClick(){
   (<HTMLElement>document.querySelector("#test1")).style.display="none";
  (<HTMLElement>document.querySelector("#test2")).style.display="block";
    let x = document.querySelector("#test2");
    if (x){
        x.scrollIntoView();
     }
    }

    onClick1(){
     (<HTMLElement>document.querySelector("#test1")).style.display="block";
  (<HTMLElement>document.querySelector("#test2")).style.display="none";
    let x = document.querySelector("#test1");
    if (x){
        x.scrollIntoView();
     }
    }
}

