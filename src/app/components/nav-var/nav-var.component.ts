import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-nav-var',
  templateUrl: './nav-var.component.html',
  styleUrls: ['./nav-var.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity:0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity:1}),
        animate('350ms',
          style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate',[
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset:'0'}),
            style({transform: 'rotate(2turn)', offset:'1'}),
      ]))
      ])
    ])
  ]
})
export class NavVarComponent implements OnInit{

  @Output() onToggleSidenav: EventEmitter<SideNavToggle> = new EventEmitter();
  
  collapsed = true;
  screenWidth = 0;
  navData= navbarData;
  multiple: boolean = false;

  @HostListener('window:resize', ['$event'])

  ngOnInit(): void {
    this.screenWidth= window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed= false;
      this.onToggleSidenav.emit({collapsed:this.collapsed, screenWidth: this.screenWidth});
    } else {
      this.collapsed= true;
      this.onToggleSidenav.emit({collapsed:this.collapsed, screenWidth: this.screenWidth});
    }
  }

 /*  onResize(event:any) {
    this.screenWidth= window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed= false;
      this.onToggleSidenav.emit({collapsed:this.collapsed, screenWidth: this.screenWidth});
    }
  } */
  
  togglecollapse():void {
    this.collapsed= !this.collapsed;
    this.onToggleSidenav.emit({collapsed:this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav():void {
    this.collapsed= false;
    this.onToggleSidenav.emit({collapsed:this.collapsed, screenWidth: this.screenWidth});
  }

}
