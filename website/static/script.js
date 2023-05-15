let listRetrieved = false
let count = 0


function recupero_dati() {
    if (listRetrieved) {
        $('.live-info').text('Lista già recuperata!').fadeIn(500).delay(2000).fadeOut(500)
        return;
    }
    let totalCost = 0
    $.get("http://localhost:5000/get_all_products", {}, function (data) {
        if (data) {
            for (const product of data) {
                $('.list').prepend(create_element2(product))
                totalCost += product['price'] * product['amount']
            }
            $('.live-info').text('Lista recuperata con successo!').fadeIn(500).delay(2000).fadeOut(500)
            $('.total-cost').text('Costo totale attuale: ' + totalCost + '€').css('display', 'block')
            listRetrieved = true
        }
    })
}


function reset_list() {
    $.ajax({
        url: "http://localhost:5000/delete_all_products",
        type: 'DELETE',
        success: function (response) {
            $('.list').empty()
            $('.summary').empty()
            $('.total-cost').text('Costo totale attuale: 0€').css('display', 'block')
            $('.live-info').text(response).fadeIn(500).delay(2000).fadeOut(500)
            listRetrieved = false
        }
    });
}


function insert_product(button) {
    const form_element = button.parentElement;
    const product_name = form_element['product'].value
    const amount = form_element['quantita'].value
    const price = form_element['prezzo'].value

    if (product_name && amount && price) {
        $.post("http://localhost:5000/add_product", { product: product_name, quantita: amount, prezzo: price }, function (response) {

            $('#product-input').val('')
            $('#quantita-input').val('')
            $('#prezzo-input').val('')

            const product = {
                product_name: product_name,
                amount: amount,
                price: price,
                insertion_time: ""
            }

            const li_product = create_element(product)
            $('.summary').prepend(li_product)
            $('.live-info').text('Prodotto inserito con successo!').fadeIn(500).delay(2000).fadeOut(500)
            listRetrieved = false
        });
    }
}


function create_element(product) {
    const li_product = $('<li/>')
    li_product.append($('<span/>', { text: product['product_name'] + ',' }))
    li_product.append($('<span/>', { text: ' x' }).css('font-weight', 'bold').css('color', '#8b0000'))
    li_product.append($('<span/>', { text: product['amount'] + ',' }))
    li_product.append($('<span/>', { text: ' €' }).css('font-weight', 'bold').css('color', '#8b0000'))
    li_product.append($('<span/>', { text: product['price'] }))
    return li_product;
}


function create_element2(product) {
    const li_product = $('<li/>').css('background-color', count % 2 === 0 ? '#00FFFF' : '#7FFFD4')
    li_product.append($('<span/>', { text: product['product_name'] + ',' }))
    li_product.append($('<span/>', { text: ' x' }).css('font-weight', 'bold'))
    li_product.append($('<span/>', { text: product['amount'] + ',' }))
    li_product.append($('<span/>', { text: ' €' }).css('font-weight', 'bold'))
    li_product.append($('<span/>', { text: product['price'] + ', ' }))
    li_product.append($('<span/>', { text: 'inserito il: ' }).css('font-weight', 'bold'))
    li_product.append($('<span/>', { text: product['insertion_time'] }))

    count++
    return li_product
}