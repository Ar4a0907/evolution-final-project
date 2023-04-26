import React from "react";
import { observer } from "mobx-react";

import { useAppStore } from "../../../stores/appStore";
import { transformBalance } from "../../../utils";


import styles from "./WinCounter.module.css";


export const WinCounter: React.FC = observer(() => {
    const { slotStore } = useAppStore();

    return (
        <div className={ styles.WinCounter }>
            <p>Win:</p>
            <p>{ transformBalance(slotStore.win) }</p>
        </div>
    );
});