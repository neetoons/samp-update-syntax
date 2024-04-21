const fs = require("fs")
const path = require("path")

const file = fs.readFileSync(path.join(__dirname) + "/input.pwn", "utf-8");
const lines = file.split(/\n/)
let count = 0;
lines.forEach(line => {
	count++
	console.log(`${ Math.floor(count /  lines.length * 100)} / 100`)
	const regex = /foreach\((s*\w+\s*),\s*(\w+)\s*\)/
	const matched =  line.match(regex)
	if(!matched)  {
		return fs.writeFileSync("out.pwn", line, {flag:"a+", encoding:"utf8"})
	}

	let wholeLine = matched[0]
	let first = matched[1]
	let second = matched[2]
	let oldForeach = new RegExp(`${first}\\s*,\\s*${second}`, "gm")
	let newForeach = `new ${second} : ${first}`
	let result = line.replace(oldForeach, newForeach)
	console.log(`${wholeLine} -> ${newForeach}`)
	fs.writeFileSync("output.pwn", result, {flag:"a+", encoding:"utf8"})
})

