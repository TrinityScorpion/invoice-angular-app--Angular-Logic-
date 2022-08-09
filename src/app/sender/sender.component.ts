import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart,  Router } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Sender } from './sender.model';
import { SenderService } from './sender.service';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent implements OnInit, OnDestroy {
  senders!: Sender[];
  sender!: Sender;
  id!: number;
  routingSenders = false;

  constructor(private senderService: SenderService, private router: Router, private route: ActivatedRoute, private dataStorage: DataStorageService) {

  }

  ngOnInit(): void {
    this.dataStorage.fetchSenders().subscribe();
    this.senders = this.senderService.getSenders();

    this.route.params.subscribe(
      (params) => {
        this.id = +params['id'];
        this.sender = this.senderService.getSender(this.id);
      }
    )

    this.routingSenders = false;
    this.senderService.senderChanged.subscribe(
      (senders: Sender[]) => {
        this.senders = senders;
      }
    )

    this.router.events.subscribe((events) => {
      if (events instanceof NavigationStart) {
        if (events.url === '/senders/new' || events.url === '/senders') {
          this.routingSenders = false;
        } else {
          this.routingSenders = true;
        }
      }
    });
    
    
  }

  onAddSender() {
    this.router.navigate(['new'], { relativeTo: this.route });
    this.routingSenders = true;
  } 

  onRemoveSender(index: number){
    if(confirm("Are you sure to delete "+name)) {
      this.senderService.deleteSenderByID(index);
      console.log(index);
      

      console.log("Implement delete functionality here");
    }
    
  }

  onSend(){
    this.dataStorage.createAndStoreSenders();
  }

  onFetch(){
    this.dataStorage.fetchSenders().subscribe();
  }

  ngOnDestroy(): void {
    this.dataStorage.createAndStoreSenders();
  }

}
