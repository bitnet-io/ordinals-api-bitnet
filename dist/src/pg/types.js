"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbInscriptionType = exports.INSCRIPTIONS_COLUMNS = exports.LOCATIONS_COLUMNS = exports.DbLocationTransferType = void 0;
var DbLocationTransferType;
(function (DbLocationTransferType) {
    DbLocationTransferType["transferred"] = "transferred";
    DbLocationTransferType["spentInFees"] = "spent_in_fees";
    DbLocationTransferType["burnt"] = "burnt";
})(DbLocationTransferType = exports.DbLocationTransferType || (exports.DbLocationTransferType = {}));
exports.LOCATIONS_COLUMNS = [
    'id',
    'inscription_id',
    'genesis_id',
    'block_height',
    'block_hash',
    'tx_id',
    'tx_index',
    'address',
    'output',
    'offset',
    'value',
    'timestamp',
];
exports.INSCRIPTIONS_COLUMNS = [
    'id',
    'genesis_id',
    'number',
    'mime_type',
    'content_type',
    'content_length',
    'fee',
    'curse_type',
    'sat_ordinal',
    'sat_rarity',
    'sat_coinbase_height',
    'recursive',
];
var DbInscriptionType;
(function (DbInscriptionType) {
    DbInscriptionType["blessed"] = "blessed";
    DbInscriptionType["cursed"] = "cursed";
})(DbInscriptionType = exports.DbInscriptionType || (exports.DbInscriptionType = {}));
//# sourceMappingURL=types.js.map