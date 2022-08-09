import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { invoiceService } from '../invoice/invoice.service';
import { Invoice } from './invoice.model';
import { DatePipe } from '@angular/common';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipient } from '../recipient/recipient.model';
import { Sender } from '../sender/sender.model';
import { RecipientComponent } from '../recipient/recipient.component';
import { RecipientService } from '../recipient/recipient.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit, OnDestroy {

  invoices: Invoice[] = this.invoiceService.getInvoicesByUserID();
  invoice: Invoice;
  id!: number;
  routinginvoices = false;
  datepipe: any;
  recipients: Recipient[];
  senders: Sender[];


  constructor(private invoiceService: invoiceService, private router: Router, private route: ActivatedRoute, private dataStorage: DataStorageService, private recipientService: RecipientService) {

  }

  ngOnInit(): void {
    console.log(this.recipientService.getRecipients());

    this.dataStorage.fetchInvoices().subscribe();
  
    this.invoices = this.invoiceService.getInvoicesByUserID();
    this.route.params.subscribe(
      (params) => {
        this.id = +params['id'];
        this.invoice = this.invoiceService.getInvoice(this.id);
      }
    )

    this.routinginvoices = false;
    this.invoiceService.invoiceChanged.subscribe(
      (invoices: Invoice[]) => {
        this.invoices = invoices;
        
      }
    )
    

    this.router.events.subscribe((events) => {
      if (events instanceof NavigationStart) {
        if (events.url === '/invoices/new' || events.url === '/invoices') {
          this.routinginvoices = false;
        } else {
          this.routinginvoices = true;
        }
      }
    });

    
  }

  onAddInvoice() {
    this.router.navigate(['new'], { relativeTo: this.route });
    this.routinginvoices = true;
  }

  onRemoveInvoice(index: number) {

      if(confirm("Are you sure to delete "+name)) {
        this.invoiceService.deleteInvoiceByID(index);

        console.log("Implement delete functionality here");
      }
    
  }

  onSend(){
    this.dataStorage.createAndStoreInvoices();
  }

  onFetch(){
    this.dataStorage.fetchInvoices().subscribe();
    console.log(this.invoiceService.getInvoicesByUserID());
    
  }

  ngOnDestroy(): void {
    this.dataStorage.createAndStoreInvoices();

  }
}
