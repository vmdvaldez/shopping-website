import { createContext, useEffect , useState, useRef} from "react";
import "../styles/MainPage.css";
import styles from "../styles/Navbar.module.css"
import LoadingScreen from "./Loading";
import cartSVG from '../assets/cart.svg'
import CartModal from "./ShoppingCart";

import { Outlet, Link } from "react-router-dom";


export const CartContext = createContext({
    cartItems: [],
    addToCart: ()=>{},
    removeFromCart: ()=>{}
});

function NavBar({cartCount, setCartCount}){
    const [showModal, setShowModal] = useState(false);

    return(
        <>
        <nav className={styles.navContainer}>
            <ul className={styles.nav}>
                <li className={`${styles.home} ${styles.navitems}`}>
                    <Link to="/" className={styles.navLinks}>Home</Link>
                </li>
                <li className={`${styles.storeName}`}>Fake Shop</li>
                <li className={`${styles.store} ${styles.navitems}` }>
                    <Link to="store" className={styles.navLinks}>Store</Link>
                </li>
                <li className={`${styles.cart} ${styles.navitems}`}>
                    <img src={cartSVG} onClick={()=>{setShowModal(!showModal)}}></img>
                    <div>{cartCount}</div>
                </li>
            </ul>
        </nav>
        {showModal && <CartModal cartCount={cartCount} setCartCount={setCartCount}/>}
        </>
    )
}

function MainPage(){
    const [loading, setLoading] = useState(true);
    const mensItems = useRef([]);
    const womensItems = useRef([]);
    const jewelry = useRef([]);
    const [cartCount, setCartCount] = useState(0);
    
    const [cartItems, setCartItems] = useState([]);
    const addToCart = (item)=>{
        const newItem = [...cartItems]
        for(let i = 0; i < cartItems.length; i++){
            if(item.id == cartItems[i].id){   
                item.itemCount = item.itemCount + cartItems[i].itemCount; 
                newItem.splice(i,1);
                setCartItems(newItem.concat(item));
                return;
            }
        }
        setCartItems(cartItems.concat(item));
    }

    const removeFromCart = (itemID)=>{
        const newItems = [...cartItems]
        for(let i = 0; i < cartItems.length; i++){
            if(itemID == cartItems[i].id){   
                newItems.splice(i,1);
                console.log("REMOVED", newItems);
                setCartItems(newItems);
                return;
            }
        }    
    }



    useEffect(()=>{
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
                let menArr =[], womenArr =[], jewelryArr=[];
                json.forEach(item =>{
                    if (item.category == undefined || 
                        item.category === "electronics" || 
                        item.image == undefined) return;

                    if (item.category === "men's clothing") menArr.push(item);
                    else if(item.category === "women's clothing") womenArr.push(item);
                    else {jewelryArr.push(item)}
                });

                mensItems.current = menArr;
                womensItems.current = womenArr;
                jewelry.current = jewelryArr;
                setLoading(false);
            });
    },[]);

    return(
        <div id="main">
            <CartContext.Provider value={{cartItems, addToCart, removeFromCart}}>
            <NavBar cartCount={cartCount} setCartCount={setCartCount}/>
            {loading ? <LoadingScreen/> : 
                <Outlet context={{
                    mens: mensItems.current,
                    womens: womensItems.current,
                    jewelry: jewelry.current,
                    cartInfo: [cartCount, setCartCount]
                }}
                />
            }
            </CartContext.Provider>
        </div>
    )
}

export default MainPage;