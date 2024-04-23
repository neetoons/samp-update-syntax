import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import ProgressBar from "progress";
const bar = new ProgressBar(":bar :percent", { total: 100 });

let lastIndex, actualIndex;
const timer = setInterval(function () {
    const file = readFileSync(join(process.cwd()) + "/input.pwn", "utf-8");
    const lines = file.split(/\n/);
    lines.forEach((line, index) => {
        actualIndex = Math.floor((index / lines.length) * 100);
        const regex = /foreach\((s*\w+\s*),\s*(\w+)\s*\)/;
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
            console.log(`\n${wholeLine} -> ${newForeach}`);
        }

        if (lastIndex != actualIndex) {
            lastIndex = actualIndex;
            bar.tick();
        }
    });
    if (bar.complete) {
        console.log("\ncomplete\n");
        clearInterval(timer);
    }
}, 100);
