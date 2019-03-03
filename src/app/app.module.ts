import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {WillYouPlayComponent} from './will-you-play/will-you-play.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {PaddedContainerComponent} from './padded-container/padded-container.component';
import {LogoComponent} from './logo/logo.component';
import {MadAddamComponent} from './mad-addam/mad-addam.component';
import {SlayerNameComponent} from './slayer-name/slayer-name.component';
import {RoomsComponent} from './rooms/rooms.component';
import {RoomSlayersListComponent} from './room-slayers-list/room-slayers-list.component';
import {FormsModule} from '@angular/forms';
import {GlobalsService} from './globals.service';
import {GameComponent} from './game/game.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import * as firebase from 'firebase';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {ChallengeIssuedDialogComponent} from './challenge-issued-dialog/challenge-issued-dialog.component';
import { WinnerDialogComponent } from './winner-dialog/winner-dialog.component';
import { WaitingForSlayersComponent } from './waiting-for-slayers/waiting-for-slayers.component';
import {AngularFireDatabaseModule} from '@angular/fire/database';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    WillYouPlayComponent,
    PaddedContainerComponent,
    LogoComponent,
    MadAddamComponent,
    SlayerNameComponent,
    RoomsComponent,
    RoomSlayersListComponent,
    GameComponent,
    ChallengeIssuedDialogComponent,
    WinnerDialogComponent,
    WaitingForSlayersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatToolbarModule,
    MatTableModule,
    MatAutocompleteModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  entryComponents: [
    RoomSlayersListComponent,
    ChallengeIssuedDialogComponent,
    GameComponent,
    WinnerDialogComponent,
    WaitingForSlayersComponent
  ],
  providers: [GlobalsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
