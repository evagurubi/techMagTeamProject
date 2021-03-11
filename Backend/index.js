const express = require("express")
const app = express()
const port = 5000
const axios = require("axios")
const rateLimit = require("express-rate-limit")
const slowDown = require("express-slow-down")
const fs = require("fs")
const cors = require("cors")
const news = require("./news.json")
var session = require("express-session")
var parseurl = require("parseurl")

app.use(
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: true,
	})
)

const corsOptions = {
	//To allow requests from client
	origin: ["http://localhost:3000", "http://127.0.0.1"],
	credentials: true,
	exposedHeaders: ["set-cookie"],
}
app.use(express.json())
app.use(cors(corsOptions))
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

let dateToday = new Date().toISOString().slice(0, 19)

//const BASE_URL = `https://newsapi.org/v2/everything?q=technology&to=${dateToday}&sortBy=publishedAt&pageSize=100&apiKey=${apiKey}`

//console.log("cachetime: ", cacheTime)

// app.get("/", async (req, res) => {
// 	if (cacheTime && cacheTime > Date.now() - 900 * 1000) {
// 		console.log("bejutott")
// 		try {
// 			const { data } = await axios.get(`${BASE_URL}`)
// 			console.log("van data")
// 			fs.writeFileSync("./news.json", JSON.stringify(data))
// 			// cachedData = data
// 			cacheTime = Date.now()
// 			// data.cacheTime = cacheTime
// 			// return res.json(data)
// 		} catch (error) {
// 			console.log(error)
// 			return error
// 		}
// 	} else {
// 		cacheTime = Date.now()
// 	}
// })

app.get("/deletesession", function (req, res, next) {
	req.session = null
})

app.get("/", function (req, res) {
	const currentPages = req.query.page
	const returnedNews = news.articles.slice(
		(currentPages - 1) * 9,
		currentPages * 9
	)
	res.send(returnedNews)
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
