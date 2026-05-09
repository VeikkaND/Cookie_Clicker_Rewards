import { useEffect, useState, useMemo, useRef } from "react";
import Cookie from "../components/Cookie";
import Shop from "../components/Shop";
import Collectibles, { COLLECTIBLES } from "../components/Collectibles";
import CollectibleCelebration from "../components/CollectibleCelebration";
import style from "./style.module.css";
import cookieImage from "../assets/cookie_pixel.svg";
import secretSound from "../assets/miauu.mp3";
import menuImage from "../assets/menu.svg";
import closeImage from "../assets/close.svg";

export default function CookieClicker() {
    const [menuVisible, setMenuVisible] = useState((window.innerWidth > 600) ? true : false);
    const [points, setPoints] = useState(0);
    const [ppc, setPpc] = useState(1);
    const [cookieMonsters, setCookieMonsters] = useState(0);
    const [unlockedCollectibles, setUnlockedCollectibles] = useState([]);
    const [celebrationCollectible, setCelebrationCollectible] = useState(null);
    const [collectibleCounts, setCollectibleCounts] = useState({});

    const incrementCount = (id) => {
        setCollectibleCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    };

    const [goldenCookie, setGoldenCookie] = useState(null);
    const [manualClicks, setManualClicks] = useState(0);
    const [secretUnlocked, setSecretUnlocked] = useState(false);

    const secretAudio = useMemo(() => new Audio(secretSound), []);
    const [notifications, setNotifications] = useState([]);
    const [rollingCookie, setRollingCookie] = useState(null);
    const [rollingCookieCooldown, setRollingCookieCooldown] = useState(false);

    const [challengeActive, setChallengeActive] = useState(false);
    const [challengeClicks, setChallengeClicks] = useState(0);
    const [challengeTimeLeft, setChallengeTimeLeft] = useState(15);
    const challengeClicksRef = useRef(0);

    const startChallenge = () => {
        setChallengeActive(true);
        setChallengeClicks(0);
        setChallengeTimeLeft(15);
        challengeClicksRef.current = 0;
    };

    const upgradeCost = 50;
    const cookieMonsterCost = 250;

    const unlockCollectible = (id) => {
        setUnlockedCollectibles((prev) => {
            if (prev.includes(id)) return prev;
            const item = COLLECTIBLES.find((c) => c.id === id);
            if (item) setCelebrationCollectible(item);
            return [...prev, id];
        });
    };

    const addNotification = (message) => {
        const id = Date.now();

        setNotifications((prev) => [...prev, { id, message }]);

        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 2500);
    };

    const handleMenuClick = () => {
        setMenuVisible(true);
    }
    
    const handleCloseClick = () => {
        setMenuVisible(false);
    }

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
                const critDamage = ppc * 2;
                setPoints((prev) => prev + critDamage);
                addNotification(`💥 Critical Click! +${critDamage}`);
                if (critDamage >= 50) {
                    unlockCollectible(2);
                    incrementCount(2);
                }
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
    incrementCount(0);
    if (!unlockedCollectibles.includes(0)) {
        unlockCollectible(0);
        addNotification("Collectible unlocked: Golden Cookie!");
    }
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
        if (Math.random() < 0.01 && !rollingCookieCooldown) {
            setRollingCookieCooldown(true);

            setRollingCookie({
                id: Date.now(),
                x: -60,
                y: Math.random() * (window.innerHeight - 60)
            });
            setTimeout(() => setRollingCookie(null), 11000);
            setTimeout(() => { setRollingCookieCooldown(false); }, 60000);
        }
    };


    useEffect(() => {
        if (!challengeActive) return;
        const interval = setInterval(() => {
            setChallengeTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setChallengeActive(false);
                    if (challengeClicksRef.current >= 67) {
                        unlockCollectible(5);
                        addNotification("🎉 Challenge cleared! ⁶🤷‍♂️⁷");
                    } else {
                        addNotification(`❌ ${challengeClicksRef.current}/?? — not fast enough!`);
                    }
                    return 15;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [challengeActive]);

    useEffect(() => {
        if (cookieMonsters >= 25) {
            unlockCollectible(3);
        }
    }, [cookieMonsters]);

    useEffect(() => {
        if (points >= 100)    unlockCollectible(6);
        if (points >= 500)    unlockCollectible(7);
        if (points >= 2500)   unlockCollectible(8);
        if (points >= 10000)  unlockCollectible(9);
        if (points >= 40000)  unlockCollectible(10);
        if (points >= 110000) unlockCollectible(11);
    }, [points]);

    useEffect(() => {
        if (manualClicks >= 1000 && !secretUnlocked) {
            setSecretUnlocked(true);
            secretAudio.currentTime = 0;
            secretAudio.play();
            addNotification("Meow :3 The Cookie remembers you...");
            unlockCollectible(4);
        }
    }, [manualClicks, secretUnlocked, secretAudio]);

    return (
        <div className={style.container}>
            <div className={style.cardContainer}>

                <div className={style.leftColumn} style={{display: menuVisible ? "flex" : "none"}}>
                    <div className={style.card}>
                        <div className={style.titleRow}>
                            <button className={style.closeButton}
                            onClick={handleCloseClick}>
                                <img src={closeImage}></img>
                            </button>
                            <h1 className={style.title}>Shop</h1>
                        </div>
                        
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

                    <Collectibles unlockedIds={unlockedCollectibles} collectibleCounts={collectibleCounts} />
                </div>

                <div className={style.rightColumn}>
                    {manualClicks >= 100 && !unlockedCollectibles.includes(5) && (
                        <div className={style.challengeCard}>
                            <p className={style.challengeTitle}>⚡ Click Challenge</p>
                            {!challengeActive ? (
                                <>
                                    <p className={style.challengeDesc}>Get as many clicks in 15 seconds</p>
                                    <button className={style.challengeBtn} onClick={startChallenge}>Start Challenge</button>
                                </>
                            ) : (
                                <div className={style.challengeStats}>
                                    <span className={style.challengeTime}>{challengeTimeLeft}s</span>
                                    <span className={style.challengeCount}>{challengeClicks}</span>
                                </div>
                            )}
                        </div>
                    )}
                    <div className={style.card}>
                        <div className={style.titleRow}>
                            <button onClick={handleMenuClick} 
                            className={style.menuButton}>
                                <img src={menuImage}></img>
                            </button>
                            <h1 className={style.title}>🍪Cookie Clicker B</h1>
                        </div>
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
                                if (challengeActive) {
                                    challengeClicksRef.current += 1;
                                    setChallengeClicks((prev) => prev + 1);
                                }
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
                <img
                    src={cookieImage}
                    alt="Rolling Cookie"
                    className={style.rollingCookie}
                    style={{ top: rollingCookie.y, left: rollingCookie.x }}
                    onClick={() => {
                        setRollingCookie(null);
                        incrementCount(1);
                        if (!unlockedCollectibles.includes(1)) {
                            unlockCollectible(1);
                            addNotification("Collectible unlocked: Rolling Cookie!");
                        }
                    }}
                />
            )}

            <CollectibleCelebration
                collectible={celebrationCollectible}
                onClose={() => setCelebrationCollectible(null)}
            />
        </div>
    );
}