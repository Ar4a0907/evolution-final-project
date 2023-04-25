import React from "react";
import styles from "./Symbol.module.css";
import {observer} from "mobx-react";

import coin from "../../../assets/images/slot-icons/coin.png";
import geisha from "../../../assets/images/slot-icons/geisha.png";
import helmet from "../../../assets/images/slot-icons/helmet.png";
import pagoda from "../../../assets/images/slot-icons/pagoda.png";
import sai from "../../../assets/images/slot-icons/sai.png";
import samurai from "../../../assets/images/slot-icons/samurai.png";
import sunrise from "../../../assets/images/slot-icons/sunrise.png";
import wild from "../../../assets/images/slot-icons/wild.png";
import yin from "../../../assets/images/slot-icons/yin.png";

interface SymbolProps {
    symbol: string;
}

const images: { [key: string]: '*.png' } = {
    coin,
    geisha,
    helmet,
    pagoda,
    sai,
    samurai,
    sunrise,
    wild,
    yin
};

export const Symbol: React.FC<SymbolProps> = observer((props) => {
    const {symbol} = props;

    return (
        <div className={styles.Symbol}>
            <img src={images[symbol]} alt={symbol}/>
        </div>
    );
});
