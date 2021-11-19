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


def db_query_format(db_cursor):
    # Function to take DB query and get results, function eliminates duplicate code when possible
    records = db_cursor.fetchall()
    row_head = [x[0] for x in db_cursor.description]
    json_data = []
    for result in records:
        json_data.append(dict(zip(row_head, result)))
    return json.dumps(json_data, indent=4, sort_keys=True, default=str)


def db_get_id_from_user(username):
    con = mariadb.connect(**db_config)
    cur = con.cursor()
    cur.execute("Select id FROM users WHERE username=?", (username,))
    json_data = db_query_format(cur)
    con.close()
    return json_data


@app.route('/load-listing/<db_id>')
def load_listing_single(db_id):
    # Function to get a single tool listing and the details for it
    con = mariadb.connect(**db_config)
    cur = con.cursor()
    cur.execute(
        "SELECT listings.*, users.username, users.location, users.profile_picture FROM listings "
        "INNER JOIN users WHERE listings.id = ? AND users.id = listings.owner_id;",
        (db_id,))
    json_data = db_query_format(cur)
    con.close()
    return json_data


@app.route('/load-listing/<id_start>/<id_end>')
def load_listing_multiple(id_start, id_end):
    # Load tool listing (multiple)
    con = mariadb.connect(**db_config)
    cur = con.cursor()
    cur.execute(
        "SELECT listings.*, users.username, (SELECT FLOOR(AVG(rating)) FROM ratings "
        "WHERE receiving_user = users.id) As 'rating' FROM listings INNER JOIN users "
        "WHERE listings.id >= ? AND listings.id <= ? AND users.id = listings.owner_id;",
        (id_start, id_end))
    json_data = db_query_format(cur)
    con.close()
    return json_data


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


# Main page
@app.route('/')
def index():
    return render_template('index.html')


# Login page
@app.route('/login')
def login():
    return render_template('login.html')


# Profile page
@app.route('/profile/<profile_id>')
def profile(profile_id):
    return render_template("profile.html")


# profile api request
@app.route('/api/profile/<username>', methods=['GET', 'POST'])
def api_profile(username):
    con = mariadb.connect(**db_config)
    cur = con.cursor()
    cur.execute("SELECT username, profile_picture As 'avatar', location, description FROM users WHERE username=?", (username,))
    json_data = db_query_format(cur)
    con.close()
    return json_data


# profile api to get reviews
@app.route('/api/profile/reviews/<username>')
def api_profile_reviews(username):
    con = mariadb.connect(**db_config)
    cur = con.cursor()
    profile_id = db_get_id_from_user(username).split(":")[1].split("}")[0]
    print(profile_id)
    cur.execute("Select ratings.giving_user, ratings.rating, ratings.message, ratings.review_date, users.profile_picture FROM ratings INNER JOIN users WHERE ratings.receiving_user=? AND users.id = ratings.giving_user", (profile_id,))
    json_data = db_query_format(cur)
    con.close()
    return json_data


# login auth
@app.route('/login/auth', methods=['GET', 'POST'])
def login_auth():
    o_user = request.form.get('username')
    o_pass = request.form.get('password')
    print('Received login request: ' + o_user + ' : ' + o_pass)
    con = mariadb.connect(**db_config)
    cur = con.cursor()
    cur.execute("SELECT COUNT(*) FROM users WHERE username = ? AND password = ?", (o_user, o_pass,))
    records = cur.fetchall()
    con.close()
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
    
@app.route('/aboutus')
def aboutus():
    return render_template('AboutUs.html')

# register account
@app.route('/register/auth', methods=['GET', 'POST'])
def register_auth():
    # get form info
    o_user = request.form.get('username')
    o_pass = request.form.get('password')
    o_email = request.form.get('email')
    con = mariadb.connect(**db_config)
    cur = con.cursor()
    cur.execute("SELECT COUNT(*) FROM users WHERE username=?", (o_user,))
    records = cur.fetchall()
    for result in records:
        print("searching for " + o_user)
        print("result: " + str(result[0]))
        if result[0] == 0:
            print(o_user + " not found")
            try:
                cur.execute("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", (o_user, o_pass, o_email))
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
    return tool_id


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
