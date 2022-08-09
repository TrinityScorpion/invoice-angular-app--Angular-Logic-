import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class EmailService{

    constructor(private http: HttpClient) {}

    sendMessage(body: any) {
      return this.http.post('http://localhost:3000/sendmail', body);
    }

    sendWithAttachment(userData: any) {

        this.http.post("http://localhost:3000/uploadfile", userData
        )
          .subscribe(
            data => {
              console.log("Sent Request is successful ", data);
            },
            error => {
              console.log("Error", error);
            }
          );
      }
}