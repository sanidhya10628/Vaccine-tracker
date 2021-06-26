const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const ejs = require('ejs');
const axios = require('axios')
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




app.post('/slots', async (req, res) => {
    try {
        const { District, date } = req.body;
        const yyyy = date.slice(0, 4);
        const mm = date.slice(5, 7);
        const dd = date.slice(8, 10);

        const newdate = `${dd}-${mm}-${yyyy}`
        const data = await axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${District}&date=${newdate}`);
        let slots = data.data.sessions;
        // let slots = JSON.parse(data.data);

        // const nd = await data.json();
        // const slots = nd['sessions']
        // console.log(fin);
        // console.log(slots)
        // const slots = [{
        //     name: "Sanidhya",
        //     address: "Rohit",
        //     pincode: "452005",
        //     available_capacity: 20,
        //     available_capacity_dose1: 42,
        //     available_capacity_dose2: 22,
        //     fee_type: "free",
        //     min_age_limit: 18,
        //     vaccine: "Covisheild"
        // }]
        res.render('slots', { slots });
    }
    catch (err) {
        console.log(err);
        res.send(err);
    }

    // res.send(await ejs.renderFile(, slots, { async: true }))
    // res.send(html);
})


app.get('/pincode', (req, res) => {

    res.render('pincode')
})

app.post('/pincode', async (req, res) => {
    const { pincode, date } = req.body;
    // console.log(pincode, date)
    const yyyy = date.slice(0, 4);
    const mm = date.slice(5, 7);
    const dd = date.slice(8, 10);

    const newdate = `${dd}-${mm}-${yyyy}`
    //api work
    const responsedata = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${newdate}`)

    const json_data = await responsedata.json();
    const slots = await json_data['sessions'];
    // console.log(data);
    res.render('slots', { slots, newdate })
})


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    // console.log("On Port 8000");
})