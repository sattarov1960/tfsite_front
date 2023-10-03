export interface TransactionI {
	symbol: string;
	amount: number;
	data: number;
	id: string;
	type: string;
	platform: string;
	status: string;
}

export interface TransactionItemsI {
    items: TransactionI[]
}