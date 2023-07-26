export interface WorksInterface {
  allWorkinfos: Works[];
}

export interface Works {
  title: string;
  year: string;
  instrument: string;
  id: number;
  tags?: {
    tagtitle: string;
  };
  soloTag?: {
    soloTagTitle: string;
  };
}
