import { makeAutoObservable } from "mobx";
import { AppStore } from "./appStore";

export class SlotStore {
    appStore;
    winLines = 5;
    isSpinning = false;
    currentSymbols = this.generateNewSymbols();
    nextSymbols = this.generateNewSymbols();
    animationResolve: (() => void) | undefined = undefined;
    animationPromise: Promise<void> | undefined;
    win = 0;

    constructor(appStore: AppStore) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.appStore = appStore;
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

    calculateWin() {
        const checkLines = this.createCheckLines();
        let win = 0;
        for (let i = 0; i < checkLines.length; i++) {
            let count = 0;
            let winningSymbol = checkLines[i][0];
            for (let j = 1; j < checkLines.length; j++) {
                const currentSymbol = checkLines[i][j];
                if (winningSymbol === "wild") {
                   winningSymbol = currentSymbol;
                }
                if (currentSymbol === winningSymbol || currentSymbol === "wild") {
                    count = count + 1;
                } else {
                    break;
                }
            }
            win = win + this.calculateWinAmount(winningSymbol, count)
        }

        this.win = win * this.appStore.bet;
    }

    createCheckLines() {
        const lines = [];
        for (let i = 0; i < this.nextSymbols[0].length; i++) {
            const line = [];
            for (let j = 0; j < this.nextSymbols.length; j++) {
                line.push(this.nextSymbols[j][i]);
            }
            lines.push(line);
        }

        lines.push([
            this.nextSymbols[0][0],
            this.nextSymbols[1][1],
            this.nextSymbols[2][2],
            this.nextSymbols[3][1],
            this.nextSymbols[4][0]
        ])

        lines.push([
            this.nextSymbols[0][2],
            this.nextSymbols[1][1],
            this.nextSymbols[2][0],
            this.nextSymbols[3][1],
            this.nextSymbols[4][2]
        ])

        return lines;
    }

    calculateWinAmount(symbol: string, count: number) {
        const payouts: {[key: string]: number[]} = {
            helmet: [0, 0, 1, 2, 5],
            pagoda: [0, 0, 1, 2, 5],
            sai: [0, 0, 1, 2, 5],
            sunrise: [0, 0, 2, 5, 10],
            yin: [0, 0, 2, 5, 10],
            coin: [0, 0, 5, 10, 20],
            samurai: [0, 1, 5, 20, 50],
            geisha: [0, 2, 10, 40, 100],
            wild: [0, 0, 0, 0, 200],
        };

        return payouts[symbol][count];
    }

    onSpinStart() {
        this.isSpinning = true;
        this.win = 0;
    }

    onSpinEnd() {
        this.calculateWin();
        this.appStore.incrementBalance(this.win);
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

