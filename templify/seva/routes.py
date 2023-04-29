from flask import Blueprint, render_template, request, redirect, url_for, jsonify
from templify.models import Seva
seva = Blueprint('seva', __name__)


@seva.route('/seva', methods=['GET', 'POST'])
def seva_page():
    if request.method == 'POST':
        data = request.json
        Seva.save_seva(data)
        return redirect(url_for('seva.seva_page'))
    pooja_list = Seva.get_poojas()
    pooja_list.sort(key=lambda x: x['Pooja'].lower())
    return render_template('seva.html', poojas=pooja_list)


@seva.route('/seva/<pooja_id>')
def get_gods(pooja_id):
    gods = Seva.get_gods(pooja_id)
    return jsonify(gods)
