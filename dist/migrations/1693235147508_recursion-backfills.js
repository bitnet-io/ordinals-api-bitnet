"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.addColumn('inscription_recursions', {
        ref_inscription_genesis_id: {
            type: 'text',
        },
    });
    pgm.sql(`
    UPDATE inscription_recursions AS ir
    SET ref_inscription_genesis_id = (
      SELECT genesis_id FROM inscriptions WHERE id = ir.ref_inscription_id
    )
  `);
    pgm.alterColumn('inscription_recursions', 'ref_inscription_genesis_id', { notNull: true });
    pgm.alterColumn('inscription_recursions', 'ref_inscription_id', { allowNull: true });
    pgm.createIndex('inscription_recursions', ['ref_inscription_genesis_id']);
    pgm.createIndex('inscription_recursions', ['ref_inscription_id'], {
        where: 'ref_inscription_id IS NULL',
        name: 'inscription_recursions_ref_inscription_id_null_index',
    });
    pgm.dropConstraint('inscription_recursions', 'inscriptions_inscription_id_ref_inscription_id_unique');
    pgm.createConstraint('inscription_recursions', 'inscription_recursions_unique', 'UNIQUE(inscription_id, ref_inscription_genesis_id)');
}
exports.up = up;
function down(pgm) {
    pgm.dropConstraint('inscription_recursions', 'inscription_recursions_unique');
    pgm.dropIndex('inscription_recursions', ['ref_inscription_genesis_id']);
    pgm.dropColumn('inscription_recursions', 'ref_inscription_genesis_id');
    pgm.dropIndex('inscription_recursions', ['ref_inscription_id'], {
        name: 'inscription_recursions_ref_inscription_id_null_index',
    });
    pgm.sql(`DELETE FROM inscription_recursions WHERE ref_inscription_id IS NULL`);
    pgm.alterColumn('inscription_recursions', 'ref_inscription_id', { notNull: true });
    pgm.createConstraint('inscription_recursions', 'inscriptions_inscription_id_ref_inscription_id_unique', 'UNIQUE(inscription_id, ref_inscription_id)');
}
exports.down = down;
//# sourceMappingURL=1693235147508_recursion-backfills.js.map