import { types } from "../types/types";

export const uiSetError = (msgError) => ({
  type: types.uiSetError,
  payload: msgError
})

export const uiRemoveError = () => ({
  type: types.uiRemoveError
})

export const startLoading = () => ({
  type: types.uiStartLoading
})

export const finishLoading = () => ({
  type: types.uiFinishLoading
})
