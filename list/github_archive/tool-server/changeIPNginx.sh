#!/bin/bash

set -Eeuo pipefail
Green="\033[1;32m"
Red="\033[1;31m"
RESET="\033[0m"
trap 'echo -e "${Red} Khong the thuc hien thao tac do loi khong xac dinh, huy thuc thi script.${RESET}" ' ERR

echo "Vui Long Nhap Duong Dan Toi File Config Chua IP (Kiem tra o /etc/nginx/...)"
read -p ">> " web_conf
echo "Vui Long Nhap IP Moi (Kiem tra o DashBoard AWS)"
read -p ">> " newIP
echo "Vui Long Nhap KeyEdit (Kiem tra o comment trong /etc/nginx/...)"
read -p ">> " keyEdit

if [[ "$web_conf" == "help" || "$newIP" == "help" || "$keyEdit" == "help" ]]; then
echo "server_name 123.45.67.89; # KeyEdit=YourKeyHere (Ex: KeyEdit=686868)"
exit 0
fi

# Thuc Thi
sed -i "/#.*KeyEdit=$keyEdit/ s/^\(\s*server_name\s*\).*;/\1$newIP;/" "$web_conf"
echo -e "${Green}[-] Da Thay Doi IP Tai KeyEdit=$keyEdit Thanh Cong!${RESET}"
sudo nginx -t 
sudo systemctl reload nginx
echo -e  "${Green}[-] Neu Khong Bao Loi La Thanh Cong![-]${RESET}"
