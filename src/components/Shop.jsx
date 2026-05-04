import style from "./style.module.css";

export default function Shop({ setPpc, points, setPoints, upgradeCost }) {

    const handleClick = (e) => {
        if(points >= upgradeCost) {
            setPpc()
            setPoints()
        }
    }

    return(
        <div>
            <button onClick={handleClick} 
            className={style.upgrade}>Upgrade ({upgradeCost} points)
            </button>
        </div>
    )
}