$(document).ready(function () {

    var url_string = window.location.href
    var url = new URL(url_string);
    var entityID = url.searchParams.get("id");
    console.log(entityID);

    fecthEntities(entityID)

    function fecthEntities(entityID) {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://dive11.azurewebsites.net/api/beta/entity/getEntityMetadataByEntityID?entityID="+entityID,
            "method": "GET",
            "processData": false,
        }

        $.ajax(settings).done(function (response) {
            console.log(response);

            if (response.status == 200) {

                //generateTable(response.result)

                result = response.result

                generateTable(result)

            } else {

                alert("Something went wrong! Please try again later")
            }

        });

    }

    function generateTable(data) {
        var txt = '';

        let entityObj = []

        for(x in data){

            entityObj.push(result[x].entity_object)

        }

        myObj = entityObj;

        var keys = Object.keys(myObj[0]);

        txt += "<table class='table'><tr>"


        for(x in keys){

            txt +='<th>'+ keys[x] +'</th>';

        }

        txt += "<th>Actions</th></tr>"


        for(i=0;i<data.length;i++) {

            txt +='<tr>';

            keys = Object.keys(myObj[0]);


            for(y in keys){

                txt +='<td>'+ myObj[i][keys[y]] +'</td>';

            }

            txt +="<td><button class='btn btn-danger'><i class='fa fa-trash-o fa-fw' onclick='deletebu(" + data[i].entity_id + ")'  aria-hidden='true'></i></button></td></tr>";

        }
        txt += "</table>"
        document.getElementById("demo").innerHTML = txt;
    }

});