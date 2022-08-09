import { Component, Injectable, ViewChild, ViewEncapsulation } from "@angular/core";
import { Document, Paragraph, TextRun, Packer, Table, WidthType, TableCell, BorderStyle, TableRow, ImageRun, HeadingLevel, convertInchesToTwip, ShadingType, AlignmentType } from "docx";
import * as saveAs from 'file-saver';
import * as fs from 'file-saver';
import {
    DocumentEditorComponent, SelectionService, EditorService, SearchService, OptionsPaneService
} from '@syncfusion/ej2-angular-documenteditor';
import { HttpClient } from "@angular/common/http";
import { table } from "console";


@Injectable({ providedIn: 'root' })
export class DocumentCreator {
    create() {
      throw new Error('Method not implemented.');
    }

    @ViewChild('document_editor')
    public documentEditor: DocumentEditorComponent

    constructor(private http: HttpClient){

    }
    createDocument(
        docName: string,
        senderName: string,
        senderCompany: string,
        senderCompanyAdress: string,
        senderCity: string,
        senderCountry: string,
        recipientName: string,
        recipientCompany: string,
        recipientCompanyAdress: string,
        recipientCity: string,
        recipientCountry: string,
        invoiceNumber: number,
        invoiceCreated: string,
        invoicePayTo: string,
        invoiceDescription: string,
        invoiceQuantity: number,
        invoiceTax: number,
        invoiceSalary: number,
        summary: number,
        taxTotal: number,
        salaryNet: number
        ) {
        const table2 = new Table({
            alignment: AlignmentType.CENTER,
            rows: [ 
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                style: "Strong",
                                children: [
                                    new TextRun({
                                        text: "Sender",
                                    }),                                    
                                ],
                            }),]
                        }),                      
                        new TableCell({
                            children: [new Paragraph({
                                style: "Strong",
                                children: [
                                    new TextRun({
                                        text: "Recipient",
                                    }),                                    
                                ],
                            }),]
                            
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph(senderName)],

                        }),
                        new TableCell({
                            children: [new Paragraph(recipientName)],

                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph(senderCompany)],

                        }),                      
                        new TableCell({
                            children: [new Paragraph(recipientCompany)],

                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph(senderCompanyAdress)],

                        }),                       
                        new TableCell({
                            children: [new Paragraph(recipientCompanyAdress)],

                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph(senderCity)],

                        }),                       
                        new TableCell({
                            children: [new Paragraph(recipientCity)],

                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph(senderCountry)],

                        }),                       
                        new TableCell({
                            children: [new Paragraph(recipientCountry)],

                        }),
                    ],
                }),
                
            ],
            width: {
                size: 100,
                type: WidthType.PERCENTAGE,
            },
            margins: {
                top: convertInchesToTwip(0.1),
                bottom: convertInchesToTwip(0.1),
                right: convertInchesToTwip(0.1),
                left: convertInchesToTwip(0.1),
            },
        });

        const table3 = new Table({
            alignment: AlignmentType.CENTER,
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph({
                                style: "Strong",
                                children: [
                                    new TextRun({
                                        text: "Description",
                                    }),                                    
                                ],
                            }),]
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                style: "Strong",
                                children: [
                                    new TextRun({
                                        text: "Quantity",
                                    }),                                    
                                ],
                            }),]
                       
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                style: "Strong",
                                children: [
                                    new TextRun({
                                        text: "Unit Price",
                                    }),                                    
                                ],
                            }),]
                         
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                style: "Strong",
                                children: [
                                    new TextRun({
                                        text: "Total",
                                    }),                                    
                                ],
                            }),]
                            
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph(invoiceDescription)],

                        }),
                        new TableCell({
                            children: [new Paragraph(invoiceQuantity+'')],
                        }),
                        new TableCell({
                            children: [new Paragraph(invoiceSalary+'')],

                        }),
                        new TableCell({
                            children: [new Paragraph(summary+'')],

                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph("")],

                        }),
                        new TableCell({
                            children: [new Paragraph("")],
                        }),
                        new TableCell({
                            children: [new Paragraph("Tax Rate")],

                        }),
                        new TableCell({
                            children: [new Paragraph(invoiceTax +'')],

                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph(''),]

                        }),
                        new TableCell({
                            children: [new Paragraph('')],
                        }),
                        new TableCell({
                            children: [new Paragraph("Tax Total")],

                        }),
                        new TableCell({
                            children: [new Paragraph(taxTotal+'')],

                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph(''),]

                        }),
                        new TableCell({
                            children: [new Paragraph('')],
                        }),
                        new TableCell({
                            children: [new Paragraph("Salary (net)")],

                        }),
                        new TableCell({
                            children: [new Paragraph(salaryNet+'')],

                        }),
                    ],
                }),
            ],
            width: {
                size: 100,
                type: WidthType.PERCENTAGE,
            },
            margins: {
                top: convertInchesToTwip(0.1),
                bottom: convertInchesToTwip(0.1),
                right: convertInchesToTwip(0.1),
                left: convertInchesToTwip(0.1),
            },
        });
        
        console.log('DSADSDASDASDASADA'.bold());
        
        const doc = new Document({
            sections: [
                {
                    children: [
                        new Paragraph("ID: "+ invoiceNumber),
                        new Paragraph("Created: " + invoiceCreated),
                        new Paragraph("Pay to: "+ invoicePayTo),
                        new Paragraph(""),
                        new Paragraph(""),                    
                        table2,
                        new Paragraph(""),
                        new Paragraph(""),
                        table3,

                        
                    ],
                },
            ],title: "My Document",
        },);
        
        
        Packer.toBlob(doc).then((blob) => {
            // saveAs from FileSaver will download the file
            console.log(blob);
            
            saveAs(blob, docName + ".docx");   
            console.log('File created!');
                   
        });

        return doc;
    }
    
}