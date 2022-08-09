import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { invoiceService } from 'src/app/invoice/invoice.service';
import { Recipient } from 'src/app/recipient/recipient.model';
import { RecipientService } from 'src/app/recipient/recipient.service';
import { Sender } from 'src/app/sender/sender.model';
import { SenderService } from 'src/app/sender/sender.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Invoice } from '../invoice.model';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit {

  id: number;
  invoiceForm: FormGroup;
  editMode: boolean;
  routeSub: Subscription;
  invoiceId: number;
  invoice: Invoice;
  senders: Sender[] =[];
  recipients: Recipient[] =[];
  date: Date;

  hiddenSender = false;
  hiddenRecipient = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: invoiceService,
    public datepipe: DatePipe,
    private senderService: SenderService,
    private recipientService: RecipientService,
    private authService: AuthService, 
    private dataStorage: DataStorageService) { }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.dataStorage.fetchRecipients().subscribe();
    this.dataStorage.fetchSenders().subscribe();

    this.recipients = this.recipientService.getRecipientsByUserID();
    this.recipientService.recipientChanged.subscribe(
      (recipients: Recipient[]) => {
        this.recipients = recipients;
      }
    )

    this.senders = this.senderService.getSendersByUserID();
    this.senderService.senderChanged.subscribe(
      (senders: Sender[]) => {
        this.senders = senders;
      }
    )
    this.hiddenSender = false;
    this.hiddenRecipient = false;
    this.senders = this.senderService.getSenders();
    this.recipients = this.recipientService.getRecipients();
    this.invoiceForm = new FormGroup({
      'salary': new FormControl('1000', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'quantity': new FormControl('2', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'description': new FormControl('LG Salary', Validators.required),
      'tax': new FormControl('23', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'sender': new FormControl(0, [Validators.required, Validators.min(1)]),
      'recipient': new FormControl(0, [Validators.required, Validators.min(1)]),
    });

    this.routeSub = this.route.params.subscribe(params => {
      this.invoiceId = params['id'];
      this.invoice = this.invoiceService.getInvoiceByID(this.invoiceId);

      if (params['id'] != null) {
        this.editMode = true;
        this.invoiceForm = new FormGroup({
          'id': new FormControl(this.invoice.id, Validators.required),
          'created': new FormControl(this.invoice.created, Validators.required),
          'deadline': new FormControl(this.invoice.deadline, Validators.required),
          'salary': new FormControl(this.invoice.salary, Validators.required),
          'quantity': new FormControl(this.invoice.quantity, Validators.required),
          'description': new FormControl(this.invoice.description, Validators.required),
          'tax': new FormControl(this.invoice.tax, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
          'sender': new FormControl(this.invoice.sender, [Validators.required]),
          'recipient': new FormControl(this.invoice.recipient, [Validators.required]),
        });
      } else {
        this.editMode = false;
      }

    });
  }

  onBack() {
    this.router.navigate(['/invoices']);
  }

  onAddRecipient(recipient: Recipient){
    console.log(recipient);
    return recipient;   
  }

  onAddSender(sender: Recipient){
    console.log(sender);
    return sender;   
  }

  onSubmit() {
    const created = this.datepipe.transform(new Date, 'MM/dd/yyyy');
    let date: Date = new Date();
    date.setDate(date.getDate() + 10);
    let datePipe: DatePipe = new DatePipe('en-US');

    if (this.editMode) {
      const invoiceValue = new Invoice(
        this.invoice.id,
        this.invoice.created,
        this.invoice.deadline,
        this.invoiceForm.value['salary'],
        this.invoiceForm.value['quantity'],
        this.invoiceForm.value['tax'],
        this.invoiceForm.value['description'],
        this.invoiceForm.value['sender'],
        this.invoiceForm.value['recipient'],
        this.authService.user.value.id
      )
      
      
      this.invoiceService.updateInvoiceByID(this.invoiceId, invoiceValue);


    } else {
      const uniqueID = this.datepipe.transform(new Date, 'MMddyyyyhmmss')  + this.getRandomNumber(100, 1000);
      
      const newInvoice = new Invoice(
        Number(uniqueID),
        created,
        datePipe.transform(date, 'shortDate'),
        this.invoiceForm.value['salary'],
        this.invoiceForm.value['quantity'],
        this.invoiceForm.value['tax'],
        this.invoiceForm.value['description'],
        this.invoiceForm.value['sender'],
        this.invoiceForm.value['recipient'],
        this.authService.user.value.id
      );
      this.invoiceService.addInvoice(newInvoice);    
    }


    this.router.navigate(['/invoices']);
  }

  getRandomNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onHideSender(){
    this.hiddenSender = true;
  }

  onHideRecipient(){
    this.hiddenRecipient = true;
  }

}
