"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.addColumn('brc20_deploys', {
        minted_supply: {
            type: 'numeric',
            default: 0,
        },
    });
    pgm.sql(`
    UPDATE brc20_deploys AS d
    SET minted_supply = (
      SELECT COALESCE(SUM(amount), 0) AS minted_supply
      FROM brc20_mints
      WHERE brc20_deploy_id = d.id
    )
  `);
    pgm.dropMaterializedView('brc20_supplies');
}
exports.up = up;
function down(pgm) {
    pgm.dropColumn('brc20_deploys', ['minted_supply']);
    pgm.createMaterializedView('brc20_supplies', { data: true }, `
      SELECT brc20_deploy_id, SUM(amount) as minted_supply, MAX(block_height) as block_height
      FROM brc20_mints
      GROUP BY brc20_deploy_id
    `);
    pgm.createIndex('brc20_supplies', ['brc20_deploy_id'], { unique: true });
}
exports.down = down;
//# sourceMappingURL=1693428793416_brc20-minted-supply-column.js.map