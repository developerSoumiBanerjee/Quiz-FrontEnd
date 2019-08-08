import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private quizService : QuizService,private router : Router) { }

  ngOnInit() {
  }

  SignOut() {
    localStorage.clear();
    clearInterval(this.quizService.timer);
    this.quizService.seconds = 0;
    this.quizService.qnProgress = 0;
    this.router.navigate(['/']);
  }
  restart() {
    localStorage.setItem('qnProgress', "0");
    localStorage.setItem('opt', "0");
    localStorage.setItem('status', null);
    localStorage.setItem('qns', "");
   //localStorage.getItem('seconds' undefined);
  // this.quizService.seconds=undefined;
  clearInterval(this.quizService.timer );
    this.router.navigate(['/startquiz']);
  }

}
