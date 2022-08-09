import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { invoiceService } from './invoice/invoice.service';
import { RecipientService } from './recipient/recipient.service';
import { SenderService } from './sender/sender.service';
import { DataStorageService } from './shared/data-storage.service';
import { TutorialService } from './tutorial/tutorial.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'invoice-angular-app';

  constructor(private tutorService: TutorialService, private authService: AuthService, private senderService: SenderService, private recipientService: RecipientService, private invoiceService: invoiceService, private dataStorage: DataStorageService) {

  }

  ngOnInit(): void {
    this.dataStorage.fetchRecipients();
    this.dataStorage.fetchSenders();
    this.authService.autoLogin();
    console.log('im here');
    
  }
}
