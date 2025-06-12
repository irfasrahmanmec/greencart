import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const currency  = import.meta.VITE_CURRENCY;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isseller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    setProducts(dummyProducts);
  }
  
  // Function to add an item to the cart
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId]+= 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Item added to cart");
  }

  //Update the cart items when the user adds an item
  const updateCartItems = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart updated successfully");
  };

  // Remove an item from the cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
      setCartItems(cartData);
      toast.success("Item removed from cart");
    } else {
      toast.error("Item not found in cart");
    }
  };

  // Get Cart Count
  const getCartCount = () =>{
    let totalCount = 0;
    for(const item in cartItems){
      totalCount += cartItems[item];
    }
    return totalCount;
  }

  // Get Cart Total Amount
  const getCartAmount = ()=>{
    let totalAmount = 0;
    for(const items in cartItems){
      let itemInfo = products.find((product) => product._id === items)
      if(cartItems[items] > 0){
        totalAmount += itemInfo.offerPrice * cartItems[items]
      }
    }
      return math.floor(totalAmount)
  }

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const value= {navigate, user, setUser, isseller, setIsSeller, 
    showUserLogin, setShowUserLogin, products, setProducts, currency, cartItems,
     addToCart, updateCartItems, removeFromCart, searchQuery, setSearchQuery,
    getCartAmount, getCartCount};

  
  return (
    <AppContext.Provider value={ value}>
      {children}
    </AppContext.Provider>
  );
}


export const useAppContext = () => {
  return useContext(AppContext)
};