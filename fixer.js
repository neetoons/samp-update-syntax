import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import ProgressBar from "progress";

const verbose = false;
const file = readFileSync(join(process.cwd()) + "/test.pwn", "utf-8");
const lines = file.split(/\n/);
const bar = new ProgressBar(":bar :percent", { total: lines.length });
const regex = /foreach\((s*\w+\s*),\s*(\w+)\s*\)/;
writeFileSync("output.pwn", "", { flag: "w", encoding: "utf8" });

const timer = setInterval(function () {
    if (bar.complete) {
        console.log("\ncomplete\n");
        clearInterval(timer);
    }
}, 100);

lines.forEach((line) => {
    const matched = line.match(regex);
    if (!matched) {
        writeFileSync("output.pwn", line, { flag: "a+", encoding: "utf8" });
    } else {
        let [wholeLine, first, second] = matched;
        let oldForeach = new RegExp(`${first}\\s*,\\s*${second}`, "gm");
        let newForeach = `new ${second} : ${first}`;
        let result = line.replace(oldForeach, newForeach);
        writeFileSync("output.pwn", result, {
            flag: "a+",
            encoding: "utf8",
        });
        if (verbose) console.log(`\n${wholeLine} -> ${newForeach}`);
    }
    bar.tick();
});
