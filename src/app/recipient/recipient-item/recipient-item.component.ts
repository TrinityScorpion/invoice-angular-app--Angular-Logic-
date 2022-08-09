import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';ActivatedRoute
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipient } from '../recipient.model';
import { RecipientService } from '../recipient.service';

@Component({
  selector: 'app-recipient-item',
  templateUrl: './recipient-item.component.html',
  styleUrls: ['./recipient-item.component.css']
})
export class RecipientItemComponent implements OnInit {

  @Input() index!: number;
  recipient: Recipient;
  routeSub: Subscription;
  recipientId: number;

  constructor(private route: ActivatedRoute, private recipientService: RecipientService, private router: Router) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.recipientId = params['id'];
      this.recipient = this.recipientService.getRecipientByID(this.recipientId);
      console.log(this.recipientService.getRecipientByID(this.recipientId));
      console.log(new Date());
      
      
    });
   
  }
  onBack(){
    this.router.navigate(['/recipients']);
  }

}
