"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.revealInsertsFromOrdhookEvent = exports.removeNullBytes = exports.objRemoveUndefinedValues = exports.throwOnFirstRejected = exports.getInscriptionRecursion = exports.assertNoBlockInscriptionGap = void 0;
const api_toolkit_1 = require("@hirosystems/api-toolkit");
const helpers_1 = require("../api/util/helpers");
const env_1 = require("../env");
const types_1 = require("./types");
const ordinal_satoshi_1 = require("../api/util/ordinal-satoshi");
/**
 * Check if writing a block would create an inscription number gap
 * @param currentNumber - Current max blessed number
 * @param newNumbers - New blessed numbers to be inserted
 */
function assertNoBlockInscriptionGap(args) {
    if (!env_1.ENV.INSCRIPTION_GAP_DETECTION_ENABLED)
        return;
    args.newNumbers.sort((a, b) => a - b);
    for (let n = 0; n < args.newNumbers.length; n++) {
        const curr = args.currentNumber + n;
        const next = args.newNumbers[n];
        //    if (next !== curr + 1)
        //    throw new BadPayloadRequestError(
        //    `Block inscription gap detected: Attempting to insert #${next} (${args.newBlockHeight}) but current max is #${curr}. Chain tip is at ${args.currentBlockHeight}.`
        //  );
    }
}
exports.assertNoBlockInscriptionGap = assertNoBlockInscriptionGap;
/**
 * Returns a list of referenced inscription ids from inscription content.
 * @param content - Inscription content
 * @returns List of IDs
 */
function getInscriptionRecursion(content) {
    const buf = typeof content === 'string' ? (0, helpers_1.hexToBuffer)(content) : content;
    const strContent = buf.toString('utf-8');
    const result = [];
    for (const match of strContent.matchAll(/\/content\/([a-fA-F0-9]{64}i\d+)/g)) {
        result.push(match[1]);
    }
    return result;
}
exports.getInscriptionRecursion = getInscriptionRecursion;
/**
 * Returns the values from settled Promise results.
 * Throws if any Promise is rejected.
 * This can be used with Promise.allSettled to get the values from all promises,
 * instead of Promise.all which will swallow following unhandled rejections.
 * @param settles - Array of `Promise.allSettled()` results
 * @returns Array of Promise result values
 */
function throwOnFirstRejected(settles) {
    const values = [];
    for (const promise of settles) {
        if (promise.status === 'rejected')
            throw promise.reason;
        // Note: Pushing to result `values` array is required for type inference
        // Compared to e.g. `settles.map(s => s.value)`
        values.push(promise.value);
    }
    return values;
}
exports.throwOnFirstRejected = throwOnFirstRejected;
function objRemoveUndefinedValues(obj) {
    Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key]);
}
exports.objRemoveUndefinedValues = objRemoveUndefinedValues;
/**
 * Replace null bytes on a string with an empty string
 * @param input - String
 * @returns Sanitized string
 */
function removeNullBytes(input) {
    return input.replace(/\x00/g, '');
}
exports.removeNullBytes = removeNullBytes;
function updateFromOrdhookInscriptionRevealed(args) {
    const satoshi = new ordinal_satoshi_1.OrdinalSatoshi(args.reveal.ordinal_number);
    const satpoint = (0, helpers_1.parseSatPoint)(args.reveal.satpoint_post_inscription);
    const recursive_refs = getInscriptionRecursion(args.reveal.content_bytes);
    const contentType = removeNullBytes(args.reveal.content_type);
    return {
        inscription: {
            genesis_id: args.reveal.inscription_id,
            mime_type: contentType.split(';')[0],
            content_type: contentType,
            content_length: args.reveal.content_length,
            number: args.reveal.inscription_number.jubilee,
            classic_number: args.reveal.inscription_number.classic,
            content: removeNullBytes(args.reveal.content_bytes),
            fee: args.reveal.inscription_fee.toString(),
            curse_type: args.reveal.curse_type ? JSON.stringify(args.reveal.curse_type) : null,
            sat_ordinal: args.reveal.ordinal_number.toString(),
            sat_rarity: satoshi.rarity,
            sat_coinbase_height: satoshi.blockHeight,
            recursive: recursive_refs.length > 0,
        },
        location: {
            block_hash: args.block_hash,
            block_height: args.block_height,
            tx_id: args.tx_id,
            tx_index: args.reveal.tx_index,
            block_transfer_index: null,
            genesis_id: args.reveal.inscription_id,
            address: args.reveal.inscriber_address,
            output: `${satpoint.tx_id}:${satpoint.vout}`,
            offset: satpoint.offset ?? null,
            prev_output: null,
            prev_offset: null,
            value: args.reveal.inscription_output_value.toString(),
            timestamp: args.timestamp,
            transfer_type: types_1.DbLocationTransferType.transferred,
        },
        recursive_refs,
    };
}
function updateFromOrdhookInscriptionTransferred(args) {
    const satpoint = (0, helpers_1.parseSatPoint)(args.transfer.satpoint_post_transfer);
    const prevSatpoint = (0, helpers_1.parseSatPoint)(args.transfer.satpoint_pre_transfer);
    return {
        location: {
            block_hash: args.block_hash,
            block_height: args.block_height,
            tx_id: args.tx_id,
            tx_index: args.transfer.tx_index,
            block_transfer_index: args.blockTransferIndex,
            ordinal_number: args.transfer.ordinal_number.toString(),
            address: args.transfer.destination.value ?? null,
            output: `${satpoint.tx_id}:${satpoint.vout}`,
            offset: satpoint.offset ?? null,
            prev_output: `${prevSatpoint.tx_id}:${prevSatpoint.vout}`,
            prev_offset: prevSatpoint.offset ?? null,
            value: args.transfer.post_transfer_output_value
                ? args.transfer.post_transfer_output_value.toString()
                : null,
            timestamp: args.timestamp,
            transfer_type: (0, api_toolkit_1.toEnumValue)(types_1.DbLocationTransferType, args.transfer.destination.type) ??
                types_1.DbLocationTransferType.transferred,
        },
    };
}
function revealInsertsFromOrdhookEvent(event) {
    // Keep the relative ordering of a transfer within a block for faster future reads.
    let blockTransferIndex = 0;
    const block_height = event.block_identifier.index;
    const block_hash = (0, helpers_1.normalizedHexString)(event.block_identifier.hash);
    const writes = [];
    for (const tx of event.transactions) {
        const tx_id = (0, helpers_1.normalizedHexString)(tx.transaction_identifier.hash);
        for (const operation of tx.metadata.ordinal_operations) {
            if (operation.inscription_revealed)
                writes.push(updateFromOrdhookInscriptionRevealed({
                    block_hash,
                    block_height,
                    tx_id,
                    timestamp: event.timestamp,
                    reveal: operation.inscription_revealed,
                }));
            if (operation.inscription_transferred)
                writes.push(updateFromOrdhookInscriptionTransferred({
                    block_hash,
                    block_height,
                    tx_id,
                    timestamp: event.timestamp,
                    blockTransferIndex: blockTransferIndex++,
                    transfer: operation.inscription_transferred,
                }));
        }
    }
    return writes;
}
exports.revealInsertsFromOrdhookEvent = revealInsertsFromOrdhookEvent;
//# sourceMappingURL=helpers.js.map