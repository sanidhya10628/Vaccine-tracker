const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const request = require('request');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/states', (req, res) => {
    res.render('ary');
})

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


const state = require('./data');
const s = state['states']; // array of objects

app.get('/', (req, res) => {

    res.render('home', { s });
})




app.get('/slots', (req, res) => {
    try {
        // const { District, date } = req.body;
        const District = req.query.District;
        const date = req.query.date;
        const yyyy = date.slice(0, 4);
        const mm = date.slice(5, 7);
        const dd = date.slice(8, 10);

        const newdate = `${dd}-${mm}-${yyyy}`
        const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${District}&date=${newdate}`;

        request({ url: url, json: true }, (error, response) => {
            if (error) {
                return res.send({ error });
            }

            const slots = response.body.sessions;
            // res.send({ slots })
            // res.render('slots', { slots })
            res.send({ slots })

        })
        // console.log(slots)
        // res.send(slots);
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }

    // res.send(await ejs.renderFile(, slots, { async: true }))
    // res.send(html);
})


app.get('/pin', (req, res) => {

    res.render('pincode')
})

app.get('/pincode', (req, res) => {
    // const { pincode, date } = req.body;
    const pincode = req.query.pincode;
    const date = req.query.date;
    // console.log(pincode, date)
    const yyyy = date.slice(0, 4);
    const mm = date.slice(5, 7);
    const dd = date.slice(8, 10);

    const newdate = `${dd}-${mm}-${yyyy}`;

    //api work
    const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${newdate}`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            return res.send({ error });
        }

        const slots = response.body.sessions;
        // res.send({ slots })
        res.render('slots', { slots })

    })
})


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("On Port 8000");
})