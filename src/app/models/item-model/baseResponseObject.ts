import { Item } from "./item";

export interface BaseResponseObject {
    statusCode: 0;
    Message: string;
    success: boolean;
    data: Item;
}
