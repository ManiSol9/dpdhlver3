$(document).ready(function () {

    changelog = () => {

        let x = document.getElementById("showlogs").value

        if(x == "A"){

            document.getElementById("demo").innerHTML = '<iframe width="100%" height="540px" src="https://app.powerbi.com/reportEmbed?reportId=104ceee2-cbe9-4b28-bf50-fe7b80031937&autoAuth=true&ctid=cd99fef8-1cd3-4a2a-9bdf-15531181d65e" frameborder="0" allowFullScreen="true"></iframe>';

        } else {

            document.getElementById("demo").innerHTML = '<iframe width="100%" height="540px" src="https://app.powerbi.com/reportEmbed?reportId=d1a82be0-c7b1-4737-89a1-266ad46d9e66&appId=e08c8ffb-a216-40d5-a909-616c71e66176&autoAuth=true&ctid=cd99fef8-1cd3-4a2a-9bdf-15531181d65e" frameborder="0" allowFullScreen="true"></iframe>';


        }
 
    }

})