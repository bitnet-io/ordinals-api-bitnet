"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brc20FromInscriptionContent = exports.brc20FromInscription = void 0;
const type_provider_typebox_1 = require("@fastify/type-provider-typebox");
const compiler_1 = require("@sinclair/typebox/compiler");
const bignumber_js_1 = require("bignumber.js");
const helpers_1 = require("../../api/util/helpers");
const Brc20TickerSchema = type_provider_typebox_1.Type.String({ minLength: 1 });
const Brc20NumberSchema = type_provider_typebox_1.Type.RegEx(/^((\d+)|(\d*\.?\d+))$/);
const Brc20DeploySchema = type_provider_typebox_1.Type.Object({
    p: type_provider_typebox_1.Type.Literal('bit-20'),
    op: type_provider_typebox_1.Type.Literal('deploy'),
    tick: Brc20TickerSchema,
    max: Brc20NumberSchema,
    lim: type_provider_typebox_1.Type.Optional(Brc20NumberSchema),
    dec: type_provider_typebox_1.Type.Optional(type_provider_typebox_1.Type.RegEx(/^\d+$/)),
}, { additionalProperties: true });
const Brc20MintSchema = type_provider_typebox_1.Type.Object({
    p: type_provider_typebox_1.Type.Literal('bit-20'),
    op: type_provider_typebox_1.Type.Literal('mint'),
    tick: Brc20TickerSchema,
    amt: Brc20NumberSchema,
}, { additionalProperties: true });
const Brc20TransferSchema = type_provider_typebox_1.Type.Object({
    p: type_provider_typebox_1.Type.Literal('bit-20'),
    op: type_provider_typebox_1.Type.Literal('transfer'),
    tick: Brc20TickerSchema,
    amt: Brc20NumberSchema,
}, { additionalProperties: true });
const Brc20Schema = type_provider_typebox_1.Type.Union([Brc20DeploySchema, Brc20MintSchema, Brc20TransferSchema]);
const Brc20C = compiler_1.TypeCompiler.Compile(Brc20Schema);
const UINT64_MAX = (0, bignumber_js_1.default)('18446744073709551615'); // 20 digits
// Only compare against `UINT64_MAX` if the number is at least the same number of digits.
const numExceedsMax = (num) => num.length >= 20 && UINT64_MAX.isLessThan(num);
// For testing only
function brc20FromInscription(inscription) {
    if (inscription.number < 0)
        return;
    if (inscription.mime_type !== 'text/plain' && inscription.mime_type !== 'application/json')
        return;
    const buf = (0, helpers_1.hexToBuffer)(inscription.content).toString('utf-8');
    return brc20FromInscriptionContent(buf);
}
exports.brc20FromInscription = brc20FromInscription;
function brc20FromInscriptionContent(content) {
    try {
        const json = JSON.parse(content);
        if (Brc20C.Check(json)) {
            // Check ticker byte length
            if (Buffer.from(json.tick).length !== 4)
                return;
            // Check numeric values.
            if (json.op === 'deploy') {
                if (parseFloat(json.max) == 0 || numExceedsMax(json.max))
                    return;
                if (json.lim && (parseFloat(json.lim) == 0 || numExceedsMax(json.lim)))
                    return;
                if (json.dec && parseFloat(json.dec) > 8)
                    return;
            }
            else {
                if (parseFloat(json.amt) == 0 || numExceedsMax(json.amt))
                    return;
            }
            return json;
        }
    }
    catch (error) {
        // Not a BRC-20 inscription.
    }
}
exports.brc20FromInscriptionContent = brc20FromInscriptionContent;
//# sourceMappingURL=helpers.js.map