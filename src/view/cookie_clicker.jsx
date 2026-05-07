import { useEffect, useState, useMemo } from "react";
import Cookie from "../components/Cookie";
import Shop from "../components/Shop";
import Collectibles from "../components/Collectibles";
import style from "./style.module.css";
import cookieImage from "../assets/cookie_pixel.svg";
import secretSound from "../assets/miauu.mp3";

export default function CookieClicker() {
    const [points, setPoints] = useState(0);
    const [ppc, setPpc] = useState(1);
    const [cookieMonsters, setCookieMonsters] = useState(0);

    const [goldenCookie, setGoldenCookie] = useState(null);
    const [manualClicks, setManualClicks] = useState(0);
    const [secretUnlocked, setSecretUnlocked] = useState(false);

    const secretAudio = useMemo(() => new Audio(secretSound), []);
    const [notifications, setNotifications] = useState([]);
    const [rollingCookie, setRollingCookie] = useState(null);
    const [rollingCookieCooldown, setRollingCookieCooldown] = useState(false);

    const upgradeCost = 50;
    const cookieMonsterCost = 5;

    const addNotification = (message) => {
        const id = Date.now();

        setNotifications((prev) => [...prev, { id, message }]);

        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 2500);
    };



    useEffect(() => {
        const interval = setInterval(() => {
            setPoints((prev) => prev + cookieMonsters);
        }, 1000);

        return () => clearInterval(interval);
    }, [cookieMonsters]);


    // Random events for clicks
    const clickEvents = useMemo(() => [
        {
            name: "goldenCookie",
            chance: 0.01,
            action: () => {
                setGoldenCookie({
                    id: Date.now(),
                    x: Math.random() * 200,
                    y: Math.random() * 200,
                });
                setTimeout(() => setGoldenCookie(null), 3000);
            }
        },

        {
            name: "critClick",
            chance: 0.02,
            action: () => {
                setPoints((prev) => prev + ppc * 2);
                addNotification(`💥 Critical Click! +${ppc * 2}`);
            }
        },

        /*{
            name: "bonus",
            chance: 0.03,
            action: () => {
                setPoints((prev) => prev + 3);
                addNotification("+3 bonus points!");
            }
        } */
    ], [ppc]);



    const handleGoldenClick = () => {
        setPoints((prev) => prev + 50);
        setGoldenCookie(null);
    };


    const handleClickEvents = () => {
        const roll = Math.random();
        let cumulative = 0;
        for (const event of clickEvents) {
            cumulative += event.chance;
            if (roll < cumulative) {
                event.action();
                break;
            }
        }
        if (Math.random() < 0.25 && !rollingCookieCooldown) {
            setRollingCookieCooldown(true);

            setRollingCookie({
                id: Date.now(),
                x: -60,
                y: Math.random() * (window.innerHeight - 60)
            });
            setTimeout(() => setRollingCookie(null), 6000);
            setTimeout(() => { setRollingCookieCooldown(false); }, 60000);
        }
    };


    useEffect(() => {
        if (manualClicks >= 250 && !secretUnlocked) {
            setSecretUnlocked(true);
            secretAudio.currentTime = 0;
            secretAudio.play();
            addNotification("Meow :3 The Cookie remembers you...");
        }
    }, [manualClicks, secretUnlocked, secretAudio]);

    return (
        <div className={style.container}>
            <div className={style.cardContainer}>

                <div className={style.leftColumn}>
                    <div className={style.card}>
                        <h1 className={style.title}>Shop</h1>
                        <p className={style.subtitle}>Points per click: {ppc}</p>
                        <p className={style.subtitle}>Cookie Monsters: {cookieMonsters}</p>
                        <Shop
                            title="Upgrade Click"
                            cost={upgradeCost}
                            points={points}
                            onBuy={() => {
                                setPpc((prev) => prev + 1);
                                setPoints((prev) => prev - upgradeCost);
                            }}
                        />
                        <Shop
                            title="Cookie Monster (+1/sec)"
                            cost={cookieMonsterCost}
                            points={points}
                            onBuy={() => {
                                setCookieMonsters((prev) => prev + 1);
                                setPoints((prev) => prev - cookieMonsterCost);
                            }}
                        />
                    </div>

                    <Collectibles collectibles={[]} />
                </div>

                <div className={style.rightColumn}>
                    <div className={style.card}>
                        <h1 className={style.title}>🍪Cookie Clicker</h1>
                        <p className={style.subtitle}>Click the cookie and earn points</p>
                        <div className={style.scoreBox}>
                            <p className={style.scoreLabel}>Points</p>
                            <p className={style.score}>{points}</p>
                        </div>
                        {goldenCookie && (
                            <img src={cookieImage}
                                onClick={handleGoldenClick}
                                className={style.goldenCookie}
                                style={{ position: "absolute", left: goldenCookie.x, top: goldenCookie.y }}
                            />
                        )}
                        <Cookie
                            setPoints={() => {
                                setPoints((prev) => prev + ppc);
                                setManualClicks((prev) => prev + 1);
                                handleClickEvents();
                            }}
                            ppc={ppc}
                        />
                    </div>
                </div>

            </div>

            <div className={style.notificationContainer}>
                {notifications.map((n) => (
                    <div key={n.id} className={style.notification}>{n.message}</div>
                ))}
            </div>

            {rollingCookie && (
                <img src={cookieImage} alt="Rolling Cookie" className={style.rollingCookie}
                    style={{ top: rollingCookie.y, left: rollingCookie.x }}
                />
            )}
        </div>
    );
}