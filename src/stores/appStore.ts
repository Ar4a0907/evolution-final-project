import { makeAutoObservable } from "mobx";
import React from "react";

export class AppStore {
    balance = 5000;
    bet = 0.25;
    outOfMoney = false;
    playSound = true;
    private maxBet = 16;
    private minBet = 0.25;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
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

    makeSpin() {
        if (this.balance > this.bet) {
            this.balance -= this.bet;
        } else {
            this.outOfMoney = true;
        }
    }

    toggleSound() {
       this.playSound = !this.playSound;
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