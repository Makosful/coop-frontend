$(document).ready(function(){
    const urlBase = "http://localhost:52528/";
    const urlApi  = "api/products";
    const url = urlBase + urlApi;

    function productPost ( name, description, imageUrl, price, discountPrice, discount ){
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify({
                "name": name,
                "description": description,
                "imageUrl": imageUrl,
                "price": price,
                "discountPrice": discountPrice,
                "discount": discount}),
            processData: false,
            contentType: 'application/json',
            success: productGet(populateLists),
            error: function (request, message, error) {
                onProductsError(request,message,error);
            }
        });
    }
    function productGet (callback){
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: callback,
            error: function (request, message, error) {
                onProductsError(request, message, error);
            }
        });
    }
    function productPut ( id, name, description, imageUrl, price, discountPrice, discount ){
        $.ajax({
            url: url + "/" + id,
            type: 'PUT',
            data: JSON.stringify({
                "name": name,
                "description": description,
                "imageUrl": imageUrl,
                //"price": price,
                //"discountPrice": discountPrice,
                "discount": discount
            }),
            processData: false,
            contentType: 'application/json',
            success: productGet(populateLists),
            error: function (request, message, error) {
                onProductsError(request,message,error);
            }
        });
    }
    function productDelete ( id ){
        $.ajax({
            url: url + "/" + id,
            type: 'DELETE',
            processData: false,
            contentType: 'application/json',
            success: productGet(populateLists),
            error: function (request, message, error) {
                onProductsError(request,message,error);
            }
        });
    }

    // Logs the error to the console if it failed to fetch from the database
    function onProductsError(request, message, error){
        console.log(request + message + error);
    }

    // Fills the Update list with the given Products
    function fillUpdateList(products) {
        $.each(products, function (index, product) {
            $("#productUpdateList").append('<option value="' + product.id + '">' + product.name + '</option>');
        });
    }
    
    function clearUpdateList() {
        $("#productUpdateList").empty();
    }

    // Fills the Delete list with the given Products
    function fillDeleteList(products) {
        $.each(products, function (index, product) {
            $("#productDeleteList").append('<option value="' + product.id + '">' + product.name + '</option>');
        });
    }

    function clearDeleteList() {
        $("#productDeleteList").empty();
    }

    // Fills all given lists at once
    function populateLists(products) {
        clearUpdateList();
        clearDeleteList();
        fillUpdateList(products);
        fillDeleteList(products);
    }

    $("#buttonCreate").click(function (e) {
        e.preventDefault();

        var name =        $( "#productCreateName"  ).val();
        var description = $( "#productCreateDesc"  ).val();
        var imageUrl =    $( "#productCreateImage" ).val();
        var price =       $( "#productCreatePrice" ).val();

        productPost(name,description, imageUrl, price, price, false);
    });

    $("#productUpdateSearchButton").click(function (e) {
        e.preventDefault();
        console.log("Update search button")
    });

    $("#buttonUpdate").click(function (e) {
        e.preventDefault();

        const id            = $( "#productUpdateList"          ).val();
        const name          = $( "#productUpdateName"          ).val();
        const description   = $( "#productUpdateDesc"          ).val();
        const imageUrl      = $( "#productUpdateImage"         ).val();
        const price         = $( "#productUpdatePrice"         ).val();
        const discountPrice = $( "#productUpdateDiscountPrice" ).val();
        const discount      = $( "#productUpdateDiscount"      ).is(":checked");

        productPut(id, name, description, imageUrl, price, discountPrice, discount);
    });

    $("#productDeleteSearchButton").click(function (e) {
        e.preventDefault();
        console.log("Delete search button");
    });

    $("#buttonDelete").click(function (e) {
        e.preventDefault();
        const id = $("#productDeleteList").val();

        productDelete(id);
    });

    // Fills the lists initially with all the Products
    productGet(populateLists);

});