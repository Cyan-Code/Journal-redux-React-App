import { types } from "../types/types";

const initialState = {
  notes: [],
  active: null
}

export const notesReducer = (state= initialState, action) => {
  switch (action.type) {
    
    case types.notesActive:
      return {
        ...state,
        active: { // se podria colocar directo, pero rompe la "relacion" y riega el spread?
          ...action.payload
        }
      }
    
    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload]
      }
    default: 
      return state;
  }
}
