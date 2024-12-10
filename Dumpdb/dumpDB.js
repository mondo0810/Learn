const mysqldump = require('mysqldump');
const fs = require('fs');
const path = require('path');

const dbConfig = {
    host: "45.77.254.148",
    user: "hackathon",
    password: "hackathon",
    database: "hackathon",
};

const backupDir = path.join(__dirname, "backup");
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
}

const timestamp = new Date().toISOString().replace(/T/, "_").replace(/:/g, "-").split(".")[0];
const dumpFile = path.join(backupDir, `dump_${timestamp}.sql`);

console.log("Đang sao lưu cơ sở dữ liệu...");

mysqldump({
    connection: dbConfig,
    dumpToFile: dumpFile,
}).then(() => {
    console.log(`Cơ sở dữ liệu đã được dump thành công! File dump: ${dumpFile}`);
}).catch((error) => {
    console.error(`Lỗi khi dump cơ sở dữ liệu: ${error.message}`);
});
