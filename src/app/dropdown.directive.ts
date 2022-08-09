import { Directive, OnInit, HostBinding, HostListener } from "@angular/core";
@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
    @HostBinding('class') class: string = '';
    flag: boolean = false;
    ngOnInit() {

    }

    @HostListener('click') mouseclick(eventData: Event) {
        this.flag = !this.flag;
        if(this.flag==false){
            this.class = '';
        }else{
            this.class = 'open';
        }       

    }
}