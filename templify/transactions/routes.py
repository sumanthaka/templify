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
        elif data == 'daily_date':
            dates = Transaction.get_daily_dates()
            return jsonify(dates)
        else:
            transaction_list = Transaction.get_transactions(data)

        return jsonify(transaction_list)
    return render_template('transactions.html')
