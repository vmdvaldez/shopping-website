import { useContext } from "react";
import styles from "../styles/ShoppingCart.module.css";
import { CartContext } from "./MainPage";



function CartItems({img, name, price, itemCount}){
    return (
        <div className={styles.cartItem}>
            <div className={styles.img}><img src={img}></img></div>
            <div className={styles.name}>{name}</div>
            <div className={styles.price}>${price}</div>
            <div>{itemCount}</div>
            <button>Delete</button>
        </div>
    )

}

function CartModal({cartCount, setCartCount}){
    const {cartItems} = useContext(CartContext);

    console.log(cartItems);

    cartItems.map(c=>console.log(c));
    
    return(
        <dialog open className={styles.modalContainer}>
            <div className={styles.cartItems}>
                {cartItems.map(items=>{
                return <CartItems 
                        key={items.id}
                        img={items.img}
                        name={items.title}
                        price={items.price}
                        itemCount={items.itemCount}
                    />
                })}
            </div>
            <button>Clear Cart</button>
            <button>Checkout</button>
        </dialog>
    )
}

export default CartModal;