"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.createType('transfer_type', ['transferred', 'spent_in_fees', 'burnt']);
    pgm.addColumn('locations', {
        transfer_type: {
            type: 'transfer_type',
            notNull: true,
        },
    });
}
exports.up = up;
//# sourceMappingURL=1698856424356_locations-transfer-type.js.map