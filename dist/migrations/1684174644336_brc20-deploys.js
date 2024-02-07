"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.createTable('brc20_deploys', {
        id: {
            type: 'bigserial',
            primaryKey: true,
        },
        inscription_id: {
            type: 'bigint',
            notNull: true,
        },
        block_height: {
            type: 'bigint',
            notNull: true,
        },
        tx_id: {
            type: 'text',
            notNull: true,
        },
        address: {
            type: 'text',
            notNull: true,
        },
        ticker: {
            type: 'text',
            notNull: true,
        },
        max: {
            type: 'numeric',
            notNull: true,
        },
        limit: {
            type: 'numeric',
        },
        decimals: {
            type: 'int',
            notNull: true,
        },
    });
    pgm.createConstraint('brc20_deploys', 'brc20_deploys_inscription_id_fk', 'FOREIGN KEY(inscription_id) REFERENCES inscriptions(id) ON DELETE CASCADE');
    pgm.createIndex('brc20_deploys', ['inscription_id']);
    pgm.createIndex('brc20_deploys', 'LOWER(ticker)', { unique: true });
    pgm.createIndex('brc20_deploys', ['block_height']);
    pgm.createIndex('brc20_deploys', ['address']);
}
exports.up = up;
//# sourceMappingURL=1684174644336_brc20-deploys.js.map