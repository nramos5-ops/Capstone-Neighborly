from flask import Flask, render_template, request, send_from_directory
import json
import mariadb

app = Flask(__name__, static_url_path='')

# DB CONFIG
db_config = {
    'host': 'db.glacier.cx',
    'port': 3306,
    'user': 'neighborly',
    'password': 'rZNNBHrbdWYaUEv',
    'database': 'neighborly'
}


# Load tool listing (single)
@app.route('/load-listing/<db_id>')
def load_listing_single(db_id):
    con = mariadb.connect(**db_config)
    cur = con.cursor()
    cur.execute("SELECT listings.*, users.username, users.location, users.profile_picture FROM listings INNER JOIN users WHERE listings.id = ? AND users.id = listings.owner_id;", (db_id,))
    records = cur.fetchall()
    row_head = [x[0] for x in cur.description]
    json_data = []
    for result in records:
        json_data.append(dict(zip(row_head, result)))
    return json.dumps(json_data)


# Load tool listing (multiple)
@app.route('/load-listing/<id_start>/<id_end>')
def load_listing_multiple(id_start, id_end):
    con = mariadb.connect(**db_config)
    cur = con.cursor()
    cur.execute("SELECT listings.*, users.username, (SELECT FLOOR(AVG(rating)) FROM ratings WHERE receiving_user = users.id) As 'rating' FROM listings INNER JOIN users WHERE listings.id >= ? AND listings.id <= ? AND users.id = listings.owner_id;", (id_start, id_end))
    records = cur.fetchall()
    row_head = [x[0] for x in cur.description]
    json_data = []
    for result in records:
        json_data.append(dict(zip(row_head, result)))
    return json.dumps(json_data)


# Get tool count
@app.route('/load-listing/count')
def load_listing_count():
    con = mariadb.connect(**db_config)
    cur = con.cursor()
    cur.execute("SELECT COUNT(*) FROM listings")
    records = cur.fetchall()
    json_data = []
    for result in records:
        return str(result[0])


# Main pages
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/register')
def register():
    return render_template('register.html')


@app.route('/rental')
def rental():
    return render_template('rental.html')


# css
@app.route('/css/<path:pn>')
def css_static(pn):
    return send_from_directory('templates/css/', pn)


# javascript
@app.route('/js/<path:pn>')
def js_static(pn):
    return send_from_directory('templates/js/', pn)


# images
@app.route('/images/<path:pn>')
def images_static(pn):
    return send_from_directory('templates/images/', pn)


if __name__ == '__main__':
    app.run()
