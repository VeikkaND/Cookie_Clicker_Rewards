import style from "./style.module.css";
import cookieImage from "../assets/cookie_pixel.svg";


// Ylhäällä import asseteista image, muokkaa alemmas sen mukaiseksi.
export const COLLECTIBLES = [
    //Event based Collectibles
    { id: 0, image: cookieImage, name: "Golden Cookie", description: "A shiny golden cookie", hint: "Ever heard of a pop up cookie?" },
    { id: 1, emoji: "🌙", name: "Rolling Cookie", description: "They see me rollin...", hint: "Something might move horizontally, click it!" },
    { id: 2, emoji: "🔥", name: "Critical Hit", description: "CRITICAL HIT", hint: "Surely a critical hit of enough caliber flips this open" },
    { id: 3, emoji: "💎", name: "Diamond", description: "A rare gem", hint: "Hint text here" },
    { id: 4, emoji: "🍀", name: "Clover", description: "A lucky clover", hint: "Hint text here" },
    { id: 5, emoji: "🌈", name: "Rainbow", description: "A colorful rainbow", hint: "Hint text here" },
    //Point based Collectibles
    { id: 6, emoji: "⚡", name: "Lightning", description: "A lightning bolt", hint: "Hint text here" },
    { id: 7, emoji: "🎯", name: "Target", description: "A bullseye", hint: "Hint text here" },
    { id: 8, emoji: "👑", name: "Crown", description: "A royal crown", hint: "Hint text here" },
    { id: 9, emoji: "🧲", name: "Magnet", description: "A powerful magnet", hint: "Hint text here" },
    { id: 10, emoji: "🎪", name: "Circus", description: "A big top tent", hint: "Hint text here" },
    { id: 11, emoji: "🚀", name: "Rocket", description: "A rocket ship", hint: "Hint text here" },
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
                            <div className={style.tooltip}>
                                {unlocked ? (
                                    <>
                                        <span className={style.tooltipName}>{item.name}</span>
                                        <span className={style.tooltipDesc}>{item.description}</span>
                                    </>
                                ) : (
                                    <>
                                        <span className={style.tooltipName}>???</span>
                                        <span className={style.tooltipDesc}>{item.hint}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}