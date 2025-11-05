from cs50 import SQL
from flask import Flask, render_template, request, send_from_directory
import os

app = Flask(__name__)

db = SQL("sqlite:///websites.db")

db.execute("""
    CREATE TABLE IF NOT EXISTS websites(
           id INTEGER PRIMARY KEY,
           website_type TEXT NOT NULL,
           colour_theme TEXT NOT NULL,
           sections TEXT NOT NULL
        )
""")


def generate_html(website_type, colour_theme, sections):
    html = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>{website_type} Website</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <style>
            body {{
                font-family: Arial, sans-serif;
                {"background-color: black; color: white;" if colour_theme == "dark" else "background-color: white; color: black;"}
            }}
        </style>
    </head>
    <body class="container">
        <h1 class="text-center my-4">{website_type} Website</h1>
    """

    for section in sections:
        if section == "About":
            html += """
            <section class="mb-4">
            <h2>About</h2>
            <p>About section content goes here.</p>
            </section>
            """
        elif section == "Gallery":
            html += """
            <section class="mb-4">
            <h2>Gallery</h2>
            <p>Gallery content goes here.</p>
            </section>
            """
        elif section == "Contact":
            html += """
            <section class="mb-4">
            <h2>Contact</h2>
            <p>Contact info goes here.</p>
            </section>
            """

    html += """
    </body>
    </html>
    """

    return html


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        website_type = request.form.get("website_type")
        colour_theme = request.form.get("colour_theme")
        sections = request.form.getlist("sections")

        db.execute("INSERT INTO websites (website_type, colour_theme, sections) VALUES (?, ?, ?)",
                   website_type, colour_theme, ",".join(sections))

        html_content = generate_html(website_type, colour_theme, sections)

        generated_html_path = os.path.join('templates', 'generated.html')
        with open(generated_html_path, 'w') as file:
            file.write(html_content)

        return render_template('generated.html')

    return render_template("index.html")


@app.route("/history")
def history():
    websites = db.execute("SELECT * FROM websites")
    return render_template("history.html", websites=websites)


@app.route('/generated')
def generated():
    # Automatically generate html website
    return send_from_directory(os.getcwd(), 'templates/generated.html')


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
