"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.addColumns('brc20_events', {
        address: {
            type: 'text',
        },
        from_address: {
            type: 'text',
        },
    });
    pgm.createIndex('brc20_events', ['address']);
    pgm.createIndex('brc20_events', ['from_address']);
    pgm.sql(`
    UPDATE brc20_events
    SET address = (SELECT address FROM locations WHERE id = brc20_events.genesis_location_id)
  `);
    pgm.sql(`
    UPDATE brc20_events
    SET from_address = (SELECT from_address FROM brc20_transfers WHERE id = brc20_events.transfer_id)
    WHERE operation = 'transfer_send'
  `);
    pgm.alterColumn('brc20_events', 'address', { notNull: true });
    pgm.dropIndex('brc20_events', ['genesis_location_id']); // Covered by the unique index.
}
exports.up = up;
function down(pgm) {
    pgm.dropIndex('brc20_events', ['address']);
    pgm.dropIndex('brc20_events', ['from_address']);
    pgm.dropColumns('brc20_events', ['address', 'from_address']);
    pgm.createIndex('brc20_events', ['genesis_location_id']);
}
exports.down = down;
//# sourceMappingURL=1695243716885_brc20-events-addresses.js.map