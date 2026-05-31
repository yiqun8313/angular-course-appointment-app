import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from './menu-item.component';

@Component({
  standalone: true,
  selector: 'app-recursive-menu',
  imports: [CommonModule, MenuItemComponent],
  template: `
    <section class="card">
      <h2>Recursive Menu</h2>
      <ul class="root-menu">
        <app-menu-item *ngFor="let item of menu" [item]="item"></app-menu-item>
      </ul>
    </section>
  `,
  styles: [
    ".root-menu{padding-left:0;margin:0;}",
    "section.card{margin-bottom:24px;padding:16px;background:#fafafa;border:1px solid #e0e0e0;border-radius:16px;}",
    "h2{margin:0 0 12px;font-size:1.2rem;color:#1f2937;}"
  ]
})
export class RecursiveMenuComponent {
  menu = [
    {
      name: 'Products',
      children: [
        { name: 'Phones', children: [] },
        {
          name: 'Accessories',
          children: [
            { name: 'Chargers', children: [] },
            { name: 'Cases', children: [] }
          ]
        }
      ]
    },
    {
      name: 'Services',
      children: [
        { name: 'Repair', children: [] },
        { name: 'Support', children: [] }
      ]
    },
    { name: 'About Us', children: [] }
  ];
}
