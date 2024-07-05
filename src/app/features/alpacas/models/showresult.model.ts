import { Alpaca } from "./alpaca.model";
import { Alpacashow } from "./alpacashow.model";

export interface Showresult {
    id: string;
    alpacaId: string;
    alpaca: Alpaca;
    alpacashowId: string;
    alpacashow: Alpacashow;
    title: string;
    result: string;
}