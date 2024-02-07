"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndexResultCountType = void 0;
const helpers_1 = require("../helpers");
const types_1 = require("./types");
/**
 * Returns which inscription count is required based on filters sent to the index endpoint.
 * @param filters - DbInscriptionIndexFilters
 * @returns DbInscriptionIndexResultCountType
 */
function getIndexResultCountType(filters) {
    if (!filters)
        return types_1.DbInscriptionIndexResultCountType.all;
    // How many filters do we have?
    (0, helpers_1.objRemoveUndefinedValues)(filters);
    switch (Object.keys(filters).length) {
        case 0:
            return types_1.DbInscriptionIndexResultCountType.all;
        case 1:
            if (filters.mime_type)
                return types_1.DbInscriptionIndexResultCountType.mimeType;
            if (filters.sat_rarity)
                return types_1.DbInscriptionIndexResultCountType.satRarity;
            if (filters.address)
                return types_1.DbInscriptionIndexResultCountType.address;
            if (filters.genesis_address)
                return types_1.DbInscriptionIndexResultCountType.genesisAddress;
            if (filters.genesis_block_height)
                return types_1.DbInscriptionIndexResultCountType.blockHeight;
            if (filters.from_genesis_block_height)
                return types_1.DbInscriptionIndexResultCountType.fromblockHeight;
            if (filters.to_genesis_block_height)
                return types_1.DbInscriptionIndexResultCountType.toblockHeight;
            if (filters.genesis_block_hash)
                return types_1.DbInscriptionIndexResultCountType.blockHash;
            if (filters.cursed !== undefined)
                return types_1.DbInscriptionIndexResultCountType.cursed;
            if (filters.recursive !== undefined)
                return types_1.DbInscriptionIndexResultCountType.recursive;
            if (filters.number || filters.genesis_id || filters.output || filters.sat_ordinal)
                return types_1.DbInscriptionIndexResultCountType.singleResult;
        case 2:
            if (filters.from_genesis_block_height && filters.to_genesis_block_height)
                return types_1.DbInscriptionIndexResultCountType.blockHeightRange;
    }
    return types_1.DbInscriptionIndexResultCountType.custom;
}
exports.getIndexResultCountType = getIndexResultCountType;
//# sourceMappingURL=helpers.js.map