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
    cur.execute(
        "SELECT listings.*, users.username, users.location, users.profile_picture FROM listings INNER JOIN users WHERE listings.id = ? AND users.id = listings.owner_id;",
        (db_id,))
    records = cur.fetchall()
    row_head = [x[0] for x in cur.description]
    json_data = []
    con.close()
    for result in records:
        json_data.append(dict(zip(row_head, result)))
    return json.dumps(json_data)


# Load tool listing (multiple)
@app.route('/load-listing/<id_start>/<id_end>')
def load_listing_multiple(id_start, id_end):
    con = mariadb.connect(**db_config)
    cur = con.cursor()
    cur.execute(
        "SELECT listings.*, users.username, (SELECT FLOOR(AVG(rating)) FROM ratings WHERE receiving_user = users.id) As 'rating' FROM listings INNER JOIN users WHERE listings.id >= ? AND listings.id <= ? AND users.id = listings.owner_id;",
        (id_start, id_end))
    records = cur.fetchall()
    row_head = [x[0] for x in cur.description]
    json_data = []
    con.close()
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
    con.close()
    for result in records:
        return str(result[0])


# Main pages
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login')
def login():
    return render_template('login.html')


# login auth
@app.route('/login/auth', methods=['GET', 'POST'])
def login_auth():
    oUser = request.form.get('username')
    oPass = request.form.get('password')
    print('Received login request: ' + oUser + ' : ' + oPass)
    con = mariadb.connect(**db_config)
    cur = con.cursor()
    cur.execute("SELECT COUNT(*) FROM users WHERE username = ? AND password = ?", (oUser, oPass,))
    records = cur.fetchall()
    con.close()
    result = "";
    for result in records:
        if result[0] == 1:
            return 'true'
        else:
            return 'false'


@app.route('/logout')
def logout():
    return render_template('logout.html')

@app.route('/register')
def register():
    return render_template('register.html')


# register account
@app.route('/register/auth', methods=['GET', 'POST'])
def register_auth():
    #get form info
    oUser = request.form.get('username')
    oPass = request.form.get('password')
    oEmail = request.form.get('email')
    con = mariadb.connect(**db_config)
    cur = con.cursor()
    cur.execute("SELECT COUNT(*) FROM users WHERE username=?", (oUser,))
    records = cur.fetchall()
    for result in records:
        print("searching for " + oUser)
        print("result: " + str(result[0]))
        if result[0] == 0:
            print(oUser + " not found")
            try:
                cur.execute("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", (oUser, oPass, oEmail))
                con.commit()
                con.close()
            except mariadb.Error as e:
                print(f"Error: {e}")
            return 'true'
        else:
            return 'false'



@app.route('/rental')
def rental():
    return render_template('rental.html')


# tool listing specific page
@app.route('/rental/<tool_id>')
def rental_id(tool_id):
    return tool_id;


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
