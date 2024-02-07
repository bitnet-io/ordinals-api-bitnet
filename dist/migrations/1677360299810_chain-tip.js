"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.createMaterializedView('chain_tip', { data: true }, 
    // Set block height 114007 (inscription #0 genesis) as default.
    `SELECT GREATEST(MAX(block_height), 114007) AS block_height FROM locations`);
    pgm.createIndex('chain_tip', ['block_height'], { unique: true });
}
exports.up = up;
//# sourceMappingURL=1677360299810_chain-tip.js.map