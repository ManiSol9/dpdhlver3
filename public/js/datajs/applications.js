$(document).ready(function () {

    const form = document.querySelector('form');
    const name = document.getElementById('name');
    const armtemplates = document.getElementById('armtemplates');
    

    var applications = []

    fecthGroups();
    fetchApps();

    function fetchApps(){

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/applications/getAllApplications",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
            },
            "processData": false,
        }
    
        $.ajax(settings).done(function (response) {
            console.log(response, "app");
    
            app = response.result
    
            applications = app
    
            generateTable();
    
        });


    }

    function fecthGroups(){

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/azure/getAzureResourceGroups",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
            },
            "processData": false
        }
    
        $.ajax(settings).done(function (response) {
            console.log(response, "app");

            rsgroups = response.result

            generateSelect2(rsgroups);

        });
    }

    
    mani = () => {

        let value = document.getElementById("owner").value;

        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(mailformat)) {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dhlcp-b2b-externaluserappservice.azurewebsites.net/api/getToken",
            "method": "GET",
            "processData": false,
        }

        $.ajax(settings).done(function (response) {
            
            let data  = response.output

            if(data.access_token) {

                let headers = {
                    "Authorization": "Bearer "+ data.access_token,
                    "Content-Type": "application/json"
                }

                    var queryParam = "?$filter=startswith(mail, '" + value + "')"
        
                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://graph.microsoft.com/v1.0/users" + queryParam,
                        "method": "GET",
                        "headers": headers,
                        "processData": false,
                    }
        
                    $.ajax(settings).done(function (response) {
                        console.log(response);
                        if (response.value.length == 0) {
                            alert("Not a Valid user in AD")
                            document.getElementById("owner").value = null
                        }
                    });
                }
        }); 
        
        } else {
        
            alert("Not a valid email address")
            document.getElementById("owner").value = null

        }
    }


    function generateSelect2(rsgroups){
        var txt = '<select id="resolurce" class="form-control"><option value="">Please select resource group</option>';
        myObj = rsgroups;
        for(x in myObj){
                txt +='<option value="'+ myObj[x] +'">'+ myObj[x] +'</option>';
        }
        txt += "</select>";

        document.getElementById("selectapp").innerHTML = txt;
    }

    fetchBu()

    function fetchBu(){

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/businessunits/getAllBusinessUnits",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
            },
            "processData": false,
        }
    
        $.ajax(settings).done(function (response) {
            console.log(response, "bus");
            bu = response.result
            business_units = bu
            generatebu(business_units)
        });

    }

    function generatebu(business_units){
        var txt = '<select id="buid" class="form-control"><option value="">Please select BU</option>';
        myObj = business_units;
        for(x in myObj){
                txt +='<option value="'+ myObj[x].id +'">'+ myObj[x].name +'</option>';
        }
        txt += "</select>";

        document.getElementById("selectbu").innerHTML = txt;
    }


    

    function generateTable(){
        var txt='';

        myObj = applications;
        txt += "<table class='table'><tr><th> Application Name </th><th> BU's </th><th> Owner </th><th> Onboarded At </th><th>Resourse Group</th><th> Status</th><th>Actions</th></tr>"
        for (x in myObj) {
          txt += "<tr><td>" + myObj[x].name + "</td><td>" + myObj[x].buname + "</td><td>" + myObj[x].owner + "</td><td>" + myObj[x].onboarded_date + "</td><td>"+ myObj[x].resource_group_name +"</td><td>" + myObj[x].status + "</td>";
          txt += "<td><span onclick='showbu()' class='glyphicon glyphicon-info-sign' aria-hidden='true'></span>&nbsp;&nbsp;";
          txt += "<span onclick='deletebu(" + myObj[x].id + ")' class='glyphicon glyphicon-trash' aria-hidden='true'></span></td></tr>";
        }
        txt += "</table>"    
        document.getElementById("demo").innerHTML = txt;
    }


    deletebu = (x) => {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/applications/deleteApplication?id="+x,
            "method": "DELETE",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
            },
            "processData": false,
        }
    
        $.ajax(settings).done(function (response) {
            console.log(response, "deviceadd");

            if(response.status == 200){
                alert("Deleted Successfully");
                fetchApps();
                //$("#entity").modal('hide');	
            }
        });

    }

    showbu = () => {
        alert("showed")
    }


    $('#save-list').on('click', function (e) {

        if(name.value == "" || resolurce.value == "" || owner.value == "" || description.value == ""){
            
            alert("Please enter values")


        } else {
    

            var buObject = {
                "appName" : name.value,
                "appOwner": owner.value,
                "appStatus" : "Active",
                "appGroupName" : "NA",
                "appCreatedBy" : "mani",
                "resourceGroupName" : resolurce.value,
                "appDescription" : description.value,
                "buID" : buid.value == "" ? null : buid.value,
                "appRoleIDs" : [1,2],
                "imgData" : ""                 
            }

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://dive11.azurewebsites.net/api/beta/applications/createApplication",
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
                },
                "processData": false,
                "data": JSON.stringify(buObject)
            }
        
            $.ajax(settings).done(function (response) {
                console.log(response, "deviceadd");

                if(response.status == 200){
                    alert("Created Successfully");
                    fetchApps();
                    $("#entity").modal('hide');	
                }
            });            
        }
    });


});

	
