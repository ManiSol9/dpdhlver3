$(document).ready(function () {

    const form = document.querySelector('form');
    const name = document.getElementById('name');
    const armtemplates = document.getElementById('armtemplates');
    

    var shipments = [
        {
            "ShipmentID": "#123",
            "ShipmentName": "Mani",
            "ShipmentType": "Air Mode",
            "ShipmentStartTime": "2019-07-07",
            "ShipmentEndTime": "2019-07-09",
        }
    ]

    localStorage.setItem('shipments', JSON.stringify(shipments));
    shipments = localStorage.getItem('shipments') ? JSON.parse(localStorage.getItem('shipments')) : [];

    console.log(shipments)

    generateTable()


    function generateTable(){
        var txt='';

        myObj = shipments;
        txt += "<table class='table' border='1'><tr><th> Shipment ID </th><th> Shipment Name </th><th> Shipment Type </th><th> Shipment Start Time </th><th> Shipment End Time </th></tr>"
        for (x in myObj) {
          txt += "<tr><td>" + myObj[x].ShipmentID + "</td><td>" + myObj[x].ShipmentName + "</td><td>" + myObj[x].ShipmentType + "</td><td>" + myObj[x].ShipmentStartTime + "</td><td>" + myObj[x].ShipmentEndTime + "</td>";
          //txt += "<td>" + myObj[x].appname + "</td><td>" + myObj[x].bu + "</td><td>" + myObj[x].heathStatus + "</td><td>" + myObj[x].batteryPower + "</td><td>" + myObj[x].created_by + "</td><td>" + myObj[x].created_by + "</td><td>";
          //txt += "<span onclick='deletebu("+x+")' class='glyphicon glyphicon-trash' aria-hidden='true'></span></td></tr>";
        }
        txt += "</table>"    
        document.getElementById("demo").innerHTML = txt;
    }


    $('#save-list').on('click', function (e) {


        if(shipmenttype.value == "" || shipmentid.value == "" || shipmentname.value == "" || shipmentstart.value == "" || shipmentend.value == ""){
            alert("Please enter values")
        } else {

            e.preventDefault();
         
            var shipObject = {
                "ShipmentID": shipmentid.value,
                "ShipmentName": shipmentname.value,
                "ShipmentType": shipmenttype.value,
                "ShipmentStartTime": shipmentstart.value,
                "ShipmentEndTime": shipmentend.value      
            }

            shipments.push(shipObject)
            localStorage.setItem('shipments', JSON.stringify(shipments));
            generateTable();
            $("#entity").modal('hide');			
        }
    });

});

	
