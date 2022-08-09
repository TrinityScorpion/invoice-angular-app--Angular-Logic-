import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from '../shared/data-storage.service';
import { DocumentCreator } from '../shared/document-generator';
import { EmailService } from '../shared/email.service';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sendEmail: any;
  mail: any;
  fileName = '';
  showTutorial = true;

  constructor(private http1: HttpClient, private documentEditor: DocumentCreator, private emailService: EmailService, private http: HttpService) {

  }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {

  }

  showTutorialPage() {
    this.showTutorial = !this.showTutorial;
  }

  getUrl()
{
  return "url('https://www.creativefabrica.com/wp-content/uploads/2021/06/03/Bill-Receipt-Invoice-Icon-Graphics-12870150-1.jpg')";
}
}
