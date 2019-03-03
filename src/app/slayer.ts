export class Slayer {
  name: string;
  wins = 0;
  losses = 0;
  isGrandmaster = false;
  selected = false;
  isResponder?: boolean;
  room?: string;
  isActive ?= false;
  isInGame ?= {
    invitedBy: null,
    accepted: null
  };
}
