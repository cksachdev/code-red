#!/bin/bash

cd /home/pi/projects/code-red/backen_script/ && nohup /usr/bin/python3 apilistener_updated.py > python3.log 2>&1 &

/usr/bin/chromium-browser --allow-running-insecure-content 'https://diksha.gov.in/grafana/dashboard/db/nginx?refresh=30s&from=now-1h&to=now' &