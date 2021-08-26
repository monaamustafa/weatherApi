const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = ',us&appid=fcfe8047977a4c91e3db4b111dd84a52&units=metric';
document.getElementById('GetTemperature').addEventListener('click', GenerateClick);
let innerData = document.querySelectorAll('.result p');
let d = new Date();
let currentData = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
function GenerateClick(e) {
  const ZipCode = document.getElementById('ZipCode').value;
  console.log(ZipCode.lenght);
  const feelingValue = document.getElementById('feeling-value').value;
  if(ZipCode==''){
    window.alert("enter valid zip code");
  }else{
  console.log(currentData);
  console.log(baseURL + ZipCode + apiKey);
  getTemp(baseURL, ZipCode, apiKey)
    .then(function (data) {
      console.log(data)
      postData('/addData', {
        temp: data.main.temp,
        feels: data.main.feels_like,
        feelingValue:feelingValue,
      })
      updateUI()
    });
  }
}
const getTemp = async (baseURL, ZipCode, apiKey) => {
  const res = await fetch(baseURL + ZipCode + apiKey)
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
}
const postData = async (url = '', data = {}) => {

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

  try {
    const newData = await response.json();
    postData('/addData',{
      temp:data.main.temp,
      feels:data.main.feels_like,
      feelingValue:feelingValue
    });
    return newData

  } catch (error) {
    console.log("postError", error);
  }
}
const updateUI = async (url = '') => {
  const request = await fetch('/all');
  try {
    const returnedData = await request.json();
    console.log(returnedData);
    document.getElementById('ActualTemperature').innerHTML = "actual temperature: " +returnedData.temp + ' °C';
    document.getElementById('FeelsLike').innerHTML = "Feels like: "+returnedData.feels+ ' °C';
    document.getElementById('YourFeeling').innerHTML = "Your Feeling: "+returnedData.feelingValue;
    document.getElementById('Date').innerHTML ="Date:"+currentData;
    document.getElementById('result').style.opacity=1;
  } catch (error) {
    console.log("didn't retreive", error);
  }
}