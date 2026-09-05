# PAUL AWAJIMIJAN Portfolio

A personal portfolio website powered by Flask and vanilla HTML, CSS, and JavaScript.

## Run locally

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
py app.py
```

Open http://127.0.0.1:5000 in your browser.

Replace the sample name, links, project details, and contact details in `templates/index.html` with your own information. The contact form currently validates and responds through Flask; connect the `/contact` route to an email service or database when you are ready to receive submissions.
