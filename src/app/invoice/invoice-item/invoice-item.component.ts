import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { invoiceService } from 'src/app/invoice/invoice.service';
import { DocumentCreator } from 'src/app/shared/document-generator';
import { HttpService } from 'src/app/shared/http.service';
import { Invoice } from '../invoice.model';

@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.css']
})
export class InvoiceItemComponent implements OnInit {
  @Input() index!: number;
  invoice: Invoice;
  routeSub: Subscription;
  invoiceId: number;
  totalGross: number;
  taxSalary: number;
  salaryNet: number;
  filePath: string;
  datepipe: any;
  array: string[];
  userEmail: string;


  constructor(private route: ActivatedRoute, private invoiceService: invoiceService, private router: Router, private docGenerator: DocumentCreator, private http: HttpService, private authService: AuthService) { }


  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.invoiceId = params['id'];
      this.invoice = this.invoiceService.getInvoiceByID(this.invoiceId);
      // console.log(this.invoiceService.getInvoiceByID(this.invoiceId));
    });
    this.totalGross = this.invoice.salary * this.invoice.quantity;
    this.taxSalary = this.totalGross * (this.invoice.tax / 100);
    this.salaryNet = this.totalGross - this.taxSalary;


    this.authService.user.subscribe(user =>{
      this.userEmail = this.authService.user.value.email;     
    });
  }


  onBack() {
    this.router.navigate(['/invoices']);
  }

  onFileSelected(event: any) {
    this.sendFileByEmail();
  }

  onDownload() {
    // const additionalUniqueID = this.datepipe.transform(new Date, 'MMddyyyyhmmss')
    this.docGenerator.createDocument(
      this.invoice.id + '_invoice_',
      this.invoice.sender.name,
      this.invoice.sender.company,
      this.invoice.sender.companyAdress,
      this.invoice.sender.city,
      this.invoice.sender.country,
      this.invoice.recipient.name,
      this.invoice.recipient.company,
      this.invoice.recipient.companyAdress,
      this.invoice.recipient.city,
      this.invoice.recipient.country,
      this.invoice.id,
      this.invoice.created,
      this.invoice.deadline,
      this.invoice.description,
      this.invoice.quantity,
      this.invoice.tax,
      this.invoice.salary,
      this.totalGross,
      this.taxSalary,
      this.salaryNet

    );
  }

  sendFileByEmail() {
    let user = {
      email: this.userEmail,
      invoice: this.invoice,
      totalGross: this.totalGross,
      taxSalary: this.taxSalary,
      salaryNet: this.salaryNet
    }
    this.http.sendEmail("http://localhost:3000/sendmail", user).subscribe(
      data => {
        let res: any = data;
        console.log(
          `👏 > 👏 > 👏 > 👏 Maniek is successfully register and mail has been sent and the message id is ${res.messageId}`
        );
      },
    );
  }

  sendFileByEmailwithAttachment() {
    const formData = new FormData();
    let content = "Hello Zip";
    let data = new Blob([content], { type: 'application/zip' });
    let arrayOfBlob = new Array<Blob>();
    let applicationZip = new File(arrayOfBlob, "Mock.zip", { type: 'application/zip' });
    formData.append
    let user = {
      email: this.userEmail,
      invoice: this.invoice
    }
    this.http.sendEmail("http://localhost:3000/sendmail", user).subscribe(
      data => {
        let res: any = data;
        console.log(
          `👏 > 👏 > 👏 > 👏 Maniek attachment is successfully register and mail has been sent and the message id is ${res.messageId}`
        );
      },
    );
  }

  getRandomNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
