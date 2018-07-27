import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import {CertificateService } from '../certificate.service';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver/FileSaver';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  constructor(private quizService: QuizService, private router: Router,private certificateService:CertificateService) { 
     
  }
  result:boolean;
  ngOnInit() {

   localStorage.setItem('status', "1");
    this.result=false;
  }


  OnSubmit() {
   /* this.quizService.submitScore().subscribe(() => {
      this.restart();
    });*/
    this.result=true;      
    
    this.quizService.getAnswers().subscribe(
        (data: any) => {
        console.log(data);
          this.quizService.correctAnswerCount = data.correctAnswers;
          this.quizService.percentage= data.percentage;

        }
      );
  }

 

  saveFile(blobContent: Blob, fileName: string)  {
   pdfMake.vfs = pdfFonts.pdfMake.vfs;
   // playground requires you to assign document definition to a variable called dd



  
     pdfMake.createPdf(this.certificateService.certificateCreation( this.quizService.getParticipantName(), this.quizService.percentage)).download("Keystone_Certification_Details.pdf");
  }
   restart() {
    localStorage.setItem('qnProgress', "0");
     localStorage.setItem('status', "0");
    localStorage.setItem('qns', "");
    localStorage.setItem('seconds', "0");
    this.router.navigate(['/startquiz']);
  }
}
