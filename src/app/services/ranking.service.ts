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

  getRanking(): Record<string, Score[]> {
    const data = localStorage.getItem(this.storageKey);
    const ranking = data ? JSON.parse(data) : {};
    return {
      Fácil: ranking?.Fácil || [],
      Médio: ranking?.Médio || [],
      Difícil: ranking?.Difícil || [],
    };
  }

  addScore(score: Score): void {
    const ranking = this.getRanking();

    if (!ranking[score.dificuldade]) ranking[score.dificuldade] = [];
    ranking[score.dificuldade].push(score);

    ranking[score.dificuldade].sort((a, b) => b.pontos - a.pontos);
    ranking[score.dificuldade] = ranking[score.dificuldade].slice(0, 10);

    localStorage.setItem(this.storageKey, JSON.stringify(ranking));
  }
}
