"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startOrdhookServer = exports.PREDICATE_UUID = exports.ORDHOOK_BASE_PATH = void 0;
const crypto_1 = require("crypto");
const env_1 = require("../env");
const chainhook_client_1 = require("@hirosystems/chainhook-client");
const api_toolkit_1 = require("@hirosystems/api-toolkit");
exports.ORDHOOK_BASE_PATH = `http://${env_1.ENV.CHAINHOOK_NODE_RPC_HOST}:${env_1.ENV.CHAINHOOK_NODE_RPC_PORT}`;
exports.PREDICATE_UUID = (0, crypto_1.randomUUID)();
/**
 * Starts the Ordhook event observer.
 * @param args - DB
 * @returns ChainhookEventObserver instance
 */
async function startOrdhookServer(args) {
    const predicates = [];
    if (env_1.ENV.CHAINHOOK_AUTO_PREDICATE_REGISTRATION) {
        const blockHeight = await args.db.getChainTipBlockHeight();
        api_toolkit_1.logger.info(`Ordinals predicate starting from block ${blockHeight}...`);
        predicates.push({
            uuid: exports.PREDICATE_UUID,
            name: 'inscription_feed',
            version: 1,
            chain: 'bitcoin',
            networks: {
                mainnet: {
                    start_block: blockHeight,
                    if_this: {
                        scope: 'ordinals_protocol',
                        operation: 'inscription_feed',
                    },
                },
            },
        });
    }
    const serverOpts = {
        hostname: env_1.ENV.API_HOST,
        port: env_1.ENV.EVENT_PORT,
        auth_token: env_1.ENV.CHAINHOOK_NODE_AUTH_TOKEN,
        external_base_url: `http://${env_1.ENV.EXTERNAL_HOSTNAME}`,
        wait_for_chainhook_node: env_1.ENV.CHAINHOOK_AUTO_PREDICATE_REGISTRATION,
        validate_chainhook_payloads: true,
        body_limit: env_1.ENV.EVENT_SERVER_BODY_LIMIT,
        node_type: 'ordhook',
    };
    const ordhookOpts = {
        base_url: exports.ORDHOOK_BASE_PATH,
    };
    const server = new chainhook_client_1.ChainhookEventObserver(serverOpts, ordhookOpts);
    await server.start(predicates, async (uuid, payload) => {
        api_toolkit_1.logger.info(`OrdhookServer received payload from predicate ${uuid}`);
        await args.db.updateInscriptions(payload);
    });
    return server;
}
exports.startOrdhookServer = startOrdhookServer;
//# sourceMappingURL=server.js.map