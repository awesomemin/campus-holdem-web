export interface Game {
  gameId: number;
  time: string;
  place: string;
  particifationFee: number;
  rebuyinFee: number;
  startingChip: number;
  startingBB: number;
  estimatedDurationInMinutes: number;
  maxParticipant: number;
  minimumParticipant: number;
  participants: Participant[];
}

export interface Participant {
  profileImgUrl: string;
  name: string;
  ppi: number;
  isConfirmed: boolean;
}
