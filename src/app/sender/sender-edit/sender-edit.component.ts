import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Sender } from '../sender.model';

import { SenderService } from '../sender.service';

@Component({
  selector: 'app-sender-edit',
  templateUrl: './sender-edit.component.html',
  styleUrls: ['./sender-edit.component.css']
})
export class SenderEditComponent implements OnInit, OnDestroy {
  id: number;
  senderForm!: FormGroup;
  editMode: boolean;
  routeSub: Subscription;
  senderId: number;
  sender: Sender;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private senderService: SenderService,
    public datepipe: DatePipe,
    private authService: AuthService) { }
  ngOnDestroy(): void {

  }

  ngOnInit(): void {

    // this.senderForm = new FormGroup({
    //   'name': new FormControl('maniek', Validators.required),
    //   'company': new FormControl('Bit Solutions', Validators.required),
    //   'companyAdress': new FormControl('djnafaj 30', Validators.required),
    //   'city': new FormControl('Wrocław', Validators.required),
    //   'country': new FormControl('Polska', Validators.required),
    //   'phone': new FormControl(11111111, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    // });

    this.senderForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'company': new FormControl('', Validators.required),
      'companyAdress': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'phone': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });

    this.routeSub = this.route.params.subscribe(params => {
      this.senderId = params['id'];
      this.sender = this.senderService.getSenderByID(this.senderId);

      if (params['id'] != null) {
        this.editMode = true;
        this.senderForm = new FormGroup({
          'name': new FormControl(this.sender.name, Validators.required),
          'company': new FormControl(this.sender.company, Validators.required),
          'companyAdress': new FormControl(this.sender.companyAdress, Validators.required),
          'city': new FormControl(this.sender.city, Validators.required),
          'country': new FormControl(this.sender.country, Validators.required),
          'phone': new FormControl(this.sender.phoneNumber, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        });
      } else {
        this.editMode = false;
      }

    });
  }

  onBack() {
    this.router.navigate(['/senders']);

  }

  onSubmit() {
    if (this.editMode) {
      const senderValue = new Sender(
        this.sender.id,
        this.senderForm.value['name'],
        this.senderForm.value['company'],
        this.senderForm.value['companyAdress'],
        this.senderForm.value['city'],
        this.senderForm.value['country'],
        this.senderForm.value['phone'],
        this.authService.user.value.id
      )
      this.senderService.updateSenderByID(this.senderId, senderValue);


    } else {
      const uniqueID = this.datepipe.transform(new Date, 'MMddyyyyhmmss');
      const newSender = new Sender(
        Number(uniqueID),
        this.senderForm.value['name'],
        this.senderForm.value['company'],
        this.senderForm.value['companyAdress'],
        this.senderForm.value['city'],
        this.senderForm.value['country'],
        this.senderForm.value['phone'],
        this.authService.user.value.id
      );
      this.senderService.addSender(newSender);

    }


    this.router.navigate(['/senders']);
  }

  getRandomNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
