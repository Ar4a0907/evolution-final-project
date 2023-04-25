import React from "react";
import styles from "./SpinButton.module.css";
import { observer } from "mobx-react";
import { useAppStore } from "../../../stores/appStore";
import spinButtonIcon from "../../../assets/images/circular-arrow.svg";
import { transformBet } from "../../../utils";
import { ButtonWithSoundProps, withSound } from "../../Sound/withSound";

const ButtonWithSound: React.FC<ButtonWithSoundProps> = withSound(({ children, ...props }) => {
    return (
        <button {...props}>{children}</button>
    );
});

export const SpinButton: React.FC = observer(() => {
    const { bet, decrementBet, incrementBet, makeSpin, slotStore } = useAppStore();
    return (
        <div className={styles.SpinButton__wrap}>
            <ButtonWithSound
                soundType="bet"
                disabled={slotStore.isSpinning}
                onClick={decrementBet}
                className={[styles.ArrowLeft, styles.Arrow].join(" ")}
            >
                <span>-</span>
            </ButtonWithSound>
            <div className={styles.SpinButton__container}>
                <ButtonWithSound
                    soundType="spin"
                    disabled={slotStore.isSpinning}
                    className={styles.SpinButton}
                    onClick={makeSpin}
                >
                    <img src={spinButtonIcon} alt="Spin button" />
                </ButtonWithSound>
                <span>{transformBet(bet)}</span>
            </div>
            <ButtonWithSound
                soundType="bet"
                disabled={slotStore.isSpinning}
                onClick={incrementBet}
                className={[styles.ArrowRight, styles.Arrow].join(" ")}
            >
                <span>+</span>
            </ButtonWithSound>
        </div>
    );
})