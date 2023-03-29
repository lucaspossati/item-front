import { Error } from "../error/error";

export class Item {
    itemCode:            string;
    description:         string;
    active:              boolean;
    customerDescription: string;
    salesItem:           boolean;
    stockItem:           boolean;
    purchasedItem:       boolean;
    barcode:             string;
    manageItemBy:        number;
    minimumInventory:    number;
    maximumInventory:    number;
    remarks:             string;
    imagePath:           string;
    errors:              Error[];
}
