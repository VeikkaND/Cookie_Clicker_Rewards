import style from "./style.module.css";

export default function Shop({title,cost,points,onBuy}) 
{

    const handleClick = () => {
        if (points >= cost) {
            onBuy();
        }
    };

    return (
        <div>
            <button
                onClick={handleClick}
                className={style.upgrade}
            >
                {title} ({cost} points)
            </button>
        </div>
    );
}