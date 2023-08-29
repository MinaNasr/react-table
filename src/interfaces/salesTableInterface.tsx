
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

export interface IData {
    period: number;
    stateid: string;
    stateDescription: string;
    sectorid: string;
    sectorName: string;
    sales: number;
    "sales-units": string;
}
