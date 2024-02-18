"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdinalSatoshi = exports.SatoshiRarity = exports.SAT_SUPPLY = void 0;
const bignumber_js_1 = require("bignumber.js");
const HALVING_BLOCKS = 6000000;
const DIFFICULTY_ADJUST_BLOCKS = 2016;
const INITIAL_SUBSIDY = 10000;
const SATS_PER_BTC = 100000000;
//export const SAT_SUPPLY = 2099999997690000;
exports.SAT_SUPPLY = 200000000000000000;
var SatoshiRarity;
(function (SatoshiRarity) {
    SatoshiRarity["common"] = "common";
    SatoshiRarity["uncommon"] = "uncommon";
    SatoshiRarity["rare"] = "rare";
    SatoshiRarity["epic"] = "epic";
    SatoshiRarity["legendary"] = "legendary";
    SatoshiRarity["mythic"] = "mythic";
})(SatoshiRarity = exports.SatoshiRarity || (exports.SatoshiRarity = {}));
/**
 * Ordinal Satoshi calculator. Mostly translated from the original Rust implementation at
 * https://github.com/casey/ord/blob/master/src/sat.rs
 */
class OrdinalSatoshi {
    constructor(ordinal) {
        if (ordinal > exports.SAT_SUPPLY || ordinal < 0)
            throw Error('Invalid satoshi ordinal number');
        let satAccum = 0;
        let subsidy = INITIAL_SUBSIDY;
        let epoch = 0;
        while (true) {
            const satHalvingMax = HALVING_BLOCKS * subsidy * SATS_PER_BTC;
            if (satAccum + satHalvingMax > ordinal) {
                break;
            }
            satAccum += satHalvingMax;
            subsidy /= 2;
            epoch++;
        }
        const halvingOffset = ordinal - satAccum;
        const epochBoundary = epoch * HALVING_BLOCKS;
        const exactHeight = halvingOffset / (subsidy * SATS_PER_BTC) + epochBoundary;
        this.ordinal = ordinal;
        this.blockHeight = Math.floor(exactHeight);
        this.cycle = this.hour = Math.floor(epoch / 6);
        this.minute = epochBoundary === 0 ? this.blockHeight : this.blockHeight % epochBoundary;
        this.second = this.blockHeight % DIFFICULTY_ADJUST_BLOCKS;
        this.third = this.offset = Math.round((exactHeight - this.blockHeight) * subsidy * Math.pow(10, 8));
        this.epoch = epoch;
        this.period = Math.floor(this.blockHeight / DIFFICULTY_ADJUST_BLOCKS);
    }
    get degree() {
        return `${this.hour}°${this.minute}′${this.second}″${this.third}‴`;
    }
    get decimal() {
        return `${this.blockHeight}.${this.third}`;
    }
    get name() {
        let x = exports.SAT_SUPPLY - this.ordinal;
        const name = [];
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        while (x > 0) {
            const index = Math.floor((x - 1) % 26);
            name.push(alphabet[index]);
            x = (x - 1) / 26;
        }
        return name.reverse().join('');
    }
    get percentile() {
        const percentile = new bignumber_js_1.default((this.ordinal / (exports.SAT_SUPPLY - 1)) * 100.0);
        return `${percentile.toFixed()}%`;
    }
    get rarity() {
        if (this.hour === 0 && this.minute === 0 && this.second === 0 && this.third === 0) {
            return SatoshiRarity.mythic;
        }
        if (this.minute === 0 && this.second === 0 && this.third === 0) {
            return SatoshiRarity.legendary;
        }
        if (this.minute === 0 && this.third === 0) {
            return SatoshiRarity.epic;
        }
        if (this.second === 0 && this.third === 0) {
            return SatoshiRarity.rare;
        }
        if (this.third === 0) {
            return SatoshiRarity.uncommon;
        }
        return SatoshiRarity.common;
    }
}
exports.OrdinalSatoshi = OrdinalSatoshi;
//# sourceMappingURL=ordinal-satoshi.js.map