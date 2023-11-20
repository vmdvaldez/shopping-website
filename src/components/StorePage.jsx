import {useState} from "react";
import styles from "../styles/StorePage.module.css"
import { useOutletContext } from "react-router-dom";

function SideNav({mensItems, womensItems, jewelry, setSelectedItems}){
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
                            onClick={()=>setSelectedItems(selected)}>{c}
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

function Item({title, price, img}){
    return(
        <div className={styles.itemCard}>
            <div className={styles.imgDiv}><img src={img}></img></div>
            <div className={styles.itemInfo}>
                <div className={styles.title}>{title}</div>
                <div>${price}</div>
            </div>
        </div>
    )
}

function DisplayItems({items}){
    return(
        <>
            {items.map(item=>{
                return <Item key={item.id}
                img={item.image}
                title={item.title}
                price={item.price}
                />
            })}
        </>
    )
}

function StorePage(){
    const items = useOutletContext();
    const [selectedItems, setSelectedItems] = useState(items.mens);

    return(
        <section className={styles.main}>
            <SideNav 
                mensItems={items.mens}
                womensItems={items.womens}
                jewelry={items.jewelry}
                setSelectedItems={setSelectedItems}
            />
            <main className={styles.content}>
                <DisplayItems items={selectedItems}/>
            </main>
        </section>
    )
}

export default StorePage;