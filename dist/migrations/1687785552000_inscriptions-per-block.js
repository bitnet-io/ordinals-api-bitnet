"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.createTable('inscriptions_per_block', {
        block_height: {
            type: 'bigint',
            primaryKey: true,
        },
        block_hash: {
            type: 'text',
            notNull: true,
        },
        inscription_count: {
            type: 'bigint',
            notNull: true,
        },
        inscription_count_accum: {
            type: 'bigint',
            notNull: true,
        },
        timestamp: {
            type: 'timestamptz',
            notNull: true,
        },
    });
}
exports.up = up;
//# sourceMappingURL=1687785552000_inscriptions-per-block.js.map