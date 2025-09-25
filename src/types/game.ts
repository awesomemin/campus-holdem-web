export interface Game {
  id: number;
  time: string;
  place: string;
  particifationFee: number;
  rebuyinFee: number;
  startingChip: number;
  startingBB: number;
  estimatedDurationInMinutes: number;
  maxParticipant: number;
  minParticipant: number;
  status: 'COMPLETED' | 'CANCELED' | 'PLANNED' | 'PROGRESS';
  participants: Participant[];
}

export interface Participant {
  userId: number;
  status: 'CONFIRMED' | 'SUSPENDED';
  rank: number | null;
  ppiChange: number | null;
  User: {
    id: number;
    nickname: string;
    profilePictureUrl: string | null;
    ppi: number;
  };
}
