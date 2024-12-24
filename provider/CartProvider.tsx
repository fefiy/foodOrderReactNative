import { CartItem, Product } from "@/type";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
};
const CartContext = createContext<CartType>({
    items:[],
    addItem:()=>{}
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const addItem = (product:Product, size:CartItem["size"])=>{
     console.log("add cart ite,", product)
  }

  return (
    <CartContext.Provider value={{ items, addItem }}>{children}</CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
