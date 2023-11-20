import { useEffect , useState, useRef} from "react";
import "../styles/MainPage.css";
import styles from "../styles/NavBar.module.css"
import HomePage from "./HomePage";
import LoadingScreen from "./Loading";
import cartSVG from '../assets/cart.svg'
import StorePage from "./StorePage";

import { Outlet, Link } from "react-router-dom";



function NavBar(){
    // const cartSVG = "../assets/cart.svg";

    return(
        <nav className={styles.navContainer}>
            <ul className={styles.nav}>
                <li className={`${styles.home} ${styles.navitems}`}>
                    <Link to="/">Home</Link>
                </li>
                <li className={`${styles.storeName}`}>Fake Shop</li>
                <li className={`${styles.store} ${styles.navitems}` }>
                    <Link to="store">Store</Link>
                </li>
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

    return(
        <div id="main">
            <NavBar/>
            {/* {loading ? 
                <LoadingScreen/> : 
                <HomePage exampleItems={{
                    mens: mensItems.current[1].image,
                    womens: womensItems.current[0].image,
                    jewelry: jewelry.current[0].image
                }}/>} */}
            {/* {loading ? <LoadingScreen/>:
                <StorePage 
                mensItems={mensItems.current} 
                womensItems={womensItems.current} 
                jewelry={jewelry.current}
            />} */}
            {loading ? <LoadingScreen/> : 
                <Outlet context={{
                    mens: mensItems.current,
                    womens: womensItems.current,
                    jewelry: jewelry.current
                }}
                />
            }
        </div>
    )
}

export default MainPage;