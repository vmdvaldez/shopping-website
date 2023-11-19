import { useEffect , useState, useRef} from "react";
import "../styles/MainPage.css";
import styles from "../styles/NavBar.module.css"
import HomePage from "./HomePage";
import LoadingScreen from "./Loading";
import cartSVG from '../assets/cart.svg'

function NavBar(){
    // const cartSVG = "../assets/cart.svg";

    return(
        <nav>
            <ul className={styles.nav}>
                <li className={`${styles.home} ${styles.navitems}` }>Home</li>
                <li className={`${styles.storeName}`}>Fake Shop</li>
                <li className={`${styles.store} ${styles.navitems}` }>Store</li>
                <li className={`${styles.cart} ${styles.navitems}`}>
                    <img src={cartSVG}></img>
                </li>
            </ul>
        </nav>
    )
}

function MainPage(){
    const [loading, setLoading] = useState(true);
    const mensItems = useRef([]);
    const womensItems = useRef([]);
    const jewelry = useRef([]);
    

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

    console.log("Mens",mensItems);
    console.log("Womens", womensItems);
    console.log("Jewelry", jewelry);

    return(
        <div id="main">
            <NavBar/>
            {loading ? 
                <LoadingScreen/> : 
                <HomePage exampleItems={{
                    mens: mensItems.current[1].image,
                    womens: womensItems.current[0].image,
                    jewelry: jewelry.current[0].image
                }}/>}
        </div>
    )
}

export default MainPage;