import { style } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

    @Input() collapsed = false;
    @Input() screenWidth = 0;

    getBodyClass (): string {
      let styleclass = '';

      if (this.collapsed && this.screenWidth > 768) {
        styleclass = 'body-trimmed';

      } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
        styleclass = 'body-md-screen'
      }
      return styleclass;
    }
}
