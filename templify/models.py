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


class Donation:
    @staticmethod
    def save_donation(info):
        db['donation'].insert_one(info)
        return db['donation'].find_one(info)['_id']

    @staticmethod
    def get_donation(id):
        donation_query = db['donation'].find_one({'_id': ObjectId(id)})
        return donation_query


class Transaction:
    @staticmethod
    def get_sevas():
        seva_query = db['seva'].find({})
        seva_list = [seva for seva in seva_query]
        for i, seva in enumerate(seva_list):
            seva_list[i]['_id'] = str(seva['_id'])
            for j, pooja in enumerate(seva['poojas']):
                seva_list[i]['poojas'][j]['pooja_id'] = str(pooja['pooja_id'])
        return seva_list

    @staticmethod
    def get_donations():
        donation_query = db['donation'].find({})
        donation_list = [donation for donation in donation_query]
        for i, donation in enumerate(donation_list):
            donation_list[i]['_id'] = str(donation['_id'])
        return donation_list


