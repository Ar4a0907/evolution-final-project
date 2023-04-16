import { makeAutoObservable } from "mobx";

export class SlotStore {
    spinButtonDisabled = false;
    currentSymbols = this.generateNewSymbols()
    nextSymbols = this.generateNewSymbols()

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
            "samurai",
            "geisha",
            "wild",
        ];
    }

    randomSymbol() {
        return this.symbols[Math.floor(Math.random() * this.symbols.length)];
    }

    onSpinStart() {
        this.spinButtonDisabled = true;
    }

    onSpinEnd() {
        //Calculate win
        this.spinButtonDisabled = false;
    }

    spin() {
        this.currentSymbols = this.nextSymbols;
        this.nextSymbols = this.generateNewSymbols()

        this.onSpinStart();
        //Add Reel Animation Promise
        this.onSpinEnd();
    }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
}

