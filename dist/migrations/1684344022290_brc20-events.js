"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.createTable('brc20_events', {
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
        deploy_id: {
            type: 'bigint',
        },
        mint_id: {
            type: 'bigint',
        },
        transfer_id: {
            type: 'bigint',
        },
    });
    pgm.createConstraint('brc20_events', 'brc20_events_inscription_id_fk', 'FOREIGN KEY(inscription_id) REFERENCES inscriptions(id) ON DELETE CASCADE');
    pgm.createConstraint('brc20_events', 'brc20_events_brc20_deploy_id_fk', 'FOREIGN KEY(brc20_deploy_id) REFERENCES brc20_deploys(id) ON DELETE CASCADE');
    pgm.createConstraint('brc20_events', 'brc20_events_deploy_id_fk', 'FOREIGN KEY(deploy_id) REFERENCES brc20_deploys(id) ON DELETE CASCADE');
    pgm.createConstraint('brc20_events', 'brc20_events_mint_id_fk', 'FOREIGN KEY(mint_id) REFERENCES brc20_mints(id) ON DELETE CASCADE');
    pgm.createConstraint('brc20_events', 'brc20_events_transfer_id_fk', 'FOREIGN KEY(transfer_id) REFERENCES brc20_transfers(id) ON DELETE CASCADE');
    pgm.createConstraint('brc20_events', 'brc20_valid_event', 'CHECK(NUM_NONNULLS(deploy_id, mint_id, transfer_id) = 1)');
}
exports.up = up;
//# sourceMappingURL=1684344022290_brc20-events.js.map