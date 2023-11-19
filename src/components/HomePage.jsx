import styles from "../styles/HomePage.module.css";

function Button({name}){
    return(
        <button className={styles.btn}>
            {name}
        </button>
    )
}

function CategoryExample({categoryName, categoryStyle, item, right=true}){
    return(
        <div className={categoryStyle}>
            <img className={styles.images} src={item} ></img>
            <div className={right ? styles.rightInfo : styles.leftInfo}>
                <div>
                    <h1>{categoryName}</h1>
                </div>
                <Button name={`Shop For ${categoryName}`}/>
            </div>
        </div>
    )
}

function HomePage({exampleItems}){
    return(
        <main className={styles.main}>
            <div className={styles.categories}>
                <CategoryExample
                    categoryName="Men's Clothing"
                    categoryStyle={styles.men}
                    item={exampleItems.mens}
                />
                <CategoryExample
                    categoryName="Women's Clothing"
                    categoryStyle={styles.women}
                    item={exampleItems.womens}
                    right={false}
                />
                <CategoryExample
                    categoryName="Jewelry"
                    categoryStyle={styles.jewelry}
                    item={exampleItems.jewelry}
                />
            </div>
        </main>
    )
}

export default HomePage;