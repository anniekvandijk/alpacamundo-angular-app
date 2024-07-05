export interface Alpacashow {
    id: string;
    title: string;
    location: string;
    showYear: number;
    showDates: Date[];
    showName: string;
    judge: string;
    showresults: Showresults;
}

export interface Showresults {
    id: string;
    oldUrl: string;
    name: string;
    fileType: string;
}