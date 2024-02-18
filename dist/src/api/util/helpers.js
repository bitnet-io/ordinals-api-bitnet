"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockParam = exports.normalizedHexString = exports.has0xPrefix = exports.hexToBuffer = exports.parseSatPoint = exports.parseBrc20Holders = exports.parseBrc20Activities = exports.parseBrc20Balance = exports.parseBrc20Balances = exports.parseBrc20Suppl = exports.parseBrc20Token = exports.parseBrc20Supply = exports.parseBrc20Tokens = exports.parseBlockTransfers = exports.parseInscriptionLocations = exports.parseDbInscription = exports.parseDbInscriptions = exports.DEFAULT_API_LIMIT = void 0;
const bignumber_js_1 = require("bignumber.js");
const types_1 = require("../../pg/brc20/types");
const schemas_1 = require("../schemas");
exports.DEFAULT_API_LIMIT = 20;
function parseDbInscriptions(items) {
    return items.map(i => ({
        id: i.genesis_id,
        number: parseInt(i.number),
        address: i.address,
        genesis_address: i.genesis_address,
        genesis_block_height: parseInt(i.genesis_block_height),
        genesis_block_hash: i.genesis_block_hash,
        genesis_tx_id: i.genesis_tx_id,
        genesis_fee: i.genesis_fee.toString(),
        genesis_timestamp: i.genesis_timestamp.valueOf(),
        tx_id: i.tx_id,
        location: `${i.output}:${i.offset}`,
        output: i.output,
        value: i.value,
        offset: i.offset,
        sat_ordinal: i.sat_ordinal.toString(),
        sat_rarity: i.sat_rarity,
        sat_coinbase_height: parseInt(i.sat_coinbase_height),
        mime_type: i.mime_type,
        content_type: i.content_type,
        content_length: parseInt(i.content_length),
        timestamp: i.timestamp.valueOf(),
        curse_type: i.curse_type,
        recursive: i.recursive,
        recursion_refs: i.recursion_refs?.split(',') ?? null,
    }));
}
exports.parseDbInscriptions = parseDbInscriptions;
function parseDbInscription(item) {
    return parseDbInscriptions([item])[0];
}
exports.parseDbInscription = parseDbInscription;
function parseInscriptionLocations(items) {
    return items.map(i => ({
        block_height: parseInt(i.block_height),
        block_hash: i.block_hash,
        address: i.address,
        tx_id: i.tx_id,
        location: `${i.output}:${i.offset}`,
        output: i.output,
        value: i.value,
        offset: i.offset,
        timestamp: i.timestamp.valueOf(),
    }));
}
exports.parseInscriptionLocations = parseInscriptionLocations;
function parseBlockTransfers(items) {
    return items.map(i => ({
        id: i.genesis_id,
        number: parseInt(i.number),
        from: {
            block_height: parseInt(i.from_block_height),
            block_hash: i.from_block_hash,
            address: i.from_address,
            tx_id: i.from_tx_id,
            location: `${i.from_output}:${i.from_offset}`,
            output: i.from_output,
            value: i.from_value,
            offset: i.from_offset,
            timestamp: i.from_timestamp.valueOf(),
        },
        to: {
            block_height: parseInt(i.to_block_height),
            block_hash: i.to_block_hash,
            address: i.to_address,
            tx_id: i.to_tx_id,
            location: `${i.to_output}:${i.to_offset}`,
            output: i.to_output,
            value: i.to_value,
            offset: i.to_offset,
            timestamp: i.to_timestamp.valueOf(),
        },
    }));
}
exports.parseBlockTransfers = parseBlockTransfers;
function parseBrc20Tokens(items) {
    return items.map(i => ({
        id: i.genesis_id,
        number: parseInt(i.number),
        block_height: parseInt(i.block_height),
        tx_id: i.tx_id,
        address: i.address,
        ticker: i.ticker,
        max_supply: decimals(i.max, i.decimals),
        mint_limit: i.limit ? decimals(i.limit, i.decimals) : null,
        decimals: i.decimals,
        deploy_timestamp: i.timestamp.valueOf(),
        minted_supply: decimals(i.minted_supply, i.decimals),
        tx_count: parseInt(i.tx_count),
    }));
}
exports.parseBrc20Tokens = parseBrc20Tokens;
function parseBrc20Supply(item) {
    return {
        max_supply: decimals(item.max, item.decimals),
        minted_supply: decimals(item.minted_supply, item.decimals),
        holders: parseInt(item.holders),
    };
}
exports.parseBrc20Supply = parseBrc20Supply;
function parseBrc20Token(items) {
    return items.map(i => ({
        tick: i.ticker,
        max_supply: decimals(i.max, i.decimals),
        decimals: i.decimals,
        limit_per_mint: i.limit ? decimals(i.limit, i.decimals) : null,
        remaining_supply: decimals(i.minted_supply, i.decimals),
        deploy_incr_number: parseInt(i.block_height),
        //    holders: parseInt(item.holders),
    }));
}
exports.parseBrc20Token = parseBrc20Token;
function parseBrc20Suppl(item) {
    return {
        //    max_supply: decimals(item.max, item.decimals),
        //    minted_supply: decimals(item.minted_supply, item.decimals),
        holders: parseInt(item.holders),
    };
}
exports.parseBrc20Suppl = parseBrc20Suppl;
function parseBrc20Balances(items) {
    return items.map(i => ({
        ticker: i.ticker,
        available_balance: decimals(i.avail_balance, i.decimals),
        transferrable_balance: decimals(i.trans_balance, i.decimals),
        overall_balance: decimals(i.total_balance, i.decimals),
        decimals: i.decimals,
    }));
}
exports.parseBrc20Balances = parseBrc20Balances;
function parseBrc20Balance(items) {
    return items.map(i => ({
        tick: i.ticker,
        available_balance: decimals(i.avail_balance, i.decimals),
        transferrable_balance: decimals(i.trans_balance, i.decimals),
        overall_balance: decimals(i.total_balance, i.decimals),
        decimals: i.decimals,
    }));
}
exports.parseBrc20Balance = parseBrc20Balance;
function parseBrc20Activities(items) {
    return items.map(i => {
        const activity = {
            operation: i.operation,
            ticker: i.ticker,
            address: i.address,
            tx_id: i.tx_id,
            inscription_id: i.inscription_id,
            location: `${i.output}:${i.offset}`,
            block_hash: i.block_hash,
            block_height: parseInt(i.block_height),
            timestamp: i.timestamp.valueOf(),
        };
        switch (i.operation) {
            case types_1.DbBrc20EventOperation.deploy: {
                return {
                    ...activity,
                    deploy: {
                        max_supply: decimals(i.deploy_max, i.deploy_decimals),
                        mint_limit: i.deploy_limit ? decimals(i.deploy_limit, i.deploy_decimals) : null,
                        decimals: i.deploy_decimals,
                    },
                };
            }
            case types_1.DbBrc20EventOperation.mint: {
                return {
                    ...activity,
                    mint: {
                        amount: decimals(i.mint_amount, i.deploy_decimals),
                    },
                };
            }
            case types_1.DbBrc20EventOperation.transfer: {
                const [amount, from_address] = i.transfer_data.split(';');
                return {
                    ...activity,
                    transfer: { amount: decimals(amount, i.deploy_decimals), from_address },
                };
            }
            case types_1.DbBrc20EventOperation.transferSend: {
                const [amount, from_address, to_address] = i.transfer_data.split(';');
                return {
                    ...activity,
                    transfer_send: { amount: decimals(amount, i.deploy_decimals), from_address, to_address },
                };
            }
        }
    });
}
exports.parseBrc20Activities = parseBrc20Activities;
function parseBrc20Holders(items) {
    return items.map(i => ({
        address: i.address,
        overall_balance: decimals(i.total_balance, i.decimals),
    }));
}
exports.parseBrc20Holders = parseBrc20Holders;
function parseSatPoint(satpoint) {
    const [tx_id, vout, offset] = satpoint.split(':');
    return { tx_id: normalizedHexString(tx_id), vout: vout, offset };
}
exports.parseSatPoint = parseSatPoint;
function decimals(num, decimals) {
    return new bignumber_js_1.default(num).toFixed(decimals);
}
/**
 * Decodes a `0x` prefixed hex string to a buffer.
 * @param hex - A hex string with a `0x` prefix.
 */
function hexToBuffer(hex) {
    if (hex.length === 0) {
        return Buffer.alloc(0);
    }
    if (!hex.startsWith('0x')) {
        throw new Error(`Hex string is missing the "0x" prefix: "${hex}"`);
    }
    if (hex.length % 2 !== 0) {
        throw new Error(`Hex string is an odd number of digits: ${hex}`);
    }
    return Buffer.from(hex.substring(2), 'hex');
}
exports.hexToBuffer = hexToBuffer;
const has0xPrefix = (id) => id.substr(0, 2).toLowerCase() === '0x';
exports.has0xPrefix = has0xPrefix;
function normalizedHexString(hex) {
    return (0, exports.has0xPrefix)(hex) ? hex.substring(2) : hex;
}
exports.normalizedHexString = normalizedHexString;
function blockParam(param, name) {
    const out = {};
    if (schemas_1.BlockHashParamCType.Check(param)) {
        out[`${name}_hash`] = param;
    }
    else if (schemas_1.BlockHeightParamCType.Check(param)) {
        out[`${name}_height`] = param;
    }
    return out;
}
exports.blockParam = blockParam;
//# sourceMappingURL=helpers.js.map