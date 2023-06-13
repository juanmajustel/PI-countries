import { FILTER_ACT, FILTER_CONTINENT } from "./constantes";

export function filterAct(payload){
    return {
        type: FILTER_ACT,
        payload
    }
};


export function filterContinent(payload){
    return {
        type: FILTER_CONTINENT,
        payload
    }
};
