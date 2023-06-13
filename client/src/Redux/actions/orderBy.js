import { ORDER_BY } from "./constantes";

export function orderBy(payload){
    return {
        type: ORDER_BY,
        payload
    }
};