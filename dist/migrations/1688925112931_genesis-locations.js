"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.createTable('genesis_locations', {
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
    pgm.createConstraint('genesis_locations', 'genesis_locations_inscription_id_unique', 'UNIQUE(inscription_id)');
    pgm.createIndex('genesis_locations', ['location_id']);
    pgm.createIndex('genesis_locations', ['block_height']);
    pgm.createIndex('genesis_locations', ['address']);
}
exports.up = up;
//# sourceMappingURL=1688925112931_genesis-locations.js.map