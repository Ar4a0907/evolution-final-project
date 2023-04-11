export const transformBet = (bet: number) => {
    const transformedBet = bet.toFixed(2);
    return transformedBet;
}

export const transformBalance = (balance: number) => {
    const transformedBalance = balance.toFixed(2);
    return `$ ${transformedBalance}`;
}