import { makeAutoObservable } from "mobx";
import React from "react";

import { SlotStore } from "./slotStore";

type AudioElements = {
    [key: string]: HTMLAudioElement;
};

export class AppStore {
    slotStore = new SlotStore(this);
    balance = 5000;
    bet = 0.25;
    outOfMoney = false;
    playSound = false;
    audioElements: AudioElements = {};
    isWinBlocksVisible = false;
    private maxBet = 16;
    private minBet = 0.25;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    hideWinBlocks() {
        this.isWinBlocksVisible = false;
    }

    showWinBlocks() {
        this.isWinBlocksVisible = true;
    }

    incrementBet() {
        if (this.bet < this.maxBet) {
            this.bet = this.bet * 2;
        }
    }

    decrementBet() {
        if (this.bet > this.minBet) {
            this.bet = this.bet / 2;
        }
    }

    incrementBalance(money: number) {
        this.balance += money;
    }

    makeSpin() {
        if (this.balance > this.bet) {
            this.balance -= this.bet;
            this.slotStore.spin();
        } else {
            this.outOfMoney = true;
        }
    }

    toggleSound() {
        this.playSound = !this.playSound;
    }

    addAudioElements(ref: HTMLAudioElement) {
        if (ref !== null) {
            this.audioElements[ref.id] = ref;
        }
    }
}

export const AppStoreContext = React.createContext<AppStore | null>(null);
export const appStore = new AppStore();

export function useAppStore() {
    const context = React.useContext(AppStoreContext);
    if (!context) {
        throw new Error("Wrap element with context first!");
    }
    return context;
}