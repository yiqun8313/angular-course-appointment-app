import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-tic-tac-toe',
  template: `
    <section class="card">
      <h2>Tic Tac Toe</h2>
      <div class="board">
        <button
          class="cell"
          *ngFor="let cell of board(); index as i"
          (click)="play(i)"
          [disabled]="!!cell || !!winner() || isDraw()"
        >
          {{ cell || '-' }}
        </button>
      </div>
      <div class="status" *ngIf="winner(); else gameStatus">
        Winner: {{ winner() }}
      </div>
      <ng-template #gameStatus>
        <div class="status">{{ isDraw() ? 'Draw' : 'Next: ' + (isXNext() ? 'X' : 'O') }}</div>
      </ng-template>
      <button class="reset" type="button" (click)="reset()">Reset</button>
    </section>
  `,
  styles: [
    ".board{display:grid;grid-template-columns:repeat(3,80px);gap:8px;justify-content:center;margin:12px 0;}",
    ".cell{width:80px;height:80px;font-size:2rem;font-weight:700;background:#f8fafc;border:2px solid #cbd5e1;border-radius:14px;cursor:pointer;}",
    ".cell:hover{background:#e2e8f0;}",
    ".cell:disabled{cursor:not-allowed;color:#0f172a;}",
    ".status{color:#334155;font-size:.95rem;text-align:center;margin-top:8px;}",
    ".reset{display:block;margin:12px auto 0;padding:8px 14px;border:none;background:#2563eb;color:#fff;border-radius:8px;cursor:pointer;}",
    "section.card{margin-bottom:24px;padding:16px;background:#fafafa;border:1px solid #e0e0e0;border-radius:16px;}",
    "h2{margin:0 0 12px;font-size:1.2rem;color:#1f2937;}"
  ]
})
export class TicTacToeComponent {
  board = signal<(string | null)[]>(Array(9).fill(null));
  isXNext = signal(true);
  winner = signal<string | null>(null);

  play(i: number) {
    if (this.winner() || this.isDraw()) return;

    const board = [...this.board()];
    if (board[i]) return;

    board[i] = this.isXNext() ? 'X' : 'O';
    this.board.set(board);

    const winner = this.calculateWinner(board);
    if (winner) {
      this.winner.set(winner);
      return;
    }

    this.isXNext.update(v => !v);
  }

  isDraw() {
    return !this.winner() && this.board().every(Boolean);
  }

  reset() {
    this.board.set(Array(9).fill(null));
    this.isXNext.set(true);
    this.winner.set(null);
  }

  private calculateWinner(board: (string | null)[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  }
}
