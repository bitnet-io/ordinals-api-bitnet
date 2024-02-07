"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.createMaterializedView('brc20_supplies', { data: true }, `
      SELECT brc20_deploy_id, SUM(amount) as minted_supply, MAX(block_height) as block_height
      FROM brc20_mints
      GROUP BY brc20_deploy_id
    `);
    pgm.createIndex('brc20_supplies', ['brc20_deploy_id'], { unique: true });
}
exports.up = up;
//# sourceMappingURL=1692132685000_brc20-supply-view.js.map