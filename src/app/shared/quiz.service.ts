import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AnswerCollection} from '../answer-collection';
import { ActivatedRoute,Router } from '@angular/router';


@Injectable()
export class QuizService {
  //---------------- Properties---------------
  readonly rootUrl = 'http://localhost:8080';
  qns: any[];
  qnsAns:AnswerCollection[]=[];
  seconds: number;
  timer;
  qnProgress: number;
  correctAnswerCount: number = 0;
  percentage:number=0;

  //---------------- Helper Methods---------------
  constructor(private http: HttpClient,public router: Router) { }

  displayTimeElapsed() {
   if ( this.seconds>=30 ){
     this.seconds=0;
      this.router.navigate(['/result']);
    }
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);

  }

  getParticipantName() {
    var participant = {Name:'Soumi Banerjeee'};
    return participant.Name;
  }


  //---------------- Http Methods---------------

  insertParticipant(name: string, email: string,pwd: string) {
    var body = {
      user_name: name,
      email_id: email,
      pwd:pwd
    }
    return this.http.post(this.rootUrl + '/saveUser', body);
  }

  loginParticipant(name: string, pwd: string) {
    var body = {
      user_name: name,
      pwd: pwd
    }
    console.log(body);
    return this.http.post(this.rootUrl + '/loginAdmin', body);
  }

   loginUser(name: string, pwd: string) {
    var body = {
      user_name: name,
      pwd: pwd
    }
    return this.http.post(this.rootUrl + '/loginUser', body);
  }

  getQuestions(course:string) {
  var body = {
      courseName: course
  }
    return this.http.post(this.rootUrl + '/quiz/fetchQuestions',body);
  
  }

  getCourses() {
  
    return this.http.get(this.rootUrl + '/quiz/courses');
  
  }

  getAnswers() {
    var body = this.qns.map(x => x.QnID);

    for(var x=0;x<this.qns.length;x++)
    {
       this.qnsAns[x]={question_no:0,answer:0,courseID:0,userId:0};
       this.qnsAns[x].question_no=this.qns[x].question_no;
       this.qnsAns[x].answer=this.qns[x].answer;
       this.qnsAns[x].courseID=this.qns[x].course_id;
       this.qnsAns[x].userId= JSON.parse(localStorage.getItem('participantID'));
    }
    console.log(this.qnsAns);
    return this.http.post(this.rootUrl + '/quiz/fetchResults', this.qnsAns);
  }

  submitScore() {
    var body = JSON.parse(localStorage.getItem('participant'));
    body.Score = this.correctAnswerCount;
    body.TimeSpent = this.seconds;
    return this.http.post(this.rootUrl + "/api/UpdateOutput", body);
  }
  getQuestionsAdmin(course:number){
    var body = {
      courseId: course
  };
    return this.http.post(this.rootUrl + '/viewQuestions',body);

  }
  updateQuestionsAdmin(question:any){
     return this.http.post(this.rootUrl + '/updateQuestions', question);

  }

 delQuestionsAdmin(question:any){
     return this.http.post(this.rootUrl + '/deleteQuestions', question);

  }

  addCourse(course:string){
  var body={
  
      course:course
    
  };
  console.log(body);
     return this.http.post(this.rootUrl + '/addCourse', body);

  }

  getResult(id:number){
  var body={
    user_id:id
  };
     return this.http.post(this.rootUrl + '/viewresult', body);

  }
  addQuestionsAdmin(question:string,answer:string,course:string,option1:string,option2:string,option3:string,option4:string){

  var body={
    questions:question,
    answer:answer,
    course_id:course,
    option1:option1,
    option2:option2,
    option3:option3,
    option4:option4,
    course_details:{
      id:course
    }
  }
  console.log(body);
     return this.http.post(this.rootUrl + '/addQuestions', body);

  }
}
