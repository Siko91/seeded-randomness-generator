"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RNG = void 0;
const crypto = __importStar(require("crypto"));
const int32OffsetsIn256Bits = [0, 4, 8, 12, 16, 20, 24, 28];
const int32MaxValue = 0b01111111111111111111111111111111; // equals 2147483647
class RNG {
    constructor(seed, ...moreSeeds) {
        this.currentSeed = crypto
            .createHash("sha256")
            .update(Buffer.concat([
            Buffer.from(seed.toString()),
            ...moreSeeds.map((s) => Buffer.from(s.toString())),
        ]))
            .digest();
    }
    getNext() {
        this.currentSeed = crypto
            .createHash("sha256")
            .update(this.currentSeed)
            .digest();
        return this.currentSeed;
    }
    getNextUInt32(o) {
        if (o) {
            return this.getNextUInt32Between(o);
        }
        const sha256Hash = this.getNext();
        const numbers = int32OffsetsIn256Bits.map((offset) => sha256Hash.readUInt32BE(offset));
        let result = numbers[0];
        for (let i = 1; i < numbers.length; i++)
            result = result ^ numbers[i];
        result = result & int32MaxValue; // this will remove the sign from the result (-42 becomes 42)
        return result;
    }
    getNextUInt32Between(o) {
        if (!o)
            throw new Error("no integer limits provided");
        if (!o.max)
            throw new Error("no integer max limit provided");
        if (!o.min)
            o.min = 0;
        o.min = Math.floor(o.min);
        o.max = Math.floor(o.max);
        if (o.min < 0)
            throw new Error(`min limit cannot be smaller than 0`);
        if (o.min >= o.max)
            throw new Error(`max limit (${o.max}) must be greater than min limit (${o.min})`);
        const diff = o.max - o.min;
        const int = this.getNextUInt32();
        const m = int % diff;
        const result = o.min + m;
        return result;
    }
}
exports.RNG = RNG;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBaUM7QUFFakMsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUM1RCxNQUFNLGFBQWEsR0FBRyxrQ0FBa0MsQ0FBQyxDQUFDLG9CQUFvQjtBQUU5RSxNQUFhLEdBQUc7SUFHZCxZQUFZLElBQVksRUFBRSxHQUFHLFNBQW1CO1FBQzlDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTTthQUN0QixVQUFVLENBQUMsUUFBUSxDQUFDO2FBQ3BCLE1BQU0sQ0FDTCxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDNUIsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQ25ELENBQUMsQ0FDSDthQUNBLE1BQU0sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU07YUFDdEIsVUFBVSxDQUFDLFFBQVEsQ0FBQzthQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzthQUN4QixNQUFNLEVBQUUsQ0FBQztRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRUQsYUFBYSxDQUFDLENBQWlDO1FBQzdDLElBQUksQ0FBQyxFQUFFO1lBQ0wsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDckM7UUFFRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbEMsTUFBTSxPQUFPLEdBQUcscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FDbkQsVUFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FDaEMsQ0FBQztRQUNGLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7WUFBRSxNQUFNLEdBQUcsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RSxNQUFNLEdBQUcsTUFBTSxHQUFHLGFBQWEsQ0FBQyxDQUFDLDZEQUE2RDtRQUM5RixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsb0JBQW9CLENBQUMsQ0FBZ0M7UUFDbkQsSUFBSSxDQUFDLENBQUM7WUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRztZQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUc7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FDYixjQUFjLENBQUMsQ0FBQyxHQUFHLHFDQUFxQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQ2pFLENBQUM7UUFFSixNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDM0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDckIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDekIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUNGO0FBeERELGtCQXdEQyJ9