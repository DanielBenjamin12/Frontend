import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [
    CommonModule

  ],
  templateUrl: './footer.component.html',
  styles: ``
})
export class FooterComponent {
  newYear: number = new Date().getFullYear();

}
