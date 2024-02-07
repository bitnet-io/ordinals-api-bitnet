"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.createTable('inscriptions', {
        id: {
            type: 'bigserial',
            primaryKey: true,
        },
        genesis_id: {
            type: 'text',
            notNull: true,
        },
        number: {
            type: 'bigint',
            notNull: true,
        },
        sat_ordinal: {
            type: 'numeric',
            notNull: true,
        },
        sat_rarity: {
            type: 'text',
            notNull: true,
        },
        sat_coinbase_height: {
            type: 'bigint',
            notNull: true,
        },
        mime_type: {
            type: 'text',
            notNull: true,
        },
        content_type: {
            type: 'text',
            notNull: true,
        },
        content_length: {
            type: 'bigint',
            notNull: true,
        },
        content: {
            type: 'bytea',
            notNull: true,
        },
        fee: {
            type: 'numeric',
            notNull: true,
        },
        curse_type: {
            type: 'text',
        },
        updated_at: {
            type: 'timestamptz',
            default: pgm.func('(NOW())'),
            notNull: true,
        },
    });
    pgm.createConstraint('inscriptions', 'inscriptions_number_unique', 'UNIQUE(number)');
    pgm.createIndex('inscriptions', ['genesis_id']);
    pgm.createIndex('inscriptions', ['mime_type']);
    pgm.createIndex('inscriptions', ['sat_ordinal']);
    pgm.createIndex('inscriptions', ['sat_rarity']);
    pgm.createIndex('inscriptions', ['sat_coinbase_height']);
    pgm.createIndex('inscriptions', [{ name: 'updated_at', sort: 'DESC' }]);
}
exports.up = up;
//# sourceMappingURL=1676395230930_inscriptions.js.map