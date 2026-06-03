#!/bin/bash

Green="\033[1;32m"
Red="\033[1;31m"
RESET="\033[0m"
echo "Vui Long Nhap Ten User (Kiem tra o \"ls /home\")"
echo "Ban co the thoat script bang cach go 'quit' hoac 'q' hay dung 'exit' "
read -p ">> " user_m

set -Eeuo pipefail
trap 'echo -e "${Red} Khong the thuc hien thao tac do loi khong xac dinh, huy thuc thi script.${RESET}" ' ERR

if [[ "$user_m" == "q" || "$user_m" == "quit" || "$user_m" == "exit" ]]; then
echo "Good Bye!"
exit 0 
fi

# Thuc thi

echo -e "${Green}[-] Dang go cai dat${RESET}"
echo -e "${Green}[-] Ngung hoat dong chuc nang${RESET}"
sudo systemctl stop check-time.timer && sudo systemctl disable check-time.timer
echo -e "${Green}[-] Tien hanh xoa file${RESET}"
echo -e "${Green}[-] Dang xoa check-time.service va check-time.timer${RESET}"
sudo rm -f /etc/systemd/system/check-time.service
sudo rm -f /etc/systemd/system/check-time.timer
echo -e "${Green}[-] Dang xoa time-shutdownAT.sh${RESET}"
sudo rm -f /usr/local/bin/time-shutdownAT.sh
echo -e "${Green}[-] Dang xoa time-command.log${RESET}"
sudo rm -f /var/log/time-command.log
echo -e "${Green}[-] Dang xoa shutdown_done_in_day.flag (Neu Co)${RESET}"
sudo rm -f /var/log/shutdown_done_in_day.flag
echo -e "${Green}[-] Lam moi systemctl${RESET}"
sudo systemctl daemon-reexec && sudo systemctl daemon-reload

echo -e "${Green}[-] Da go cai dat thanh cong [-]${RESET}"
