import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { Game } from '../../models';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating = 0;
  gameId!: string;
  game!: Game;
  routeSub!: Subscription;
  gameSub!: Subscription;
  constructor(private activatedRoute: ActivatedRoute,
    private http: HttpService) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      console.log('params', params)
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    });
  }
  ngOnDestroy(): void {
    if(this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if(this.gameSub) {
      this.gameSub.unsubscribe();
    }
  }

  getGameDetails(id: string): void {
    this.gameSub = this.http
    .getGameDetails(id)
    .subscribe((gameResp: Game) =>{
      this.game = gameResp;
      console.log('gameResp',gameResp);
      setTimeout(()=>{
        this.gameRating = this.game.metacritic;
      },1000);
    });
  }

  getColor(value: number): string {
    if (value > 75){
      return '#5ee432';
    }
    if (value > 50) {
      return '#fffa50'
    }
    if (value > 30) {
      return '#f7aa38'
    }
    return '#ef4655';
  }
}
