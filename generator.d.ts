/// <reference types="node" />
export declare class RNG {
    private currentSeed;
    constructor(seed: string, ...moreSeeds: string[]);
    getNext(): Buffer;
    getNextUInt32(o?: {
        min?: number;
        max: number;
    }): number;
    getNextUInt32Between(o: {
        min?: number;
        max: number;
    }): number;
}
