import { Fleece } from "./fleece.model";
import { Showresult } from "./showresult.model";

export interface Alpaca {
  id: string;
  shortName: string;
  shortNameSlug: string;
  longName: string;
  longNameSlug: string;
  description: string;
  breed: string;
  gender: string;
  color: string;
  dateOfBirth: Date;
  bornOnFarm: boolean;
  pedigree: Pedigree;
  mainImage: Image;
  category: string;
  status: string;
  damName: string | null;
  damId: string | null;
  dam: Alpaca;
  sireName: string | null;
  sireId: string | null;
  sire: Alpaca;
  randomText: string;
  studFee: number;
  sellPrice: number;
  offspring: Offspring[];
  fleeceresults: Fleece[],
  showresults: Showresult[],
  images: Image[];
}

export interface Offspring {
  id: string;
  alpaca: Alpaca;
}

export interface Pedigree {
  id: string;
  path: string | null;
  oldUrl: string;
  name: string;
  fileType: string;
}

export interface Image {
  id: string;
  path: string | null;
  oldUrl: string;
  name: string;
  fileType: string;
  about: string | null;
  alt: string;
  title: string;
  height: number;
  width: number;
}