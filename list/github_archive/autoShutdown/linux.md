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
 git clone https://github.com/RezaxOnes/autoShutdown
 cd autoShutdown
 sudo chmod +x script-setup.sh && sudo chmod +x uninstall.sh
 sudo ./script-setup.sh
```
- Once installed, it will automatically monitor your battery and shut down your system when needed.
- Please make sure you have used sudo
- Enjoy it! =)

## To uninstall

```bash
cd autoShutdown
sudo ./uninstall.sh
```

- Remember, you need to use sudo 
