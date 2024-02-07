"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.createTable('brc20_counts_by_tokens', {
        token_type: {
            type: 'text',
            notNull: true,
            primaryKey: true,
        },
        count: {
            type: 'bigint',
            notNull: true,
            default: 1,
        },
    });
}
exports.up = up;
//# sourceMappingURL=1694299763914_brc20-token-count.js.map