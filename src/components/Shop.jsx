import style from "./style.module.css";

export default function Shop({title,cost,points,onBuy}) 
{

    const handleClick = () => {
        if (points >= cost) {
            onBuy();
        }
    };

    return (
<div className={style.shopItem}>
    <button
        onClick={handleClick}
        className={`${style.upgrade} ${points < cost ? style.disabled : ""}`}
    >
        <div className={style.upgradeTop}>
            <span className={style.upgradeTitle}>
                {title}
            </span>

            <span className={style.upgradeCost}>
                🍪 {cost}
            </span>
        </div>

        <div className={style.upgradeBottom}>
            {points >= cost ? "Available" : "Not enough points"}
        </div>
    </button>
</div>
    );
}