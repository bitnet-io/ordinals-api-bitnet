"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.addColumn('brc20_deploys', {
        tx_count: {
            type: 'bigint',
            default: 1,
        },
    });
}
exports.up = up;
//# sourceMappingURL=1694081119000_brc20-counts-by-tx-count.js.map