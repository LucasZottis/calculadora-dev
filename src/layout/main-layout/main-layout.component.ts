import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})

export class MainLayoutComponent {
  sidebarExpanded: boolean = false;
  sidebarStyle = 'sidebar';

  toggleSidebar() {
    this.sidebarExpanded = !this.sidebarExpanded;

    if (this.sidebarExpanded) {
      this.sidebarStyle = 'sidebar expanded';
    } else {
      this.sidebarStyle = 'sidebar';
    }
  }
}