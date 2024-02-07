"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const typebox_1 = require("@sinclair/typebox");
const env_schema_1 = require("env-schema");
const schema = typebox_1.Type.Object({
    /**
     * Run mode for this service. Allows you to control how the API runs, typically in an auto-scaled
     * environment. Available values are:
     * * `default`: Runs the ordhook server and the REST API server (this is the default)
     * * `writeonly`: Runs only the ordhook server
     * * `readonly`: Runs only the REST API server
     */
    RUN_MODE: typebox_1.Type.Enum({ default: 'default', readonly: 'readonly', writeonly: 'writeonly' }, { default: 'default' }),
    /** Hostname of the API server */
    API_HOST: typebox_1.Type.String({ default: '0.0.0.0' }),
    /** Port in which to serve the API */
    API_PORT: typebox_1.Type.Number({ default: 3000, minimum: 0, maximum: 65535 }),
    /** Port in which to serve the Admin RPC interface */
    ADMIN_RPC_PORT: typebox_1.Type.Number({ default: 3001, minimum: 0, maximum: 65535 }),
    /** Port in which to receive ordhook events */
    EVENT_PORT: typebox_1.Type.Number({ default: 3099, minimum: 0, maximum: 65535 }),
    /** Event server body limit (bytes) */
    EVENT_SERVER_BODY_LIMIT: typebox_1.Type.Integer({ default: 20971520 }),
    /** Hostname that will be reported to the ordhook node so it can call us back with events */
    EXTERNAL_HOSTNAME: typebox_1.Type.String({ default: '127.0.0.1' }),
    /** Hostname of the ordhook node we'll use to register predicates */
    CHAINHOOK_NODE_RPC_HOST: typebox_1.Type.String({ default: '127.0.0.1' }),
    /** Control port of the ordhook node */
    CHAINHOOK_NODE_RPC_PORT: typebox_1.Type.Number({ default: 20456, minimum: 0, maximum: 65535 }),
    /**
     * Authorization token that the ordhook node must send with every event to make sure it's
     * coming from the valid instance
     */
    CHAINHOOK_NODE_AUTH_TOKEN: typebox_1.Type.String(),
    /**
     * Register ordhook predicates automatically when the API is first launched. Set this to `false`
     * if you're configuring your predicates manually for any reason.
     */
    CHAINHOOK_AUTO_PREDICATE_REGISTRATION: typebox_1.Type.Boolean({ default: true }),
    PGHOST: typebox_1.Type.String(),
    PGPORT: typebox_1.Type.Number({ default: 5432, minimum: 0, maximum: 65535 }),
    PGUSER: typebox_1.Type.String(),
    PGPASSWORD: typebox_1.Type.String(),
    PGDATABASE: typebox_1.Type.String(),
    /** Limit to how many concurrent connections can be created */
    PG_CONNECTION_POOL_MAX: typebox_1.Type.Number({ default: 10 }),
    PG_IDLE_TIMEOUT: typebox_1.Type.Number({ default: 30 }),
    PG_MAX_LIFETIME: typebox_1.Type.Number({ default: 60 }),
    PG_STATEMENT_TIMEOUT: typebox_1.Type.Number({ default: 60000 }),
    /** Enables BRC-20 processing in write mode APIs */
    BRC20_BLOCK_SCAN_ENABLED: typebox_1.Type.Boolean({ default: true }),
    /** Enables inscription gap detection to prevent ingesting unordered blocks */
    INSCRIPTION_GAP_DETECTION_ENABLED: typebox_1.Type.Boolean({ default: true }),
});
exports.ENV = (0, env_schema_1.default)({
    schema: schema,
    dotenv: true,
});
//# sourceMappingURL=env.js.map