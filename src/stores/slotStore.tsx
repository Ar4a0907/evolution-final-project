import { makeAutoObservable } from "mobx";

export class SlotStore {
    isSpinning = false;
    currentSymbols = this.generateNewSymbols();
    nextSymbols = this.generateNewSymbols();
    animationResolve: (() => void) | undefined = undefined;
    animationPromise: Promise<void> | undefined;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    generateNewSymbols() {
        return [
            [this.randomSymbol(), this.randomSymbol(), this.randomSymbol()],
            [this.randomSymbol(), this.randomSymbol(), this.randomSymbol()],
            [this.randomSymbol(), this.randomSymbol(), this.randomSymbol()],
            [this.randomSymbol(), this.randomSymbol(), this.randomSymbol()],
            [this.randomSymbol(), this.randomSymbol(), this.randomSymbol()],
        ];
    }

    get symbols() {
        return [
            "helmet",
            "pagoda",
            "sai",
            "sunrise",
            "yin",
            "coin",
            "samurai",
            "geisha",
            "wild",
        ];
    }

    randomSymbol() {
        return this.symbols[Math.floor(Math.random() * this.symbols.length)];
    }

    onSpinStart() {
        this.isSpinning = true;
    }

    onSpinEnd() {
        //Calculate win
        this.currentSymbols = this.nextSymbols;
        this.nextSymbols = this.generateNewSymbols()
        this.isSpinning = false;
    }

    factor(index: number) {
        return 1 + Math.pow(index / 2, 2);
    }

    generateRandomSymbols(index = 0) {
        const iterator = (1 + index) * 3;
        const symbolArray = [];
        for (let i = 0; i < iterator; i++) {
            symbolArray.push(this.randomSymbol());
        }
        return symbolArray;
    }

    onAnimationStart = () => {
        this.animationPromise = new Promise<void>(resolve => {
            this.animationResolve = resolve;
        })
    }

    onAnimationEnd = () => {
        if (this.animationResolve !== undefined) {
            this.animationResolve();
        }
    };

    spin() {
        this.onSpinStart();
        this.onAnimationStart();

        this.animationPromise?.then(() => {
            this.onSpinEnd();
        })
    }
}

