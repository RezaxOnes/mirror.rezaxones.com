# On Linux

## Install

### From an install script


First, you need to install the required packages:

```bash
# for Debian/Ubuntu
sudo add-apt-repository ppa:git-core/ppa
sudo apt update && sudo apt install git
```
Second, you paste to your bash, please make sure your file "autoShutdown" in home/your-user (=) ~"

```bash
 git clone https://github.com/RezaxOnes/tool-server
 cd tool-server
 sudo chmod +x script-setup-checktimer.sh && sudo chmod +x uninstall-checktimer.sh
 sudo ./script-setup-checktimer.sh
```
- Once installed, it will automatically monitor your time and shut down your system when needed.
- Please make sure you have used sudo
- Enjoy it! =)

## To uninstall

```bash
cd tool-server
sudo ./uninstall-checktimer.sh
```

- Remember, you need to use sudo
