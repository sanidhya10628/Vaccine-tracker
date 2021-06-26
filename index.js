const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const ejs = require('ejs');

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
    const { District, date } = req.body;
    // console.log(data);
    // date yyyy mm dd
    const yyyy = date.slice(0, 4);
    const mm = date.slice(5, 7);
    const dd = date.slice(8, 10);

    const newdate = `${dd}-${mm}-${yyyy}`
    const data = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${District}&date=${newdate}`);

    const nd = await data.json();
    const slots = nd['sessions']
    // console.log(fin);
    // console.log(slots)
    res.render('slots', { slots, newdate });

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
    const slots = json_data['sessions'];
    // console.log(data);
    res.render('slots', { slots, newdate })
})

app.listen(8000, () => {
    console.log("On Port 8000");
})