
export type LabelType = {
    name: string;
    percentage: string;
}

export type PhotoType = {
    id: string;
    image: string;
    labels: Array<LabelType>;
}