"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
function up(pgm) {
    pgm.addColumn('inscriptions', {
        classic_number: {
            type: 'bigint',
        },
    });
}
exports.up = up;
function down(pgm) {
    pgm.dropColumn('inscriptions', 'classic_number');
}
exports.down = down;
//# sourceMappingURL=1704341578275_jubilee-numbers.js.map