#!/bin/bash

git checkout production
git pull origin production

sudo docker-compose up -d --build
