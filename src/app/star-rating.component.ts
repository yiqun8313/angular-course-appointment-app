import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-star-rating',
  template: `
    <section class="card">
      <h2>Star Rating</h2>
      <div class="stars">
        <span
          *ngFor="let star of stars"
          (click)="rating.set(star)"
          [class.active]="star <= rating()"
        >
          {{ star <= rating() ? '★' : '☆' }}
        </span>
      </div>
      <div class="rating-value">Current rating: {{ rating() }}</div>
    </section>
  `,
  styles: [
    ".stars{display:flex;gap:6px;font-size:2.2rem;cursor:pointer;}",
    "span{transition:transform .2s ease;color:#94a3b8;}",
    "span.active{color:#f59e0b;transform:scale(1.1);}",
    ".rating-value{margin-top:10px;color:#334155;font-size:.95rem;}",
    "section.card{margin-bottom:24px;padding:16px;background:#fafafa;border:1px solid #e0e0e0;border-radius:16px;}",
    "h2{margin:0 0 12px;font-size:1.2rem;color:#1f2937;}"
  ]
})
export class StarRatingComponent {
  stars = [1, 2, 3, 4, 5];
  rating = signal(0);
}
