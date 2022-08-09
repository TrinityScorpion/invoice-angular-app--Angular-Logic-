import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Sender } from "./sender.model";

@Injectable({ providedIn: 'root' })
export class SenderService {
    senderChanged = new Subject<Sender[]>();
    startedEditing = new Subject<number>();
    userID: string;
    senderByUser: Sender[] = [];

    private senders: Sender[] = [
        // new Sender(1, 'Sender1', 'Company1', 'CompanyAdress1', 'City1', 'Country1', 1111111,''),
        // new Sender(2, 'Sender2', 'Company2', 'CompanyAdress2', 'City2', 'Country2', 2222222,''),
        // new Sender(3, 'Sender3', 'Company3', 'CompanyAdress3', 'City3', 'Country3', 3333333,''),
        // new Sender(4, 'Sender4', 'Company4', 'CompanyAdress4', 'City4', 'Country4', 4444444,''),
    ]

    constructor(private authService: AuthService, private router: Router) {

    }

    getSenders(){
        return this.senders;
    }

    getSendersByUserID() {
        this.senderByUser = [];
        this.userID = this.authService.user.value.id;
        for (let i = 0; i < this.senders.length; i++) {
            if (this.senders[i].userID == this.userID) {
                if (Array.isArray(this.senderByUser)) {

                    this.senderByUser.push(this.senders[i]);

                } else {
                    console.log('not array');

                }
            }

        }
        return this.senderByUser;
    }

    addSender(sender: Sender){
        this.senders.push(sender);
        this.senderChanged.next(this.getSendersByUserID().slice())
    }

    getSenderByID(senderID: number){      
        for (let i = 0; i < this.senders.length; i++) {
            if(senderID==this.senders[i].id){
                return this.senders[i];              
            }           
        }
        return null;
    }

    getSender(index: number){       
        return this.senders[index];
        
    }

    deleteSender(index: number){
        this.senders.splice(index, 1);
        this.senderChanged.next(this.getSendersByUserID().slice())
    }

    deleteSenderByID(invoiceID: number) {
        let index: number;
        for (let i = 0; i < this.senders.length; i++) {
            if (invoiceID == this.senders[i].id) {
                index = this.senders.findIndex(x => x.id === invoiceID);
                this.senders.splice(index, 1);
                this.senderChanged.next(this.getSendersByUserID().slice());
            }

        }
    }

    updateSender(index: number, newSender: Sender){
        this.senders[index] = newSender;
        this.senderChanged.next(this.getSendersByUserID().slice())
    }

    updateSenderByID(senderID: number, newSender: Sender){
        for (let i = 0; i < this.senders.length; i++) {
            if(senderID==this.senders[i].id){
                this.senders[i] = newSender;              
            }           
        }
        this.senderChanged.next(this.getSendersByUserID().slice())
    }

    setSenders(senders: Sender[]){
        this.senders = senders;
        this.senderChanged.next(this.getSendersByUserID().slice())
        
    }
}