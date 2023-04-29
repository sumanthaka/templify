from flask import Blueprint, render_template, request, redirect, url_for, jsonify
from templify.models import Seva
seva = Blueprint('seva', __name__)


@seva.route('/seva', methods=['GET', 'POST'])
def seva_page():
    if request.method == 'POST':
        data = request.json
        trans_id = Seva.save_seva(data)
        return url_for('seva.bill', t_id=str(trans_id), _external=True)
    pooja_list = Seva.get_poojas()
    pooja_list.sort(key=lambda x: x['Pooja'].lower())
    return render_template('seva.html', poojas=pooja_list)


@seva.route('/seva/<pooja_id>')
def get_gods(pooja_id):
    gods = Seva.get_gods(pooja_id)
    return jsonify(gods)


@seva.route('/bill/<t_id>')
def bill(t_id):
    info = Seva.get_seva(t_id)
    # get unique gods
    gods = []
    for pooja in info['poojas']:
        pooja['price'] = Seva.get_price(pooja['pooja_id'])
        if pooja['god'] not in gods:
            gods.append(pooja['god'])
    info['gods'] = gods
    # get god wise poojas
    god_wise_poojas = {}
    for god in gods:
        poojas = []
        for pooja in info['poojas']:
            if pooja['god'] == god:
                poojas.append(pooja)
        god_wise_poojas[god] = poojas
    info['god_wise_poojas'] = god_wise_poojas
    print(info)
    return render_template('bill.html', info=info)
