import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
} from "./productTypes";

// thunk action (async)
export const addProduct = (newProduct) => async (dispatch) => {
  try {
    dispatch({ type: ADD_PRODUCT_REQUEST });

    const res = await fetch(import.meta.env.VITE_PRODUCTS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });

    if (!res.ok) throw new Error("Failed to add product");

    const created = await res.json();
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: created });
  } catch (err) {
    dispatch({ type: ADD_PRODUCT_FAILURE, payload: err.message });
  }
};
