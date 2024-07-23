Function Get-GktInfos {
	<# 
	.SYNOPSIS
	This function queries a Gkt device to retrieve general information of device
	.DESCRIPTION
	This function queries a Gkt device to retrieve general information of device
	.PARAMETER urlHost
	The Gkt device host (IP or DNS domain)
	.PARAMETER urlPort
	The  Gkt device port (empty by default)
	.PARAMETER urlLogin
	The login of authentication.
	.PARAMETER urlPassword
	The password of authentication.
	.OUTPUTS 
	The powershell object that describes general information of device.
	Example of object formated in JSON :
	{
			"Psn":  "00910-00132",
			"Platform":  "dmb400",
			"FirmwareVersion":  "5.11.12",
			"Product":  "dmb400",
			"Uuid":  "05b002ee-0000-0000-0000-001ce60223c3",
			....
	}
	.EXAMPLE
	Get-GktInfos -urlHost "192.168.0.134" -urlLogin "admin" -urlPassword "admin"
	.NOTES
	VERSION:1.10.10
	#>
	
	[CmdletBinding()] 
	param(
			[Parameter(Mandatory=$true)]
			[string] $UrlHost,
			[string] $UrlPort,
			[string] $UrlLogin,
			[string] $UrlPassword
	)
	
	$authorityDeviceURI= $urlPort ? "$($urlHost):$($urlPort)" : $urlHost
	$BaseDeviceUri = "http://$($authorityDeviceURI)/.admin/"

	write-host 	$BaseDeviceUri
	write-host("Retrieve infos for device $($authorityDeviceURI)")
	 
	$UrlLogin="$UrlLogin@realm"
	$contentType="application/json+rpc"
	
	$spwd = ConvertTo-SecureString $urlPassword -AsPlainText -Force
	$credential = New-Object System.Management.Automation.PSCredential ($urlLogin, $spwd)
	$data=@(
			[PSCustomObject]@{args=@();target="nsISystemGeneralSettings.version"},
			[PSCustomObject]@{args=@();target="nsISystemGeneralSettings.hostname"}
			[PSCustomObject]@{args=@();target="nsISystemGeneralSettings.platform"}
			[PSCustomObject]@{args=@();target="nsISystemGeneralSettings.uuid"}
			[PSCustomObject]@{args=@();target="nsISystemGeneralSettings.psn"}
			[PSCustomObject]@{args=@();target="nsISystemGeneralSettings.mac"}
	)
	$body = $data | ConvertTo-Json -Depth 5
	$result=@{}
	
	try {
			$ExecutedRequest =  Invoke-WebRequest -SessionVariable session -Body $body -Credential $credential -AllowUnencryptedAuthentication -Method 'POST' -ContentType $contentType -Uri "$BaseDeviceUri"
			$response = $ExecutedRequest | ConvertFrom-Json
			$result=[ordered]@{
					FirmwareVersion = $response[0].result
					Hostname = $response[1].result
					Platform = $response[2].result
					UUID = $response[3].result
					PSN = $response[4].result
					MAC = $response[5].result
			}
	}
	catch {
			write-host( $_.Exception.Message + $_.ErrorDetails.Message )
			throw $_.Exception
	}
	
	$Result
}


Get-GktInfos -urlHost "192.168.0.134:80" -urlLogin "admin" -urlPassword "admin"