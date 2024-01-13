import { Dayjs } from "dayjs";

export type FieldType = {
    customer: string;
    name: string;
    projectHolder: {
        id: number;
    }
    priority: string;
    beginDate: Dayjs;
    deliverydate: Dayjs;
    comment: string;
}