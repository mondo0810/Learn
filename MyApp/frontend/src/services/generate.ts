export function generateRandomNumber(limit: number = 1): number {
    const random = Math.random();

    return Math.floor(random * limit);
}