$(document).ready(function () {

    console.log("daasdasdasd")
  
      requestCount();
  
      function requestCount(){
          var settings = {
              "async": true,
              "crossDomain": true,
              "url": "https://dive11.azurewebsites.net/api/beta/dashboard/getCounts",
              "method": "GET",
              "headers": {
                "x-api-key": "q4jdp6swt4015amrj0681s0xs5r4opotc4f5sfv3",
              }
            }
            
            $.ajax(settings).done(function (response) {
              console.log(response);  
            });
      }
  
  });
  
  
  