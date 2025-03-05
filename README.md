# ⚠ THIS PROJECT IS CURRENTLY PRE-ALPHA ⚠
# Obsidian-KeepassXC [![codebeat badge](https://codebeat.co/badges/0365004b-6336-4f7c-8611-bbd217f29aa0)](https://codebeat.co/projects/github-com-kkapsner-keepassxc-mail-master)

Obsidian extension for [KeePassXC](https://keepassxc.org/) with Native Messaging.

Based on [KeePassXC-Browser](https://github.com/keepassxreboot/keepassxc-browser) and [keebird](https://github.com/kee-org/keebird).

## Installation for KeePassXC

*Hopefully we can get this as simple as for KeePassXC-Browser in the future.*

 1. Configure KeePassXC-Browser as described in [this document](https://keepassxc.org/docs/KeePassXC_GettingStarted.html#_configure_keepassxc_browser). Make sure to enable the integration for Firefox.
 2. Create the configuration file for Native Messaging as described below in [Native Messaging configuration](#native-messaging-configuration).
 3. Install the add-on in Thunderbird. Either install it from [addons.thunderbird.net](https://addons.thunderbird.net/thunderbird/addon/keepassxc-mail/) or download the [latest prebuilt xpi](https://github.com/kkapsner/keepassxc-mail/releases/latest) or build it yourself (`npm install`, `npm run build`, the xpi will be in the `mail-ext-artifacts` directory).

## Installation for KeePass 2

1. Install KeepassNatMsg and configure it described in [this document](https://github.com/smorks/keepassnatmsg#installation)
2. Install the add-on in Thunderbird. Either install it from [addons.thunderbird.net](https://addons.thunderbird.net/thunderbird/addon/keepassxc-mail/) or download the [latest prebuilt xpi](https://github.com/kkapsner/keepassxc-mail/releases/latest) or build it yourself (`npm install`, `npm run build`, the xpi will be in the `mail-ext-artifacts` directory).

## Native Messaging configuration

### Windows

Run the following commands in the PowerShell:
```PowerShell
$browserJSONPath=Get-ItemPropertyValue -path 'HKCU:\Software\Mozilla\NativeMessagingHosts\org.keepassxc.keepassxc_browser' -name '(default)'
$mailJSONPath=Join-Path -path (Split-Path -path $browserJSONPath) -childPath de.kkapsner.keepassxc_mail.json

cat $browserJSONPath |
 %{$_ -replace "keepassxc-browser@keepassxc.org","keepassxc-mail@kkapsner.de"} |
 %{$_ -replace "org.keepassxc.keepassxc_browser","de.kkapsner.keepassxc_mail"} |
 Out-File -filePath $mailJSONPath -Encoding ASCII

New-Item -path 'HKCU:\Software\Mozilla\NativeMessagingHosts\de.kkapsner.keepassxc_mail' -type Directory -force
Set-ItemProperty -path 'HKCU:\Software\Mozilla\NativeMessagingHosts\de.kkapsner.keepassxc_mail' -name '(default)' -value $mailJSONPath
```

### Linux

*NOTE*: if Thunderbird is installed via Snap or flatpak it might not work (see #95 for further details)

Run the following command in a terminal:
```Shell
cat ~/.mozilla/native-messaging-hosts/org.keepassxc.keepassxc_browser.json \
 | sed s/keepassxc-browser@keepassxc.org/keepassxc-mail@kkapsner.de/ \
 | sed s/org.keepassxc.keepassxc_browser/de.kkapsner.keepassxc_mail/ \
 > ~/.mozilla/native-messaging-hosts/de.kkapsner.keepassxc_mail.json
```

### Mac OS X

Run the following command in a terminal:
```Shell
cat ~/Library/Application\ Support/Mozilla/NativeMessagingHosts/org.keepassxc.keepassxc_browser.json \
 | sed s/keepassxc-browser@keepassxc.org/keepassxc-mail@kkapsner.de/ \
 | sed s/org.keepassxc.keepassxc_browser/de.kkapsner.keepassxc_mail/ \
 > ~/Library/Application\ Support/Mozilla/NativeMessagingHosts/de.kkapsner.keepassxc_mail.json
ln -s ~/Library/Application\ Support/Mozilla/NativeMessagingHosts/ ~/Library/Mozilla/
```
