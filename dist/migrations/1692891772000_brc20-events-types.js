"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.createType('brc20_operation', ['deploy', 'mint', 'transfer', 'transfer_send']);
    pgm.addColumns('brc20_events', {
        genesis_location_id: {
            type: 'bigint',
            references: '"locations"',
            onDelete: 'CASCADE',
            notNull: true,
            unique: true, // only one event exists per location
        },
        operation: {
            type: 'brc20_operation',
            notNull: true,
        },
    });
    pgm.createIndex('brc20_events', ['genesis_location_id']);
    pgm.createIndex('brc20_events', ['operation']);
    pgm.createIndex('brc20_events', ['brc20_deploy_id']);
    pgm.createIndex('brc20_events', ['transfer_id']);
    pgm.createIndex('brc20_events', ['mint_id']);
}
exports.up = up;
function down(pgm) {
    pgm.dropIndex('brc20_events', ['genesis_location_id']);
    pgm.dropIndex('brc20_events', ['operation']);
    pgm.dropColumns('brc20_events', ['genesis_location_id', 'operation']);
    pgm.dropIndex('brc20_events', ['brc20_deploy_id']);
    pgm.dropIndex('brc20_events', ['transfer_id']);
    pgm.dropIndex('brc20_events', ['mint_id']);
    pgm.dropType('brc20_operation');
}
exports.down = down;
//# sourceMappingURL=1692891772000_brc20-events-types.js.map