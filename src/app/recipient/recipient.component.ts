import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipient } from './recipient.model';
import { RecipientService } from './recipient.service';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.css']
})
export class RecipientComponent implements OnInit, OnDestroy {

  recipients: Recipient[];
  recipient: Recipient;
  id!: number;
  routingRecipients = false;


  constructor(private recipientService: RecipientService, private router: Router, private route: ActivatedRoute, private dataStorage: DataStorageService) {

  }

  ngOnInit(): void {
    this.dataStorage.fetchRecipients().subscribe();

    this.recipients = this.recipientService.getRecipientsByUserID();
    this.route.params.subscribe(
      (params) => {
        this.id = +params['id'];
        this.recipient = this.recipientService.getRecipient(this.id);
      }
    )

    this.routingRecipients = false;
    this.recipientService.recipientChanged.subscribe(
      (recipients: Recipient[]) => {
        this.recipients = recipients;
      }
    )

    this.router.events.subscribe((events) => {
      if (events instanceof NavigationStart) {
        if (events.url === '/recipients/new' || events.url === '/recipients') {
          this.routingRecipients = false;
        } else {
          this.routingRecipients = true;
        }
      }
    });
    
    
  }

  onAddRecipient() {
    this.router.navigate(['new'], { relativeTo: this.route });
    this.routingRecipients = true;
  } 

  onRemoveRecipient(index: number){
    if(confirm("Are you sure to delete "+name)) {
      this.recipientService.deleteRecipientByID(index);
      console.log(index);
      
      console.log("Implement delete functionality here");
    }
    
  }

  onSend(){
    this.dataStorage.createAndStoreRecipients();
  }

  onFetch(){
    this.dataStorage.fetchRecipients().subscribe();
  }

  ngOnDestroy(): void {
    this.dataStorage.createAndStoreRecipients();

  }
}
