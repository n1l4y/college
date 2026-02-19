# News Aggregator

## Setup:


##### Clone the repository
```bash
git clone https://github.com/n1l4y/newsaggregator.git
```
##### Navigate to the directory
```bash
cd newsaggregator
```
##### Open terminal and install virtual environment
```bash
python3 -m venv venv
```
##### Activate virtual environment
```bash
# Windows: .\venv\Scripts\activate
# MacOS/Linux: source venv/bin/activate
```
##### Install requirements
```bash
pip install -r requirements.txt
```
##### Start Django application
```bash
cd newsaggregator
python manage.py migrate
python manage.py runserver
```
