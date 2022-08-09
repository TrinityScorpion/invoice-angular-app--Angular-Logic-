import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TutorialService } from './tutorial.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {
  stepOne1 :boolean;
  stepTwo1 :boolean;
  stepThree1 :boolean;

  stepOne2 :boolean;
  stepTwo2 :boolean;
  stepThree2 :boolean;

  stepOne3 = true;
  stepTwo3 = false;
  stepThree3 = false;

  stepOne4 = true;
  stepTwo4 = false;
  stepThree4 = false;

  stepOne5 = true;
  stepTwo5 = false;
  stepThree5 = false;

  stepOne6 = true;
  stepTwo6 = false;
  stepThree6 = false;

  timeLeft: number = 2;
  interval1: string | number | NodeJS.Timeout;
  interval2: string | number | NodeJS.Timeout;
  interval3: string | number | NodeJS.Timeout;
  interval4: string | number | NodeJS.Timeout;
  interval5: string | number | NodeJS.Timeout;
  interval6: string | number | NodeJS.Timeout;

  constructor(private tutorService: TutorialService) { }

  ngOnInit(): void {
    this.stepOne1 = this.tutorService.stepOne1;
    this.stepTwo1 = this.tutorService.stepTwo1;
    this.stepThree1 = this.tutorService.stepThree1;
  

    this.stepOne2 = true;
    this.stepTwo2 = false;
    this.stepThree2 = false;

    this.stepOne3 = true;
    this.stepTwo3 = false;
    this.stepThree3 = false;

    this.stepOne4 = true;
    this.stepTwo4 = false;
    this.stepThree4 = false;

    this.stepOne5 = true;
    this.stepTwo5 = false;
    this.stepThree5 = false;

    this.stepOne6 = true;
    this.stepTwo6 = false;
    this.stepThree6 = false;

  }

  onClickStepOne() {
    this.stepOne1 = false;
    this.stepTwo1 = true;
    this.stepThree1 = false;
    this.startTimer1();
  }

  onClickStepTwo() {
    this.stepOne2 = false;
    this.stepTwo2 = true;
    this.stepThree2 = false;
    this.startTimer2();
  }

  onClickStepThree() {
    this.stepOne3 = false;
    this.stepTwo3 = true;
    this.stepThree3 = false;
    this.startTimer3();
  }

  onClickStepFour() {
    this.stepOne4 = false;
    this.stepTwo4 = true;
    this.stepThree4 = false;
    this.startTimer4();
  }

  onClickStepFive() {
    this.stepOne5 = false;
    this.stepTwo5 = true;
    this.stepThree5 = false;
    this.startTimer5();
  }

  onClickStepSix() {
    this.stepOne6 = false;
    this.stepTwo6 = true;
    this.stepThree6 = false;
    this.startTimer6();
  }

  startTimer1() {
    this.interval1 = setInterval(() => {
      if (this.timeLeft > 0) {
        this.stepOne1 = false;
        this.stepTwo1 = false;
        this.stepThree1 = true;
        this.pauseTimer1();
      }
    }, 1000)

  }

  pauseTimer1() {
    clearInterval(this.interval1);

  }

  startTimer2() {
    this.interval2 = setInterval(() => {
      if (this.timeLeft > 0) {
        this.stepOne2 = false;
        this.stepTwo2 = false;
        this.stepThree2 = true;
        this.pauseTimer2();
      }
    }, 1000)

  }

  pauseTimer2() {
    clearInterval(this.interval2);

  }

  startTimer3() {
    this.interval3 = setInterval(() => {
      if (this.timeLeft > 0) {
        this.stepOne3 = false;
        this.stepTwo3 = false;
        this.stepThree3 = true;
        this.pauseTimer3();
      }
    }, 1000)

  }

  pauseTimer3() {
    clearInterval(this.interval3);

  }

  startTimer4() {
    this.interval4 = setInterval(() => {
      if (this.timeLeft > 0) {
        this.stepOne4 = false;
        this.stepTwo4 = false;
        this.stepThree4 = true;
        this.pauseTimer4();
      }
    }, 1000)

  }

  pauseTimer4() {
    clearInterval(this.interval4);

  }

  startTimer5() {
    this.interval5 = setInterval(() => {
      if (this.timeLeft > 0) {
        this.stepOne5 = false;
        this.stepTwo5 = false;
        this.stepThree5 = true;
        this.pauseTimer5();
      }
    }, 1000)

  }

  pauseTimer5() {
    clearInterval(this.interval5);

  }

  startTimer6() {
    this.interval6 = setInterval(() => {
      if (this.timeLeft > 0) {
        this.stepOne6 = false;
        this.stepTwo6 = false;
        this.stepThree6 = true;
        this.pauseTimer6();
      }
    }, 1000)

  }

  pauseTimer6() {
    clearInterval(this.interval6);

  }
}
