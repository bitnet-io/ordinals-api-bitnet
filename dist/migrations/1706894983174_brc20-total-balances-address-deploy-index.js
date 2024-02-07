"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.dropIndex('brc20_total_balances', ['address']);
    pgm.createIndex('brc20_total_balances', ['address', 'brc20_deploy_id']);
}
exports.up = up;
function down(pgm) {
    pgm.dropIndex('brc20_total_balances', ['address', 'brc20_deploy_id']);
    pgm.createIndex('brc20_total_balances', ['address']);
}
exports.down = down;
//# sourceMappingURL=1706894983174_brc20-total-balances-address-deploy-index.js.map