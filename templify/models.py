import datetime
from collections import Counter

from bson import ObjectId

from templify import db


class Seva:
    @staticmethod
    def get_poojas():
        pooja_query = db['pooja'].find({})
        pooja_list = [pooja for pooja in pooja_query]
        return pooja_list

    @staticmethod
    def get_gods(pooja_id):
        pooja_query = db['pooja'].find_one({'_id': ObjectId(pooja_id)}, {'_id': 0, 'gods': 1})
        return pooja_query

    @staticmethod
    def save_seva(info):
        for i, pooja in enumerate(info['poojas']):
            info['poojas'][i]['pooja_id'] = ObjectId(pooja['pooja_id'])
            if info['poojas'][i]['god'] == '':
                god = db['pooja'].find_one({'_id': info['poojas'][i]['pooja_id']}, {'_id': 0, 'gods': 1})
                if 'gods' in god.keys():
                    info['poojas'][i]['god'] = god['gods'][0]
        info['seva_date'] = datetime.datetime.strptime(info['seva_date'], '%Y-%m-%d')
        db['seva'].insert_one(info)
        return db['seva'].find_one(info)['_id']

    @staticmethod
    def get_seva(id):
        seva_query = db['seva'].find_one({'_id': ObjectId(id)})
        return seva_query

    @staticmethod
    def get_price(pooja_id):
        pooja_query = db['pooja'].find_one({'_id': ObjectId(pooja_id)}, {'_id': 0, 'Price': 1})
        return pooja_query['Price']

    @staticmethod
    def get_pooja_name(pooja_id):
        pooja_query = db['pooja'].find_one({'_id': ObjectId(pooja_id)}, {'_id': 0, 'Pooja': 1})
        return pooja_query['Pooja']


class Donation:
    @staticmethod
    def save_donation(info):
        info['donation_date'] = datetime.datetime.strptime(info['donation_date'], '%Y-%m-%d')
        db['donation'].insert_one(info)
        return db['donation'].find_one(info)['_id']

    @staticmethod
    def get_donation(id):
        donation_query = db['donation'].find_one({'_id': ObjectId(id)})
        return donation_query


class Transaction:
    @staticmethod
    def get_sevas():
        seva_query = db['seva'].find({}).sort('seva_date', -1)
        seva_list = [seva for seva in seva_query]
        for i, seva in enumerate(seva_list):
            seva_list[i]['_id'] = str(seva['_id'])
            seva_list[i]['seva_date'] = str(seva['seva_date'].date())
            for j, pooja in enumerate(seva['poojas']):
                seva_list[i]['poojas'][j]['pooja_id'] = str(pooja['pooja_id'])
        return seva_list

    @staticmethod
    def get_donations():
        donation_query = db['donation'].find({})
        donation_list = [donation for donation in donation_query]
        for i, donation in enumerate(donation_list):
            donation_list[i]['_id'] = str(donation['_id'])
            donation_list[i]['donation_date'] = str(donation['donation_date'].date())
        return donation_list

    @staticmethod
    def get_daily_dates():
        seva_date_query = db['seva'].distinct('seva_date')
        donation_date_query = db['donation'].distinct('donation_date')
        dates = []
        for date in seva_date_query:
            dates.append(str(date.date()))
        for date in donation_date_query:
            dates.append(str(date.date()))
        dates = list(set(dates))
        return dates

    @staticmethod
    def get_transactions(date):
        seva_query = db['seva'].find({'seva_date': datetime.datetime.strptime(date, '%Y-%m-%d')})
        pooja_id_list = []
        seva_list = []
        for seva in seva_query:
            for i, pooja in enumerate(seva['poojas']):
                seva['poojas'][i]['pooja_id'] = str(pooja['pooja_id'])
                pooja_id_list.append(pooja['pooja_id'])
        pooja_count = Counter(pooja_id_list)
        price_list = []
        for pooja_id in pooja_count.keys():
            price_list.append(Seva.get_price(pooja_id) * pooja_count[pooja_id])
            seva_list.append(Seva.get_pooja_name(pooja_id))
        donation_query = db['donation'].find({'donation_date': datetime.datetime.strptime(date, '%Y-%m-%d')})
        donations = {}
        for donation in donation_query:
            if donation['donation_type'] in donations.keys():
                donations[donation['donation_type']] += int(donation['amount'])
            else:
                donations[donation['donation_type']] = int(donation['amount'])
        data = {'seva': seva_list, 'donations': donations, 'price': price_list}
        return data


