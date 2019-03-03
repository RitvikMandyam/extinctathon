import {Injectable} from '@angular/core';
import {Slayer} from './slayer';
import {AngularFirestore, AngularFirestoreDocument, DocumentSnapshot} from '@angular/fire/firestore';
import {GameState} from './game-state';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  slayer: AngularFirestoreDocument<Slayer>;
  gameState: AngularFirestoreDocument<GameState>;

  constructor(private db: AngularFirestore, private presenceDB: AngularFireDatabase) { }

  static convertCustomObjectToPlain(object: any) {
    return JSON.parse(JSON.stringify(object));
  }

  async checkForStoredSlayer() {
    const slayerName = sessionStorage.getItem('slayerName');
    if (slayerName) {
      await this.setSlayer(slayerName);
    }
  }

  async checkForStoredGame() {
    const gameID = sessionStorage.getItem('gameID');
    if (gameID) {
      await this.setGame(gameID, false);
    }
  }

  async setSlayer(slayerName: string) {
    this.slayer = this.db.doc<Slayer>(`slayers/${slayerName}`);
    this.slayer.get()
      .subscribe(async (snap: DocumentSnapshot<Slayer>) => {
        if (!snap.exists) {
          const newSlayer = new Slayer();
          newSlayer.name = slayerName;
          this.slayer.set(GlobalsService.convertCustomObjectToPlain(newSlayer));
        } else {
          await this.slayer.update({isActive: true});
        }
        sessionStorage.setItem('slayerName', slayerName);
      });
  }

  async setGame(gameId: string, shouldResetGameState: boolean) {
    this.gameState = this.db.doc<GameState>(`games/${gameId}`);
    if (shouldResetGameState) {
      const resetGameState = GlobalsService.convertCustomObjectToPlain(new GameState());
      await this.gameState.set(resetGameState);
    }
    sessionStorage.setItem('gameID', gameId);
  }

  takeSlayerOffline() {
    this.slayer.update({isActive: false, room: '', isInGame: {invitedBy: null, accepted: null},
      selected: false});
  }
}
