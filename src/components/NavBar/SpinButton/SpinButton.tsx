import React from "react";
import styles from "./SpinButton.module.css";
import { observer } from "mobx-react";
import { useAppStore } from "../../../stores/appStore";
import spinButtonIcon from "../../../assets/images/circular-arrow.svg";

export const SpinButton: React.FC = observer(function SpinButton() {
    const { bet, decrementBet, incrementBet, makeSpin } = useAppStore();

    const transformBet = (bet: number) => {
        const transformedBet = bet.toFixed(2);

        return transformedBet;
    }

    return (
        <div className={styles.SpinButton__wrap}>
            <button onClick={decrementBet} className={[styles.ArrowLeft, styles.Arrow].join(" ")}>
                <span>-</span>
            </button>
            <div className={styles.SpinButton__container}>
                <button className={styles.SpinButton} onClick={makeSpin}>
                    <img src={spinButtonIcon} alt="Spin button" />
                </button>
                <span>{transformBet(bet)}</span>
            </div>
            <button onClick={incrementBet} className={[styles.ArrowRight, styles.Arrow].join(" ")}>
                <span>+</span>
            </button>
        </div>
    );
})