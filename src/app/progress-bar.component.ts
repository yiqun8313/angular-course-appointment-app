import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-progress-bar',
  template: `
    <section class="card">
      <h2>Progress Bar</h2>
      <div class="wrapper">
        <div class="bar" [style.width.%]="progress()"></div>
      </div>
      <div class="controls">
        <button (click)="increment()">+10%</button>
        <button (click)="reset()" class="muted">Reset</button>
      </div>
    </section>
  `,
  styles: [
    ".wrapper{width:100%;max-width:320px;height:22px;border:1px solid #cbd5e1;border-radius:12px;overflow:hidden;background:#f8fafc;margin:12px 0;}",
    ".bar{height:100%;background:#22c55e;transition:width .3s ease;}",
    ".controls{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px;}",
    "button{padding:10px 16px;border:none;border-radius:10px;cursor:pointer;background:#2563eb;color:#fff;}",
    "button.muted{background:#64748b;}",
    "section.card{margin-bottom:24px;padding:16px;background:#fafafa;border:1px solid #e0e0e0;border-radius:16px;}",
    "h2{margin:0 0 12px;font-size:1.2rem;color:#1f2937;}"
  ]
})
export class ProgressBarComponent {
  progress = signal(0);

  increment() {
    this.progress.update(v => Math.min(v + 10, 100));
  }

  reset() {
    this.progress.set(0);
  }
}
