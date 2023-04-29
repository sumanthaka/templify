from flask import Blueprint, send_from_directory, redirect, url_for

main = Blueprint('main', __name__)


@main.route('/<path:path>')
def catch_all(path):
    return send_from_directory('static', path)


@main.route('/')
def index():
    return redirect(url_for('seva.seva_page'))
