import { makeAutoObservable } from "mobx";

type Reels = {
    [key: string]: HTMLDivElement | number;
};

export class SlotStore {
    isSpinning = false;
    currentSymbols = this.generateNewSymbols();
    nextSymbols = this.generateNewSymbols();
    reels:Reels = {};

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
            "10",
            "j",
            "q",
            "k",
            "a",
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

    animationPromise() {
        return new Promise((resolve) =>
            setTimeout(resolve, 1000)
        );
    }


    async spin() {
        this.onSpinStart();
        const promise = this.animationPromise()

        promise.then((result) => {
            console.log(result)
            this.onSpinEnd();
            this.currentSymbols = this.nextSymbols;
            this.nextSymbols = this.generateNewSymbols()
        })
    }

    addReelsElements(ref: HTMLDivElement) {
        if (ref !== null) {
            this.reels[ref.id] = ref;
        }
    }
}

