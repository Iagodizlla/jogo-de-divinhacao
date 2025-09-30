import { Injectable } from '@angular/core';

export interface Score {
  pontos: number;
  dificuldade: string;
  data: string;
}

@Injectable({
  providedIn: 'root'
})

export class RankingService {
  private storageKey = 'ranking';

  getRanking(): Score[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  addScore(score: Score): void {
    const ranking = this.getRanking();
    ranking.push(score);
    ranking.sort((a, b) => b.pontos - a.pontos);
    localStorage.setItem(this.storageKey, JSON.stringify(ranking.slice(0, 10)));
  }
}
