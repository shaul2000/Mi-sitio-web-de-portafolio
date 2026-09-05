from flask import Flask, jsonify, render_template, request

app = Flask(__name__)


@app.get("/")
def home():
    return render_template("index.html")


@app.post("/contact")
def contact():
    payload = request.get_json(silent=True) or {}
    name = str(payload.get("name", "")).strip()
    email = str(payload.get("email", "")).strip()
    message = str(payload.get("message", "")).strip()

    if not name or not email or not message:
        return jsonify({"ok": False, "message": "Please fill in every field."}), 400

    return jsonify({
        "ok": True,
        "message": f"Thanks, {name.split()[0]}. Your message is ready to land in my inbox.",
    })


if __name__ == "__main__":
    app.run(debug=True)
