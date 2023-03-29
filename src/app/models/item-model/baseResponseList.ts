import { Item } from "./item";

export interface BaseResponseList {
    statusCode: 0;
    Message: string;
    success: boolean;
    data: Item[];
}
