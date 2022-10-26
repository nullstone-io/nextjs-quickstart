'use strict'

const process = require('process');
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
if (process.env.OTEL_LOG_LEVEL) {
    diag.setLogger(new DiagConsoleLogger(), DiagLogLevel[process.env.OTEL_LOG_LEVEL ? process.env.OTEL_LOG_LEVEL : 'DEBUG']);
}

const appName = process.env.NULLSTONE_APP || "nextjs";
const version = process.env.NULLSTONE_VERSION || "dev";
const envName = process.env.NULLSTONE_ENV || 'local';

const opentelemetry = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

// custom nextjs server
const { startServer } = require('./server');

// configure the SDK to export telemetry data to the console
// enable all auto-instrumentations from the meta package
const traceExporter = new OTLPTraceExporter();
const sdk = new opentelemetry.NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: appName,
        [SemanticResourceAttributes.SERVICE_VERSION]: version,
        [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: envName,
    }),
    traceExporter,
    instrumentations: [getNodeAutoInstrumentations()]
});

// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk.start()
    .then(() => console.log('Tracing initialized'))
    .then(() => startServer())
    .catch((error) => console.log('Error initializing tracing', error));

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
    sdk.shutdown()
        .then(() => console.log('Tracing terminated'))
        .catch((error) => console.log('Error terminating tracing', error))
        .finally(() => process.exit(0));
});

module.exports = sdk