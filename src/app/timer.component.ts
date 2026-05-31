import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-timer',
  template: `
    <section class="card">
      <h2>Timer</h2>
      <div class="timer-display">{{ count() }}</div>
      <button (click)="start()" [disabled]="running">Start</button>
    </section>
  `,
  styles: [
    ".timer-display{font-size:3rem;font-weight:700;margin:12px 0;color:#0f172a;}",
    "button{padding:10px 18px;border:none;background:#2563eb;color:#fff;border-radius:10px;cursor:pointer;}",
    "button:disabled{background:#94a3b8;cursor:not-allowed;}",
    "section.card{margin-bottom:24px;padding:16px;background:#fafafa;border:1px solid #e0e0e0;border-radius:16px;}",
    "h2{margin:0 0 12px;font-size:1.2rem;color:#1f2937;}"
  ]
})
export class TimerComponent {
  count = signal(0);
  running = false;

  start() {
    if (this.running) return;
    this.running = true;
    setInterval(() => this.count.update(v => v + 1), 1000);
  }
}
