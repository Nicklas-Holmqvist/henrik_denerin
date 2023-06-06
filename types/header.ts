export interface HeaderInterface {
  allNavigations: {
    text: string;
    path: string;
    categories: {
      tagtitle: string;
    }[];
  }[];
  logo: {
    image: {
      url: string;
      alt: string;
    };
  };
}
