import {useState} from "react";
import styles from "../styles/StorePage.module.css"


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
        <div>
            <div className={styles.imgDiv}><img src={img}></img></div>
            <div>
                <div>{title}</div>
                <div>{price}</div>
            </div>
        </div>
    )
}

function DisplayItem({items}){
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

function StorePage({mensItems, womensItems, jewelry}){
    const [selectedItems, setSelectedItems] = useState(mensItems);

    console.log("RENDERING");
    console.log("SELECTED ITEMS", selectedItems);

    return(
        <section className={styles.main}>
            <SideNav 
                mensItems={mensItems}
                womensItems={womensItems}
                jewelry={jewelry}
                setSelectedItems={setSelectedItems}
            />
            <main className={styles.content}>
                <DisplayItem items={selectedItems}/>
            </main>
        </section>
    )
}

export default StorePage;