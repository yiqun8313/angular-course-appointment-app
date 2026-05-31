import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
}

function generateCards(): Card[] {
  const values = ['A','A','B','B','C','C','D','D'];
  return values
    .map((value, index) => ({ id: index, value, isFlipped: false }))
    .sort(() => Math.random() - 0.5);
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-memory-game',
  template: `
    <section class="card">
      <h2>Memory Game</h2>
      <div class="grid">
        <button class="card" *ngFor="let card of cards(); index as i" (click)="flip(i)">
          {{ card.isFlipped ? card.value : '?' }}
        </button>
      </div>
      <div class="hint">Click to flip cards. Matching logic is illustrative.</div>
    </section>
  `,
  styles: [
    ".grid{display:grid;grid-template-columns:repeat(4,70px);gap:10px;justify-content:center;}",
    ".card{width:70px;height:70px;font-size:1.5rem;font-weight:700;background:#f8fafc;border:2px solid #cbd5e1;border-radius:14px;cursor:pointer;}",
    ".card:hover{background:#e2e8f0;}",
    ".hint{margin-top:10px;color:#475569;font-size:.9rem;text-align:center;}",
    "section.card{margin-bottom:24px;padding:16px;background:#fafafa;border:1px solid #e0e0e0;border-radius:16px;}",
    "h2{margin:0 0 12px;font-size:1.2rem;color:#1f2937;}"
  ]
})
export class MemoryGameComponent {
  cards = signal<Card[]>(generateCards());
  flipped = signal<number[]>([]);
  busy = signal(false);

  flip(index: number) {
    const currentCards = [...this.cards()];
    const selected = this.flipped();

    if (this.busy() || currentCards[index].isFlipped || selected.length === 2) return;

    currentCards[index].isFlipped = true;
    this.cards.set(currentCards);
    const nextSelected = [...selected, index];
    this.flipped.set(nextSelected);

    if (nextSelected.length === 2) {
      const [firstIndex, secondIndex] = nextSelected;
      const firstCard = currentCards[firstIndex];
      const secondCard = currentCards[secondIndex];

      if (firstCard.value === secondCard.value) {
        this.flipped.set([]);
      } else {
        this.busy.set(true);
        setTimeout(() => {
          const updatedCards = [...this.cards()];
          updatedCards[firstIndex].isFlipped = false;
          updatedCards[secondIndex].isFlipped = false;
          this.cards.set(updatedCards);
          this.flipped.set([]);
          this.busy.set(false);
        }, 800);
      }
    }
  }
}
