from flask import Blueprint, render_template, request, jsonify
from templify.models import Transaction

transactions = Blueprint('transactions', __name__)


@transactions.route('/transactions', methods=['GET', 'POST'])
def transactions_page():
    if request.method == 'POST':
        data = request.data.decode('utf-8')
        transaction_list = []
        if data == 'seva':
            transaction_list = Transaction.get_sevas()
        elif data == 'donation':
            transaction_list = Transaction.get_donations()
        print(transaction_list)
        return jsonify(transaction_list)
    return render_template('transactions.html')
