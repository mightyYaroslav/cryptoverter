export class ApiHelper{
static getCurrencies(afterCallback){
  fetch('getcurrencies').then(function(response){
    return response.json();
  }).then(function(json){
    afterCallback(json);
  });
}
static getRate(inputCurrency, outputCurrency,afterCallback){
    fetch('getrate?inputCurrency='+inputCurrency+'&outputCurrency='+outputCurrency,
   ).then(function(response){
       return response.json();
     }).then(function(json){
       afterCallback(json['rate']);
     });
  }
}
