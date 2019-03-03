import {Message} from './message';
import {Slayer} from './slayer';

export class GameState {
  animal: string;
  isFinished = false;
  questions: Message[] = [];
  responder: Slayer;
  slayers: Slayer[] = [];
  gameID: string;
  winner?: Slayer;
}
