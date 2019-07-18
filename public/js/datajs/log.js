$(document).ready(function () {

  console.log("daasdasdasd")

  requestCount();

  let requiredData = [];

  let events = [];

  function requestCount() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.applicationinsights.io/v1/apps/6044a517-fd38-48ff-b9fd-bf8aaa93ca97/events/pageViews",
      "method": "GET",
      "headers": {
        "x-api-key": "0ycdxaqskokv6iqulifzywiszhmvbrre4phjamv6",
      }
    }

    $.ajax(settings).done(function (response) {
      console.log(response);

      events = response.value

      generateTable(events)

    });
  }

  apireq = ["requests/failed", "requests/count",
  "browserTimings/networkDuration",
  "browserTimings/processingDuration",
  "pageViews/duration",
  "requests/duration", "users/count", "sessions/count", "dependencies/failed", "availabilityResults/count",
  "availabilityResults/duration",
  "availabilityResults/availabilityPercentage",
  "exceptions/count",
  "exceptions/browser",
  "performanceCounters/requestExecutionTime",
  "performanceCounters/requestsPerSecond",
  "performanceCounters/processorCpuPercentage",
  "performanceCounters/processPrivateBytes",
  "performanceCounters/requestsInQueue"]


  request1()
  request2()
  request3()
  request4()
  request5()
  request6()
  request7()
  request8()
  request9()
  request10()
  request11()
  request12()
  request13()
  request14()
  request15()
  request16()
  request17()
  request18()
  

  function request1() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.applicationinsights.io/v1/apps/6044a517-fd38-48ff-b9fd-bf8aaa93ca97/metrics/requests/failed",
      "method": "GET",
      "headers": {
        "x-api-key": "0ycdxaqskokv6iqulifzywiszhmvbrre4phjamv6",
      }
    }

    $.ajax(settings).done(function (response) {
      value = response.value
      data = {
        "start": value.start,
        "end": value.end,
        "value": value["requests/failed"].sum,
        "type": "Requests Failed",
        "name": "Microsoft.Storage"
      }

      requiredData.push(data)

    });
  }

  function request2() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.applicationinsights.io/v1/apps/6044a517-fd38-48ff-b9fd-bf8aaa93ca97/metrics/requests/count",
      "method": "GET",
      "headers": {
        "x-api-key": "0ycdxaqskokv6iqulifzywiszhmvbrre4phjamv6",
      }
    }

    $.ajax(settings).done(function (response) {
      value = response.value
      data = {
        "start": value.start,
        "end": value.end,
        "value": value["requests/count"].sum,
        "type": "Requests Count",
        "name": "Microsoft.Disk"
      }

      requiredData.push(data)

    });
  }

  function request3() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.applicationinsights.io/v1/apps/6044a517-fd38-48ff-b9fd-bf8aaa93ca97/metrics/browserTimings/networkDuration",
      "method": "GET",
      "headers": {
        "x-api-key": "0ycdxaqskokv6iqulifzywiszhmvbrre4phjamv6",
      }
    }

    $.ajax(settings).done(function (response) {
      value = response.value
      data = {
        "start": value.start,
        "end": value.end,
        "value": value["browserTimings/networkDuration"].avg,
        "type": "Network Duration",
        "name": "Microsoft.Network"
      }

      requiredData.push(data)

    });
  }

  function request4() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.applicationinsights.io/v1/apps/6044a517-fd38-48ff-b9fd-bf8aaa93ca97/metrics/pageViews/duration",
      "method": "GET",
      "headers": {
        "x-api-key": "0ycdxaqskokv6iqulifzywiszhmvbrre4phjamv6",
      }
    }

    $.ajax(settings).done(function (response) {
      value = response.value
      data = {
        "start": value.start,
        "end": value.end,
        "value": value["pageViews/duration"].avg,
        "type": "PageViews Duration",
        "name": "Microsoft.webApp"
      }

      requiredData.push(data)

    });
  }

  function request5() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.applicationinsights.io/v1/apps/6044a517-fd38-48ff-b9fd-bf8aaa93ca97/metrics/requests/duration",
      "method": "GET",
      "headers": {
        "x-api-key": "0ycdxaqskokv6iqulifzywiszhmvbrre4phjamv6",
      }
    }

    $.ajax(settings).done(function (response) {
      value = response.value
      data = {
        "start": value.start,
        "end": value.end,
        "value": value["requests/duration"].avg,
        "type": "Requests Duration",
        "name": "Microsoft.Server"
      }

      requiredData.push(data)

    });
  }

  function request6() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.applicationinsights.io/v1/apps/6044a517-fd38-48ff-b9fd-bf8aaa93ca97/metrics/users/count",
      "method": "GET",
      "headers": {
        "x-api-key": "0ycdxaqskokv6iqulifzywiszhmvbrre4phjamv6",
      }
    }

    $.ajax(settings).done(function (response) {
      value = response.value
      data = {
        "start": value.start,
        "end": value.end,
        "value": value["users/count"].unique,
        "type": "Users Count",
        "name": "Microsoft.dbforpostgresql"
      }

      requiredData.push(data)

    });
  }

  function request7() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.applicationinsights.io/v1/apps/6044a517-fd38-48ff-b9fd-bf8aaa93ca97/metrics/sessions/count",
      "method": "GET",
      "headers": {
        "x-api-key": "0ycdxaqskokv6iqulifzywiszhmvbrre4phjamv6",
      }
    }

    $.ajax(settings).done(function (response) {
      value = response.value
      data = {
        "start": value.start,
        "end": value.end,
        "value": value["sessions/count"].unique,
        "type": "Sessions Count",
        "name": "Microsoft.Storage"
      }

      requiredData.push(data)

    });
  }

  function request8() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.applicationinsights.io/v1/apps/6044a517-fd38-48ff-b9fd-bf8aaa93ca97/metrics/dependencies/failed",
      "method": "GET",
      "headers": {
        "x-api-key": "0ycdxaqskokv6iqulifzywiszhmvbrre4phjamv6",
      }
    }

    $.ajax(settings).done(function (response) {
      value = response.value
      data = {
        "start": value.start,
        "end": value.end,
        "value": value["dependencies/failed"].sum,
        "type": "Dependencies Failed",
        "name": "Microsoft.Metrics"
      }

      requiredData.push(data)

    });
  }


  function request9() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.applicationinsights.io/v1/apps/6044a517-fd38-48ff-b9fd-bf8aaa93ca97/metrics/availabilityResults/count",
      "method": "GET",
      "headers": {
        "x-api-key": "0ycdxaqskokv6iqulifzywiszhmvbrre4phjamv6",
      }
    }

    $.ajax(settings).done(function (response) {
      value = response.value
      data = {
        "start": value.start,
        "end": value.end,
        "value": value["availabilityResults/count"].sum,
        "type": "Availability Count",
        "name": "Microsoft.IOTHUB"
      }

      requiredData.push(data)

    });
  }

  function request10() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.applicationinsights.io/v1/apps/6044a517-fd38-48ff-b9fd-bf8aaa93ca97/metrics/availabilityResults/duration",
      "method": "GET",
      "headers": {
        "x-api-key": "0ycdxaqskokv6iqulifzywiszhmvbrre4phjamv6",
      }
    }

    $.ajax(settings).done(function (response) {
      value = response.value
      data = {
        "start": value.start,
        "end": value.end,
        "value": value["availabilityResults/duration"].avg,
        "type": "Availability Duration",
        "name": "Microsoft.IOTHUB"
      }

      requiredData.push(data)

    });
  }

  function request11() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.applicationinsights.io/v1/apps/6044a517-fd38-48ff-b9fd-bf8aaa93ca97/metrics/availabilityResults/availabilityPercentage",
      "method": "GET",
      "headers": {
        "x-api-key": "0ycdxaqskokv6iqulifzywiszhmvbrre4phjamv6",
      }
    }

    $.ajax(settings).done(function (response) {
      value = response.value
      data = {
        "start": value.start,
        "end": value.end,
        "value": value["availabilityResults/availabilityPercentage"].avg,
        "type": "Availability Percentage",
        "name": "Microsoft.IOTHUB"
      }

      requiredData.push(data)

    });
  }

  function request12() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.applicationinsights.io/v1/apps/6044a517-fd38-48ff-b9fd-bf8aaa93ca97/metrics/exceptions/count",
      "method": "GET",
      "headers": {
        "x-api-key": "0ycdxaqskokv6iqulifzywiszhmvbrre4phjamv6",
      }
    }

    $.ajax(settings).done(function (response) {
      value = response.value
      data = {
        "start": value.start,
        "end": value.end,
        "value": value["exceptions/count"].sum,
        "type": "Exceptions Count",
        "name": "Microsoft.blob"
      }

      requiredData.push(data)

    });
  }

  function request13() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.applicationinsights.io/v1/apps/6044a517-fd38-48ff-b9fd-bf8aaa93ca97/metrics/exceptions/browser",
      "method": "GET",
      "headers": {
        "x-api-key": "0ycdxaqskokv6iqulifzywiszhmvbrre4phjamv6",
      }
    }

    $.ajax(settings).done(function (response) {
      value = response.value
      data = {
        "start": value.start,
        "end": value.end,
        "value": value["exceptions/browser"].sum,
        "type": "Exceptions Browser",
        "name": "Microsoft.storageAccount"
      }

      requiredData.push(data)

    });
  }

  function request14() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.applicationinsights.io/v1/apps/6044a517-fd38-48ff-b9fd-bf8aaa93ca97/metrics/performanceCounters/requestExecutionTime",
      "method": "GET",
      "headers": {
        "x-api-key": "0ycdxaqskokv6iqulifzywiszhmvbrre4phjamv6",
      }
    }

    $.ajax(settings).done(function (response) {
      value = response.value
      data = {
        "start": value.start,
        "end": value.end,
        "value": value["performanceCounters/requestExecutionTime"].avg,
        "type": "Request Execution Time",
        "name": "Microsoft.webApp"
      }

      requiredData.push(data)

    });
  }

  function request15() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.applicationinsights.io/v1/apps/6044a517-fd38-48ff-b9fd-bf8aaa93ca97/metrics/performanceCounters/requestsPerSecond",
      "method": "GET",
      "headers": {
        "x-api-key": "0ycdxaqskokv6iqulifzywiszhmvbrre4phjamv6",
      }
    }

    $.ajax(settings).done(function (response) {
      value = response.value
      data = {
        "start": value.start,
        "end": value.end,
        "value": value["performanceCounters/requestsPerSecond"].avg,
        "type": "Requests Per Second",
        "name": "Microsoft.webApp"
      }

      requiredData.push(data)

    });
  }

  function request16() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.applicationinsights.io/v1/apps/6044a517-fd38-48ff-b9fd-bf8aaa93ca97/metrics/performanceCounters/processorCpuPercentage",
      "method": "GET",
      "headers": {
        "x-api-key": "0ycdxaqskokv6iqulifzywiszhmvbrre4phjamv6",
      }
    }

    $.ajax(settings).done(function (response) {
      value = response.value
      data = {
        "start": value.start,
        "end": value.end,
        "value": value["performanceCounters/processorCpuPercentage"].avg,
        "type": "Processor Cpu Percentage",
        "name": "Microsoft.insights"
      }

      requiredData.push(data)

    });
  }

  function request17() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.applicationinsights.io/v1/apps/6044a517-fd38-48ff-b9fd-bf8aaa93ca97/metrics/performanceCounters/processPrivateBytes",
      "method": "GET",
      "headers": {
        "x-api-key": "0ycdxaqskokv6iqulifzywiszhmvbrre4phjamv6",
      }
    }

    $.ajax(settings).done(function (response) {
      value = response.value
      data = {
        "start": value.start,
        "end": value.end,
        "value": value["performanceCounters/processPrivateBytes"].avg,
        "type": "Process Private Bytes",
        "name": "Microsoft.insights"
      }

      requiredData.push(data)

    });
  }

  function request18() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.applicationinsights.io/v1/apps/6044a517-fd38-48ff-b9fd-bf8aaa93ca97/metrics/performanceCounters/requestsInQueue",
      "method": "GET",
      "headers": {
        "x-api-key": "0ycdxaqskokv6iqulifzywiszhmvbrre4phjamv6",
      }
    }

    $.ajax(settings).done(function (response) {
      value = response.value
      data = {
        "start": value.start,
        "end": value.end,
        "value": value["performanceCounters/requestsInQueue"].avg,
        "type": "Requests In Queue",
        "name": "Microsoft.eventHub"
      }

      requiredData.push(data)

    });
  }




  changelog = () => {

    val = document.getElementById("showlogs").value

    if(val == 1){

      generateTable(events)

    } else {

      txt = "<table class='table'><tr><th>Azure Resource</th><th>Response Type</th><th> Start Time </th><th> End Time </th><th> Count </th></tr>";

      for (x in requiredData) {
  
        if(requiredData[x].value !=null){

          txt += "<tr><td>"+ requiredData[x].name +"</td><td>" + requiredData[x].type + "</td><td>" + requiredData[x].start + "</td><td>" + requiredData[x].end + "</td><td>" + requiredData[x].value + "</td></tr>";

        }


      }
  
      txt += "</table>"
      document.getElementById("demo").innerHTML = txt;

    }


  }

  function generateTable(events) {
    var txt = '';
  
    data = events;
  
    console.log(events, 'sdfsdfsdf')
  
    txt += "<table class='table'><tr><th> Timestamp </th><th> Operation </th> <th> Last User </th><th> Message </th> <th> Browser </th> <th> IP </th> <th>City</th></tr>"
  
  
    for (x in data) {
  
      let session = data[x].session;
      let operation = data[x].operation;
      let customDimensions = data[x].customDimensions == null ? { refUri: "" } : data[x].customDimensions;
      let client = data[x].client
      let trace = {}
      //let message = JSON.parse(trace.message)
      //let user = JSON.parse(message.msg)

      //console.log(message)
  
      txt += "<tr><td>" + data[x].timestamp + "</td>";
      txt += "<td>" + operation.name + "</td><td> "+ data[x].user.id +" </td><td> "+data[x].ai.appName+"  </td><td>"+ client.browser +"</td><td>" + client.ip + "</td><td>" + client.city + "</td></tr>";
  
    }
    txt += "</table>"
    document.getElementById("demo").innerHTML = txt;
  }

  mani = (data) => {

    $("#entity").modal('show');
  
    document.getElementById("jsonC").innerHTML = JSON.stringify(data)
  
  
  }


});










