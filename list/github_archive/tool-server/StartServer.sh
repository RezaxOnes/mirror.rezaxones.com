#!/bin/bash 

sudo systemctl daemon-reload
sudo systemctl start nginx
sudo systemctl start cloudflared
sudo nginx -t
sudo systemctl restart nginx
