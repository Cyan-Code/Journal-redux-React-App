import { types } from "../../types/types";

describe('Pruebas sobre el objeto types', () => {

  test('Debe tener todos los types de la App', () => {
    expect(types).toEqual({
      login: '[Auth] Login',
      logout: '[Auth] Logout',

      uiSetError: '[UI] Set Error',
      uiRemoveError: '[UI] Remove Error',

      uiStartLoading: '[UI] Start loading',
      uiFinishLoading: '[UI] Finish loading',

      notesAddNew: '[Notes] New note',
      notesActive: '[Notes] Set active note',
      notesLoad: '[Notes] New note',
      notesUpdated: '[Notes] Updated note',
      notesFileUrl: '[Notes] Updated image url',
      notesDelete: '[Notes] Delete note',
      notesLogoutCleaning: '[Notes] Logout Cleaning' 
    })
  })
  
})

