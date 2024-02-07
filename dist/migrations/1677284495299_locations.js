"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.createTable('locations', {
        id: {
            type: 'bigserial',
            primaryKey: true,
        },
        inscription_id: {
            type: 'bigint',
        },
        genesis_id: {
            type: 'text',
            notNull: true,
        },
        block_height: {
            type: 'bigint',
            notNull: true,
        },
        block_hash: {
            type: 'text',
            notNull: true,
        },
        tx_id: {
            type: 'text',
            notNull: true,
        },
        tx_index: {
            type: 'bigint',
            notNull: true,
        },
        address: {
            type: 'text',
        },
        output: {
            type: 'text',
            notNull: true,
        },
        offset: {
            type: 'numeric',
        },
        prev_output: {
            type: 'text',
        },
        prev_offset: {
            type: 'numeric',
        },
        value: {
            type: 'numeric',
        },
        timestamp: {
            type: 'timestamptz',
            notNull: true,
        },
    });
    pgm.createConstraint('locations', 'locations_inscription_id_fk', 'FOREIGN KEY(inscription_id) REFERENCES inscriptions(id) ON DELETE CASCADE');
    pgm.createConstraint('locations', 'locations_output_offset_unique', 'UNIQUE(output, "offset")');
    pgm.createIndex('locations', ['inscription_id']);
    pgm.createIndex('locations', [
        'genesis_id',
        { name: 'block_height', sort: 'DESC' },
        { name: 'tx_index', sort: 'DESC' },
    ]);
    pgm.createIndex('locations', ['block_height']);
    pgm.createIndex('locations', ['block_hash']);
    pgm.createIndex('locations', ['address']);
    pgm.createIndex('locations', ['timestamp']);
    pgm.createIndex('locations', ['prev_output']);
}
exports.up = up;
//# sourceMappingURL=1677284495299_locations.js.map