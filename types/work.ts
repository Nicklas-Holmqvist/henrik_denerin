export interface WorkInterface {
  workinfo: {
    title: string;
    year: string;
    instrument: string;
    duration: string;
    dedication?: string;
    commision?: string;
    premiere?: string;
    programnote?: any;
    testprogramnote?: {
      value: any;
    };
    media?: string;
    spotify: string | null;
    excerpt?: {
      title: string;
      url: string;
    };
    babelscore?: string;
    tags?: {
      tagTitle: string;
    };
    soloTag?: {
      soloTagTitle: string;
    };
    id: number;
    param: string;
  };
}
