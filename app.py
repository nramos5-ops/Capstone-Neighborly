from flask import Flask, render_template, request, send_from_directory

app = Flask(__name__, static_url_path='')


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
