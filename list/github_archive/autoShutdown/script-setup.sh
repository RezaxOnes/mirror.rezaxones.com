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

echo -e "${Green}[-] Copy script battery-shutdownAT.sh => /usr/local/bin/${RESET}"
sudo cp "/home/$user_m/autoShutdown/battery-shutdownAT.sh" /usr/local/bin/
sudo chmod +x /usr/local/bin/battery-shutdownAT.sh

echo -e "${Green}[-] Copy check-battery.service va check-battery.timer => /etc/systemd/system/${RESET}"
sudo cp "/home/$user_m/autoShutdown/check-battery.service" /etc/systemd/system/
sudo cp "/home/$user_m/autoShutdown/check-battery.timer" /etc/systemd/system/

echo -e "${Green}[-] Dang khoi dong he thong dong thoi cap quyen neu can thiet${RESET}"
sudo systemctl daemon-reexec && sudo systemctl daemon-reload && sudo systemctl enable check-battery.timer && sudo systemctl start check-battery.timer

echo -e "${Green}[-] Dang khoi tao battery-command.log ${RESET}"
echo -e "${Green}[-] Copy battery-command.log => /var/log/${RESET}"
sudo touch /var/log/battery-command.log
echo -e "${Green}[-] Dang cap quyen can thiet cho /var/log/${RESET}"
sudo chmod 644 /var/log/battery-command.log
sudo chown "$user_m:$user_m" /var/log/battery-command.log
echo "---------Battery Logs Entries(auto shutdown)--------" | sudo tee -a /var/log/battery-command.log > /dev/null
echo -e "${Green}[-] Vui long chay: 'sudo systemctl restart check-battery.service && sudo systemctl restart check-battery.timer' neu ban nghi ngo script khong hoat dong!${RESET}"

#Da Cai Dat Thanh Cong
echo -e "${Green}[-] Da Cai Dat Thanh Cong! [-]${RESET}"


