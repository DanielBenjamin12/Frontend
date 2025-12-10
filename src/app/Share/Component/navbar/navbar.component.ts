import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {
  isOpen = false;


  toggleMenu() {
    this.isOpen = !this.isOpen;
  }
}
