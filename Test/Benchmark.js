
const QDB = require("../QDB");

// Benchmark configuration
const Disconnect  = true;
const GarbageTest = false;
const Benchmark   = Fetch;


// Active testing
function Test () {
    
}

// Million threaded queries benchmark
async function Thread () {
    const Pool = new QDB.Pool("Test/Guilds.qdb", {
        Threaded: true
    });

    const GuildsThread = Pool.$("Guilds");
    console.log("benchmark: fetch 1 million random queries in thread");
    const Indexes = await GuildsThread.Query("Indexes");

    console.time("time-for-million-reads");

    for (let i = 0; i < 1000 * 1000; i++) {
        const Id = Indexes[Math.round(Math.random() * Indexes.length)];
        if (!Id) continue;
        GuildsThread.Fetch(Id);
    }

    console.log(`cache size: ${await GuildsThread.Query("CacheSize")}`);
    console.timeEnd("time-for-million-reads");
    console.log(`memory usage: ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);

    Pool.Disconnect();
    if (Disconnect) Pool.Disconnect();
}

// Million queries benchmark
function Fetch () {
    const Guilds = new QDB.Connection("Test/Guilds.qdb", {
        Cache: true
    });

    console.log("benchmark: fetch 1 million random queries");
    const Indexes = Guilds.Indexes;

    console.time("time-for-million-reads");

    for (let i = 0; i < 1000 * 1000; i++) {
        const Id = Indexes[Math.round(Math.random() * Indexes.length)];
        if (!Id) continue;
        Guilds.Fetch(Id);
    }

    console.log(`cache size: ${Guilds.CacheSize}`);
    console.timeEnd("time-for-million-reads");
    console.log(`memory usage: ${process.memoryUsage().heapUsed / 1024 / 1024} MB`);

    if (Disconnect) Guilds.Disconnect();
}


if (typeof Benchmark === "function") Benchmark();

// Garbage collector
if (GarbageTest) {
    let i = 0;
    setInterval(() => {
        console.log(`${i++}: ${process.memoryUsage().heapUsed / 1024 / 1024}`);
    }, 500);
}
