$(document).ready(function () {

    let excelData = []

    changediv = (val) => {

        if (val == 1) {
            document.getElementById("part1").style.display = "block";
            document.getElementById("part2").style.display = "none"
            document.getElementById("addparams123").style.display = "none"
        } else {
            document.getElementById("part1").style.display = "none";
            document.getElementById("part2").style.display = "block"
            document.getElementById("addparams123").style.display = "block"
        }

    }

    addparams = () => {

        let num = document.getElementById("noofparams").value;

        console.log(num)

        let txt = "";

        for (i = 1; i <= num; i++) {

            txt += '<div class="form-group col-md-12">';
            txt += '<label for="example-email" class="col-md-12">Parameter' + i + '</label>';
            txt += '<div class="col-md-12">';
            txt += '<input type="text" id="param' + i + '" placeholder="Please enter paramater name" class="form-control form-control-line">';
            txt += '</div></div>';

        }

        document.getElementById("addparams123").innerHTML = txt;


    }

    fetchBU();

    function fetchBU() {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/entity/getEntity",
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

    function fecthApps(id, name) {

        let Obj = {
            "orgID": id,
            "type": name
        }

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/entity/getEntityMetadataByEntityID?entityID=" + id,
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

            apps = response.result

            applications = apps

            generateSelect2(apps)

        });

    }

    function generateSelectBu(data) {
        var txt = '<select  id="bid" class="form-control form-control-line" onchange="updateApps()"><option value="">Please select Group</option>';
        myObj = data;
        for (x in myObj) {
            if(myObj[x].is_exists != false) {
                txt += '<option value="' + myObj[x].id + ',' + myObj[x].entity_name + '">' + myObj[x].entity_name + '</option>';
            }
        }
        txt += "</select>";
        document.getElementById("bu").innerHTML = txt;
        document.getElementById("bu1").innerHTML = txt;
    }

    function generateSelect2(data) {
        var txt = '<select  id="appId" class="form-control"><option value="">Please select application</option>';
        myObj = data;
        for (x in myObj) {

            let entityObj = myObj[x].entity_object

            txt += '<option value="' + myObj[x].id + ',' + entityObj.Name + '">' + entityObj.Name + '</option>';
        }
        txt += "</select>";
        document.getElementById("apps").innerHTML = txt;
        document.getElementById("apps1").innerHTML = txt;
    }

    updateApps = () => {

        let bdata = document.getElementById("bid").value

        let bvalue = bdata.split(",")

        $("#bid").prop('disabled', 'disabled');

        document.getElementById("buttonpart1").style.display = "block"

        document.getElementById("appdiv").style.display = "none"

        document.getElementById("apps").innerHTML = '<div class="icon-container" id="iconcontainer"><i class="loader"></i></div>'

        fecthApps(bvalue[0], bvalue[1])

    }

    nextAdd = () => {

        document.getElementById("buttonpart3").style.display = "block"
        document.getElementById("buttonpart1").style.display = "none"
        document.getElementById("appdiv").style.display = "block"

    }

    addapp = () => {

        document.getElementById("addapppart").style.display = "block"
        document.getElementById("buttonpart").innerHTML = ""
    }

    $('#saveenity').on('click', function (e) {

        let name = document.getElementById("name").value;

        if (name != "") {


            /*let Obj = {
                "entityName": name,
                "parentID": null,
                "parentType": null,
                "createdBy": "mani",
                "entityMetadata": excelData,
                "parentInfo": "Entity"
            }*/

            let Obj = {
                "entityName": name,
                "parentID": null,
                "parentType": null,
                "parentName": null,
                "parentTypeID": null,
                "parentTypeName": null,
                "createdBy": "mani",
                "entityMetadata": excelData,
                "parentInfo": "Entity"
            }


            console.log(Obj)

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://dive11.azurewebsites.net/api/beta/entity/createEntity",
                "method": "POST",
                "processData": false,
                "headers": {
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
                },
                "data": JSON.stringify(Obj)
            }

            $.ajax(settings).done(function (response) {
                console.log(response, "entity");

                if (response.status == 200) {

                    alert("Added entity");
                    document.location.reload(true);

                } else {
                    alert("Somthing went wrong! Please try again later")
                }

            });

        } else {

            alert("Entity name should be there")

        }

    });


    $('#saveenity2').on('click', function (e) {

        let name = document.getElementById("name").value;

        if (name != "") {

            //let childInfo = document.getElementById("appId").value

            //childInfo = childInfo.split(",")

            let bdata = document.getElementById("bid").value

            let bvalue = bdata.split(",")

            let Obj = {
                "entityName": name,
                "parentID": bvalue[0],
                "parentType": bvalue[1],
                "parentName": bvalue[1],
                "parentTypeID": bvalue[0],
                "parentTypeName": bvalue[1],
                "createdBy": "mani",
                "entityMetadata": excelData,
                "parentInfo": "Instance"
            }


            console.log(Obj)

            

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://dive11.azurewebsites.net/api/beta/entity/createEntity",
                "method": "POST",
                "processData": false,
                "headers": {
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
                },
                "data": JSON.stringify(Obj)
            }

            $.ajax(settings).done(function (response) {
                console.log(response, "entity");

                if (response.status == 200) {

                    alert("Added entity");
                    document.location.reload(true);

                } else {
                    alert("Somthing went wrong! Please try again later")
                }

            }); 

        } else {

            alert("Entity name should be there")

        }

    });


    $('#saveenity1').on('click', function (e) {

        let name = document.getElementById("name").value;

        if (name != "") {

            let childInfo = document.getElementById("appId").value

            childInfo = childInfo.split(",")

            let bdata = document.getElementById("bid").value

            let bvalue = bdata.split(",")


            let Obj = {
                "entityName": name,
                "parentID": childInfo[0],
                "parentType": bvalue[1],
                "parentName": childInfo[1],
                "parentTypeID": bvalue[0],
                "parentTypeName": bvalue[1],
                "createdBy": "mani",
                "entityMetadata": excelData,
                "parentInfo": "Instance"
            }

            console.log(JSON.stringify(Obj))



            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://dive11.azurewebsites.net/api/beta/entity/createEntity",
                "method": "POST",
                "processData": false,
                "headers": {
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
                },
                "data": JSON.stringify(Obj)
            }

            $.ajax(settings).done(function (response) {
                console.log(response, "app");

                if (response.status == 200) {

                    alert("Added entity");
                    document.location.reload(true);

                } else {
                    alert("Somthing went wrong! Please try again later")
                }

            });

        } else {

            alert("Entity name should be there")

        }

    });

    mani = () => {

        let value = document.getElementById("name").value;


        if (value != "") {

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://dive11.azurewebsites.net/api/beta/entity/getEntityByName?name=" + value,
                "method": "GET",
                "processData": false,
            }

            $.ajax(settings).done(function (response) {
                console.log(response);

                if (response.result.length == 0) {



                } else {


                }

                document.getElementById("iconcontainer").style.display = "none"

            });

        } else {

            alert("Not a valid name")
            document.getElementById("name").value = null

        }

    }

    Upload = () => {
        //Reference the FileUpload element.
        var fileUpload = document.getElementById("uploadExcel");

        //Validate whether File is valid Excel file.
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
        if (regex.test(fileUpload.value.toLowerCase())) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();

                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        ProcessExcel(e.target.result);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        ProcessExcel(data);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                alert("This browser does not support HTML5.");
            }
        } else {
            alert("Please upload a valid Excel file.");
        }
    };
    function ProcessExcel(data) {
        //Read the Excel File data.
        var workbook = XLSX.read(data, {
            type: 'binary'
        });

        //Fetch the name of First Sheet.
        var firstSheet = workbook.SheetNames[0];

        //Read all rows from First Sheet into an JSON array.
        var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

        excelData = excelRows

    };

    addentity = () => {

        document.getElementById("demo").style.display = "none";
        document.getElementById("demo1").style.display = "block";

    }

    fecthEntities()

    function fecthEntities() {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/entity/getEntity",
            "method": "GET",
            "processData": false,
        }

        $.ajax(settings).done(function (response) {
            console.log(response);

            if (response.status == 200) {

                generateTable(response.result)

            } else {

                alert("Something went wrong! Please try again later")
            }

        });

    }

    function generateTable(data) {
        var txt = '';

        myObj = data;
        txt += "<table class='table'><tr><th> Entity Name </th><th> Parent Name </th><th> Created Date </th> <th> Created By  </th><th>Actions</th></tr>"
        for (x in myObj) {

            if(myObj[x].is_exists != false) {

                txt += "<tr><td>" + myObj[x].entity_name + "</td><td>" + myObj[x].parentname + "</td><td>" + myObj[x].created_date + "</td><td>" + myObj[x].created_by + "</td>";
                txt += "<td><button class='btn btn-success'><a style='color: white' href='/entitychildren.html?id=" + myObj[x].id + "'>View Data</a></button>&nbsp;&nbsp;";
                txt += "<button class='btn btn-danger' onclick='deleteFun(" + myObj[x].id + ", \""+ myObj[x].entity_name +"\")'>DELETE</button>&nbsp;&nbsp;</td>";            
                txt += "</tr>";

            }

        }
        txt += "</table>"
        document.getElementById("demo").innerHTML = txt;
    }

    edit = () => {

        $("#myModal").modal();

    }

    addApi = () => {
        alert("We are working on it and we will update you! :)")
    }

    deleteFun = (x, y) => {

        console.log(x, y)

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/entity/deleteEntityForDemo",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
            },
            "processData": false,
            "data": JSON.stringify({
                "entityID": x,
                "entityName": y
            })
        }
    
        $.ajax(settings).done(function (response) {
            console.log(response, "deviceadd");

            if(response.status == 200){
                alert("Deleted Successfully");

                document.getElementById("demo").innerHTML = '<div class="loading"><i class="fa fa-spin fa-cog"></i></div>';

                fecthEntities();
                //$("#entity").modal('hide');	
            }
        });

    }


    download = () => {

        
        var download = document.getElementById("download").value

        //alert(download)

        if(download == 1){

            $("a#downloadhref").attr("href", "/xls/Business Units.xlsx")


        } else if(download == 2){

            $("a#downloadhref").attr("href", "/xls/Applications.xlsx")


        } else if(download == 3){

            $("a#downloadhref").attr("href", "/xls/Devices.xlsx")


        }  else if(download == 5){

            $("a#downloadhref").attr("href", "/xls/Facilities.xlsx")


        } else if(download == 6){

            $("a#downloadhref").attr("href", "/xls/Assets.xlsx")


        } else if(download == 7){

            $("a#downloadhref").attr("href", "/xls/Shipments.xlsx")


        } else {

            $("a#downloadhref").attr("href", "/xls/Customize.xlsx")

        }

    }

});


