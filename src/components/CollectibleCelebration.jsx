import style from "./CollectibleCelebration.module.css";

export default function CollectibleCelebration({ collectible, onClose }) {
    if (!collectible) return null;

    return (
        <div className={style.overlay} onClick={onClose}>
            <div className={style.modal} onClick={(e) => e.stopPropagation()}>
                <div className={style.sparkleRow}>✨ 🎉 ✨</div>
                <p className={style.label}>New Collectible Unlocked!</p>
                <div className={style.iconWrap}>
                    {collectible.image
                        ? <img src={collectible.image} alt={collectible.name} className={style.image} />
                        : <span className={style.emoji}>{collectible.emoji}</span>
                    }
                </div>
                <h2 className={style.name}>{collectible.name}</h2>
                <p className={style.description}>{collectible.description}</p>
                <button className={style.button} onClick={onClose}>Awesome!</button>
            </div>
        </div>
    );
}
