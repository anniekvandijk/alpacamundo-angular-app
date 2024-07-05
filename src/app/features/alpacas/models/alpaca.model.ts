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
  offspring: Alpaca[];
  fleeceresults: Fleece[],
  showresults: Showresult[],
  images: Image[];
}

export interface Pedigree {
  id: string;
  name: string;
  contentType: string;
  documentCategory: string;
  url: string;
}

export interface Image {
  id: string;
  name: string;
  contentType: string;
  documentCategory: string;
  url: string;
}