$(document).ready(function () {

    const form = document.querySelector('form');
    const name = document.getElementById('name');
    const armtemplates = document.getElementById('armtemplates');
    
    document.getElementById("demo").style.display = "block"
    document.getElementById("addDevice").style.display = "block"

    let groupsData = []

    //getDevices();
    getDevicesGroups();

    function getDevicesGroups(){
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/devices/getDeviceGroups",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
            },
            "processData": false,
        }
    
        $.ajax(settings).done(function (response) {
            console.log(response, "device Groups");

            groups = response.result
        
            generateGroupTable(groups);
            generateSelect3(groups);

        });
    }

    viewGroups = () => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/devices/getDeviceGroups",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
            },
            "processData": false,
        }
    
        $.ajax(settings).done(function (response) {
            console.log(response, "device Groups");

            groups = response.result
        
            generateGroupTable(groups);
            generateSelect3(groups)

        });
    }

    function generateGroupTable(groups){
        var txt='';

        myObj = groups;
        txt += "<table class='table'><tr><th> Group ID </th><th> Group Name </th> <th> Created By </th> <th> Created Time </th> <th> View Devices </th> <th>Actions</th></tr>"
        for (x in myObj) {
          txt += "<tr><td>" + myObj[x].id + "</td><td>" + myObj[x].device_group_name + "</td><td>" + myObj[x].created_by + "</td><td>" + myObj[x].created_date + "</td><td> <button class='btn btn-success' onclick='viewDevices("+ myObj[x].id +")'> View </button></td>";
          txt += "<td><button class='btn btn-danger'><span onclick='deletegroup("+myObj[x].id+")' class='glyphicon glyphicon-trash' aria-hidden='true'></span></button></td></tr>";
        }
        txt += "</table>"    
        document.getElementById("demo").innerHTML = txt;
    }    

    function getDevices(){
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/devices/getAllDevices",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
            },
            "processData": false,
        }
    
        $.ajax(settings).done(function (response) {
            console.log(response, "device");
    
            devices = response.result
    
            associateddevices = devices
    
            generateTable();
    
        });
    }


    function generateTable(){
        var txt='';

        txt +='<div class"backButton"> <button onclick="viewGroups();" class="btn btn-danger"> Go Back </button> </div><br><br>';

        myObj = associateddevices;
        txt += "<table class='table'><tr><th> Device ID </th><th> Device Name </th><th> Device Address </th><th> Protocol </th><th>Health Status</th><th> Battery Power</th> <th> On Boarded By</th> <th> Device Owner </th> <th>Actions</th></tr>"
        for (x in myObj) {
          txt += "<tr><td>" + myObj[x].dhl_device_id + "</td><td>" + myObj[x].device_name + "</td><td>" + myObj[x].mac_address + "</td><td>" + myObj[x].protocol + "</td>";
          txt += "<td>" + myObj[x].device_health + "</td><td>" + myObj[x].power_type + "</td><td>" + myObj[x].device_owner + "</td><td>" + myObj[x].onboarded_date + "</td><td>";
          txt += "<button class='btn btn-danger'><span onclick='deletedevice("+myObj[x].id+")' class='glyphicon glyphicon-trash' aria-hidden='true'></span></button></td></tr>";
        }
        txt += "</table>"    
        document.getElementById("demo").innerHTML = txt;
    }


    viewDevices = (id) => {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/devices/getDevicesByDeviceGroupID?deviceGroupID=" + id,
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
            },
            "processData": false,
        }
    
        $.ajax(settings).done(function (response) {
            console.log(response, "device");
    
            devices = response.result
    
            associateddevices = devices
    
            generateTable();
    
        });

    }

    onBoardDevice = (v) => {

        if(v == "A") {

            viewGroups()

            document.getElementById("demo").style.display = "none"
            document.getElementById("demo2").style.display = "block"
            document.getElementById("goBack").style.display = "block"
            document.getElementById("addDevice").style.display = "none"
        } else {


            document.getElementById("demo").style.display = "block"
            document.getElementById("demo2").style.display = "none"
            document.getElementById("goBack").style.display = "none"
            document.getElementById("addDevice").style.display = "block"
        }
    }


    function generateSelect3(data) {
        var txt = '<select  id="gId" class="form-control form-control-line" onchange="pushGroup()"><option value="">Please select Group</option>';
        myObj = data;
        for (x in myObj) {
            txt += '<option value="' + myObj[x].id + '+'+ myObj[x].device_group_name +'">' + myObj[x].device_group_name + '</option>';
        }
        txt += "</select>";
        document.getElementById("group").innerHTML = txt;
    }


    $('#save-group').on('click', function (e) {

        if (groupname.value == "") {
            alert("Please enter values")
        } else {

            e.preventDefault();

            let data = {
                deviceGroupName: groupname.value,
                createdBy: "mani@dhl.com",
                appID: 158
            }

            let headers = {
                "Content-Type": "application/json"
            }

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://dive11.azurewebsites.net/api/beta/devices/createDeviceGroup",
                "method": "POST",
                "processData": false,
                "headers": headers,
                "data": JSON.stringify(data)
            }

            $.ajax(settings).done(function (response) {
                console.log(response)

                if (response.status == 200) {
                    alert("Group Added")
                    viewGroups();
                    $("#groupadd").modal('hide');
                }

            });
        }
    });



    pushGroup = () => {

        groupV = document.getElementById("gId").value;

        groupValues = groupV.split("+")

        gid = groupValues[0]

        gName = groupValues[1]

        let fetchdevices = null;

        let headers = {
            "Content-Type": "application/json"
        }

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/devices/getDevicesByDeviceGroupID?deviceGroupID=" + gid,
            "method": "GET",
            "processData": false,
            "headers": headers
        }

        $.ajax(settings).done(function (response) {
            console.log(response)

            if (response.status == 200) {

                fetchdevices = response.result

                groupsData.push({
                    deviceGroupID: gid,
                    deviceGroupName: gName,
                    createdBy: "vcmanikanta@hotmail.com",
                    devices: fetchdevices
                })

                $("#body-part-2").css({ display: "block" })

                console.log(groupsData)

                devicesList(groupsData, gid)
           }

        });

    }

    devicesList = (data, gid) => {


        var txt = "<table class='table'><tr><th> Device Serialnumber </th><th> Device ID </th><th> Device Name </th><th>Actions</th></tr>"

        for (i = 0; i < data.length; i++) {

            if (data[i].deviceGroupID == gid.toString()) {

                let groupdevices = data[i].devices

                for (x in groupdevices) {

                    txt += "<tr><td>"+ groupdevices[x].serial_number +"</td><td>"+ groupdevices[x].dhl_device_id +"</td><td>"+ groupdevices[x].device_name +"</td><td></td></tr>";

                }
            }

        }

        txt += "</table>";

        document.getElementById("list-users").innerHTML = txt

    }


    /*


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

        apps = response.result

        applications = apps

        generateSelect2()

    });

    */

    function generateSelect2(data){
        var txt = '<select  id="appId" class="form-control"><option value="">Please select app</option>';
        myObj = applications;
        for(x in myObj){
                txt +='<option value="'+ myObj[x].id +'">'+ myObj[x].name +'</option>';
        }
        txt += "</select>";
        document.getElementById("apps").innerHTML = txt;
    }

    deletedevice = (x) => {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/devices/deleteDevice?id="+x,
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
                getDevices();
                //$("#entity").modal('hide');	
            }
        });

    }

    deletegroup = (x) => {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/devices/deleteDeviceGroup?id="+x,
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
                getDevicesGroups();
                //$("#entity").modal('hide');	
            }
        });

    }    

    showbu = () => {
        alert("showed")
    }


    addtogroup = () => {
        groupV = document.getElementById("gId").value;

        groupValues = groupV.split("+")

        gid = groupValues[0]

        gName = groupValues[1]

        deviceId = document.getElementById("deviceId").value
        deviceName = document.getElementById("deviceName").value
        deviceUUID = document.getElementById("deviceUUID").value
        serialnumber = document.getElementById("serialnumber").value
        protocol = document.getElementById("protocol").value
        deviceHealth = document.getElementById("deviceHealth").value
        macaddress = document.getElementById("macaddress").value
        powertype = document.getElementById("powertype").value
        iotready = document.getElementById("iotready").value


        if( deviceId == "" || 
            deviceName == "" || 
            deviceUUID == "" || 
            serialnumber == "" || 
            protocol == "" || 
            deviceHealth == "" ||
            macaddress == "" ||
            powertype == "" ||
            iotready == ""){
            alert("Please enter values")
        } else {
            data = {
                "dhl_device_id" : deviceId,
                "uuid": deviceUUID,
                "device_id": deviceId,
                "serial_number" : serialnumber,
                "mac_address" : macaddress,
                "device_name" : deviceName,
                "protocol" : protocol,
                "device_health" : deviceHealth,
                "onboarded_by" : "mani",
                "device_owner" : "Tina",
                "power_type" : powertype,
                "iot_ready" : iotready == "0" ? true : false,
                "device_spec_id" : 1,
                "is_exists": true
            }
            for (i = 0; i < groupsData.length; i++) {
                if (gid == groupsData[i].deviceGroupID) {
                    deviceOldData = groupsData[i].devices
                    console.log(deviceOldData, data)
                    let x = 0;
                    for (j = 0; j < deviceOldData.length; j++) {
                        if (deviceOldData[j].serial_number == data.serial_number) {
                            alert("Already Device in the group!")
                            x = 1;
                            break;
                        }
                    }
                    console.log(x)
                    x == 0 ? groupsData[i].devices.push(data) : null
                }
            }
            document.getElementById("deviceId").value = ""
            document.getElementById("deviceName").value = ""
            document.getElementById("deviceUUID").value = ""
            document.getElementById("serialnumber").value = ""
            document.getElementById("protocol").value = ""
            document.getElementById("deviceHealth").value = ""
            document.getElementById("macaddress").value = ""
            document.getElementById("powertype").value = ""
            document.getElementById("iotready").value = ""
            devicesList(groupsData, gid)
        }
    }


    addapp = () => {

        document.getElementById("addapppart").style.display = "block"

        fetchBU();
    }


    function generateSelectBu(data) {
        var txt = '<select  id="bid" class="form-control form-control-line" onchange="updateApps()"><option value="">Please select Group</option>';
        myObj = data;
        for (x in myObj) {
            txt += '<option value="' + myObj[x].id + '">' + myObj[x].name + '</option>';
        }
        txt += "</select>";
        document.getElementById("bu").innerHTML = txt;
    }



    function fetchBU() {

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

            generateSelectBu(response.result)

        });


    }


    updateApps = () => {

        let bid = document.getElementById("bid").value

        document.getElementById("appdiv").style.display = "block"

        document.getElementById("apps").innerHTML = '<div class="icon-container" id="iconcontainer"><i class="loader"></i></div>'

        fecthApps(bid)

    }

    function fecthApps(id) {


        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/applications/getApplicationsByBuID?buID="+id,
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

            apps = response.result

            applications = apps

            generateSelect2(apps)

        });

    }

    $('#finalSave').on('click', function (e) {

        //console.log(useremail.value, username.value)

        e.preventDefault();

        groupV = document.getElementById("gId").value;

        groupValues = groupV.split("+")

        gid = groupValues[0]

        gName = groupValues[1]


        if (bid.value == "" || appId.value == "") {
            alert("Please fill required fields")
        } else {

            e.preventDefault();

            deviceData = []

            deviceDataObject = null

            let loopDevices = groupsData[0].devices

            loopData = groupsData

            for(x in loopDevices){

                deviceDataObject = {
                    "dhlDeviceID": loopDevices[x].dhl_device_id, 
                    "uuID": loopDevices[x].uuid,
                    "serialNumber": loopDevices[x].serial_number, 
                    "macAddress": loopDevices[x].mac_address, 
                    "deviceName": loopDevices[x].device_name, 
                    "status": loopDevices[x].is_exists, 
                    "protocol": loopDevices[x].protocol, 
                    "deviceHealth": loopDevices[x].device_health, 
                    "powerType": loopDevices[x].power_type, 
                    "onboardedBy": loopDevices[x].onboarded_by, 
                    "deviceOwner": loopDevices[x].device_owner,
                    "iotReady": loopDevices[x].iot_ready, 
                    "deviceSpecID": loopDevices[x].device_spec_id
                }
                deviceData.push(deviceDataObject)
                deviceDataObject=null
            }

            loopData[0].devices = deviceData


            let finalData = {
                "buID": bid.value,
                "appID": appId.value,
                "deviceGroups": loopData
            }

            console.log(finalData)

            let headers = {
                "Content-Type": "application/json"
            }

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://dive11.azurewebsites.net/api/beta/devices/createDevicesWithDeviceGroups",
                "method": "POST",
                "processData": false,
                "headers": headers,
                "data": JSON.stringify(finalData)
            }

            $.ajax(settings).done(function (response) {

                console.log(response)

                if(response.status == 200){

                    alert("Updated Successfully")

                } else {

                    alert("Something went wrong! please try again later")
                }

                document.location.reload(true);


            });

        }
    });

});

	
