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

    calculateWin() {
        const checkLines = this.createCheckLines();
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
            console.log(this.calculateWinAmount(winningSymbol, count))
        }
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
            helmet: [0, 0, 10, 20, 50],
            pagoda: [0, 0, 10, 20, 50],
            sai: [0, 0, 10, 20, 50],
            sunrise: [0, 0, 20, 50, 100],
            yin: [0, 0, 20, 50, 100],
            coin: [0, 0, 50, 100, 200],
            samurai: [0, 50, 100, 200, 500],
            geisha: [0, 100, 200, 500, 1000],
            wild: [0, 0, 0, 0, 2000],
        };

        return payouts[symbol][count];
    }

    onSpinStart() {
        this.isSpinning = true;
    }

    onSpinEnd() {
        this.calculateWin();
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

