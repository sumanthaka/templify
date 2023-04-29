from flask import Blueprint, render_template, request, jsonify, url_for
from templify.models import Donation

donation = Blueprint('donation', __name__)


@donation.route('/donation', methods=['GET', 'POST'])
def donation_page():
    if request.method == 'POST':
        data = request.json
        trans_id = Donation.save_donation(data)
        return url_for('donation.dono_bill', donation_id=str(trans_id), _external=True)
    return render_template('donation.html')


@donation.route('/dono_bill/<donation_id>')
def dono_bill(donation_id):
    info = Donation.get_donation(donation_id)
    return render_template('dono_bill.html', info=info)
