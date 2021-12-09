FROM python:3.8.2-alpine

#run on unbuffered mode (no chaching)
ENV PYTHONUNBUFFERD 1

COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

RUN mkdir /app
WORKDIR /app
COPY ./app /app

# create a user that can only run application (-D)
# prevent application running via the root account
RUN adduser -D user
USER user






