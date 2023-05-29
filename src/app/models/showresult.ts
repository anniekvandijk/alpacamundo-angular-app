import { Alpaca } from "./alpaca";
import { Alpacashow } from "./alpacashow";

export interface Showresult {
    id: string;
    alpacaId: string;
    alpaca: Alpaca;
    alpacashowId: string;
    alpacashow: Alpacashow;
    title: string;
    result: string;
}