import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TutorialService {

    stepOne1: boolean = true;
    stepTwo1: boolean = false;
    stepThree1: boolean = false;

    stepOne2: boolean;
    stepTwo2: boolean;
    stepThree2: boolean;

    stepOne3: boolean;
    stepTwo3: boolean;
    stepThree3: boolean;

    stepOne4: boolean;
    stepTwo4: boolean;
    stepThree4: boolean;

    stepOne5: boolean;
    stepTwo5: boolean;
    stepThree5: boolean;

    stepOne6: boolean;
    stepTwo6: boolean;
    stepThree6: boolean;

    constructor() { }

    ngOnInit(): void {
    }

    
}