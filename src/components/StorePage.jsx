import {useContext, useEffect, useState} from "react";
import styles from "../styles/StorePage.module.css"
import { useLocation, useOutletContext } from "react-router-dom";
import { CartContext } from "./MainPage";

function SideNav({mensItems, womensItems, jewelry, setCategory}){
    const categories = ["Men's Clothing", "Women's Clothing", "Jewelry"];
    const items = [mensItems, womensItems, jewelry]
    let index = -1;
    return(
        <nav className={styles.sideNav}>
            <ul>
                {categories.map(c=>{
                    index++;
                    const selected = items[index]
                        return (
                        <li key={c} 
                            className={styles.navItem}
                            onClick={()=>setCategory(selected)}>{c}
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

function Item({id, title, price, img, cartInfo}){
    const [hover, setHover] = useState(false);
    const [itemCount, setItemCount] = useState(0);
    const {addToCart, cartItems} = useContext(CartContext);
    

    return(
        <div className={styles.itemCard}>                
            <div className={styles.imgDiv} 
                onMouseEnter={()=>setHover(true)}
                onMouseLeave={()=>setHover(false)}
                >
                {hover && 
                <div className={styles.itemHover}>
                    <div className={styles.addToCart}>
                        <button 
                            onClick={()=>
                                {if (itemCount <= 0) return
                                 return setItemCount(itemCount-1)}}>-</button>
                        <div>{itemCount}</div>
                        <button
                            onClick={()=>{
                                return setItemCount(itemCount + 1);
                            }}>+</button>
                    </div>
                    <button onClick={()=>{
                        if(itemCount <= 0) return;
                        console.log(itemCount);
                        cartInfo[1](cartInfo[0] + itemCount);
                        const item = {id, img, title, price, itemCount};
                        addToCart(item);
                        return setItemCount(0);
                    }}
                    >ADD TO CART</button>
                </div>
                }
                <div className={styles.itemBackground}></div>
                <img src={img}></img>
            </div>
            {!hover &&
                <div className={styles.itemInfo}>
                    <div className={styles.title}>{title}</div>
                    <div>${price}</div>
                </div>
            }

        </div>
    )
}

function DisplayItems({items, cartInfo}){
    return(
        <>
            {items.map(item=>{
                return <Item key={item.id}
                id={item.id}
                img={item.image}
                title={item.title}
                price={item.price}
                cartInfo={cartInfo}
                />
            })}
        </>
    )
}

function StorePage(){
    const items = useOutletContext();
    const stateCategory = useLocation();
    const [category, setCategory] = useState("mens");
    let dispItem = (category == "mens") ? 
        items.mens : (category == "womens") ? items.womens : items.jewelry
    

    useEffect(()=>{
        if(stateCategory.state == null) return;
        setCategory(stateCategory.state);
    },[stateCategory.state])

    return(
        <section className={styles.main}>
            <SideNav 
                mensItems="mens"
                womensItems="womens"
                jewelry="jewelry"
                setCategory={setCategory}
            />
            <main className={styles.content}>
                <DisplayItems items={dispItem} cartInfo={items.cartInfo}/>
            </main>
        </section>
    )
}

export default StorePage;