import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { Sender } from '../sender.model';
import { SenderService } from '../sender.service';

@Component({
  selector: 'app-sender-item',
  templateUrl: './sender-item.component.html',
  styleUrls: ['./sender-item.component.css']
})
export class SenderItemComponent implements OnInit {
  @Input() index!: number;
  sender: Sender;
  routeSub: Subscription;
  senderId: number;

  constructor(private route: ActivatedRoute, private senderService: SenderService, private router: Router) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.senderId = params['id'];
      this.sender = this.senderService.getSenderByID(this.senderId);
      console.log(this.senderService.getSenderByID(this.senderId));

      
    });
   
  }
  onBack(){
    this.router.navigate(['/senders']);
  }

}
