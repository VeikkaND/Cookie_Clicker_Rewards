import { useState } from "react";
import Cookie from "../components/Cookie";
import style from "./style.module.css";

export default function CookieClicker() {
    const [points, setPoints] = useState(0);

    return (
        <div className={style.container}>
            <h1>Cookie Clicker</h1>
            <p>Click the cookie to earn points!</p>
            <Cookie setPoints={() => setPoints((prev) => prev + 1)} />
            <p>Points: {points}</p>
        </div>
    );}