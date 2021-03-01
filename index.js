const fetch = require('node-fetch');
const open = require('open');
const beep = require('beepbeep');



// settings
const checkInterval = 10; // every 10 seconds
const desiredCities = [
    // 'LUBBOCK',
    // 'ODESSA',
    'AUSTIN',
];



const checkAvailability = function () {
    console.log('checking...');
    fetch('https://heb-ecom-covid-vaccine.hebdigital-prd.com/vaccine_locations.json', {
        headers: {
            'sec-ch-ua': '"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"',
            'sec-ch-ua-mobile': '?0'
        },
        referrer: 'https://vaccine.heb.com/',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: null,
        method: 'GET',
        mode: 'cors',
    })
        .then(response => response.json())
        .then(data => {
            let available = [];
            for (let i = 0, len = data.locations.length; i < len; i++) {
                if (desiredCities.includes(data.locations[i].city) && data.locations[i].openTimeslots > 0) {
                    available.push(data.locations[i]);
                }
            }
            if (available.length > 0) {
                clearInterval(checking);
                beep(5, 200);
                available.sort((a, b) => b.openTimeslots - a.openTimeslots);
                console.log(available);
                (async () => {
                    await open(available[0].url);
                })();
            }
        });
};

const checking = setInterval(checkAvailability, checkInterval * 1000);
checkAvailability();
