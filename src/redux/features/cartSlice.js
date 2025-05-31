import { createSlice } from "@reduxjs/toolkit";

// default value
const initialState = null;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getProductTotal: (state, action) => {
      let { totalAmount, totalCount } = state.items.reduce(
        (ProductTotal, ProductItem) => {
          const { price, amount } = ProductItem;
          const itemTotal = price * amount;

          ProductTotal.totalAmount += itemTotal;
          ProductTotal.totalCount += amount;
          return ProductTotal;
        },
        {
          totalAmount: 0,
          totalCount: 0,
        }
      );
      state.totalAmount = parseInt(totalAmount.toFixed(2));
      state.totalCount = totalCount;
    },
    remove: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increase: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
    },
    decrease: (state, action) => {
      state.items = state.items
        .map((item) => {
          if (item.id === action.payload) {
            return { ...item, amount: item.amount - 1 };
          }
          return item;
        })
        .filter((item) => item.amount !== 0);
    },
    clearProduct: (state, action) => {
      state.items = [];
    },
    addProductToCart :(state, action) =>{
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
        existingItem.quantity += action.payload.quantity;
      } else {
        // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng
        state.push(action.payload);
      }
    },
    
  },
});
export const { addProductToCart, remove, increase, decrease, getProductTotal, getProductItems } = cartSlice.actions;
export const selectCart = (store) => store.cart; // lay du lieu tai khoan tu dong cap nha=> const user = useSelector(selectUser);
export default selectCart.reducer;
