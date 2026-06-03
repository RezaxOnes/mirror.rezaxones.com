#!/bin/bash

#This script Using Time In Client System, Check By Using Command -> date <-
LOGFILE="/var/log/time-command.log"
presentTime=$(date +"%H%M")
Flag_Bool="/var/log/shutdown_done_in_day.flag"

# Edit this target time! Format=0900=09:00(24h)
target_time_shutdown="0900"

if [ "$presentTime" -ge "$target_time_shutdown" ] && [ ! -f "$Flag_Bool" ]; then
echo "May Se Tat Nguon Trong 3s Do >=$target_time_shutdown Va Danh Dau Bang Cach Tao File $Flag_Bool O /var/log/ Hay Xoa No Neu Muon Script Chay Lai Trong Ngay Hom Sau (vui long khong xoa trong ngay hom nay) -  $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOGFILE"
sleep 3
touch "$Flag_Bool" 
    sync
    /usr/bin/systemctl poweroff -i  
else  
echo "Chua toi thoi gian chi dinh! - $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOGFILE" 
fi
