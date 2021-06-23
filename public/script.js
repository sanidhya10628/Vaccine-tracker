// const { json } = require("express");

let x = 1;

const request = new XMLHttpRequest();



function myfunc() {
    let x = document.getElementById('dropdown').value; // x contains state id.
    // console.log(x);
    if (x == 'select') {
        alert("Please select state");
    }
    else {
        request.open('GET', `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${x}`);
        request.send();
    }
}


request.addEventListener('load', () => {
    const dist = JSON.parse(request.responseText);
    const dis = dist.districts; //array of objects containing districts
    // console.log(dis[2]);

    const temp = document.getElementById('District');
    // console.log(temp);
    for (let i = temp.length - 1; i >= 0; i--) {
        temp.options[i] = null;
    }

    for (let i = 0; i < dis.length; i++) {
        let opt = dis[i].district_name;
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = dis[i].district_id;
        // console.log(opt);
        // console.log(el);
        document.getElementById('District').appendChild(el);
    }

    const dis_id = document.getElementById('District');
    console.log(dis_id)
})


// indore id 314


document.getElementById('btn').addEventListener('click', () => {
    const id = document.getElementById('District').value;
    // console.log(id);
    const date = String(document.getElementById('date').value);
    // console.log(date);

    const yyyy = date.slice(0, 4);
    const mm = date.slice(5, 7);
    const dd = date.slice(8, 10);
    // console.log(dd);
    // console.log(mm);
    // console.log(yyyy);

    const ndate = `${dd}-${mm}-${yyyy}`
    console.log(ndate)

    const req = new XMLHttpRequest();
    req.open('GET', `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${ndate}`);

    req.send();

    req.addEventListener('load', () => {
        const help = JSON.parse(req.responseText);
        // console.log(typeof help);
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "/slots", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send({ name: "da", age: 20 });


    })


})

