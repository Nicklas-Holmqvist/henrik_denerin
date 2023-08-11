export interface WorksInterface {
  allWorkinfos: Work[];
}

export interface Work {
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

export interface SoloTags {
  allSoloTags: SoloTag[];
}

export interface SoloTag {
  soloTagTitle: string;
  id: number;
}
