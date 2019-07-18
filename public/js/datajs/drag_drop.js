$(document).ready(function () {


    fetchAssosiation();

    business_units = [];
    let applications = null;
    let checkedApps = [];
    let checkedDevices = [];
    let checkedUsers = [];
    let newApp = []
    let newUser = []
    let newDevice = []
    let groups = []
    function fetchAssosiation() {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/associations/getAssociations",
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


            business_units = response.result

            console.log(business_units)

            /*

            for(i=0;i<business_units.length;i++){

                apps = business_units[i].children == undefined ?  [] : business_units[i].children

                for(j=0;j<apps.length;j++){

                    childApps = apps[j].children

                    console.log(childApps)

                    let data = []

                    let data1 = {
                        "id": 67,
                        "node": "Device Group",
                        "node_orig_id": 22,
                        "node_path": "63.65.67",
                        "node_type": "Device",
                        "parent_id": 65,
                        "parent_node": "Device",
                        "children": []
                    }

                    let data2 = {
                        "id": 67,
                        "node": "User Group",
                        "node_orig_id": 22,
                        "node_path": "63.65.67",
                        "node_type": "User",
                        "parent_id": 65,
                        "parent_node": "User Group",
                        "children": []
                    }

                    for(k=0;k<childApps.length;k++){

                        if(childApps[k].node_type == "Device"){

                            data1.children.push(childApps[k])

                        } else {

                            data2.children.push(childApps[k])

                        }

                    }

                    data.push(data1)

                    data.push(data2)

                    apps[j].children = data
                }

            } */

            console.log(business_units)

            //makeList('result', business_units);

            includeData(business_units)




        });

    }

    function includeData(data) {

        for (i = 0; i < data.length; i++) {

            if (business_units[i].children == undefined) {

                continue;

            } else {

                let apps = business_units[i].children

                for (j = 0; j < apps.length; j++) {

                    if (apps[j].children == undefined) {

                        continue;

                    } else {

                        groups = apps[j].children

                        let children = []

                        for (k = 0; k < groups.length; k++) {

                            let type = null
                            let id = null

                            type = groups[k].node_type
                            id = groups[k].id

                            let url = null

                            if (type == "User Group") {

                                url = "https://dive11.azurewebsites.net/api/beta/users/getUsersByUserGroupID?userGroupID=" + groups[k].node_orig_id

                            } else {

                                url = "https://dive11.azurewebsites.net/api/beta/devices/getDevicesByDeviceGroupID?deviceGroupID=" + groups[k].node_orig_id

                            }

                            children = groups[k].children


                            var settings = {
                                "async": true,
                                "crossDomain": true,
                                "url": url,
                                "method": "GET",
                                "headers": {
                                    "content-type": "application/json",
                                    "cache-control": "no-cache",
                                    "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
                                },
                                "processData": false
                            }

                            $.ajax(settings).done(function (response) {

                                result = response.result;

                                child = []
                                
                                for(x in result){

                                    if(type == "User Group"){

                                        let myObj = {
                                            id: 0,
                                            node: result[x].firstname,
                                            node_orig_id: 1,
                                            node_path: null,
                                            node_type: "Users",
                                            parent_id: null,
                                            parent_node: null
                                        }

                                        child.push(myObj)


                                    } else {

                                        let myObj = {
                                            id: 0,
                                            node: result[x].device_name,
                                            node_orig_id: 1,
                                            node_path: null,
                                            node_type: "Devices",
                                            parent_id: null,
                                            parent_node: null
                                        }

                                        child.push(myObj)
                                    }

                                }

                                sendData(child, data, id)


                            });


                            
                        }
                    }

                }

            }


        }


    }

    function sendData(x, data, y){

        for (i = 0; i < data.length; i++) {

            if (business_units[i].children == undefined) {

                continue;

            } else {

                let apps = business_units[i].children

                for (j = 0; j < apps.length; j++) {

                    if (apps[j].children == undefined) {

                        continue;

                    } else {

                        groups = apps[j].children


                        for (k = 0; k < groups.length; k++) {

                            if(groups[k].id == y){

                                groups[k].children = x
                            }

                        }
                        
                    }

                }

            }


        }

    }

    setTimeout(function(){
        
        
        makeList('result', business_units); 
    
    
        document.getElementById("hideDiv").style.display = "none"
        document.getElementById("showDiv").style.display = "block"
    
    }, 9000);

    /*

    fetchApps();

    function fetchApps() {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/applications/getAllApplicationsWithoutBu",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
            },
            "processData": false,
        }

        $.ajax(settings).done(function (response) {
            console.log(response, "withoutbu");

            app = response.result

            applications = app

            makeList('result1', applications);

            generateTable();

        });


    }

    function generateTable() {

        var txt = '';

        myObj = applications;
        txt += "<table class='table'><tr><th>Add</th><th> Application Name</th></tr>"
        for (x in myObj) {
            txt += "<tr><td><input onclick='checkbox(" + myObj[x].id + ",  \"" + myObj[x].name + "\")' type='checkbox' id='inputcheck" + x + "' value='1'></tb><td>" + myObj[x].name + "</td>";
        }
        txt += "</table>"
        document.getElementById("demo1").innerHTML = txt;
    }


    checkbox = (x, y) => {

        console.log(x)

        appData = {
            "id": x,
            "name": y
        }

        checkedApps.push(appData)

        var parentID = document.getElementById("buid").value
        var parentName = document.getElementById("buname").value

        var data = {
            "parentID": parentID,
            "parentName": parentName,
            "type": "Application",
            "children": []
        }

        data.children = checkedApps

        newApp = data

    }

    updateAssosiation = (data) => {

        console.log(data)

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/associations/createBulkAssociations",
            "method": "POST",
            "processData": false,
            "headers": {
                "accept": "application/json",
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "99c8dbfb-71d2-c742-1631-0f146861cb94"
            },
            "data": JSON.stringify(data)
        }

        $.ajax(settings).done(function (response) {
            console.log(response, "association");

            if (response.status == 200) {
                alert("Association updated")


            } else {
                alert("Something went wrong!")
            }

            fetchAssosiation()

            $("#entity").modal('hide');
            $("#entity1").modal('hide');
        });

    }

    */




    $('#nestable4').nestable({
        group: 1, maxDepth: 5
    })


    var updateOutput = function (e) {
        //  console.log(e);
        var list = e.length ? e : $(e.target)
        console.log(list);

        if (list[0].classList[1] === 'dd-source') {
            source_Array = list.nestable('serialize');
            console.log(source_Array);
        }
        if (list[0].classList[1] === 'dd-target') {
            destination_Array = list.nestable('serialize');
            console.log(destination_Array);
        }
        if (list[0].classList[2] === 'dd-source1') {
            main_source_Array = list.nestable('serialize');
            console.log(main_source_Array);
        }
        if (list[0].classList[2] === 'dd-target1') {
            main_destination_Array = list.nestable('serialize');
            console.log(main_destination_Array);
        }
    };

    // activate Nestable for list 1
    $('#nestable').nestable({
        group: 1, maxDepth: 7, data: 0
    })
        .on('change', function (e) {

            /*

            var list = e.length ? e : $(e.target)
            var leftentities = list.nestable('serialize');

            for (i = 0; i < leftentities.length; i++) {

                var entity = leftentities[i];

                if ('children' in entity) {

                    var key = "children";

                    var data = entity[key]

                    delete entity[key];

                    leftentities.push(data[0])

                }
            }

            source_Array = leftentities

            localStorage.setItem('source', JSON.stringify(source_Array));
            makeList('dd-source', source_Array);

            */

        });

    // activate Nestable for list 2
    $('#nestable2').nestable({
        group: 1, maxDepth: 7, role: 0
    })
        .on('change', updateOutput);

    //$('#nestable3').nestable({'serialize'});

    $('#nestable3').nestable('serialize');


    // activate Nestable for list 2
    $('#nestable4').nestable({
        group: 1
    })
        .on('change', updateOutput);


    saveAssoc = () => {



    }


    $('#save-list').on('click', function (e) {

        //makeList('result', business_units);

        console.log("came here ....")

        updateAssosiation(newApp)

    });

    $('#save-list1').on('click', function (e) {

        console.log("came here ....")

        var type = document.getElementById("entitytype").value;

        if (type == "D") {
            updateAssosiation(newDevice)
        } else {
            updateAssosiation(newUser)
        }


    });

    $('#save-item').on('click', function (e) {

        console.log(dbdata, 'save-Item');
        console.log(dbdata, 'dbdata');
        makeList('result2', dbdata);


    });


    $('#save-Mainlist').on('click', function (e) {

        makeList('resultMain', main_destination_Array);

        console.log(main_source_Array, '------------------->');


    })

    $('#nestable-menu').on('click', function (e) {
        var target = $(e.target),
            action = target.data('action');
        if (action === 'expand-all') {
            $('.dd').nestable('expandAll');
        }
        if (action === 'collapse-all') {
            $('.dd').nestable('collapseAll');
        }
    });

    function makeList(domId, data) {
        console.log(domId, data)
        let domName = document.getElementsByClassName(domId);
        let dd = createOlLi(data, 1);
        domName[0].innerHTML = "";
        domName[0].appendChild(dd);
    }

    let z = 0;

    function createOlLi(lists, index) {
        if (lists.length) {
            var ol = document.createElement("ol");
            ol.className = "dd-list";
            ol.setAttribute("id", 'Indivi_item_scroll');
            for (let i = 0; i < lists.length; i++) {
                z++
                var li = document.createElement("li");
                li.className = "dd-item";
                li.id = "dd-item-" + lists[i].node_orig_id
                li.setAttribute("data-name", lists[i].node);
                li.setAttribute("data-id", lists[i].node_orig_id);

                let type = 1

                if (lists[i].node_type == "Business Unit") {
                    type = 1
                } else if (lists[i].node_type == "Application") {
                    type = 2
                } else if(lists[i].node_type == "Device Group") {
                    type = 3
                } else {
                    type = 4
                }

                li.setAttribute("data-value", type);

                let j = 0;

                var button1 = document.createElement("button");
                button1.setAttribute("data-action", "expand");
                button1.className = "expand";
                button1.innerHTML = "Expand";
                button1.style.display = "none"

                var button2 = document.createElement("button");
                button2.setAttribute("data-action", "collapse");
                button2.className = "collapse";
                button2.innerHTML = "Collapse";

                li.appendChild(button1)
                li.appendChild(button2)

                var div = document.createElement("div");
                div.className = "dd-handle";
                div.innerHTML = "<span class='typetext'>" + lists[i].node_type + "</span><br/>" + lists[i].node;
                //div.innerHTML = lists[i].id;

                li.appendChild(div);
                li.innerHTML +="<i onclick='mani("+z+", "+type+")' id='manibtn"+z+"' class='fa fa-ellipsis-v ellip_Icon_Align'></i> "
                //li.innerHTML += '<a tabindex="0" class="btn btn-lg btn-danger" role="button" data-toggle="popover" data-trigger="focus" title="Dismissible popover" data-content="">Dismissible popover</a>'
                //li.innerHTML += "<i class='fa fa-ellipsis-v ellip_Icon_Align' onclick='rgtPullOver(" + lists[i].node_orig_id + ", " + type + ", \"" + lists[i].node + "\")'></i><i class='fa fa-trash-o fa-lg ellip_Icon_Align' onclick='mani(" + i + ")' id='delete'></i> ";
                if (lists[i].children) {
                    li.appendChild(createOlLi(lists[i].children, i + index + 1));
                    ol.appendChild(li);
                } else {
                    ol.appendChild(li);
                }
            }
            return ol;
        } else {
            let div = document.createElement('div');
            div.className = "dd-empty"
            return div;
        }
    }


    mani = (value, type) => {

        var divID = '#manibtn'+value;

        $(divID).popover({
            container: "body",
            html: true,
            content: function () {
                return '<div class="popover-message"><div><i onclick="route('+type+')" class="fa fa-plus"></i></div><div><i class="fa fa-edit"></i></div><div><i class="fa fa-trash-o"></i></div></div>';
            }
        });

    }

    route = (type) => {
        if(type == 1){

            window.location.href = "https://dpdlcpuxv3.azurewebsites.net/bu.html";


        } else if(type == 2){

            window.location.href = "https://dpdlcpuxv3.azurewebsites.net/app.html";


        } else if(type == 3) {

            window.location.href = "https://dpdlcpuxv3.azurewebsites.net/devices.html";


        } else {

            window.location.href = "https://dpdlcpuxv3.azurewebsites.net/users.html";

        }

    }

    fetchUsers = () => {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/users/getUsersNotAssociated",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
            },
            "processData": false,
        }

        $.ajax(settings).done(function (response) {
            console.log(response, "users");

            users = response.result

            associatedusers = users

            generateTableUsers(associatedusers);

        });

    }

    fetchDevices = () => {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/devices/getDevicesNotAssociated",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
            },
            "processData": false,
        }

        $.ajax(settings).done(function (response) {
            console.log(response, "users");

            devices = response.result

            generateTableDevices(devices);

        });

    }

    function generateTableDevices(devices) {
        var txt = '';

        myObj = devices;
        txt += "<table class='table'><tr><th>Add</th><th> Device Name</th></tr>"
        for (x in myObj) {
            txt += "<tr><td><input onclick='devicebox(" + myObj[x].id + ", \"" + myObj[x].device_name + "\")' type='checkbox' id='inputcheck" + x + "' value='1'></tb><td>" + myObj[x].device_name + "</td>";
        }
        txt += "</table>"
        document.getElementById("demo").innerHTML = txt;
    }


    function generateTableUsers(devices) {
        var txt = '';

        myObj = devices;
        txt += "<table class='table'><tr><th>Add</th><th> User Name</th></tr>"
        for (x in myObj) {
            txt += "<tr><td><input onclick='userbox(" + myObj[x].id + ", \"" + myObj[x].name + "\")' type='checkbox' id='inputcheck" + x + "' value='1'></tb><td>" + myObj[x].name + "</td>";
        }
        txt += "</table>"
        document.getElementById("demo").innerHTML = txt;
    }



    userbox = (x, y) => {

        console.log(x)

        appData = {
            "id": x,
            "name": y
        }

        checkedUsers.push(appData)

        var parentID = document.getElementById("appid").value
        var parentName = document.getElementById("appname").value

        var data = {
            "parentID": parentID,
            "parentName": parentName,
            "type": "User",
            "children": []
        }

        data.children = checkedUsers

        newUser = data

    }

    devicebox = (x, y) => {

        console.log(x)

        appData = {
            "id": x,
            "name": y
        }

        checkedDevices.push(appData)

        var parentID = document.getElementById("appid").value
        var parentName = document.getElementById("appname").value

        var data = {
            "parentID": parentID,
            "parentName": parentName,
            "type": "Device",
            "children": []
        }

        data.children = checkedDevices

        newDevice = data

    }

    updateData = (x) => {

        if (x == "U") {

            document.getElementById("showUsers").style.display = "block";
            document.getElementById("showDevices").style.display = "none";
            document.getElementById("demo").innerHTML = '<div class="lds-ring qwerty"><div></div><div></div><div></div><div></div></div>';
            $("#entitytype").val("U")
            fetchUsers()

        } else {

            document.getElementById("showUsers").style.display = "none";
            document.getElementById("showDevices").style.display = "block";
            document.getElementById("demo").innerHTML = '<div class="lds-ring qwerty"><div></div><div></div><div></div><div></div></div>';
            $("#entitytype").val("D")
            fetchDevices()

        }


    }

    $('#dd-item-18').bind('click', function (event) {

        console.log(event)

    });

    rgtPullOver = (value, type, name) => {

        var sbHeight = window.innerHeight * (window.innerHeight / document.body.offsetHeight);

        console.log(window.scrollY);

        var position = $('#dd-item-18').position();
        console.log('X: ' + position.left + ", Y: " + position.top);

        if (type == 1) {

            $("#entity").popover('show');
            $("#entity1").popover('hide');
            $("#buid").val(value)
            $("#buname").val(name)
            fetchApps();

        } else {
            $("#entity").modal('hide');
            $("#entity1").modal('show');
            $("#appid").val(value)
            $("#appname").val(name)
            $("#entitytype").val("D")
            document.getElementById("demo").innerHTML = "";
            fetchDevices();

        }



    }

    $('#close').on('click', function (e) {
        $('#rgtPullOver').removeClass('in');
    })

    pullOverTemplate = function () {
        //$('#nestable4').removeClass('dis_none');
        var targetDiv = document.getElementById('nestable4');
        var pullTemplateMas = document.createElement('div');
        targetDiv.appendChild(pullTemplateMas);
        $('#nestable4').addClass('dis_blk');
        console.log('hi Pull');
        return targetDiv;

    }

});


