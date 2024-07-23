Function Set-Hostname {
	<# 
	.SYNOPSIS
	This function changes hostname of the target Gkt device
	.DESCRIPTION
	This function changes hostname of the target Gkt device
	.PARAMETER urlHost
	The Gkt device host (IP or DNS domain)
	.PARAMETER urlPort
	The Gkt device port (empty by default)
	.PARAMETER urlLogin
	The login of authentication.
	.PARAMETER urlPassword
	The password of authentication.
	.PARAMETER newHostname
	The new hostname value to be set.	
	.OUTPUTS 
	None
	.EXAMPLE
	Set-Hostname -urlHost "192.168.0.134" -urlLogin "admin" -urlPassword "admin" -newHostname "NEW_NAME"
	.NOTES
	VERSION:1.10.10
	#>
	
	[CmdletBinding()] 
	param(
			[Parameter(Mandatory=$true)]
			[string] $UrlHost,
			[string] $UrlPort,
			[string] $UrlLogin,
			[string] $UrlPassword,
			[string] $newHostname			
	)
	
	$authorityDeviceURI= $urlPort ? "$($urlHost):$($urlPort)" : $urlHost
	$BaseDeviceUri = "http://$($authorityDeviceURI)/.admin/"

	write-host 	$BaseDeviceUri
	write-host("Set hostname of device $($authorityDeviceURI) to $($newHostname)")
	 
	$UrlLogin="$UrlLogin@realm"
	$contentType="application/json+rpc"
	
	$spwd = ConvertTo-SecureString $urlPassword -AsPlainText -Force
	$credential = New-Object System.Management.Automation.PSCredential ($urlLogin, $spwd)
	$data=@(
			[PSCustomObject]@{args=@($newHostname);target="nsISystemGeneralSettings.hostname"},
			[PSCustomObject]@{args=@();target="nsIPref.SavePrefFile"}
	)
	$body = $data | ConvertTo-Json -Depth 2
	
	try {
			$response = Invoke-WebRequest -SessionVariable session -Body $body -Credential $credential -AllowUnencryptedAuthentication -Method 'POST' -ContentType $contentType -Uri "$BaseDeviceUri"
	}
	catch {
			write-host( $_.Exception.Message + $_.ErrorDetails.Message )
			throw $_.Exception
	}
}


Set-Hostname -urlHost "192.168.0.134:80" -urlLogin "admin" -urlPassword "admin" -newHostname "NEW_NAME"