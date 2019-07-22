$(document).ready(function () {

    let business_units = [];
    let newApp = []
    let newUser = []
    let newDevice = []
    let orgID = null;
    let type = null;

    fetchAssosiation(orgID, type)

    function fetchAssosiation(orgID, type) {

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

            if(response.result == null) {

            } else {

                business_units = response.result

                console.log(business_units)
    
                 makeList('result', business_units)

            }

        });

    }

    setTimeout(function () {

        makeList('result', business_units);

        document.getElementById("hideDiv").style.display = "none"
        document.getElementById("showDiv").style.display = "block"

    }, 3000);

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

    let z = [];

    function createOlLi(lists, index) {
        if (lists.length) {



            var ol = document.createElement("ol");
            ol.className = "dd-list";
            ol.setAttribute("id", 'Indivi_item_scroll');
            for (let i = 0; i < lists.length; i++) {

                var li = document.createElement("li");
                li.className = "dd-item";
                li.id = "dd-item-" + lists[i].node_orig_id
                li.setAttribute("data-name", lists[i].node);
                li.setAttribute("data-id", lists[i].node_orig_id);

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

                if (lists[i].children.length == 0) {

                    li.innerHTML += "<i onclick='fecthAgain(" + lists[i].node_orig_id + ", "+ lists[i].id +", \""+ lists[i].node_type +"\")' class='fa fa-ellipsis-v ellip_Icon_Align'></i> "

                }

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

    function createAssociationJson(lists, index, addChild, y){

        console.log(addChild)

        for (let i = 0; i < lists.length; i++) {

            if(lists[i].id == y){

                lists[i].children = addChild

            }

            if (lists[i].children) {

                createAssociationJson(lists[i].children, i + index + 1, addChild, y)

            } else {

            }
        }

        business_units = lists

        makeList('result', business_units);

    }


    fecthAgain = (x, y, z) => {

        let url = null;

        if(z == "User Group"){

            url = "https://dive11.azurewebsites.net/api/beta/users/getUsersByUserGroupID?userGroupID=" + x

        } else {

            url = "https://dive11.azurewebsites.net/api/beta/entity/getEntityMetadataByEntityID?entityID=" + x

        }

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

            let childData = response.result;

            console.log(childData, "childdata")

            let addChild = []

            for (i = 0; i < childData.length; i++) {

                let childObj = childData[i].entity_object

                if(z == "User Group") {
                    addChild.push({
                        id: childData[i].user_id,
                        node: childData[i].firstname,
                        node_orig_id: childData[i].user_id,
                        node_path: childData[i].user_id,
                        node_type: "Users",
                        parent_id: null,
                        parent_node: null,
                        children: []
                    })

                } else {


                    addChild.push({
                        id: childData[i].id,
                        node: childObj.Name,
                        node_orig_id: childData[i].id,
                        node_path: childData[i].id,
                        node_type: childObj.Name,
                        parent_id: null,
                        parent_node: null,
                        children: []
                    })
                }



            }

            createAssociationJson(business_units, 1, addChild, y)

        });
    }


    mani = (value, type) => {

        var divID = '#manibtn' + value;

        $(divID).popover({
            container: "body",
            html: true,
            content: function () {
                return '<div class="popover-message"><div><i onclick="route(' + type + ')" class="fa fa-plus"></i></div><div><i class="fa fa-edit"></i></div><div><i class="fa fa-trash-o"></i></div></div>';
            }
        });

    }

    route = (type) => {
        if (type == 1) {

            window.location.href = "https://dpdlcpuxv3.azurewebsites.net/bu.html";


        } else if (type == 2) {

            window.location.href = "https://dpdlcpuxv3.azurewebsites.net/app.html";


        } else if (type == 3) {

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


