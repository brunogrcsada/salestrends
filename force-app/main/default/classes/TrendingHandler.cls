public with sharing class TrendingHandler {
    @AuraEnabled(cacheable=true)
    public static String requestData(){
        HttpRequest httpRequest = new HttpRequest();  
        httpRequest.setEndpoint('https://www.bgsremote.cc/trends');
        httpRequest.setMethod('GET');

        String strResponse = null;
        try {  
          Http http = new Http();   
                HttpResponse httpResponse = http.send(httpRequest);  
                if (httpResponse.getStatusCode() == 200 ) {  
                    strResponse = httpResponse.getBody();  
                    System.debug(strResponse);
                } 
                else {  
                    throw new CalloutException(httpResponse.getBody());  
                } 
             
            } 
            catch(Exception ex) {  
                throw ex;  
            } 
         if(!String.isBlank(strResponse)) {
                return strResponse;
            }else{
                return null;
            }
    }
}
