import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GlobalsService} from '../globals.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Message} from '../message';
import {Slayer} from '../slayer';
import {GameState} from '../game-state';
import {MatDialog} from '@angular/material';
import {WinnerDialogComponent} from '../winner-dialog/winner-dialog.component';
import {WaitingForSlayersComponent} from '../waiting-for-slayers/waiting-for-slayers.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [
    trigger('shrinkQuestionTimer', [
      state('void', style({
        width: '100%'
      })),
      state('true, false', style({
        width: '0',
        display: 'none'
      })),
      transition('* <=> *', animate('{{time}} linear'), {params: {time: '10s'}})
    ])
  ]
})
export class GameComponent implements OnInit {
  chatMessage = '';
  shouldDisableChatBar = false;
  slayer: Slayer;
  gameState: GameState;
  @ViewChild('chatInput') chatInput: ElementRef;

  constructor(private globals: GlobalsService, public dialog: MatDialog) {
  }

  async ngOnInit() {
    if (!this.globals.slayer) {
      await this.globals.checkForStoredSlayer();
    }
    if (!this.globals.gameState) {
      await this.globals.checkForStoredGame();
    }
    this.globals.slayer.valueChanges()
      .subscribe((slayer) => {
        this.slayer = slayer;
      });
    this.globals.gameState.valueChanges()
      .subscribe((gameState) => {
        if (!this.gameState) {
          this.gameState = gameState;
          if (this.slayer && !this.slayer.isResponder) {
            this.dialog.open(WaitingForSlayersComponent, {
              width: '250px',
              data: {slayers: this.gameState.slayers, currentSlayer: this.slayer}
            });
          }
        } else {
          if (!gameState.isFinished) {
            this.updateGameStateQuestions(gameState);
          } else {
            if (this.slayer.name === gameState.winner.name) {
              this.dialog.open(WinnerDialogComponent, {
                width: '250px',
                data: {winner: this.slayer, isWinningSlayer: true}
              });
            } else {
              if (!this.slayer.isResponder) {
                this.globals.slayer.update({losses: this.slayer.losses + 1});
              }
              this.dialog.open(WinnerDialogComponent, {
                width: '250px',
                data: {winner: gameState.winner, isWinningSlayer: false}
              });
            }
          }
        }
      });
  }

  async postChat() {
    if (this.slayer.isResponder) {
      if (this.filterQuestions(this.gameState.questions).length > 0) {
        this.shouldDisableChatBar = true;
        const updatedQuestions = GlobalsService.convertCustomObjectToPlain(this.gameState.questions) as Message[];
        const answeredQuestion = this.filterQuestions(updatedQuestions)[0];
        answeredQuestion.answer = this.chatMessage;
        this.globals.gameState
          .update({questions: updatedQuestions})
          .then(() => {
            this.shouldDisableChatBar = false;
            setTimeout(() => {
              this.chatInput.nativeElement.focus();
              this.chatInput.nativeElement.select();
            }, 0);
          });
        this.chatMessage = undefined;
      } else {
        this.chatMessage = undefined;
      }
    } else {
      const newQuestion = new Message(this.slayer, this.chatMessage);
      this.shouldDisableChatBar = true;
      let updatedQuestions = GlobalsService.convertCustomObjectToPlain(this.gameState.questions) as Message[];
      if (this.gameState.questions.length) {
        updatedQuestions.push(newQuestion);
      } else {
        updatedQuestions = [newQuestion];
      }
      if (this.chatMessage.toLowerCase().replace(/[^A-Za-z]/g, '').includes(this.gameState.animal.toLowerCase()
        .replace(/[^A-Za-z]/g, ''))) {
        await this.globals.gameState.update({questions: GlobalsService.convertCustomObjectToPlain(updatedQuestions),
          isFinished: true, winner: GlobalsService.convertCustomObjectToPlain(this.slayer)});
        await this.globals.slayer.update({isResponder: false, room: 'animalia', isInGame: {invitedBy: null, accepted: null},
          selected: false, wins: this.slayer.wins + 1});
      } else {
        this.globals.gameState.update({questions: GlobalsService.convertCustomObjectToPlain(updatedQuestions)})
          .then(() => {
            this.shouldDisableChatBar = false;
            setTimeout(() => {
              this.chatInput.nativeElement.focus();
              this.chatInput.nativeElement.select();
            }, 0);
          });
      }
      this.chatMessage = undefined;
    }
  }

  filterQuestions(questions: Message[]) {
    return questions.filter(e => !e.answer);
  }

  updateGameStateQuestions(newGameState: GameState) {
    let newQuestions: Message[] = newGameState.questions.filter(e => !JSON.stringify(this.gameState).includes(JSON.stringify(e)));
    if (!this.slayer.isResponder) {
      newQuestions = newQuestions.filter(e => e.originator.name === this.slayer.name);
    }
    for (const question of newQuestions) {
      setTimeout(() => question.isTimerCompleted = true, 5);
    }
    newQuestions.forEach(e => {
      if (!e.totalTime) {
        e.totalTime = 2 + e.question.split(' ').length + (0.5 * Math.log(this.gameState.slayers.length));
      }
    });
    for (const question of newQuestions) {
      if (this.gameState.questions.some((oldE) => oldE.question === question.question)) {
        const indexToUpdate = this.gameState.questions.findIndex(e => question.question === e.question);
        console.log(question);
        this.gameState.questions[indexToUpdate] = question;
      } else {
        this.gameState.questions.push(question);
      }
    }
    console.log(this.gameState.questions);
  }
}
