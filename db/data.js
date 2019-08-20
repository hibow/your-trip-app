// var moment = require('moment');
// var dateString = 'Thu Jul 15 2016 19:31:44 GMT+0200 (CEST)';
// var dateObj = new Date(dateString);
// console.log(dateObj);
// var momentObj = moment(dateObj);
// var momentString = momentObj.format('YYYY-MM-DD'); // 2016-07-15

// console.log(momentString);
const data = [
    {
    locid: 1,
    position: {
      lat: 51.505541,
      lng: -0.075172
    },
    title: "Tower Bridge",
    continent: "Europe",
    country: "United Kingdom",
    city: "London",
    time: "1998-12-26",
    photos : [
      "https://images.unsplash.com/photo-1523540499309-18d7a30ddf76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=4350&q=80"
    ],
    summary: "it is nice!"
   },
  {
    locid:2,
   position: {
     lat: 48.858441,
     lng: 2.294492
   },
   title: "Eiffel Tower",
   continent: "Europe",
   country: 'Frence',
   city: 'Paris',
   time: "2000-05-24",
   photos : [
     "https://images.unsplash.com/photo-1497197246330-b9cafd652212?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3150&q=80"
   ],
   summary: "Beautiful trip"
  },
  {
   locid:3,
   position: {
   lat: 41.890222,
   lng: 12.492236
 },
   title: "Colosseum",
   continent: "Europe",
   country: 'Italy',
   city: 'Rome',
   time: "2003-08-01",
   photos : [
     "https://images.unsplash.com/photo-1519879110616-349b57f8cd11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3150&q=80"
   ],
   summary: "today, we got up early and prepared..."
  },
  {
    locid:4,
    position: {
    lat: 38.897710,
    lng: -77.036541
  },
    title: "The White House",
    continent: "North America",
    country: 'United State',
    city: 'District of Columbia',
    time: "2004-07-04",
    photos : [
      "https://images.unsplash.com/photo-1485394595691-5411947d63a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2268&q=80"
    ],
    summary: "Happy July Forth!!"
   },
   {
    locid:5,
    position: {
    lat: 29.979297,
    lng: 31.134186
    },
    title: "The Great Pyramid of Giza",
    continent: "North America",
    country: 'Egypt',
    city: 'Giza Governorate',
    time: "2005-03-04",
    photos : [
      "https://images.unsplash.com/photo-1564554860010-304d58f6edb1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1852&q=80"
    ],
    summary: "This is the greatest adventure!!"
   },
   {
    locid:6,
    position: {
    lat: 43.789905,
    lng: -110.681165
    },
    title: "Grand Teton National Park",
    continent: "North America",
    country: 'United States',
    city: 'Wyoming',
    time: "2008-06-04",
    photos : [
      "https://images.unsplash.com/photo-1464731702276-ca042cfee339?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3155&q=80"
    ],
    summary: "Great hiking, staff, biking, and nearby Jackson is a great little town."
   },
   {
    locid:7,
    position: {
    lat: 10.772533,
    lng: 106.698043
    },
    title: "Ben Thanh Market",
    continent: "Asia",
    country: 'Vietnam',
    city: 'Ho Chi Minh City',
    time: "2010-09-24",
    photos : [
      "https://images.unsplash.com/photo-1552590854-5b55d5425066?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1264&q=80"
    ],
    summary: "Is a good place to buy souvenirs for tourist. Consider to visit the night market which is just outside the market. Night market will start about 7pm. Remember to bargain the price."
   },
];

module.exports = data;