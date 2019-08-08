import { Component, OnInit,Input  } from '@angular/core';
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
  @Input() showProgress:boolean = true;
  constructor(private router: Router, private quizService: QuizService,private route: ActivatedRoute) { 
        console.log(this.route.snapshot.paramMap.get('course'));
        this.course=this.route.snapshot.paramMap.get('course');
  }
  selectedItem = [];
  ans = [];
  ngOnInit() {

  

  console.log(this.selectedItem, (localStorage.getItem('seconds')));
    if(JSON.parse(localStorage.getItem('status'))>0){
      this.router.navigate(['/result']);
    }

   /* $(window).blur(function(e){
      console.log('done');
      e.preventDefault();
       $("#myModal").show("slow");
     
      });*/
     
    
      if(JSON.parse(localStorage.getItem('status'))==null){
       
       this.selectedItem=[];
       if(isNaN(this.quizService.seconds)){
       	this.quizService.seconds=undefined;
       }

        if(this.quizService.seconds==undefined){
localStorage.setItem('seconds',"0")
        	console.log(this.quizService.seconds,localStorage.setItem('seconds',"0"));

             this.quizService.seconds = 0;
             this.quizService.qnProgress = 0;
        }
          
        this.quizService.getQuestions(this.course).subscribe(
            (data: any) => {
            console.log(data);
            console.log(data[Math.floor(Math.random()*data.length)]);

              this.quizService.qns = [data[Math.floor(Math.random()*data.length)]];

              this.shuffleArray(this.quizService.qns[0].options);
              console.log(this.quizService.qns.length);
              if(this.quizService.qns.length>0){

            //  console.log(this.quizService.qns.length,this.quizService.seconds);
                if(this.quizService.seconds===0){
                  this.startTimer();
                  this.showProgress=false;
                }
              }
              else{
                this.router.navigate(['/startquiz']);
              }
            }
          );
        }
    }

  startTimer() {
    this.quizService.timer = setInterval(() => {
      this.quizService.seconds++;
     // console.log(this.quizService.seconds);
     // localStorage.setItem('seconds', this.quizService.seconds.toString());
    }, 1000);
     
 
  }
   SignOut(){
   localStorage.clear();
   this.router.navigate(['/register']);

 }


 shuffleArray(array) {
 console.log(array);
     var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
  select(option){
    console.log(option);
    this.selectedItem[0]=option;

  }
  checkValue(event,option,i){
  console.log(option,i);
  if(event.target.checked){
      if(this.selectedItem.includes(option)==false)
         console.log(option);
         this.selectedItem.push(option);
  }
  else{
    console.log(this.selectedItem.indexOf(option));
    var n=this.selectedItem.indexOf(option);
    this.selectedItem.splice(n, 1);;
  }

  console.log(this.selectedItem);
  }

  Answer(qID) {

    this.quizService.qns[this.quizService.qnProgress].answer = this.selectedItem;
     this.selectedItem=[];
  //  $(".optionsC option:checked").removeAttr("checked");
   // $('.optionsC input').prop('checked', false);
   console.log(this.quizService.qns);
    localStorage.setItem('qns', JSON.stringify(this.quizService.qns));
    this.quizService.qnProgress++;
    localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());
    if (this.quizService.qnProgress == this.quizService.qns.length  ) {
      clearInterval(this.quizService.timer);
      this.router.navigate(['/result']);
    }
  }

  done(qID) {
    this.quizService.qns[this.quizService.qnProgress].answer = this.selectedItem;
     this.selectedItem=[];
    localStorage.setItem('qns', JSON.stringify(this.quizService.qns));
    this.quizService.qnProgress++;
    localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());
    
      clearInterval(this.quizService.timer);
      this.router.navigate(['/result']);
    
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
