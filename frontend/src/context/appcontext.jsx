import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const currency  = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

// Fetch Seller Status
  const fetchSeller = async () => {
    try {
      const {data} = await axios.get('/api/seller/is-auth')
      if(data.success) {
        setIsSeller(true)
      } else {
        setIsSeller(fasle)
      }
    } catch (error) {
      
    }
  }

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
  const updateCartItem = (itemId, quantity) => {
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
      }}
      setCartItems(cartData);
      toast.success("Item removed from cart");
    };

  // Get Cart Count
  const getCartCount = () =>{
    let totalCount = 0;
    for(const item in cartItems){
      totalCount += cartItems[item];
    }
    return totalCount;
  }

const getCartAmount = () => {
  let totalAmount = 0;
  for (const items in cartItems) {
    let itemInfo = products.find((product) => product._id === items);
    if (itemInfo && cartItems[items] > 0) {
      totalAmount += itemInfo.offerPrice * cartItems[items];
    }
  }
  return Math.floor(totalAmount);
}

  // Fetch products when the component mounts
  useEffect(() => {
    fetchSeller();
    fetchProducts();
  }, []);

  const value= {navigate, user, setUser, isSeller, setIsSeller, 
    showUserLogin, setShowUserLogin, products, setProducts, currency, cartItems,
     addToCart, updateCartItem, removeFromCart, searchQuery, setSearchQuery,
    getCartAmount, getCartCount, axios};

  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}


export const useAppContext = () => {
  return useContext(AppContext)
};