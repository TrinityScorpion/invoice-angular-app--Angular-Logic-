import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Sender } from "../sender/sender.model";
import { SenderService } from "../sender/sender.service";
import { Recipient } from "./recipient.model";

@Injectable({ providedIn: 'root' })
export class RecipientService {
    recipientChanged = new Subject<Recipient[]>();
    startedEditing = new Subject<number>();
    userID: string;
    recipientByUser: Recipient[] = [];

    private recipients: Recipient[] = [
        // new Recipient(1, 'Recipient1', 'Company1', 'CompanyAdress1', 'City1', 'Country1'),
        // new Recipient(2, 'Recipient2', 'Company2', 'CompanyAdress2', 'City2', 'Country2'),
        // new Recipient(3, 'Recipient3', 'Company3', 'CompanyAdress3', 'City3', 'Country3'),
        // new Recipient(4, 'Recipient4', 'Company4', 'CompanyAdress4', 'City4', 'Country4'),
    ]

    constructor(private senderService: SenderService, private authService: AuthService, private router: Router) {

    }

    getRecipients(){
        return this.recipients.slice();
    }

    
    getRecipientsByUserID() {
        this.recipientByUser = [];
        this.userID = this.authService.user.value.id;
        for (let i = 0; i < this.recipients.length; i++) {
            if (this.recipients[i].userID == this.userID) {
                if (Array.isArray(this.recipientByUser)) {

                    this.recipientByUser.push(this.recipients[i]);

                } else {
                    console.log('not array');

                }
            }

        }
        return this.recipientByUser;
    }

    addRecipient(recipient: Recipient){
        this.recipients.push(recipient);
        this.recipientChanged.next(this.getRecipientsByUserID().slice())

    }

    getRecipientByID(recipientID: number){      
        for (let i = 0; i < this.recipients.length; i++) {
            if(recipientID==this.recipients[i].id){
                return this.recipients[i];              
            }           
        }
        return null;
    }

    getRecipient(index: number){       
        return this.recipients[index];
        
    }

    deleteRecipient(index: number){
        this.recipients.splice(index, 1);
        this.recipientChanged.next(this.getRecipientsByUserID().slice())

    }

    deleteRecipientByID(invoiceID: number) {
        let index: number;
        for (let i = 0; i < this.recipients.length; i++) {
            if (invoiceID == this.recipients[i].id) {
                index = this.recipients.findIndex(x => x.id === invoiceID);
                this.recipients.splice(index, 1);
                this.recipientChanged.next(this.getRecipientsByUserID().slice());
            }

        }

    }

    updateRecipient(index: number, newRecipient: Recipient){
        this.recipients[index] = newRecipient;
        this.recipientChanged.next(this.getRecipientsByUserID().slice())
    }

    updateRecipientByID(recipientID: number, newRecipient: Recipient){
        for (let i = 0; i < this.recipients.length; i++) {
            if(recipientID==this.recipients[i].id){
                this.recipients[i] = newRecipient;              
            }           
        }
        this.recipientChanged.next(this.getRecipientsByUserID().slice())
    }

    setRecipients(recipients: Recipient[]){
        this.recipients = recipients;
        this.recipientChanged.next(this.getRecipientsByUserID().slice())
        
    }
}