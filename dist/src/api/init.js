"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPromServer = exports.buildApiServer = exports.Api = void 0;
const cors_1 = require("@fastify/cors");
const api_toolkit_1 = require("@hirosystems/api-toolkit");
const fastify_1 = require("fastify");
const fastify_metrics_1 = require("fastify-metrics");
const brc20_1 = require("./routes/brc20");
const inscriptions_1 = require("./routes/inscriptions");
const sats_1 = require("./routes/sats");
const stats_1 = require("./routes/stats");
const status_1 = require("./routes/status");
const Api = async (fastify) => {
    await fastify.register(status_1.StatusRoutes);
    await fastify.register(inscriptions_1.InscriptionsRoutes);
    await fastify.register(sats_1.SatRoutes);
    await fastify.register(stats_1.StatsRoutes);
    await fastify.register(brc20_1.Brc20Routes);
};
exports.Api = Api;
async function buildApiServer(args) {
    const fastify = (0, fastify_1.default)({
        trustProxy: true,
        logger: api_toolkit_1.PINO_LOGGER_CONFIG,
    }).withTypeProvider();
    fastify.decorate('db', args.db);
    if (api_toolkit_1.isProdEnv) {
        await fastify.register(fastify_metrics_1.default, { endpoint: null });
    }
    await fastify.register(cors_1.default);
    await fastify.register(exports.Api, { prefix: '/ordinals/v1' });
    await fastify.register(exports.Api, { prefix: '/ordinals' });
    return fastify;
}
exports.buildApiServer = buildApiServer;
async function buildPromServer(args) {
    const promServer = (0, fastify_1.default)({
        trustProxy: true,
        logger: api_toolkit_1.PINO_LOGGER_CONFIG,
    });
    promServer.route({
        url: '/metrics',
        method: 'GET',
        logLevel: 'info',
        handler: async (_, reply) => {
            await reply.type('text/plain').send(await args.metrics.client.register.metrics());
        },
    });
    return promServer;
}
exports.buildPromServer = buildPromServer;
//# sourceMappingURL=init.js.map