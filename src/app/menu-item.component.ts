import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [ CommonModule ],
  selector: 'app-menu-item',
  template: `
    <li>
      <div class="menu-label" (click)="toggle()">{{ item.name }}</div>
      <ul *ngIf="isOpen()" class="submenu">
        <app-menu-item
          *ngFor="let child of item.children"
          [item]="child"
        ></app-menu-item>
      </ul>
    </li>
  `,
  styles: [
    ":host{display:block;}",
    ".menu-label{cursor:pointer;padding:8px 12px;border:1px solid #cbd5e1;border-radius:12px;background:#f8fafc;color:#1f2937;}",
    ".submenu{padding-left:16px;margin-top:8px;}",
    "li{list-style:none;}",
    ".menu-label:hover{background:#e2e8f0;}"
  ]
})
export class MenuItemComponent {
  @Input() item!: any;
  isOpen = signal(false);

  toggle() {
    this.isOpen.update(v => !v);
  }
}
