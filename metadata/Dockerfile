FROM python:3.6

COPY . .

RUN apt-get install -y gcc
RUN pip install -r requirements.txt

ENV FLASK_APP server.py

EXPOSE 5000

CMD flask run --host=0.0.0.0
