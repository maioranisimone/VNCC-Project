from flask import Flask, jsonify, request, render_template, make_response
from models import list_shop
from database import get_session
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins='*')


@app.route('/get_all_products', methods=['GET'])
def get_all_products():
    with get_session() as db:
        all_products = db.query(list_shop).all()
        return jsonify(all_products)


@app.route('/add_product', methods=['POST'])
def add_product():
    product_name = request.form.get('product')
    amount = request.form.get('quantita')
    price = request.form.get('prezzo')

    # Aggiungo il prodotto al db.
    if product_name and amount and price:
        with get_session() as db:
            new_product = list_shop(
                product_name=product_name, amount=amount, price=price)
            db.add(new_product)
            db.commit()

            response = make_response(jsonify(new_product))
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response


@app.route('/delete_all_products', methods=['DELETE'])
def delete_all_products():
    with get_session() as db:
        # Controllo se ci sono elementi nel db.
        if db.query(list_shop).count() == 0:
            return 'La tua lista è già vuota!'
        # Elimino tutti gli elementi dal db.
        db.query(list_shop).delete()
        db.commit()
        return 'Tutti i prodotti sono stati eliminati dal database!'


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
