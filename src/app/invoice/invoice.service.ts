import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { RecipientService } from "../recipient/recipient.service";
import { SenderService } from "../sender/sender.service";
import { Invoice } from "./invoice.model";

@Injectable({ providedIn: 'root' })
export class invoiceService implements OnInit {
    invoiceChanged = new Subject<Invoice[]>();
    startedEditing = new Subject<number>();
    userID: string;
    invoicesByUser: Invoice[] = [];

    private invoices: Invoice[] = [
        // new Invoice(1321312, 'new dsasdaDate()', 'new Dadsadsadsate()', 1, 1, 1, 'dsads', this.senderService.getSenderByID(1), this.recipientService.getRecipientByID(1),'uh0CLOWHX1bwPEzC77ML6UgVyug2'),
        // new Invoice(1321313, 'new dsasdaDate()', 'new Dadsadsadsate()', 1, 1, 1, 'dsads', this.senderService.getSenderByID(1), this.recipientService.getRecipientByID(1),'uh0CLOWHX1bwPEzC77ML6UgVyug2'),
        // new Invoice(1321314, 'new dsasdaDate()', 'new Dadsadsadsate()', 1, 1, 1, 'dsads', this.senderService.getSenderByID(1), this.recipientService.getRecipientByID(1),'uh0CLOdasWHX1bwPEzC77ML6UgVyug21'),
        // new Invoice(1321315, 'new dsasdaDate()', 'new Dadsadsadsate()', 1, 1, 1, 'dsads', this.senderService.getSenderByID(1), this.recipientService.getRecipientByID(1),'uh0CLOWHX1bdasaswPEzC77ML6UgVyug24'),
        // new Invoice(1321316, 'new dsasdaDate()', 'new Dadsadsadsate()', 1, 1, 1, 'dsads', this.senderService.getSenderByID(1), this.recipientService.getRecipientByID(1),'uh0CLOWHX1bwPdasdEzC77ML6UgVyug2dsa')
    ]

    constructor(private senderService: SenderService, private recipientService: RecipientService, private authService: AuthService, private router: Router) {

    }
    ngOnInit(): void {
        // this.userID = this.authService.user.value.id;


    }

    getInvoices() {
        return this.invoices.slice();
    }

    getInvoicesByUserID() {
        this.invoicesByUser = [];
        this.userID = this.authService.user.value.id;
        for (let i = 0; i < this.invoices.length; i++) {
            if (this.invoices[i].userID == this.userID) {
                if (Array.isArray(this.invoicesByUser)) {

                    this.invoicesByUser.push(this.invoices[i]);

                } else {
                    console.log('not array');

                }
            }

        }
        return this.invoicesByUser;
    }


    addInvoice(invoice: Invoice) {
        this.invoices.push(invoice);
        // this.router.navigate(['/invoices']);

        this.invoiceChanged.next(this.getInvoicesByUserID().slice())
    }

    getInvoiceByID(invoiceID: number) {
        for (let i = 0; i < this.invoices.length; i++) {
            if (invoiceID == this.invoices[i].id) {
                return this.invoices[i];
            }
        }
        return null;
    }

    getInvoice(index: number) {
        return this.invoices[index];


    }

    deleteInvoice(index: number) {
        this.invoices.splice(index, 1);
        this.invoiceChanged.next(this.getInvoicesByUserID().slice());

    }

    deleteInvoiceByID(invoiceID: number) {
        let index: number;
        for (let i = 0; i < this.invoices.length; i++) {
            if (invoiceID == this.invoices[i].id) {
                index = this.invoices.findIndex(x => x.id === invoiceID);
                this.invoices.splice(index, 1);
                this.invoiceChanged.next(this.getInvoicesByUserID().slice());
            }

        }
    }

    updateInvoice(index: number, newinvoice: Invoice) {
        this.invoices[index] = newinvoice;
        this.invoiceChanged.next(this.getInvoicesByUserID().slice());
    }

    updateInvoiceByID(invoiceID: number, newinvoice: Invoice) {
        for (let i = 0; i < this.invoices.length; i++) {
            if (invoiceID == this.invoices[i].id) {
                this.invoices[i] = newinvoice;
            }
        }
        this.invoiceChanged.next(this.getInvoicesByUserID().slice());
    }

    setInvoices(invoices: Invoice[]) {
        this.invoices = invoices;
        this.invoiceChanged.next(this.getInvoicesByUserID().slice())

    }

}