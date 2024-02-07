"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.dropConstraint('locations', 'locations_output_offset_unique');
    pgm.createIndex('locations', ['output', 'offset']);
    pgm.createConstraint('locations', 'locations_inscription_id_block_height_tx_index_unique', 'UNIQUE(inscription_id, block_height, tx_index)');
}
exports.up = up;
function down(pgm) {
    pgm.dropConstraint('locations', 'locations_inscription_id_block_height_tx_index_unique');
    pgm.dropIndex('locations', ['output', 'offset']);
    // Modify any repeated offsets slightly so we can re-add the unique constraint. This is mostly for
    // unit testing purposes.
    pgm.sql(`
    WITH duplicates AS (
      SELECT
        id, output, "offset", ROW_NUMBER() OVER (PARTITION BY output, "offset" ORDER BY id) as rn
      FROM locations
    )
    UPDATE locations
    SET "offset" = duplicates."offset" + rn - 1
    FROM duplicates
    WHERE locations.id = duplicates.id
    AND rn > 1
  `);
    pgm.createConstraint('locations', 'locations_output_offset_unique', 'UNIQUE(output, "offset")');
}
exports.down = down;
//# sourceMappingURL=1692980393413_locations-unique.js.map