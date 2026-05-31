import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-traffic-light',
  template: `
    <section class="card">
      <h2>Traffic Light</h2>
      <div class="traffic-light">
        <div
          class="light"
          *ngFor="let light of lights; index as i"
          [class.active]="current() === i"
          [ngStyle]="{
            'background-color': current() === i ? light.color : '#ddd',
            opacity: current() === i ? 1 : 0.35
          }"
          (click)="selectLight(i)"
        ></div>
      </div>
      <div class="current">
        Current: <strong>{{ lights[current()].color | uppercase }}</strong>
      </div>
      <div class="actions">
        <button type="button" (click)="pause()" [disabled]="paused()">Pause</button>
        <button type="button" (click)="resume()" [disabled]="!paused()">Resume</button>
      </div>
    </section>
  `,
  styles: [
    ".traffic-light{display:grid;gap:12px;padding:16px;background:#222;border-radius:16px;width:140px}",
    ".light{width:80px;height:80px;border-radius:50%;background:#ccc;cursor:pointer;transition:transform .2s ease,border .2s ease,opacity .2s ease;}",
    ".active{border:4px solid #fff;transform:scale(1.05);box-shadow:0 0 20px rgba(255,255,255,.25);}",
    ".current{margin-top:16px;font-size:1rem;color:#334155;}",
    ".actions{display:flex;gap:10px;margin-top:14px;}",
    "button{padding:8px 14px;border:none;background:#2563eb;color:#fff;border-radius:8px;cursor:pointer;}",
    "button:disabled{background:#94a3b8;cursor:not-allowed;}",
    "section.card{margin-bottom:24px;padding:16px;background:#fafafa;border:1px solid #e0e0e0;border-radius:16px;}",
    "h2{margin:0 0 12px;font-size:1.2rem;color:#1f2937;}"
  ]
})
export class TrafficLightComponent {
  lights = [
    { color: 'red', duration: 3000 },
    { color: 'yellow', duration: 1000 },
    { color: 'green', duration: 5000 }
  ];

  current = signal(0);
  paused = signal(false);


  selectLight(index: number) {
    this.current.set(index);
    this.paused.set(true);
  }

  pause() {
    this.paused.set(true);
  }

  resume() {
    this.paused.set(false);
  }

  constructor() {
    effect(() => {
      if (this.paused()) return;

      const i = this.current();

      const timer = setTimeout(() => {
        this.current.set((i + 1) % this.lights.length);
      }, this.lights[i].duration);
      return () => clearTimeout(timer);
    });
  }
}
