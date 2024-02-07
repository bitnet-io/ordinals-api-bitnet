"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGenerator = void 0;
const fastify_1 = require("fastify");
const init_1 = require("../src/api/init");
const swagger_1 = require("@fastify/swagger");
const fs_1 = require("fs");
const schemas_1 = require("../src/api/schemas");
/**
 * Generates `openapi.yaml` based on current Swagger definitions.
 */
const ApiGenerator = async (fastify, options) => {
    await fastify.register(swagger_1.default, schemas_1.OpenApiSchemaOptions);
    await fastify.register(init_1.Api, { prefix: '/ordinals/v1' });
    if (!(0, fs_1.existsSync)('./tmp')) {
        (0, fs_1.mkdirSync)('./tmp');
    }
    (0, fs_1.writeFileSync)('./tmp/openapi.yaml', fastify.swagger({ yaml: true }));
    (0, fs_1.writeFileSync)('./tmp/openapi.json', JSON.stringify(fastify.swagger(), null, 2));
};
exports.ApiGenerator = ApiGenerator;
const fastify = (0, fastify_1.default)({
    trustProxy: true,
    logger: true,
}).withTypeProvider();
void fastify.register(exports.ApiGenerator).then(async () => {
    await fastify.close();
});
//# sourceMappingURL=openapi-generator.js.map