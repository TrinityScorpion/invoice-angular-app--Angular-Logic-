import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { RecipientComponent } from './recipient/recipient.component';
import { SenderComponent } from './sender/sender.component';
import { SidebarComponent } from './header/sidebar/sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { InvoiceEditComponent } from './invoice/invoice-edit/invoice-edit.component';
import { InvoiceItemComponent } from './invoice/invoice-item/invoice-item.component';
import { SenderItemComponent } from './sender/sender-item/sender-item.component';
import { SenderEditComponent } from './sender/sender-edit/sender-edit.component';
import { DatePipe } from '@angular/common';
import { RecipientEditComponent } from './recipient/recipient-edit/recipient-edit.component';
import { RecipientItemComponent } from './recipient/recipient-item/recipient-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownDirective } from './dropdown.directive';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { DocumentEditorAllModule } from '@syncfusion/ej2-angular-documenteditor';
import { HttpService } from './shared/http.service';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinner } from './shared/loading-spinner';
import { AuthGuard } from './auth/auth.guard';
import { TutorialComponent } from './tutorial/tutorial.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'invoices', component: InvoiceComponent, canActivate: [AuthGuard], children: [
    {path: 'new', component: InvoiceEditComponent},
    {path: ':id', component: InvoiceItemComponent},
    {path: ':id/edit', component: InvoiceEditComponent}
  ]},
  {path: 'recipients', component: RecipientComponent, canActivate: [AuthGuard], children: [
    {path: 'new', component: RecipientEditComponent},
    {path: ':id', component: RecipientItemComponent},
    {path: ':id/edit', component: RecipientEditComponent}
  ]},
  {path: 'senders', component: SenderComponent, canActivate: [AuthGuard], children: [
    {path: 'new', component: SenderEditComponent},
    {path: ':id', component: SenderItemComponent},
    {path: ':id/edit', component: SenderEditComponent}
  ]},
  
  {path: 'auth', component: AuthComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    InvoiceComponent,
    RecipientComponent,
    SenderComponent,
    SidebarComponent,
    HomeComponent,
    InvoiceEditComponent,
    InvoiceItemComponent,
    SenderItemComponent,
    SenderEditComponent,
    RecipientEditComponent,
    RecipientItemComponent,
    DropdownDirective,
    AuthComponent,
    LoadingSpinner,
    TutorialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    HttpClientModule,
    RichTextEditorModule,
    DocumentEditorAllModule,
    
  ],
  providers: [DatePipe, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
