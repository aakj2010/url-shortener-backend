const express = require('express');
const bodyparser = require('body-parser')
const connectDB = require('./config/database')
const { UrlModel } = require('./models/urlshort')
const cors = require("cors")
require("dotenv").config();

connectDB()
const port = process.env.PORT || 5000
const app = express()

app.use(express.json())

app.use(cors({ origin: "*" }))

const generateUrl = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let rndResult = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
        rndResult += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(rndResult)
    return rndResult
}


app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));


app.get("/allUrl", (req, res) => {
    try {
        UrlModel.find().then((data) => {
            res.json(data)
        })
    } catch (error) {
        res.send(error)
    }
})


app.post('/create', (req, res) => {
    // Create a Short Url
    let urlShort = new UrlModel({
        longUrl: req.body.longUrl,
        shortUrl: generateUrl()

    })
    // Store it in DB
    urlShort.save((err, data) => {
        if (err) throw err;
        // res.send(`https://ak-shorturl.netlify.app/${urlShort.shortUrl}`)
        res.send(`http://localhost:8000/${urlShort.shortUrl}`)
    })
})

app.get('/:urlId', (req, res) => {

    console.log(req.body)
    try {
        let urlShort = UrlModel.findOne({ shortUrl: req.params.urlId }, (err, data) => {
            if (err) throw err;
            UrlModel.findByIdAndUpdate({ _id: data.id }, { $inc: { clickCount: 1 } }, (err, updateData) => {
                if (err) throw err;
                // res.redirect(data.longUrl)
            })
            res.redirect(data.longUrl)
            // res.redirect(req.body.longUrl)
        })
    } catch (error) {
        console.log(error)
    }
})


app.listen(port, () => {
    console.log(`Port is Running in ${port}`);
})