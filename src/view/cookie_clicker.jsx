import { useState } from "react";
import Cookie from "../components/Cookie";
import Shop from "../components/Shop";
import style from "./style.module.css";

export default function CookieClicker() {
    const [points, setPoints] = useState(0);
    const [ppc, setPpc] = useState(1);
    const upgradeCost = 50

    return (
    <div className={style.container}>
        <div className={style.cardContainer}>
            <div className={style.card} style={{alignSelf: "start"}}>
                <h1 className={style.title}>Shop</h1>
                <p className={style.subtitle}>Points per click: {ppc}</p>

                <Shop setPpc={() => setPpc((prev) => prev + 1)} 
                setPoints={() => setPoints((prev) => prev - upgradeCost)}
                points={points}
                upgradeCost={upgradeCost} />
                
            </div>

            <div className={style.card}>
                <h1 className={style.title}>🍪Cookie Clicker</h1>
                <p className={style.subtitle}>Click the cookie and earn points</p>

                <div className={style.scoreBox}>
                    <p className={style.scoreLabel}>Points</p>
                    <p className={style.score}>{points}</p>
                </div>

                <Cookie setPoints={() => setPoints((prev) => prev + ppc)} 
                ppc={ppc}/>

            </div>

            <div className={style.card} style={{opacity: 0}}>
                {/* 
                fill with reward system in other version 
                and remove {opacity: 0} 
                */}
            </div>
        </div>
        
    </div>
    );}