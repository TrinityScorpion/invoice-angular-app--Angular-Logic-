export class Sender{
    public id: number;
    public name: string;
    public company: string;
    public companyAdress: string;
    public city: string;
    public country: string;
    public phoneNumber: number;
    public userID: string;


  constructor(
    id: number, 
    name: string, 
    company: string, 
    companyAdress: string, 
    city: string, 
    country: string, 
    phoneNumber: number,
    userID: string
) {
    this.id = id
    this.name = name
    this.company = company
    this.companyAdress = companyAdress
    this.city = city
    this.country = country
    this.phoneNumber = phoneNumber
    this.userID = userID
  }

}