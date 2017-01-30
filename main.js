window.addEventListener('load',startCheck)
var submitBtn = document.getElementsByTagName('button')[0];
var body = document.getElementsByTagName('tbody')[0];
var citySubmitt = document.getElementById('def');
var city;

submitBtn.addEventListener('click',start);
citySubmitt.addEventListener('click',defaultCity);

function startCheck() {
      if (localStorage["City"] === undefined || localStorage["City"] === '""') {
          localStorage.clear()
        } else {
      city = localStorage.getItem("City", JSON.stringify(city));
      document.getElementsByTagName('h4')[0].innerHTML = JSON.parse(localStorage["City"]) + ` is your default city`;
      document.getElementsByTagName('input')[0].value = JSON.parse(localStorage["City"]);
      start()
    }
}

function start() {
        city = document.getElementsByTagName('input')[0].value;
        json = new XMLHttpRequest;
        json.addEventListener('readystatechange',function () {
          if (json.status === 200 && json.readyState === 4) {
            getData(json)
          }
        })
        json.open('GET','http://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=e2d614d6fd2688ae7bdf6a13bc94b441')
        json.send();
}

function getData(json){
        var data = json.responseText;
        var root = JSON.parse(data);
        var tempC = (root.main.temp-273.15);
        var tempCMax = (root.main.temp_max-273.15);
        var tempCMin = (root.main.temp_min-273.15)
        body.innerHTML = `
        <tr><h4>Humidity : ${root.main.humidity} %</h4></tr>
        <tr><h4>Pressure : ${root.main.pressure} hpa</h4></tr>
        <tr><h4>Temperature : `+ tempC.toFixed()+` ºC</h4></tr>
        <tr><h4>Temperature - max : ` + tempCMax.toFixed()+` ºC</h4></tr>
        <tr><h4>Temperature - min : ` + tempCMin.toFixed()+` ºC</h4></tr>
        `
}

function defaultCity() {
        if (document.getElementsByTagName('input')[0].value.length === 0) {
          document.getElementsByTagName('h4')[0].innerHTML = `Please enter the city name to set as default city`
        } else {
          city = document.getElementsByTagName('input')[0].value;
          localStorage.setItem("City", JSON.stringify(city));
          document.getElementsByTagName('h4')[0].innerHTML = JSON.parse(localStorage["City"]) + ` is your default city now`;
          start()
        }
}
