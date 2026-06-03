#!/bin/bash

#This Script Using Time In Client System, Check By Using Command -> date <-
#Log FIle
LOGFILE="/var/log/battery-command.log"
# Flag if script error - You can rename this 
Flag_Bool_Check="/var/log/isShutdownDone.flag"
# In /sys/class/power_supply or ...  will display your battery like GUI, you need to change true link have display your battery
# Example
battery=$(cat /sys/class/power_supply/BAT0/capacity)
# And this is logic check battery, the -le equal to <=, if you want to change battery shutdown, just edit this line the number
#                   |
#                   |
#                   V
battery_to_shutdown=8
# Example in if
if [ "$battery" -le "$battery_to_shutdown" ] && [ ! -f "$Flag_Bool_Check" ]; then
    echo "May Se Tat Nguon Trong 3s do <=$battery_to_shutdown Va Danh Dau Bang Cach Tao File $Flag_Bool_Check O /var/log/ Hay Xoa No Neu Muon Script Chay Lai Trong Ngay Hom Sau (vui long khong xoa trong ngay hom nay) - $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOGFILE"
    sleep 3
    touch "$Flag_Bool_Check"
    sync
    systemctl poweroff -i  
else  
    echo "Pin dang lon hon $battery_to_shutdown khong thuc thi - $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOGFILE" 
fi
