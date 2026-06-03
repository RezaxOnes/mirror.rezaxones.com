#!/bin/bash

set -Eeuo pipefail
Green="\033[1;32m"
Red="\033[1;31m"
RESET="\033[0m"
echo "Vui long nhap duong dan can copy => /var/www (trong thu muc chi chua sites hoac tuy cai dat)"
read -p ">> " link_cp

if [[ "$link_cp" == "q" || "$link_cp" == "quit" || "$link_cp" == "exit" ]]; then
echo "Good Bye!"
exit 0
fi

if [ ! -d "$link_cp" ]; then
    echo -e "${Red}[ERROR] Thu muc '$link_cp' khong ton tai!${RESET}"
    exit 1
fi

trap 'echo -e "${Red} Khong the thuc hien thao tac do loi khong xac dinh, huy thuc thi script.${RESET}" ' ERR

# Thuc Thi
sudo cp -R "$link_cp" "/var/www"
echo -e "${Green}[-] Da Copy '$link_cp' Vao /var/www Thanh Cong![-]${RESET}" 
