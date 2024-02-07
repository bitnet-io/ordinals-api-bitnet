"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.addColumns('brc20_deploys', {
        ticker_lower: {
            type: 'text',
            notNull: true,
            expressionGenerated: '(LOWER(ticker))',
        },
    });
    pgm.createIndex('brc20_deploys', ['ticker_lower']);
}
exports.up = up;
//# sourceMappingURL=1692188000000_brc20-deploys-ticker-index.js.map