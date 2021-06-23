const btn = document.getElementsByClassName('btn')
for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', () => {
        const value = btn[i].textContent;
        // console.log(value)
        // const filter = document.getElementById(value);
        // console.log(filter)
        // if (value ==='COVISHIELD')
        // {
        //     const filter = document.getElementById('vaccine');
        // }

    })
}

