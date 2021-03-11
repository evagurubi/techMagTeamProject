const cookieSession = require("cookie-session")
const express = require("express")
const app = express()
const port = 5000
const axios = require("axios")
const rateLimit = require("express-rate-limit")
const slowDown = require("express-slow-down")
const fs = require("fs")
const cors = require("cors")

app.use(
	cookieSession({
		name: "cookiemonster",
		keys: ["1234", "abcd"],
	})
)
app.use(express.json())
app.use(cors())

const limiter = rateLimit({
	windowMs: 30 * 1000,
	max: 10,
})

const speedLimiter = slowDown({
	windowMs: 30 * 1000,
	delayAfter: 1,
	delayMs: 500,
})
let cacheTime
//const apiKey = process.env.REACT_APP_NEWS
const apiKey = "d51108d2115a49a4be98a079785480ee"

console.log(apiKey)
const router = express.Router()
let dateToday = new Date().toISOString().slice(0, 19)

//const BASE_URL = `https://newsapi.org/v2/everything?q=technology&to=${dateToday}&sortBy=publishedAt&pageSize=100&apiKey=${apiKey}`

console.log("cachetime: ", cacheTime)

app.get("/", async (req, res) => {
	if (cacheTime && cacheTime > Date.now() - 900 * 1000) {
		console.log("bejutott")
		try {
			const { data } = await axios.get(`${BASE_URL}`)
			console.log("van data")
			fs.writeFileSync("./news.json", JSON.stringify(data))
			// cachedData = data
			cacheTime = Date.now()
			// data.cacheTime = cacheTime
			// return res.json(data)
		} catch (error) {
			console.log(error)
			return error
		}
	} else {
		cacheTime = Date.now()
	}
})

app.get("/", function (req, res, next) {
	// Update views
	req.session.views = (req.session.views || 0) + 1

	// Write response
	res.end(req.session.views + " views")
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
