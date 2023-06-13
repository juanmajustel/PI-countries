import {
  ERROR,
  ORDER_BY,
  GET_COUNTRIES,
  GET_ACTIVITIES,
  FILTER_ACT,
  FILTER_CONTINENT,
  GET_BY_NAME,
  GET_BY_ID,
  SET_ERROR,
} from "../actions/constantes";

let initialState = {
  allCountries: [],
  backupCountries: [],
  activities: [],
  detail: [],
  error: "",
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
        backupCountries: action.payload,
      };

    case GET_BY_NAME:
      return {
        ...state,
        allCountries: action.payload,
      };

    case GET_BY_ID:
      return {
        ...state,
        detail: action.payload,
      };

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case ORDER_BY:
      if (action.payload === "A-Z") {
        return {
          ...state,
          allCountries: [...state.allCountries].sort((prev, next) => {
            if (prev.name > next.name) return 1;
            if (prev.name < next.name) return -1;
            return 0;
          }),
        };
      }

      if (action.payload === "Z-A") {
        return {
          ...state,
          allCountries: [...state.allCountries].sort((prev, next) => {
            if (prev.name > next.name) return -1;
            if (prev.name < next.name) return 1;
            return 0;
          }),
        };
      }

      if (action.payload === "minPop") {
        return {
          ...state,
          allCountries: [...state.allCountries].sort(
            (prev, next) => prev.population - next.population
          ),
        };
      }

      if (action.payload === "maxPop") {
        return {
          ...state,
          allCountries: [...state.allCountries].sort(
            (prev, next) => next.population - prev.population
          ),
        };
      }

      return {
        ...state,
        allCountries: state.backupCountries,
      };

    case FILTER_ACT:
      let acts = state.activities;

      let filter =
        acts.length && action.payload === "All"
          ? state.backupCountries.filter((c) => c.activities.length > 0)
          : state.backupCountries.filter((c) =>
              c.activities.find((el) => el.name === action.payload)
            );

      if (filter.length > 0) {
        return {
          ...state,
          allCountries: filter,
        };
      }

      return {
        ...state,
        allCountries: state.backupCountries,
      };

    case FILTER_CONTINENT:
      let conts = state.backupCountries;

      conts =
        conts && action.payload === "All"
          ? conts
          : conts.filter((el) => el.continent === action.payload);

      return {
        ...state,
        allCountries: conts,
      };

    case ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
