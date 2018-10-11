$(document).ready(function(){
    $('#formCreate').on('submit',function(e){
        e.preventDefault();
        var name = $( "#productName"  ).val();
        var desc = $( "#productDesc"  ).val();
        var img  = $( "#productImage" ).val();
        var pric = $( "#productPrice" ).val();

        // In my case, I need to fetch these data before custom actions
        $.ajax({
            url: "https://coopproject.azurewebsites.net/api/Products",
            type: 'POST',
            data: JSON.stringify({
                "name": name,
                "Description": desc,
                "imageUrl ": img,
                "price": pric}),
            processData: false,
            contentType: 'application/json',
            success: function (comments) {
                $("#main").append("<p>" + name + " has been created</p>");
            },
            error: function (request, message, error) {
                $("#main").append("<p>Failed to create " + name + "</p>");
            }
        });
    });
});