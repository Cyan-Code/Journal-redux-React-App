import { finishLoading, startLoading, uiRemoveError, uiSetError } from "../../actions/uiState"
import { types } from "../../types/types"

describe('Pruebas sonbre uiState (action)', () => {
  
  test('Todas las actions deben ejecutarse', () => {
    
    const action = uiSetError('Hola Mundo');
    expect( action ).toEqual({
      type: types.uiSetError,
      payload: 'Hola Mundo'
    });

    const removeError = uiRemoveError();
    const loading = startLoading();
    const finishLoad = finishLoading();
    
    expect(removeError).toEqual({
      type: types.uiRemoveError
    });
    expect(loading).toEqual({
      type: types.uiStartLoading
    });
    expect(finishLoad).toEqual({
      type: types.uiFinishLoading
    });
  })
})

