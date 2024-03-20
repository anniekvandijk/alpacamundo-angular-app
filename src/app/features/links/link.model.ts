export interface Link {
  id: string;
  title: string;
  body: string;
  url: string;
  linkType: LinkType;
  image: Image;
}

export interface LinkType {
  id: string;
  name: string;
}

export interface Image {
  id: string;
  name: string;
}