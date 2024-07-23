# RPC

Devices with Gekkota OS expose an API documented in IDL (see  [API](../API/README.md)).
This API can be requested by an application running above the middleware (.gap) or by remote calls (RPC for Remote Procedure Call)

![Alt text](rpc.svg?raw=true)

**Examples**

[Get-GktInfos.ps1](Get-GktInfos.ps1) is a PowerShell script to retrieve device information via RPC. It is designed for PowerShell 7. It uses [nsISystemGeneralSettings API](../API/system.generalSettings/README.md).
To run it, replace the parameter values ​​in the last line:

    Get-GktInfos -urlHost <device_ip_addr> -urlLogin <login> -urlPassword <password>

[Set-Hostname.ps1](Set-Hostname.ps1) is a PowerShell script to set the hostname via RPC. It is designed for PowerShell 7.
To run it, replace the parameter values ​​in the last line:

    Set-Hostname -urlHost <device_ip_addr> -urlLogin <login> -urlPassword <password> -newHostname <hostname>   
