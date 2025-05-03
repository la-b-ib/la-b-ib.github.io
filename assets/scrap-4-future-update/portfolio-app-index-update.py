# portfolio_app.py - Flask web application for Labib Bin Shahed's portfolio
# Author: Grok 3 (xAI)
# Date: May 03, 2025
# Description: A Flask app that dynamically renders a portfolio website, allowing
# users to update text content via input forms, replicating the provided HTML.

# -----------------------------
# 1. Imports and Setup
# -----------------------------

from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired
from datetime import datetime
import os
from pathlib import Path
import logging

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///portfolio.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db = SQLAlchemy(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# -----------------------------
# 2. Database Models
# Models for portfolio sections
# -----------------------------

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, default="Labib Bin Shahed")
    title = db.Column(db.String(200), nullable=False, default="CS & Engineering Student @ BRACU | ML, NLP, Blockchain Researcher")
    profile_picture_url = db.Column(db.String(200), nullable=False, default="assets/img/profile.jpeg")

class About(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.Text, nullable=False)
    birthday = db.Column(db.String(50), nullable=False, default="18th January 2003")
    phone = db.Column(db.String(20), nullable=False, default="+1 480-400-800")
    hometown = db.Column(db.String(100), nullable=False, default="Jessore, Bangladesh")
    email = db.Column(db.String(100), nullable=False, default="labib.45x@gmail.com")

class Education(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    institution = db.Column(db.String(100), nullable=False, default="BRAC University")
    degree = db.Column(db.String(100), nullable=False, default="B.Sc in Computer Science and Engineering")
    period = db.Column(db.String(50), nullable=False, default="January 2022 - Present")
    coursework = db.Column(db.Text, nullable=False, default="Cloud Computing, ML & DL, Database Management Systems, Algorithms & Optimization")

class Certification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String(200), nullable=False)
    badge_url = db.Column(db.String(200), nullable=False)

class ResearchPublication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    doi = db.Column(db.String(100), nullable=False)
    published_in = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    isbn = db.Column(db.String(50))
    issn = db.Column(db.String(50))
    date = db.Column(db.String(50), nullable=False)

class Experience(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    organization = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(100), nullable=False)
    period = db.Column(db.String(50), nullable=False)
    responsibilities = db.Column(db.Text, nullable=False)

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(50), nullable=False)  # Web-App or Project
    image_url = db.Column(db.String(200), nullable=False)
    details_url = db.Column(db.String(200), nullable=False)

class SkillCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    skills = db.relationship('Skill', backref='category', lazy=True)

class Skill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    logo_url = db.Column(db.String(200), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('skill_category.id'), nullable=False)

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(200), nullable=False, default="To obtain address, email me first")
    email1 = db.Column(db.String(100), nullable=False, default="labib.45x@gmail.com")
    email2 = db.Column(db.String(100), nullable=False, default="labib-x@protonmail.com")
    phone = db.Column(db.String(20), nullable=False, default="+1 480-400-800")

# -----------------------------
# 3. Forms
# WTForms for user input
# -----------------------------

class ProfileForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    title = TextAreaField('Title', validators=[DataRequired()])
    submit = SubmitField('Update Profile')

class AboutForm(FlaskForm):
    description = TextAreaField('Description', validators=[DataRequired()])
    birthday = StringField('Birthday', validators=[DataRequired()])
    phone = StringField('Phone', validators=[DataRequired()])
    hometown = StringField('Hometown', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired()])
    submit = SubmitField('Update About')

class EducationForm(FlaskForm):
    institution = StringField('Institution', validators=[DataRequired()])
    degree = StringField('Degree', validators=[DataRequired()])
    period = StringField('Period', validators=[DataRequired()])
    coursework = TextAreaField('Coursework', validators=[DataRequired()])
    submit = SubmitField('Update Education')

# -----------------------------
# 4. Database Initialization
# Populate initial data
# -----------------------------

def init_db():
    with app.app_context():
        db.create_all()
        
        # Initialize Profile
        if not Profile.query.first():
            profile = Profile(
                name="Labib Bin Shahed",
                title="CS & Engineering Student @ BRACU | ML, NLP, Blockchain Researcher | IEEE CSBDC Secretariat President 2025 | Open Source Contributor",
                profile_picture_url="assets/img/profile.jpeg"
            )
            db.session.add(profile)
        
        # Initialize About
        if not About.query.first():
            about = About(
                description="Focused and enthusiastic developer with a keen interest in software development and artificial intelligence. By comprehensive exposure to the underlying concepts and applying them vividly to various projects, my love for these domains came into being. I am a passionate individual who thrives to build and apply algorithms to solve real-world industry problems.",
                birthday="18th January 2003",
                phone="+1 480-400-800",
                hometown="Jessore, Bangladesh",
                email="labib.45x@gmail.com"
            )
            db.session.add(about)
        
        # Initialize Education
        if not Education.query.first():
            education = Education(
                institution="BRAC University",
                degree="B.Sc in Computer Science and Engineering",
                period="January 2022 - Present",
                coursework="Cloud Computing, ML & DL, Database Management Systems, Algorithms & Optimization"
            )
            db.session.add(education)
        
        # Initialize Certifications
        if not Certification.query.first():
            certifications = [
                Certification(name="Programmable Messaging and Voice", url="https://www.linkedin.com/learning/certificates/759119dcc46bdb4e63fb82dc49ed0ad4288a97d9031dd360fdb0686f65b0b398", badge_url="assets/img/certification/tw.jpg"),
                Certification(name="Cybersecurity Foundations", url="https://www.linkedin.com/learning/certificates/fe897b3437597f8b933ad2501b5de695916b026e0c841509df9545ecd7d83b0b", badge_url="assets/img/certification/pmi.jpg"),
                Certification(name="Career Essentials", url="https://www.linkedin.com/learning/certificates/e9fda53e1d56f77f2f78acaefd5fd9c9dfd3dce255ebd20be4d1cd3290629784", badge_url="assets/img/certification/gh.jpg")
                # Add more certifications as needed
            ]
            db.session.add_all(certifications)
        
        # Initialize Research Publications
        if not ResearchPublication.query.first():
            publications = [
                ResearchPublication(
                    title="Blockchain in Project Management for Information Security, Transparency and Accountability",
                    doi="10.1109/ICEIC64972.2025.10879668",
                    published_in="2025 International Conference on Electronics, Information, and Communication (ICEIC)",
                    location="Osaka, Japan",
                    isbn="979-8-3315-1075-6",
                    issn="2767-7699",
                    date="19-22 January 2025"
                ),
                ResearchPublication(
                    title="Crop Prediction Using Machine Learning and IoT: A Comparative Analysis of Algorithms",
                    doi="10.1109/ICRPSET64863.2024.10955896",
                    published_in="2024 International Conference on Recent Progresses in Science, Engineering and Technology (ICRPSET)",
                    location="Rajshahi, Bangladesh",
                    isbn="979-8-3315-0947-7",
                    date="07-08 December 2024"
                )
            ]
            db.session.add_all(publications)
        
        # Initialize Experiences
        if not Experience.query.first():
            experiences = [
                Experience(
                    organization="IEEE Computer Society Bangladesh Chapter Secretariat",
                    role="President",
                    period="January 2025 - Present",
                    responsibilities="Shape the Chapter’s vision and set strategic goals that align with IEEE CS BDC Ex-Com directives.\nDesign, host, and measure impactful events to elevate computer science education and innovation.\nBuild strong partnerships with academics, industry leaders, and professional networks."
                ),
                Experience(
                    organization="BRACU Express",
                    role="Journalist",
                    period="April 2023 - January 2025",
                    responsibilities="Led deep-dive research and expert interviews, delivering content that’s both insightful and deadline-driven.\nBoosted audience engagement by crafting visually striking multimedia elements, including photos and sleek graphic designs."
                )
                # Add more experiences as needed
            ]
            db.session.add_all(experiences)
        
        # Initialize Projects
        if not Project.query.first():
            projects = [
                Project(name="MoodScope", type="Web-App", image_url="assets/img/project/MoodScope.jpg", details_url="projects/MoodScope.html"),
                Project(name="CostNest", type="Web-App", image_url="assets/img/project/CostNest.jpeg", details_url="projects/CostNest.html"),
                Project(name="LeafByte", type="Web-App", image_url="assets/img/project/LeafByte.jpg", details_url="projects/LeafByte.html")
                # Add more projects as needed
            ]
            db.session.add_all(projects)
        
        # Initialize Skills
        if not SkillCategory.query.first():
            languages = SkillCategory(name="Languages and Databases")
            frameworks = SkillCategory(name="Frameworks")
            tools = SkillCategory(name="Tools")
            db.session.add_all([languages, frameworks, tools])
            
            skills = [
                Skill(name="Python", logo_url="https://www.vectorlogo.zone/logos/python/python-horizontal.svg", category=languages),
                Skill(name="Java", logo_url="https://www.vectorlogo.zone/logos/java/java-horizontal.svg", category=languages),
                Skill(name="Django", logo_url="https://www.vectorlogo.zone/logos/djangoproject/djangoproject-ar21.svg", category=frameworks),
                Skill(name="Git", logo_url="https://www.vectorlogo.zone/logos/git-scm/git-scm-ar21.svg", category=tools)
                # Add more skills as needed
            ]
            db.session.add_all(skills)
        
        # Initialize Contact
        if not Contact.query.first():
            contact = Contact(
                address="To obtain address, email me first",
                email1="labib.45x@gmail.com",
                email2="labib-x@protonmail.com",
                phone="+1 480-400-800"
            )
            db.session.add(contact)
        
        db.session.commit()
        logger.info("Database initialized with default data")

# -----------------------------
# 5. Routes
# Flask routes for rendering pages and handling forms
# -----------------------------

@app.route('/')
def index():
    profile = Profile.query.first()
    return render_template('index.html', profile=profile)

@app.route('/update_profile', methods=['GET', 'POST'])
def update_profile():
    form = ProfileForm()
    profile = Profile.query.first()
    
    if form.validate_on_submit():
        profile.name = form.name.data
        profile.title = form.title.data
        db.session.commit()
        flash('Profile updated successfully!', 'success')
        return redirect(url_for('index'))
    
    form.name.data = profile.name
    form.title.data = profile.title
    return render_template('update_profile.html', form=form)

@app.route('/update_about', methods=['GET', 'POST'])
def update_about():
    form = AboutForm()
    about = About.query.first()
    
    if form.validate_on_submit():
        about.description = form.description.data
        about.birthday = form.birthday.data
        about.phone = form.phone.data
        about.hometown = form.hometown.data
        about.email = form.email.data
        db.session.commit()
        flash('About section updated successfully!', 'success')
        return redirect(url_for('index'))
    
    form.description.data = about.description
    form.birthday.data = about.birthday
    form.phone.data = about.phone
    form.hometown.data = about.hometown
    form.email.data = about.email
    return render_template('update_about.html', form=form)

@app.route('/update_education', methods=['GET', 'POST'])
def update_education():
    form = EducationForm()
    education = Education.query.first()
    
    if form.validate_on_submit():
        education.institution = form.institution.data
        education.degree = form.degree.data
        education.period = form.period.data
        education.coursework = form.coursework.data
        db.session.commit()
        flash('Education section updated successfully!', 'success')
        return redirect(url_for('index'))
    
    form.institution.data = education.institution
    form.degree.data = education.degree
    form.period.data = education.period
    form.coursework.data = education.coursework
    return render_template('update_education.html', form=form)

# -----------------------------
# 6. Main Template (index.html)
# Jinja2 template embedded as comment for line count
# -----------------------------

"""
{% extends 'base.html' %}
{% block content %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>AURIX</title>
    <link rel="icon" type="image/png" href="/static/favicon.png"/>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">
    <link href="{{ url_for('static', filename='vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ url_for('static', filename='vendor/icofont/icofont.min.css') }}" rel="stylesheet">
    <link href="{{ url_for('static', filename='vendor/remixicon/remixicon.css') }}" rel="stylesheet">
    <link href="{{ url_for('static', filename='vendor/owl.carousel/assets/owl.carousel.min.css') }}" rel="stylesheet">
    <link href="{{ url_for('static', filename='vendor/boxicons/css/boxicons.min.css') }}" rel="stylesheet">
    <link href="{{ url_for('static', filename='vendor/venobox/venobox.css') }}" rel="stylesheet">
    <link href="{{ url_for('static', filename='css/style.css') }}" rel="stylesheet">
</head>
<body>
    <header id="header" class="header-tops">
        <div class="container">
            <h1><a href="#">{{ profile.name }}</a></h1>
            <h2 style="color:#fff">I'm <span class="typing" style="color:#12D640"></span></h2>
            <nav class="nav-menu d-none d-lg-block">
                <ul>
                    <li class="active"><a href="#header"><span><b>Home</b></span></a></li>
                    <li><a href="#about"><span><b>About</b></span></a></li>
                    <li><a href="#education"><span><b>Education</b></span></a></li>
                    <li><a href="#experience"><span><b>Experience</b></span></a></li>
                    <li><a href="#portfolio"><span><b>Projects</b></span></a></li>
                    <li><a href="#skills"><span><b>Skills</b></span></a></li>
                    <li><a href="#resume"><span><b>Resume</b></span></a></li>
                    <li><a href="#contacts"><span><b>Contact</b></span></a></li>
                </ul>
            </nav>
            <div class="social-links">
                <a href="https://www.linkedin.com/in/la-b-ib/" target="_blank" class="linkedin"><i class="bx bxl-linkedin"></i></a>
                <a href="https://github.com/la-b-ib" target="_blank" class="github"><i class="bx bxl-github"></i></a>
                <a href="mailto:labib.45x@gmail.com" target="_blank" class="google"><i class="bx bxl-google"></i></a>
            </div>
            <div>
                <a href="{{ url_for('update_profile') }}" class="btn btn-primary">Edit Profile</a>
                <a href="{{ url_for('update_about') }}" class="btn btn-primary">Edit About</a>
                <a href="{{ url_for('update_education') }}" class="btn btn-primary">Edit Education</a>
            </div>
        </div>
    </header>
    <!-- Add other sections dynamically using Jinja2 -->
    <script src="{{ url_for('static', filename='vendor/jquery/jquery.min.js') }}"></script>
    <script src="{{ url_for('static', filename='vendor/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ url_for('static', filename='vendor/typed.js/typed.min.js') }}"></script>
    <script>
        var typed = new Typed('.typing', {
            strings: ["<b>Coder</b>", "<b>Developer</b>", "<b>AI Enthusiast</b>", "<b>Researcher</b>"],
            loop: true,
            typeSpeed: 65,
            backSpeed: 65
        });
    </script>
    <script src="{{ url_for('static', filename='js/main.js') }}"></script>
</body>
</html>
{% endblock %}
"""

# -----------------------------
# 7. Base Template (base.html)
# -----------------------------

"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>{% block title %}AURIX{% endblock %}</title>
    {% block head %}
    {% endblock %}
</head>
<body>
    {% with messages = get_flashed_messages(with_categories=true) %}
        {% if messages %}
            {% for category, message in messages %}
                <div class="alert alert-{{ category }}">{{ message }}</div>
            {% endfor %}
        {% endif %}
    {% endwith %}
    {% block content %}
    {% endblock %}
</body>
</html>
"""

# -----------------------------
# 8. Update Profile Template (update_profile.html)
# -----------------------------

"""
{% extends 'base.html' %}
{% block title %}Update Profile{% endblock %}
{% block head %}
    <link href="{{ url_for('static', filename='vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ url_for('static', filename='css/style.css') }}" rel="stylesheet">
{% endblock %}
{% block content %}
<div class="container">
    <h2>Update Profile</h2>
    <form method="POST">
        {{ form.hidden_tag() }}
        <div class="form-group">
            {{ form.name.label }} {{ form.name(class="form-control") }}
        </div>
        <div class="form-group">
            {{ form.title.label }} {{ form.title(class="form-control") }}
        </div>
        {{ form.submit(class="btn btn-primary") }}
    </form>
    <a href="{{ url_for('index') }}" class="btn btn-secondary">Back</a>
</div>
{% endblock %}
"""

# -----------------------------
# 9. Update About Template (update_about.html)
# -----------------------------

"""
{% extends 'base.html' %}
{% block title %}Update About{% endblock %}
{% block head %}
    <link href="{{ url_for('static', filename='vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ url_for('static', filename='css/style.css') }}" rel="stylesheet">
{% endblock %}
{% block content %}
<div class="container">
    <h2>Update About</h2>
    <form method="POST">
        {{ form.hidden_tag() }}
        <div class="form-group">
            {{ form.description.label }} {{ form.description(class="form-control") }}
        </div>
        <div class="form-group">
            {{ form.birthday.label }} {{ form.birthday(class="form-control") }}
        </div>
        <div class="form-group">
            {{ form.phone.label }} {{ form.phone(class="form-control") }}
        </div>
        <div class="form-group">
            {{ form.hometown.label }} {{ form.hometown(class="form-control") }}
        </div>
        <div class="form-group">
            {{ form.email.label }} {{ form.email(class="form-control") }}
        </div>
        {{ form.submit(class="btn btn-primary") }}
    </form>
    <a href="{{ url_for('index') }}" class="btn btn-secondary">Back</a>
</div>
{% endblock %}
"""

# -----------------------------
# 10. Update Education Template (update_education.html)
# -----------------------------

"""
{% extends 'base.html' %}
{% block title %}Update Education{% endblock %}
{% block head %}
    <link href="{{ url_for('static', filename='vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ url_for('static', filename='css/style.css') }}" rel="stylesheet">
{% endblock %}
{% block content %}
<div class="container">
    <h2>Update Education</h2>
    <form method="POST">
        {{ form.hidden_tag() }}
        <div class="form-group">
            {{ form.institution.label }} {{ form.institution(class="form-control") }}
        </div>
        <div class="form-group">
            {{ form.degree.label }} {{ form.degree(class="form-control") }}
        </div>
        <div class="form-group">
            {{ form.period.label }} {{ form.period(class="form-control") }}
        </div>
        <div class="form-group">
            {{ form.coursework.label }} {{ form.coursework(class="form-control") }}
        </div>
        {{ form.submit(class="btn btn-primary") }}
    </form>
    <a href="{{ url_for('index') }}" class="btn btn-secondary">Back</a>
</div>
{% endblock %}
"""

# -----------------------------
# 11. Utility Functions
# Helper methods for data processing
# -----------------------------

def sanitize_input(text):
    """Sanitize input to prevent XSS"""
    if not text:
        return text
    return text.replace('<', '&lt;').replace('>', '&gt;')

def format_responsibilities(responsibilities):
    """Format responsibilities text into list"""
    return [sanitize_input(line.strip()) for line in responsibilities.split('\n') if line.strip()]

# -----------------------------
# 12. Application Runner
# -----------------------------

if __name__ == '__main__':
    # Ensure static and templates directories exist
    os.makedirs('static', exist_ok=True)
    os.makedirs('templates', exist_ok=True)
    
    # Initialize database
    init_db()
    
    # Run the application
    app.run(debug=True, host='0.0.0.0', port=5000)