export class CurrencyRateHelper{
  static getRate(inputCurrency, outputCurrency,getCallback){
    fetch('getrate?inputCurrency='+inputCurrency+'&outputCurrency='+outputCurrency,
   ).then(function(response){
       return response.json();
     }).then(function(json){
       getCallback(json['rate']);
     });
  }
}
