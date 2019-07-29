$(document).ready(function () {

    const form = document.querySelector('form');
    const name = document.getElementById('name');
    const armtemplates = document.getElementById('armtemplates');

    document.getElementById("demo").style.display = "block"
    document.getElementById("addDevice").style.display = "block"

    let groupsData = []

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


    fetchUsers()

    function fetchUsers() {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/users/getAllUsers",
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

            //generateTable();

        });

    }

    //fecthApps();
    fetchBU();
    fetchGroups();

    function fetchGroups() {


        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/users/getUserGroups",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
            },
            "processData": false,
        }

        $.ajax(settings).done(function (response) {
            console.log(response, "grups");

            groups = response.result
            generateGroupTable(groups);
            generateSelect3(groups)

        });

    }

    viewGroups = () => {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/users/getUserGroups",
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
        txt += "<table class='table'><tr><th> Group ID </th><th> Group Name </th> <th> Created By </th> <th> Created Time </th> <th> View Users </th> <th>Actions</th></tr>"
        for (x in myObj) {
          txt += "<tr><td>" + myObj[x].id + "</td><td>" + myObj[x].user_group_name + "</td><td>" + myObj[x].created_by + "</td><td>" + myObj[x].created_date + "</td><td> <button class='btn btn-success' onclick='viewUsers("+ myObj[x].id +")'> View </button></td>";
          txt += "<td><button class='btn btn-danger'><span onclick='deletegroup("+myObj[x].id+")' class='glyphicon glyphicon-trash' aria-hidden='true'></span></button></td></tr>";
        }
        txt += "</table>"    
        document.getElementById("demo").innerHTML = txt;
    }    

    deletegroup = (x) => {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/users/deleteUserGroups?id="+x,
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
                fetchGroups();
                //$("#entity").modal('hide');	
            }
        });

    }    

    viewUsers = (id) => {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/users/getUsersByUserGroupID?userGroupID=" + id,
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
    
            users = response.result

            associatedusers = users
    
            generateTable();
    
        });

    }

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

    function fecthApps(id) {


        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/entity/getEntityMetadataByEntityID?entityID="+id,
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

    updateApps = () => {

        let bdata = document.getElementById("bid").value

        let bvalue = bdata.split(",")

        $("#bid").prop('disabled', 'disabled');

        document.getElementById("appdiv").style.display = "none"

        document.getElementById("buttonpart1").style.display = "block"

        document.getElementById("apps").innerHTML = '<div class="icon-container" id="iconcontainer"><i class="loader"></i></div>'

        fecthApps(bvalue[0], bvalue[1])

    }

    nextAdd = () => {

        document.getElementById("buttonpart3").style.display = "block"
        document.getElementById("buttonpart1").style.display = "none"
        document.getElementById("appdiv").style.display = "block"

    }


    function generateTable() {
        var txt = '';

        txt +='<div class"backButton"> <button onclick="viewGroups();" class="btn btn-danger"> Go Back </button> </div><br><br>';

        myObj = associatedusers;
        txt += "<table class='table'><tr><th> Nmae </th><th> EMail </th><th>Actions</th></tr>"
        for (x in myObj) {
            txt += "<tr><td>" + myObj[x].firstname + "</td><td>" + myObj[x].email + "</td>";
            txt += "<td>";
            txt += "<button class='btn btn-danger'><span onclick='deletebu(" + myObj[x].user_id + ", "+  myObj[x].user_group_id +")' class='glyphicon glyphicon-trash' aria-hidden='true'></span></button></td></tr>";
        }
        txt += "</table>"
        document.getElementById("demo").innerHTML = txt;
    }


    function generateSelect2(data) {
        var txt = '<select  id="appId" class="form-control"><option value="">Please select Child</option>';
        myObj = data;
        for (x in myObj) {

            let entityObj = myObj[x].entity_object

            txt += '<option value="' + myObj[x].id + ','+ entityObj.Name +'">' + entityObj.Name + '</option>';
        }
        txt += "</select>";
        document.getElementById("apps").innerHTML = txt;
        //document.getElementById("apps1").innerHTML = txt;
    }


    function generateSelect3(data) {
        var txt = '<select  id="gId" class="form-control form-control-line" onchange="pushGroup()"><option value="">Please select Group</option>';
        myObj = data;
        for (x in myObj) {
            txt += '<option value="' + myObj[x].id + '+'+ myObj[x].user_group_name +'">' + myObj[x].user_group_name + '</option>';
        }
        txt += "</select>";
        document.getElementById("group").innerHTML = txt;
    }



    function generateSelectBu(data) {
        var txt = '<select  id="bid" class="form-control form-control-line" onchange="updateApps()"><option value="">Please select Group</option>';
        myObj = data;
        for (x in myObj) {
            txt += '<option value="' + myObj[x].id + ','+ myObj[x].entity_name +'">' + myObj[x].entity_name + '</option>';
        }
        txt += "</select>";
        document.getElementById("bu").innerHTML = txt;
        //document.getElementById("bu1").innerHTML = txt;
    }

    deletebu = (x, y) => {

        let Obj = {
            userID: x,
            userGroupID: y
        }

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/users/deleteUserFromUserGroup",
            "method": "DELETE",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "0146efcb-e86f-0ff0-d4ea-d8647cbbfd33"
            },
            "processData": false,
            "data": JSON.stringify(Obj)
        }

        $.ajax(settings).done(function (response) {
            console.log(response, "deviceadd");

            if (response.status == 200) {
                alert("Deleted Successfully");
                fetchUsers();
                //$("#entity").modal('hide');	
            }
        });

    }

    showbu = () => {
        alert("showed")
    }

    mani = () => {

        let value = document.getElementById("useremail").value;

        document.getElementById("iconcontainer").style.display = "block"

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

                let data = response.output

                if (data.access_token) {

                    let headers = {
                        "Authorization": "Bearer " + data.access_token,
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
                            document.getElementById("username").value = null
                            document.getElementById("phonenumber").value = null
                            document.getElementById("addtogroup").style.display= "none"
                            document.getElementById("invite").style.display = "inline-block"

                        } else {

                            document.getElementById("username").value = response.value[0].displayName
                            document.getElementById("phonenumber").value = response.value[0].mobilePhone
                            document.getElementById("iconcontainer").style.display = "none";
                            $("#username").prop('disabled', true);

                        }

                        document.getElementById("iconcontainer").style.display = "none"

                    });
                }
            });

        } else {

            alert("Not a valid email address")
            document.getElementById("email").value = null

        }

    }

    invite = () => {


        //e.preventDefault();

        if (useremail.value == "" || username.value == "") {
            alert("Please enter values")
        } else {

            document.getElementById("invite").innerHTML = "Loading...."

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://dhlcp-b2b-externaluserappservice.azurewebsites.net/api/getToken",
                "method": "GET",
                "processData": false,
            }

            $.ajax(settings).done(function (response) {

                let qwerty = response.output

                if (qwerty.access_token) {

                    var data = {
                        "invitedUserDisplayName": username.value,
                        "invitedUserEmailAddress": useremail.value,
                        "sendInvitationMessage": true,
                        "inviteRedirectUrl": "https://iot.dhl.com/",
                        "inviteRedeemUrl": "https://iot.dhl.com/"
                    }

                    let headers = {
                        "Authorization": "Bearer " + qwerty.access_token,
                        "Content-Type": "application/json"
                    }

                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://graph.microsoft.com/v1.0/invitations",
                        "method": "POST",
                        "headers": headers,
                        "processData": false,
                        "data": JSON.stringify(data)
                    }

                    $.ajax(settings).done(function (response) {
                        console.log(response, "users");

                        if (response.sendInvitationMessage == true) {

                            alert("Invitation sent Successfully!")
                            document.getElementById("invite").innerHTML = "Invite and Add"
                            document.getElementById("invite").style.display = "none"
                            document.getElementById("addtogroup").style.display = "inline-block"
                            addtogroup()

                        } else {

                            alert("Somthing went wrong!")
                        }

                        $("#entity1").modal('hide');


                    });

                }

            });
        }

    }

    $('#save-list').on('click', function (e) {
        if (username.value == "" || email.value == "" || phonenumber.value == "" || address.value == "" || role.value == "") {
            alert("Please enter values")
        } else {

            e.preventDefault();

            var buObject = {
                "name": username.value,
                "appId": appId.value == "" ? null : appId.value,
                "designation": role.value,
                "email": email.value,
                "contact": phonenumber.value,
                "address": address.value,
                "createdBy": "Mani"
            }

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://dive11.azurewebsites.net/api/beta/users/createUser",
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
                console.log(response, "users");

                if (response.status == 200) {
                    alert("Created Successfully");
                    fetchUsers();
                    $("#entity").modal('hide');
                }
            });
        }
    });

    $('#save-list1').on('click', function (e) {

        console.log(name1.value, email1.value)

        if (name1.value == "" || email1.value == "") {
            alert("Please enter values")
        } else {

            e.preventDefault();

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://dhlcp-b2b-externaluserappservice.azurewebsites.net/api/getToken",
                "method": "GET",
                "processData": false,
            }

            $.ajax(settings).done(function (response) {

                let qwerty = response.output

                if (qwerty.access_token) {

                    var data = {
                        "invitedUserDisplayName": name1.value,
                        "invitedUserEmailAddress": email1.value,
                        "sendInvitationMessage": true,
                        "inviteRedirectUrl": "https://iot.dhl.com/",
                        "inviteRedeemUrl": "https://iot.dhl.com/"
                    }

                    let headers = {
                        "Authorization": "Bearer " + qwerty.access_token,
                        "Content-Type": "application/json"
                    }

                    var settings = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://graph.microsoft.com/v1.0/invitations",
                        "method": "POST",
                        "headers": headers,
                        "processData": false,
                        "data": JSON.stringify(data)
                    }

                    $.ajax(settings).done(function (response) {
                        console.log(response, "users");

                        if (response.sendInvitationMessage == true) {

                            alert("Invitation sent Successfully!")

                        } else {

                            alert("Somthing went wrong!")
                        }

                        $("#entity1").modal('hide');


                    });

                }

            });
        }
    });

    $('#save-group').on('click', function (e) {

        if (groupname.value == "") {
            alert("Please enter values")
        } else {

            e.preventDefault();

            let data = {
                userGroupName: groupname.value,
                createdBy: "Tina"
            }

            let headers = {
                "Content-Type": "application/json"
            }

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://dive11.azurewebsites.net/api/beta/users/createUserGroups",
                "method": "POST",
                "processData": false,
                "headers": headers,
                "data": JSON.stringify(data)
            }

            $.ajax(settings).done(function (response) {
                console.log(response)

                if (response.status == 200) {
                    fetchGroups();
                    $("#groupadd").modal('hide');
                }

            });
        }
    });


    addapp = () => {

        document.getElementById("addapppart").style.display = "block"
    }

    pushGroup = () => {

        groupV = document.getElementById("gId").value;

        groupValues = groupV.split("+")

        gid = groupValues[0]

        gName = groupValues[1]

        let fetchUsers = null;

        let headers = {
            "Content-Type": "application/json"
        }

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/users/getUsersByUserGroupID?userGroupID=" + gid,
            "method": "GET",
            "processData": false,
            "headers": headers
        }

        $.ajax(settings).done(function (response) {
            console.log(response)

            if (response.status == 200) {

                fetchUsers = response.result

                groupsData.push({
                    userGroupID: gid,
                    users: fetchUsers,
                    userGroupName: gName,
                    createdBy: "vcmanikanta@hotmail.com"
                })

                $("#body-part-2").css({ display: "block" })

                console.log(groupsData)

                usersList(groupsData, gid)
            }

        });

    }


    $('#finalsave').on('click', function (e) {

        //console.log(useremail.value, username.value)

        e.preventDefault();

        gid = document.getElementById("gId").value

        if (bid.value == "" || appId.value == "") {
            alert("Please fill required fields")
        } else {

            e.preventDefault();

            let childInfo = document.getElementById("appId").value

            childInfo = childInfo.split(",")

            let bdata = document.getElementById("bid").value

            let bvalue = bdata.split(",")



            let finalData = {
                "parentEntityID": childInfo[0],
                "parentEntityType": bvalue[1],
                "parentEntityName": childInfo[1],
                "parentEntityCategory": "Instance",
                "userGroups": groupsData
            }

            console.log(finalData)

            

            let headers = {
                "Content-Type": "application/json"
            }

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://dive11.azurewebsites.net/api/beta/users/createUsersWithUserGroupsForDemo",
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

    $('#finalsave1').on('click', function (e) {

        //console.log(useremail.value, username.value)

        e.preventDefault();

        gid = document.getElementById("gId").value

        if (bid.value == "") {
            alert("Please fill required fields")
        } else {

            e.preventDefault();

            //let childInfo = document.getElementById("appId").value

            //childInfo = childInfo.split(",")

            let bdata = document.getElementById("bid").value

            let bvalue = bdata.split(",")



            let finalData = {
                "parentEntityID": bvalue[0],
                "parentEntityType": bvalue[1],
                "parentEntityName": bvalue[1],
                "parentEntityCategory": "Instance",
                "userGroups": groupsData
            }

            console.log(finalData)

            

            let headers = {
                "Content-Type": "application/json"
            }

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://dive11.azurewebsites.net/api/beta/users/createUsersWithUserGroupsForDemo",
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


    addtogroup = () => {

        groupV = document.getElementById("gId").value;

        groupValues = groupV.split("+")

        gid = groupValues[0]

        gName = groupValues[1]


        if (useremail.value == "" || username.value == "" || gid == "") {
            alert("Please fill required fields")
        } else {
            
            let name = username.value
            
            name = name.replace(/[^a-zA-Z ]/g, "")
            
            var name1 = name.split(" ")
            
            data = {
                email: useremail.value,
                firstname: name1[0],
                createdBy: "Admin"
            }
            for (i = 0; i < groupsData.length; i++) {
                if (gid == groupsData[i].userGroupID) {
                    usersOldData = groupsData[i].users
                    console.log(usersOldData)
                    let x = 0;
                    for (j = 0; j < usersOldData.length; j++) {
                        if (usersOldData[j].email == data.email) {
                            alert("Already user in the group!")
                            x = 1;
                            break;
                        }
                    }
                    console.log(x)
                    x == 0 ? groupsData[i].users.push(data) : null
                }
            }
            document.getElementById("username").value = null
            document.getElementById("useremail").value = null
            usersList(groupsData, gid)
        }
    }

    usersList = (data, gid) => {


        var txt = "<table class='table'><tr><th> Name </th><th> EMail </th><th>Actions</th></tr>"

        for (i = 0; i < data.length; i++) {

            if (data[i].userGroupID == gid.toString()) {

                let groupusers = data[i].users

                for (x in groupusers) {

                    txt += "<tr><td>" + groupusers[x].firstname + "</td><td>" + groupusers[x].email + "</td><td></td></tr>";

                }
            }

        }

        txt += "</table>";

        document.getElementById("list-users").innerHTML = txt

    }

});


