import {Slayer} from './slayer';

export class Message {
  originator: Slayer;
  question: string;
  answer: string;
  timestamp: number;
  totalTime?: number;
  isTimerCompleted?: boolean;

  constructor(originator?: Slayer, question?: string, answer?: string, totalTime?: number) {
    this.originator = originator;
    this.question = question;
    this.answer = answer;
    this.totalTime = totalTime;
    this.timestamp = Date.now();
    this.isTimerCompleted = false;
  }
}
