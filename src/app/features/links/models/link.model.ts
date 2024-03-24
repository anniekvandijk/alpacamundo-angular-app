export interface Link {
  id: string;
  body: string;
  image: Image;
  linkType: LinkType;
  title: string;
  url: string;
}

export interface LinkType {
  id: string;
  name: string;
}

export interface Image {
  id: string;
  name: string;
}