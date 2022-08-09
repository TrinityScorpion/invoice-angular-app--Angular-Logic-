import { Injectable } from "@angular/core";
import { invoiceService } from "../invoice/invoice.service";
import { RecipientService } from "../recipient/recipient.service";
import { SenderService } from "../sender/sender.service";
import { HttpClient, HttpEventType, HttpParams } from "@angular/common/http";
import { Sender } from "../sender/sender.model";
import { map, tap, take, exhaustMap } from "rxjs";
import { Recipient } from "../recipient/recipient.model";
import { Invoice } from "../invoice/invoice.model";
import { AuthService } from "../auth/auth.service";
import { identifierName } from "@angular/compiler";

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private authService: AuthService, private senderService: SenderService, private recipientService: RecipientService, private invoiceService: invoiceService, private http: HttpClient) {

    }

    createAndStoreSenders() {
        const senders = this.senderService.getSenders();
        this.http.put<{ name: string }>('https://invoice-angular-app-database-default-rtdb.firebaseio.com/senders.json', senders).subscribe(responseData => {
            console.log(responseData);
        });
    }

    createAndStoreRecipients() {
        const recipients = this.recipientService.getRecipients();
        this.http.put<{ name: string }>('https://invoice-angular-app-database-default-rtdb.firebaseio.com/recipients.json', recipients).subscribe(responseData => {
            console.log(responseData);
        });
    }

    createAndStoreInvoices() {
        const invoices = this.invoiceService.getInvoices();
        this.http.put<{ name: string }>('https://invoice-angular-app-database-default-rtdb.firebaseio.com/invoices.json', invoices).subscribe(responseData => {
            console.log(responseData);
        });
    }

    fetchSenders() {
        return this.http.get<Sender[]>(
            'https://invoice-angular-app-database-default-rtdb.firebaseio.com/senders.json'
        )
            .pipe(
                map(senders => {
                    return senders.map(sender => {
                        return {
                            ...sender,

                        };
                    });
                }),
                tap((senders: Sender[]) => {
                    return this.senderService.setSenders(senders);
                })
            )
    }

    fetchRecipients() {
        return this.http.get<Recipient[]>(
            'https://invoice-angular-app-database-default-rtdb.firebaseio.com/recipients.json'
        )
            .pipe(
                map(recipients => {
                    return recipients.map(recipient => {
                        return {
                            ...recipient,


                        };
                    });
                }),
                tap((recipients: Recipient[]) => {
                    return this.recipientService.setRecipients(recipients);
                })
            )
    }

    fetchInvoices() {
        return this.authService.user.pipe(take(1),
            exhaustMap(user => {
                return this.http.get<Invoice[]>(
                    'https://invoice-angular-app-database-default-rtdb.firebaseio.com/invoices.json',
                    {
                        params: new HttpParams().set('auth', user.getToken())
                    }
                );
            }),
            map((invoices: Invoice[]) => {
                return invoices.map(invoice => {                  
                    return {
                        ...invoice,
                        senders: invoice.sender ? invoice.sender : [],
                        recipients: invoice.recipient ? invoice.recipient : []

                    };
                });
            }),
            tap((invoices: Invoice[]) => {
                this.invoiceService.setInvoices(invoices);
            })
        )
    }

    // deleteInvoice(index: number) {
    //     return this.authService.user.pipe(take(1),
    //         exhaustMap(user => {
    //             return this.http.delete<Invoice[]>(
    //                 'https://invoice-angular-app-database-default-rtdb.firebaseio.com/invoices2.json?id=1321313',
    //                 {
    //                     params: new HttpParams().set('auth', user.getToken())
    //                 }
    //             );
    //         }),

    //     )

    // }
}