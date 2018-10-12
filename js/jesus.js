$(document).ready(function () {
    const urlBase = "https://coopproject.azurewebsites.net/";
    const urlApi  = "api/products";
    const url = urlBase + urlApi;

    function productsGet(callback) {
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

    function onProductsError(request, message, error) {
        console.log(request, message, error);
    }

    function buildProduct(product) {
        const element =
            '<div style="margin-right: 2em;" class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item mad">' +
            '<div class="block2">' +
            '<div class="block2-pic hov-img0">' +
            '<img id="init-product-img" src="' + product.imageUrl + '" alt="IMG-PRODUCT">' +
            '<a id="vis-vare-knap" href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">' +
            'Vis vare' +
            '</a>' +
            '</div>' +
            '<div class="block2-txt flex-w flex-t p-t-14">' +
            '<div class="block2-txt-child1 flex-col-l ">' +
            '<a id="init-product-title" href="product-detail.html" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">' +
            product.name +
            '</a>' +
            '<span id="init-product-price" class="stext-105 cl3">' +
            product.price + ' dkk' +
            '</span>' +
            '</div>' +
            '<div class="block2-txt-child2 flex-r p-t-3">' +
            '<a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">' +
            '<img class="icon-heart1 dis-block trans-04" src="img/icons/icon-heart-01.png" alt="ICON">' +
            '<img class="icon-heart2 dis-block trans-04 ab-t-l" src="img/icons/icon-heart-02.png" alt="ICON">' +
            '</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        return element;
    }

    function fillProducts(results) {
        const root = $("#product-list");

        root.empty();
        var elements = '<div class="row isotope-grid">';

        $.each(results, function (index, product) {
            const element = buildProduct(product);
            elements+= element;
        });

        elements += '</div>';
        root.append(elements);
    }

    productsGet(fillProducts);
});