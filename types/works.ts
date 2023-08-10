export interface WorksInterface {
  allWorkinfos: Works[];
}

export interface Works {
  title: string;
  year: string;
  instrument: string;
  id: number;
  param: string;
  tags?: {
    tagtitle: string;
  };
  soloTag?: {
    soloTagTitle: string;
  };
}
