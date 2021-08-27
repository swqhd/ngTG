import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import {HttpService} from 'src/app/services/http.service';
import {APIResponse, Game} from '../../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort: string = '';
  public games!: Array<Game>;
  private routeSub!: Subscription;
  private gameSub!: Subscription;
  constructor(private http: HttpService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(
      (params: Params) => {
        if (params['game-search']) {
          this.searchGames('metacrit', params['game-search'])
        } else {
          this.searchGames('metacrit');
        }
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

  searchGames(sort: string, search?: string) {
    this.gameSub = this.http.getGamesList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);
      });
  }

  openGameDetails(id: string): void {
    console.log('open gamedetails', id)
    this.router.navigate(['details', id]);
  }
}
