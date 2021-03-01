# heb-covid-check
Poller for available vaccine appointments at HEB.

## To Use
```
$ git clone git@github.com:troywarr/heb-covid-check.git
$ cd heb-covid-check
$ npm install
$ node index.js
```

In the terminal output, you'll see `checking...` every time the program polls the HEB data. If and when it encounters and available appointment, it will log the pertinent data to the console and open the appointment scheduling web page in your default web browser, playing 5 notification beeps to get your attention. You will likely only have several seconds to claim an appointment date and time in order to start the 10-minute reservation window that will allow you to enter your information and schedule the appointment.

## Settings
- Change polling interval in the code [here](https://github.com/troywarr/heb-covid-check/blob/e191ab3a2974dac34ff2529eaffa5b6553760b60/index.js#L8). The HEB website updates every 60 seconds, so the only advantage to setting this lower than 60 seconds is to minimize the time that passes after their update before the program sees their new data.
- Change cities to watch in the code [here](https://github.com/troywarr/heb-covid-check/blob/e191ab3a2974dac34ff2529eaffa5b6553760b60/index.js#L9-L13). You can find available cities in the [example HEB data output file](https://github.com/troywarr/heb-covid-check/blob/main/example-heb-data.json). Be sure to match case exactly as shown in the data. Some cities have multiple cases (e.g., `"San Antonio"` and `"SAN ANTONIO"`), so be sure to include all variants.
