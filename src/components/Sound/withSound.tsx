import React from "react";
import {BET_SOUND_ID, SPIN_SOUND_ID} from "./SoundContainer";
import {observer} from "mobx-react";
import {useAppStore} from "../../stores/appStore";

interface WithSoundProps {
    soundType: "spin" | "bet";
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export type ButtonWithSoundProps =
    WithSoundProps &
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export function withSound<P extends WithSoundProps>(Component: React.FC<P>): React.FC<P> {
    const ButtonWithSound: React.FC<P> = observer(({ soundType, onClick, ...props }) => {
        const { audioElements } = useAppStore();

        const playSound = React.useCallback(() => {
            const audioElement = audioElements.find(element => soundType === "bet" ?
                element.id === BET_SOUND_ID :
                element.id === SPIN_SOUND_ID);

            if (audioElement !== null && audioElement !== undefined) {
                audioElement.play();
            }
        }, [soundType, audioElements]);

        const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
            if (onClick) {
                onClick(event);
            }
            playSound();
        }, [onClick, playSound]);

        return <Component {...props as P} onClick={handleClick} />;
    });

    return ButtonWithSound;
}
