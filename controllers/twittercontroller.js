const cheerio = require('cheerio');
const axios = require('axios');
const puppeteer = require("puppeteer");

var Twit = require('twit')
 
var T = new Twit({
  consumer_key:        process.env.consumerkey,
  consumer_secret:     process.env.consumersecret,
  access_token:         process.env.accesstoken,
  access_token_secret:  process.env.accesstokensecret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})


const whatsappdatafetch = (req, res) => {

console.log('aaaaaaaaaaaaaaaaaaa',process.env.vishal)
    if(req.body.handler==null || req.body.handler== undefined)
    {
        res.render('tweets.ejs', {
            data: undefined,
            weeks:0
        })
    }
    else
    {
    let curr = new Date 
let week = []

for (let i = 1; i <= 7; i++) {
  let first = curr.getDate() - curr.getDay() + i 
  let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
  week.push(day)
}
console.log(week)
var weekdata=[];

for(var j=0;j<week.length;j++)
{
    var paramss = { 
        until: "2020-09-09", 
        from: req.body.handler


        
    };
    T.get('https://api.twitter.com/1.1/search/tweets.json', paramss, function(err, dataa, response) {
       var lengthdata=dataa.statuses.length;
       weekdata.push(lengthdata)
               
              })
}


var params = {
    count: 100, 
   // until: "2020-09-09", 
    from: req.body.handler
};

    T.get('https://api.twitter.com/1.1/search/tweets.json', params, function(err, dataa, response) {
console.log(weekdata)
        res.render('tweets.ejs', {
            data: dataa,
            weeks:weekdata
        })
      })

    }

}


module.exports = { whatsappdatafetch}