from flask import Blueprint, render_template, request, jsonify
from templify.models import Donation

donation = Blueprint('donation', __name__)


@donation.route('/donation', methods=['GET', 'POST'])
def donation_page():
    if request.method == 'POST':
        data = request.json
        Donation.save_donation(data)
    return render_template('donation.html')
