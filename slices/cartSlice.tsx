import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items:[]
}


export const cartSlice = createSlice({
  name:'cart',
  initialState,
  reducers:{
    addToCart:(state,action)=>{
      state.items = [...state.items,action.payload]
    },
    removeFromCart:(state,action)=>{
        let newCart = [...state.items]
        let itemIndex = state.items.findIndex(item=>item._id === action.payload.id)
        console.log(itemIndex)
        if(itemIndex >= 0){
            newCart.splice(itemIndex,1)
        }else{
            console.log(`Cant remove product (id:${action.payload.id}) as its not in cart`)
        }
        state.items=newCart
    },
    emptyCart:(state)=>{
        state.items = []
    }
  }})

  export const {addToCart,removeFromCart,emptyCart} = cartSlice.actions

  export const selectCartItems = state => state.cart.items
  
  export const selectCartItemsById = (state,id) => state.cart.items?.filter(item=>item._id==id)

  export const selectCartTotal = state => state.cart.items.reduce((total,item)=>total=total+item.price,0)

  export default cartSlice.reducer