const graceful = new graceful()

const stopAgenda = async function graceful() {
    await agenda.stop();
    process.exit(0);
}

process.on('SIGTERM', graceful);
process.on('SIGINT', graceful);