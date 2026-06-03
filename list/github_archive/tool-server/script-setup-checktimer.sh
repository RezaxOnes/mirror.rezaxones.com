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

# Thuc Thi

echo -e "${Green}[-] Copy script time-shutdownAT.sh => /usr/local/bin/${RESET}"
sudo cp "/home/$user_m/tool-server/time-shutdownAT.sh" /usr/local/bin/
sudo chmod +x /usr/local/bin/time-shutdownAT.sh

echo -e "${Green}[-] Copy check-time.service va check-time.timer => /etc/systemd/system/${RESET}"
sudo cp "/home/$user_m/tool-server/check-time.service" /etc/systemd/system/
sudo cp "/home/$user_m/tool-server/check-time.timer" /etc/systemd/system/

echo -e "${Green}[-] Dang khoi dong he thong dong thoi cap quyen neu can thiet${RESET}"
sudo systemctl daemon-reexec && sudo systemctl daemon-reload && sudo systemctl enable check-time.timer && sudo systemctl start check-time.timer

echo -e "${Green}[-] Dang khoi tao time-command.log ${RESET}"
echo -e "${Green}[-] Copy time-command.log => /var/log/${RESET}"
sudo touch /var/log/time-command.log
echo -e "${Green}[-] Dang cap quyen can thiet cho /var/log/${RESET}"
sudo chmod 644 /var/log/time-command.log
sudo chown "$user_m:$user_m" /var/log/time-command.log
echo "---------Time Logs Entries(auto shutdown)--------" | sudo tee -a /var/log/time-command.log > /dev/null
echo -e "${Green}[-] Vui long chay: 'sudo systemctl restart check-time.service && sudo systemctl restart check-time.timer' neu ban nghi ngo script khong hoat dong!${RESET}"

#Da Cai Dat Thanh Cong
echo -e "${Green}[-] Da Cai Dat Thanh Cong! [-]${RESET}"


