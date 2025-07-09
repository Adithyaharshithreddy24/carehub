
💙 CareHub: Integrated and Personalized Holistic Healthcare for All

🩺 Project Overview

In today’s age of digital overload, consistent and accessible self-care has become a challenge. Many individuals — particularly women — lack a single, reliable platform offering culturally relevant, personalized support across physical health, mental wellness, and feminine care.

> ⚠️ Current digital solutions are either too generic or fragmented across multiple apps, failing to offer a holistic and seamless self-care experience.



CareHub solves this by providing a smart, all-in-one wellness platform designed to simplify, personalize, and democratize self-care — anytime, anywhere.


---

❗ Problem Statement

📌 The digital wellness space is confusing, inconsistent, and inaccessible.

📌 Users are forced to navigate multiple disconnected apps for their holistic needs.

📌 There's a lack of personalized and culturally relevant support across health domains.



---

✅ Proposed Solution: CareHub

CareHub is a comprehensive, AI-integrated wellness platform offering:

🤖 AI-Driven Diet Planning — Tailored to preferences, health conditions, and regions

💬 Emotional Wellness Chatbot — 24x7 mental wellness support

🏋️‍♀️ Guided Fitness Plans — Personalized to user goals and health conditions

🌸 Feminine Health Support via “HerCare” — Specialized care for women's wellness

🌐 All-in-One Seamless Platform — For integrated, holistic self-care



---

🌟 Features & Novelty

Feature	Description

AI-Powered Personalization	Health and lifestyle recommendations based on rich user data
Integrated Holistic Care	Combines physical, mental, and feminine wellness
Smart Diet Generator	Parses user input & health PDFs for meal planning
Mental Wellness Chatbot	Empathetic conversational support for mental health
Fitness Planner	Adaptive, personalized workout guides
Mobile-First Interface	Clean, intuitive design accessible on the go



---

🔁 CareHub Flowchart Summary

1. User Onboarding & Profile Setup
Collects data like dietary preferences, health conditions, and goals


2. Medical Document Upload
Accepts PDFs for deeper analysis


3. Modular Wellness Engine
Diet Planner, Fitness Guide, Chatbot, HerCare — work in sync


4. Personalized Wellness Plan
Unified plan output based on user data


5. Interactive Dashboard
Displays plans and health stats


6. Progress Monitoring
Tracks engagement, achievements, and improvements


7. Alerts & Reminders
Keeps users on schedule and motivated


8. Continuous Feedback Loop
Evolves plans based on user interaction and input




---

⚠️ Drawbacks & Showstoppers

Drawbacks

🧠 Dependent on accurate user input

🚑 Not a replacement for professional medical advice

🏃 Static fitness guides (initially)

🧠 Chatbots may fail with rare/complex conditions


Showstoppers

🔐 Data Privacy Compliance (HIPAA/GDPR) is crucial

❌ Risk of AI misguidance without proper disclaimers

🏥 Integration barriers with medical systems



---

🧰 Tech Stack

Frontend 

HTML,CSS

Backend

Node.js with Express.js

Python with Flask 

MongoDB


---

🚀 How to Run the Project

📦 Prerequisites

Node.js (LTS)

Python 3.8+

Git



---

🔧 Backend Setup (Python)

# Clone the repo
git clone <repository_url>
cd CareHub

# Create & activate virtual environment
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate.bat # Windows CMD

# Install dependencies
cd backend/
pip install -r requirements.txt

> If requirements.txt doesn't exist, create one:



pip freeze > requirements.txt

# Create .env and configure:
DATABASE_URL="your_database_connection_string"
API_KEY="your_ai_api_key"

# Run migrations (if using an ORM)
flask db upgrade      # Flask
# or
python manage.py makemigrations
python manage.py migrate    # Django

# Start backend
python app.py


---

🖥️ Frontend Setup (Node.js)

cd ../frontend/
npm install

# Create .env with:
REACT_APP_API_URL="http://127.0.0.1:5000/api"

# Start frontend
node server.js

> The app will be accessible at:
http://localhost:3000




---

👨‍💻 Team: CODEKSHATRIYA

Adithya Harshith Reddy

Dontha Navya Sri

Pakala Neha

Shaik Asharaf


