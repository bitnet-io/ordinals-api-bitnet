"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.createTable('current_locations', {
        inscription_id: {
            type: 'bigint',
            notNull: true,
        },
        location_id: {
            type: 'bigint',
            notNull: true,
        },
        block_height: {
            type: 'bigint',
            notNull: true,
        },
        tx_index: {
            type: 'bigint',
            notNull: true,
        },
        address: {
            type: 'text',
        },
    });
    pgm.createConstraint('current_locations', 'current_locations_inscription_id_unique', 'UNIQUE(inscription_id)');
    pgm.createIndex('current_locations', ['location_id']);
    pgm.createIndex('current_locations', ['block_height']);
    pgm.createIndex('current_locations', ['address']);
}
exports.up = up;
//# sourceMappingURL=1689006001522_current-locations.js.map