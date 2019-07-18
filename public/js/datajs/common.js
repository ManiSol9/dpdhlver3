$(document).ready(function () {

    const form = document.querySelector('form');
    const name = document.getElementById('name');
    const armtemplates = document.getElementById('armtemplates');


    var bu = {}

    fetchBU();

    function fetchBU(){

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
            "processData": false
        }
    
        $.ajax(settings).done(function (response) {
            console.log(response, "bus");
    
            bu = response.result
    
            business_units = bu
    
            generateTable();
    
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

    function generateTable() {
        var txt = '';

        myObj = business_units;
        txt += "<table class='table'><tr><th> Business Name </th><th>Short Name</th><th> Created By </th><th> Created On</th><th>Actions</th></tr>"
        for (x in myObj) {
            txt += "<tr><td>" + myObj[x].name + "</td><td>" + myObj[x].short_name + "</td><td>" + myObj[x].created_by + "</td><td>" + myObj[x].created_date + "</td>";
            txt += "<td><i class='fa fa-trash-o fa-fw' onclick='deletebu(" + myObj[x].id + ")'  aria-hidden='true'></i>&nbsp;&nbsp;";
            txt += "</td></tr>";
        }
        txt += "</table>"
        document.getElementById("demo").innerHTML = txt;
    }

    deletebu = (x) => {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/businessunits/deleteBusinessUnit?id="+x,
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
                fetchBU();
                //$("#entity").modal('hide');	
            }
        });

    }

    showbu = () => {
        alert("showed")
    }


    $('#save-list').on('click', function (e) {

        if (name.value == "" || description.value == "" || shortname.value == "" || owner.value == "") {

            alert("Please enter values")

        } else {


            var buObject = {
                "name": name.value,
                "shortName": shortname.value,
                "description": description.value,
                "owner": owner.value,
                "createdBy": "Mani",
                "userGroup": "",
                "imgName": "",
                "createdDate": new Date()
            }

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://dive11.azurewebsites.net/api/beta/businessunits/createBusinessUnit",
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
                    fetchBU();
                    $("#entity").modal('hide');	
                }
            });  
        }



    });


});


