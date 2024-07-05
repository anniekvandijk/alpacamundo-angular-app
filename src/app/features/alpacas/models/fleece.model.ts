export interface Fleece {
    id: string;
    alpacaId: string;
    fleeceNumber: number;
    year: number;
    mfd: number;
    sd: number;
    cv: number;
    crv: number;
    cf: number;
    fleeceTestReport: FleeceTestReport | null;
}

export interface FleeceTestReport {
    id: string;
    oldUrl: string;
    name: string;
    fileType: string;
}
