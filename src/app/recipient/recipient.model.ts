export class Recipient {
    public id: number;
    public name: string;
    public company: string;
    public companyAdress: string;
    public city: string;
    public country: string;
    public userID: string;


  constructor(
    id: number, 
    name: string, 
    company: string, 
    companyAdress: string, 
    city: string, 
    country: string,
    userID: string
) {
    this.id = id
    this.name = name
    this.company = company
    this.companyAdress = companyAdress
    this.city = city
    this.country = country
    this.userID = userID
  }
    
}