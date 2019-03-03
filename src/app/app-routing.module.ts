import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WillYouPlayComponent} from './will-you-play/will-you-play.component';
import {SlayerNameComponent} from './slayer-name/slayer-name.component';
import {RoomsComponent} from './rooms/rooms.component';
import {RoomSlayersListComponent} from './room-slayers-list/room-slayers-list.component';
import {GameComponent} from './game/game.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: WillYouPlayComponent},
  {path: 'slayer-name', component: SlayerNameComponent},
  {path: 'rooms', component: RoomsComponent},
  {path: 'room/:name', component: RoomSlayersListComponent},
  {path: 'play', component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
