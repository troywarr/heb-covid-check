const fetch = require('node-fetch');
const open = require('open');
const beep = require('beepbeep');



// settings
const checkInterval = 6; // 10 times/minute
const tabsToOpen = 1; // set to a higher number to try to get multiple appointments at similar times
const desiredCities = [ // use lowercase to avoid any case mismatches
    'austin',
    'round rock', 
    'pflugerville',
    'bastrop',
    'new braunfels',
    'wimberley',
    'la grange',
    'san antonio',
];



const checkAvailability = async function () {
    console.log('checking...');
    const response = await fetch('https://heb-ecom-covid-vaccine.hebdigital-prd.com/vaccine_locations.json', {
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
    const data = await response.json()

    const available = data.locations.filter(loc =>
        desiredCities.includes(loc.city.toLowerCase()) && loc.openTimeslots > 1
    )

    if (available.length) {
        clearInterval(checking);
        available.sort((a, b) => b.openTimeslots - a.openTimeslots);

        for (let i = 0; i < tabsToOpen; i++) {
            (async () => {
                await open(available[0].url);
            })();
        }
        beep(3, 250);
    }
};

const checking = setInterval(checkAvailability, checkInterval * 1000);
checkAvailability();
