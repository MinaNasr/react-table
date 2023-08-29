import { IData } from "../components/sales-table/SalesTableComponent";

export interface ITableApiResponse {
    apiVersion: string;
    request: {
        command: string;
        route: string;
        params?: []
    },
    response: {
        data: IData[];
        dateFormat: string;
        description: string;
        frequencey: string;
        id: string;
        total: number;
    }
}