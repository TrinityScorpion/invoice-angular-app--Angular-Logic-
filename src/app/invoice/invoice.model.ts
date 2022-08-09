import { Recipient } from "../recipient/recipient.model";
import { Sender } from "../sender/sender.model";

export class Invoice{
    public id: number;
    public created: string;
    public deadline: string;
    public salary: number;
    public quantity: number;
    public tax: number;
    public description: string;
    public sender: Sender;
    public recipient: Recipient;
    public userID: string;

  constructor(
    id: number, 
    created: string, 
    deadline: string, 
    salary: number, 
    quantity: number, 
    tax: number, 
    description: string, 
    sender: Sender, 
    recipient: Recipient,
    userID: string
) {
    this.id = id
    this.created = created
    this.deadline = deadline
    this.salary = salary
    this.quantity = quantity
    this.tax = tax
    this.description = description
    this.sender = sender
    this.recipient = recipient
    this.userID = userID
  }
   

}

