import { useContext } from "react";
import styles from "../styles/ShoppingCart.module.css";
import { CartContext } from "./MainPage";



function CartItems({id, img, name, price, itemCount, removeFromCart, cartCount, setCartCount}){
    return (
        <div className={styles.cartItem}>
            <div className={styles.img}><img src={img}></img></div>
            <div className={styles.name}>{name}</div>
            <div className={styles.price}>${price}</div>
            <div>{itemCount}</div>
            <button onClick={()=>{
                setCartCount(cartCount - itemCount);
                removeFromCart(id);
                }}>Delete</button>
        </div>
    )

}

function CartModal({cartCount, setCartCount}){
    const {cartItems, removeFromCart} = useContext(CartContext);

    return(
        <dialog open className={styles.modalContainer}>
            <div className={styles.cartItems}>
                {cartItems.map(items=>{
                return <CartItems 
                        key={items.id}
                        id={items.id}
                        img={items.img}
                        name={items.title}
                        price={items.price}
                        itemCount={items.itemCount}
                        removeFromCart={removeFromCart}
                        cartCount={cartCount}
                        setCartCount={setCartCount}
                    />
                })}
            </div>
            <button>Checkout</button>
        </dialog>
    )
}

export default CartModal;