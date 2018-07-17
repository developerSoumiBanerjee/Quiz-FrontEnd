import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  course:string;
  constructor(private router: Router, private quizService: QuizService,private route: ActivatedRoute) { 
        console.log(this.route.snapshot.paramMap.get('course'));
        this.course=this.route.snapshot.paramMap.get('course');
  }
  selectedItem:number;
  ngOnInit() {

    if(JSON.parse(localStorage.getItem('status'))>0){
      this.router.navigate(['/result']);
    }

    /*$(window).blur(function(e){
      console.log('done');
      e.preventDefault();
       $("#myModal").show("slow");
     
      });*/
     
    
      if(JSON.parse(localStorage.getItem('status'))==null){
       
       this.selectedItem=-1;
       
        if(this.quizService.seconds==undefined){
             this.quizService.seconds = 0;
             this.quizService.qnProgress = 0;
        }
          
        this.quizService.getQuestions(this.course).subscribe(
            (data: any) => {
            
              this.quizService.qns = data;
              if(this.quizService.seconds==0){
              this.startTimer();
              }
            }
          );
        }
    }

  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
      localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);

      

  }
  select(i){
    console.log(i);
    this.selectedItem=i;

  }
  Answer(qID) {
    this.quizService.qns[this.quizService.qnProgress].answer = this.selectedItem;
     this.selectedItem=-1;
    localStorage.setItem('qns', JSON.stringify(this.quizService.qns));
    this.quizService.qnProgress++;
    localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());
    if (this.quizService.qnProgress == 2 || this.quizService.seconds>=30) {
      clearInterval(this.quizService.timer);
      this.router.navigate(['/result']);
    }
  }

  done(qID) {
    this.quizService.qns[this.quizService.qnProgress].answer = this.selectedItem;
     this.selectedItem=-1;
    localStorage.setItem('qns', JSON.stringify(this.quizService.qns));
    this.quizService.qnProgress++;
    localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());
    
      clearInterval(this.quizService.timer);
      this.router.navigate(['/result']);
    
  }

}
