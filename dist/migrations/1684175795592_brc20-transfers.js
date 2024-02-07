"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.createTable('brc20_transfers', {
        id: {
            type: 'bigserial',
            primaryKey: true,
        },
        inscription_id: {
            type: 'bigint',
            notNull: true,
        },
        brc20_deploy_id: {
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
        from_address: {
            type: 'text',
            notNull: true,
        },
        to_address: {
            type: 'text',
        },
        amount: {
            type: 'numeric',
            notNull: true,
        },
    });
    pgm.createConstraint('brc20_transfers', 'brc20_transfers_inscription_id_fk', 'FOREIGN KEY(inscription_id) REFERENCES inscriptions(id) ON DELETE CASCADE');
    pgm.createConstraint('brc20_transfers', 'brc20_transfers_brc20_deploy_id_fk', 'FOREIGN KEY(brc20_deploy_id) REFERENCES brc20_deploys(id) ON DELETE CASCADE');
    pgm.createIndex('brc20_transfers', ['inscription_id']);
    pgm.createIndex('brc20_transfers', ['brc20_deploy_id']);
    pgm.createIndex('brc20_transfers', ['block_height']);
    pgm.createIndex('brc20_transfers', ['from_address']);
    pgm.createIndex('brc20_transfers', ['to_address']);
}
exports.up = up;
//# sourceMappingURL=1684175795592_brc20-transfers.js.map