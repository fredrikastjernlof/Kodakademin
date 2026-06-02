import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'; 

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update(isOpen => !isOpen);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

}
