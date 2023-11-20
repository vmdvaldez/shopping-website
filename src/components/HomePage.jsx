import styles from "../styles/HomePage.module.css";
import { useOutletContext, Link } from "react-router-dom";

function Button({name}){
    return(
        <Link to="store" className={styles.btnLink}>
            <button className={styles.btn}>
                {name}
            </button>      
        </Link>

    )
}

function CategoryExample({categoryName, categoryStyle, item, right=true}){
    const category ={
        mens: "Men's Clothing",
        womens: "Women's Clothing",
        jewelry: "Jewelry"
    }

    return(
        <div className={categoryStyle}>
            <img className={styles.images} src={item} ></img>
            <div className={right ? styles.rightInfo : styles.leftInfo}>
                <div>
                    <h1>{category[categoryName]}</h1>
                </div>
                <Button name={`Shop For ${category[categoryName]}`}/>
            </div>
        </div>
    )
}

function HomePage(){
    const exampleItems = useOutletContext();
    return(
        <main className={styles.main}>
            <div className={styles.categories}>
                <CategoryExample
                    categoryName="mens"
                    categoryStyle={styles.men}
                    item={exampleItems.mens[1].image}
                />
                <CategoryExample
                    categoryName="womens"
                    categoryStyle={styles.women}
                    item={exampleItems.womens[0].image}
                    right={false}
                />
                <CategoryExample
                    categoryName="jewelry"
                    categoryStyle={styles.jewelry}
                    item={exampleItems.jewelry[0].image}
                />
            </div>
        </main>
    )
}

export default HomePage;