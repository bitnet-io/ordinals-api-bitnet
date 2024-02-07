"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbInscriptionIndexResultCountType = void 0;
/** Type of row count required for an inscription index endpoint call */
var DbInscriptionIndexResultCountType;
(function (DbInscriptionIndexResultCountType) {
    /** All inscriptions */
    DbInscriptionIndexResultCountType[DbInscriptionIndexResultCountType["all"] = 0] = "all";
    /** Filtered by cursed or blessed */
    DbInscriptionIndexResultCountType[DbInscriptionIndexResultCountType["cursed"] = 1] = "cursed";
    /** Filtered by mime type */
    DbInscriptionIndexResultCountType[DbInscriptionIndexResultCountType["mimeType"] = 2] = "mimeType";
    /** Filtered by sat rarity */
    DbInscriptionIndexResultCountType[DbInscriptionIndexResultCountType["satRarity"] = 3] = "satRarity";
    /** Filtered by address */
    DbInscriptionIndexResultCountType[DbInscriptionIndexResultCountType["address"] = 4] = "address";
    DbInscriptionIndexResultCountType[DbInscriptionIndexResultCountType["genesisAddress"] = 5] = "genesisAddress";
    /** Filtered by block height */
    DbInscriptionIndexResultCountType[DbInscriptionIndexResultCountType["blockHeight"] = 6] = "blockHeight";
    DbInscriptionIndexResultCountType[DbInscriptionIndexResultCountType["fromblockHeight"] = 7] = "fromblockHeight";
    DbInscriptionIndexResultCountType[DbInscriptionIndexResultCountType["toblockHeight"] = 8] = "toblockHeight";
    DbInscriptionIndexResultCountType[DbInscriptionIndexResultCountType["blockHeightRange"] = 9] = "blockHeightRange";
    /** Filtered by block hash */
    DbInscriptionIndexResultCountType[DbInscriptionIndexResultCountType["blockHash"] = 10] = "blockHash";
    /** Filtered by recursive */
    DbInscriptionIndexResultCountType[DbInscriptionIndexResultCountType["recursive"] = 11] = "recursive";
    /** Filtered by some other param that yields a single result (easy to count) */
    DbInscriptionIndexResultCountType[DbInscriptionIndexResultCountType["singleResult"] = 12] = "singleResult";
    /** Filtered by custom arguments (tough to count) */
    DbInscriptionIndexResultCountType[DbInscriptionIndexResultCountType["custom"] = 13] = "custom";
})(DbInscriptionIndexResultCountType = exports.DbInscriptionIndexResultCountType || (exports.DbInscriptionIndexResultCountType = {}));
//# sourceMappingURL=types.js.map