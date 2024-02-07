"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_toolkit_1 = require("@hirosystems/api-toolkit");
const init_1 = require("./api/init");
const server_1 = require("./ordhook/server");
const env_1 = require("./env");
const metrics_1 = require("./metrics/metrics");
const pg_store_1 = require("./pg/pg-store");
async function initBackgroundServices(db) {
    api_toolkit_1.logger.info('Initializing background services...');
    const server = await (0, server_1.startOrdhookServer)({ db });
    (0, api_toolkit_1.registerShutdownConfig)({
        name: 'Ordhook Server',
        forceKillable: false,
        handler: async () => {
            await server.close();
        },
    });
}
async function initApiService(db) {
    api_toolkit_1.logger.info('Initializing API service...');
    const fastify = await (0, init_1.buildApiServer)({ db });
    (0, api_toolkit_1.registerShutdownConfig)({
        name: 'API Server',
        forceKillable: false,
        handler: async () => {
            await fastify.close();
        },
    });
    await fastify.listen({ host: env_1.ENV.API_HOST, port: env_1.ENV.API_PORT });
    if (api_toolkit_1.isProdEnv) {
        const promServer = await (0, init_1.buildPromServer)({ metrics: fastify.metrics });
        (0, api_toolkit_1.registerShutdownConfig)({
            name: 'Prometheus Server',
            forceKillable: false,
            handler: async () => {
                await promServer.close();
            },
        });
        metrics_1.ApiMetrics.configure(db);
        await promServer.listen({ host: env_1.ENV.API_HOST, port: 9153 });
    }
}
async function initApp() {
    api_toolkit_1.logger.info(`Initializing in ${env_1.ENV.RUN_MODE} run mode...`);
    const db = await pg_store_1.PgStore.connect({ skipMigrations: env_1.ENV.RUN_MODE === 'readonly' });
    if (['default', 'writeonly'].includes(env_1.ENV.RUN_MODE)) {
        await initBackgroundServices(db);
    }
    if (['default', 'readonly'].includes(env_1.ENV.RUN_MODE)) {
        await initApiService(db);
    }
    (0, api_toolkit_1.registerShutdownConfig)({
        name: 'DB',
        forceKillable: false,
        handler: async () => {
            await db.close();
        },
    });
}
(0, api_toolkit_1.registerShutdownConfig)();
initApp()
    .then(() => {
    api_toolkit_1.logger.info('App initialized');
})
    .catch(error => {
    api_toolkit_1.logger.error(error, `App failed to start`);
    process.exit(1);
});
//# sourceMappingURL=index.js.map