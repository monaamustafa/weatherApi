let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = ',us&appid=fcfe8047977a4c91e3db4b111dd84a52&units=metric';
// const ZipCode = document.getElementById('ZipCode').value;
// console.log(ZipCode);
document.getElementById('GetTemperature').addEventListener('click', GenerateClick);
let innerData = document.querySelectorAll('.result p');
// let result = document.getElementById('result');
// console.log(result);
let d = new Date();
let currentData = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
// console.log(currentData);
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
        // currentData:currentData,
      })
      updateUI()
    });
  }
  document.getElementById('Date').innerHTML +=currentData;

    // result.style.opacity=1;
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
  //   for(let i=0;i<innerData.length;i++){
  //     innerData[i].innerHTML=returnedData[i]+ ' °C';
    document.getElementById('ActualTemperature').innerHTML += returnedData.temp + ' °C';
    document.getElementById('FeelsLike').innerHTML += returnedData.feels+ ' °C';
    document.getElementById('YourFeeling').innerHTML += returnedData.feelingValue;
    document.getElementById('result').style.opacity=1;
  } catch (error) {
    console.log("didn't retreive", error);
  }
  // document.getElementsById('result').style.opacity=1;

}