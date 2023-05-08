from flask import Blueprint, render_template, request, redirect, url_for, jsonify
from templify.models import Kettunira

kettunira = Blueprint('kettunira', __name__)


@kettunira.route('/kettunira', methods=['GET', 'POST'])
def kettunira_page():
    if request.method == 'POST':
        data=request.json
        trans_id = Kettunira.save_kettunira(data)
        return url_for('kettunira.kettu_bill', kettu_id=str(trans_id), _external=True)
    return render_template('kettunira.html')


@kettunira.route('/kettu_bill/<kettu_id>')
def kettu_bill(kettu_id):
    info = Kettunira.get_kettunira(kettu_id)
    return render_template('kettu_bill.html', info=info)