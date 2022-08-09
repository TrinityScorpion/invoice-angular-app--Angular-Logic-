import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Recipient } from '../recipient.model';
import { RecipientService } from '../recipient.service';

@Component({
  selector: 'app-recipient-edit',
  templateUrl: './recipient-edit.component.html',
  styleUrls: ['./recipient-edit.component.css']
})
export class RecipientEditComponent implements OnInit {

  id: number;
  recipientForm: FormGroup;
  editMode: boolean;
  routeSub: Subscription;
  recipientId: number;
  recipient: Recipient;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipientService: RecipientService,
    public datepipe: DatePipe,
    private authService: AuthService) { }
  ngOnDestroy(): void {

  }

  ngOnInit(): void {

    // this.recipientForm = new FormGroup({
    //   'name': new FormControl('maniek', Validators.required),
    //   'company': new FormControl('Bit Solutions', Validators.required),
    //   'companyAdress': new FormControl('djnafaj 30', Validators.required),
    //   'city': new FormControl('Wrocław', Validators.required),
    //   'country': new FormControl('Polska', Validators.required),
    // });

    this.recipientForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'company': new FormControl('', Validators.required),
      'companyAdress': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required)
    });

    this.routeSub = this.route.params.subscribe(params => {
      this.recipientId = params['id'];
      this.recipient = this.recipientService.getRecipientByID(this.recipientId);

      if (params['id'] != null) {
        this.editMode = true;
        this.recipientForm = new FormGroup({
          'name': new FormControl(this.recipient.name, Validators.required),
          'company': new FormControl(this.recipient.company, Validators.required),
          'companyAdress': new FormControl(this.recipient.companyAdress, Validators.required),
          'city': new FormControl(this.recipient.city, Validators.required),
          'country': new FormControl(this.recipient.country, Validators.required)
        });
      } else {
        this.editMode = false;
      }

    });
  }

  onBack() {
    this.router.navigate(['/recipients']);

  }

  onSubmit() {
    if (this.editMode) {
      const recipientValue = new Recipient(
        this.recipient.id,
        this.recipientForm.value['name'],
        this.recipientForm.value['company'],
        this.recipientForm.value['companyAdress'],
        this.recipientForm.value['city'],
        this.recipientForm.value['country'],
        this.authService.user.value.id
      )
      this.recipientService.updateRecipientByID(this.recipientId, recipientValue);


    } else {
      const uniqueID = this.datepipe.transform(new Date, 'MMddyyyyhmmss');
      const newrecipient = new Recipient(
        Number(uniqueID),
        this.recipientForm.value['name'],
        this.recipientForm.value['company'],
        this.recipientForm.value['companyAdress'],
        this.recipientForm.value['city'],
        this.recipientForm.value['country'],
        this.authService.user.value.id
      );
      this.recipientService.addRecipient(newrecipient);

    }
    this.router.navigate(['/recipients']);
  }

  getRandomNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
