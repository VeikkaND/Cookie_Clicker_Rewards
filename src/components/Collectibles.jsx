import style from "./style.module.css";
import cookieImage from "../assets/cookie_pixel.svg";


// Ylhäällä import asseteista image, muokkaa alemmas sen mukaiseksi.
export const COLLECTIBLES = [
    //Event based Collectibles
    { id: 0, image: cookieImage, name: "Golden Cookie", description: "A shiny golden cookie", hint: "Ever heard of a pop up cookie?" },
    { id: 1, image: cookieImage, rolling: true, name: "Rolling Cookie", description: "They see me rollin...", hint: "Something might move horizontally, click it!" },
    { id: 2, emoji: "🗡️", name: "Critical Hit", description: "Big Click Big Hit", hint: "Surely a critical hit of enough caliber flips this open" },
    { id: 3, emoji: "👻", name: "Cookie Monsterrr", description: "He will be eating ur cookies", hint: "Have you tried adding some monsters?" },
    { id: 4, emoji: "🐈‍⬛", name: "Meow", description: "That was one hot meow", hint: "Keep on clicking" },
    { id: 5, emoji: "⁶🤷‍♂️⁷", name: "67", description: "Hahaha funny meme", hint: "Click really fast... like really fast" },
    //Point based Collectibles
    { id: 6, emoji: "⚡", name: "100 Points!", description: "Great job!", hint: "Reach 100 points" },
    { id: 7, emoji: "🎯", name: "500 Points!", description: "Wow you made it here!", hint: "Reach 500 points" },
    { id: 8, emoji: "👑", name: "2500 Points!", description: "Thats alot of points!", hint: "Reach 2500 points" },
    { id: 9, emoji: "🧲", name: "10000 Points!", description: "Wow, you sure are something", hint: "Reach 10 000 points" },
    { id: 10, emoji: "🎪", name: "40 000 Points!", description: "Really?", hint: "Reach 40 000 points" },
    { id: 11, emoji: "🚀", name: "100 000 ish Points!", description: "You thought it was 1 million?", hint: "Reach X XXX XXX points" },
];

const COUNTED_IDS = [0, 1, 2];

export default function Collectibles({ unlockedIds = [], collectibleCounts = {} }) {
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
                                        ? <img
                                            src={item.image}
                                            alt={item.name}
                                            className={`${style.collectibleImage} ${unlocked && item.rolling ? style.collectibleRolling : ""}`}
                                          />
                                        : item.emoji
                                    }
                                    {unlocked && COUNTED_IDS.includes(item.id) && collectibleCounts[item.id] > 0 && (
                                        <span className={style.countBadge}>×{collectibleCounts[item.id]}</span>
                                    )}
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