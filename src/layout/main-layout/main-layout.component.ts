import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})

export class MainLayoutComponent implements OnInit {
  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', function () {
      const menuItems = document.querySelectorAll('.menu-item');
      menuItems.forEach(item => {
        item.addEventListener('click', function (e) {
          e.preventDefault();
          menuItems.forEach(i => i.classList.remove('active'));
          this.classList.add('active');
        });
      });
    });
  }

}