import style from "./style.module.css";
import cookieImage from "../assets/cookie_pixel.svg";


// Ylhäällä import asseteista image, muokkaa alemmas sen mukaiseksi.
const COLLECTIBLES = [
    //Event based Collectibles
    { id: 0, image: cookieImage, name: "Golden Cookie", description: "A shiny golden cookie" },
    { id: 1, emoji: "🌙", name: "Moon", description: "A crescent moon" },
    { id: 2, emoji: "🔥", name: "Flame", description: "A burning flame" },
    { id: 3, emoji: "💎", name: "Diamond", description: "A rare gem" },
    { id: 4, emoji: "🍀", name: "Clover", description: "A lucky clover" },
    { id: 5, emoji: "🌈", name: "Rainbow", description: "A colorful rainbow" },
    //Point based Collectibles
    { id: 6, emoji: "⚡", name: "Lightning", description: "A lightning bolt" },
    { id: 7, emoji: "🎯", name: "Target", description: "A bullseye" },
    { id: 8, emoji: "👑", name: "Crown", description: "A royal crown" },
    { id: 9, emoji: "🧲", name: "Magnet", description: "A powerful magnet" },
    { id: 10, emoji: "🎪", name: "Circus", description: "A big top tent" },
    { id: 11, emoji: "🚀", name: "Rocket", description: "A rocket ship" },
];

export default function Collectibles({ unlockedIds = [] }) {
    const safeIds = Array.isArray(unlockedIds) ? unlockedIds : [];

    return (
        <div className={style.card}>
            <h2 className={style.title}>🏆 Collectibles</h2>
            <div className={style.grid}>
                {COLLECTIBLES.map((item) => {
                    const unlocked = safeIds.includes(item.id);
                    return (
                        <div key={item.id} className={style.slot}>
                            <div className={`${style.slotInner} ${unlocked ? style.flipped : ""}`}>
                                <div className={style.slotFront}>?</div>
                                <div className={style.slotBack}>
                                    {item.image
                                        ? <img src={item.image} alt={item.name} className={style.collectibleImage} />
                                        : item.emoji
                                    }
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}