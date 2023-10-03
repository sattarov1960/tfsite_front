interface PaymentMethod {
    coms: number;
    comsView: number;
    min?: number;
    name: string;
}

export interface PaymentDataI {
    [key: string]: PaymentMethod;
}