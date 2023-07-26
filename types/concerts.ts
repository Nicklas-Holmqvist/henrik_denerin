export interface ConcertsInterface {
  allConcerts: ConcertInterface[];
}

export interface ConcertInterface {
  date: any;
  place: string;
  piece: string;
  performer: string;
  additionalInfo?: string;
  firstPerformance?: boolean;
  link?: string;
  time?: string;
}
