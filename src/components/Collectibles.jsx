import style from "./style.module.css";

export default function Collectibles({ collectibles }) {
    return (
        <div className={style.card}>
            <h2 className={style.title}>🏆 Collectibles</h2>

            <div className={style.grid}>
                {Array.from({ length: 12 }).map((_, index) => {
                    const unlocked = collectibles[index];

                    return (
                        <div
                            key={index}
                            className={style.slot}
                        >
                            {unlocked ? unlocked : "?"}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}