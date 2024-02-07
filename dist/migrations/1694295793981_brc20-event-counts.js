"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.createTable('brc20_counts_by_event_type', {
        event_type: {
            type: 'brc20_operation',
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
//# sourceMappingURL=1694295793981_brc20-event-counts.js.map