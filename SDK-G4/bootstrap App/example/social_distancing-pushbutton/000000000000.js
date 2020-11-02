/**
 * Fonction: configuration-by-script
 * File : example_000000000000-V1.10.XX.js
 * File name pattern
 *    The file name must match on of these these formats (ex: USB injection):
 *      - 000000000000.js
 * 		- <MAC>.js (upper case only for <MAC>)
 * 			ex: 001CE602FC01.js
 *    In PlugnCast G3 configuration, the file name must match on of these these formats :
 * 		- <Mac>.configuration.js (lower case as well as upper case for <MAC>)
 * 			ex: 00-1C-E6-02-FC-01.configuration.js or 00-1c-e6-02-fc-01.configuration.js
 * 		- <hostname>.configuration.js (lower case as well as upper case for <hostname>)  
 * 		- <UUID>.configuration.js (lower case as well as upper case for <UUID>)
 * 		- configuration.js
 *
 *   If the script installation fails, go in player WebUI <player_IP>/.status/, open status.xml, and look at the error raised
 *
 */

const Cc = Components.classes;
const Ci = Components.interfaces;
const nsIPrefBranch=Ci.nsIPrefBranch;
Components.utils.import("resource://gre/modules/Services.jsm");

var logService = Cc["@innes/log4service;1"].getService(Ci.nsILog4Service);
var logger = new Logger("autoconf");
var systemManager = Cc["@innes/system/systemmanager;1"].getService(Ci.nsISystemManager);
logger.debug("Autoconf start");

var Platform = undefined;
getPlatform();
if (Platform === "dme204") {
	Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");
	XPCOMUtils.defineLazyModuleGetter(this, "EncodingCapabilities", "file:///usr/etc/capabilities/dme204avencoding.js");
}

// ---------------------------------------
// ---------------------------------------
// ---- BEGIN of the user configuration
// ---------------------------------------
// ---------------------------------------



// ---------------------------------------
// ---- Administrator configuration
// ---------------------------------------

// ---- Defines hostname : uncomment the line after
//setHostname("dmb400-test");

// ---- Defines admin login : uncomment the line after
//Services.prefs.setCharPref("innes.webserver.username", "admin");

// ---- Defines admin password : uncomment the line after
//Services.prefs.setCharPref("innes.webserver.password", "admin");

// ---- Defines identification method : uncomment the good line after
//setIdMethod("MAC");
//setIdMethod("Hostname");
//setIdMethod("UUID");


// ---------------------------------------
// ---- LAN configuration
// ---------------------------------------

// ---- Retrieve lan adapter : DO NOT COMMENT THE FOLLOWING LINE !!!
let lan = getNetAdapter("LAN");

// ---- Choose static or DHCP for IPV4 : uncomment one of the 2 lines after
//enableDhcpv4(lan); // This one for DHCP
//disableDhcpv4(lan); // This one for static

// ---- Set static IP address, netmask and gateway for LAN adapter : uncomment the line after
//setIPv4StaticAddress(lan, "192.168.87.87", "255.255.128.0", "192.168.0.1");

// ---- Choose if UPnP discover gateway is activated or not
// ---- Not that if DHCP for IPv4 is enabled by enableDhcpv4(), the gateway will be defined by DHCP, not by UPnP
// ---- uncomment one of the 2 lines after
//enableGatewayUpnp(lan); // ---- This one for activating UPnP discover
//disableGatewayUpnp(lan); // ---- This one for gateway static (if disableDhcpv4() is used) or DHCP (if enableDhcpv4() is used)

// ---- Set the IGMP version : uncomment one of the 2 lines after
//setIgmpVersion(lan,3); // ---- This one for IGMP V3
//setIgmpVersion(lan,2); // ---- This one for IGMP V2

// ---- set the maximun bitrate value for LAN adapter. Possible values are :
// ---- MAX_BITRATE_VALUE_56_KBPS
// ---- MAX_BITRATE_VALUE_128_KBPS
// ---- MAX_BITRATE_VALUE_256_KBPS
// ---- MAX_BITRATE_VALUE_512_KBPS
// ---- MAX_BITRATE_VALUE_1024_KBPS
// ---- MAX_BITRATE_VALUE_2048_KBPS
// ---- MAX_BITRATE_VALUE_5120_KBPS
// ---- MAX_BITRATE_VALUE_10240_KBPS
// ---- uncomment the line after
//setMaxBitrateValue(lan, Ci.nsISystemAdapterIP.MAX_BITRATE_VALUE_10240_KBPS);

// ---- Choose if the max bitrate limitation is activated or not : uncomment one of the 2 lines after
//disableMaxBitrate(lan); // ---- This one for disabling
//enableMaxBitrate(lan); // ---- This one for enabling

// ---- LAN with no 802.1X security
// ---- SECURITY_NONE, any //
//setLanSecurity(lan, Ci.nsISystemAdapterLAN.SECURITY_NONE, Ci.nsISystemEapSecurity.METHOD_EAP_MD5);  // ---- This one for disabling 802.1X and setting EAP_MD5

// ---- LAN with non 802.1X security

// ---- Choose the EAP method for 802.1X security. Possible values are :
// ---- SECURITY_EAP_MAC, METHOD_EAP_MD5
// ---- SECURITY_EAP_MAC, METHOD_EAP_GTC
// ---- SECURITY_EAP_MAC, METHOD_EAP_TLS
// ---- SECURITY_EAP_MAC, METHOD_EAP_TTLS_EAP_MD5
// ---- SECURITY_EAP_MAC, METHOD_EAP_TTLS_EAP_GTC
// ---- SECURITY_EAP_MAC, METHOD_EAP_TTLS_EAP_MSCHAPV2
// ---- SECURITY_EAP_MAC, METHOD_EAP_TTLS_EAP_TLS
// ---- SECURITY_EAP_MAC, METHOD_EAP_TTLS_MSCHAPV2
// ---- SECURITY_EAP_MAC, METHOD_EAP_TTLS_MSCHAP
// ---- SECURITY_EAP_MAC, METHOD_EAP_TTLS_PAP
// ---- SECURITY_EAP_MAC, METHOD_EAP_TTLS_CHAP
// ---- SECURITY_EAP_MAC, METHOD_EAP_PEAPV0_MSCHAPV2
// ---- SECURITY_EAP_MAC, METHOD_EAP_PEAPV0_GTC
// ---- SECURITY_EAP_MAC, METHOD_EAP_PEAPV0_MD5
// ---- SECURITY_EAP_MAC, METHOD_EAP_MSCHAPV2
// ---- SECURITY_EAP_MAC, METHOD_EAP_FAST
//setLanSecurity(lan, Ci.nsISystemAdapterLAN.SECURITY_EAP_MAC, Ci.nsISystemEapSecurity.METHOD_EAP_FAST);  // ---- This one for enabling 802.1X and setting EAP_FAST

// ---------------------------------------
// ---- WLAN configuration
// ---------------------------------------

// ---- Retrieve wlan adapter : DO NOT COMMENT THE FOLLOWING LINE !!!
let wlan = getWLanNetAdapter("WLAN");
if (wlan) {
	// ---- Enable or disable WLAN : uncomment one of the 2 lines after
	//enableWLan(wlan);
	//disableWLan(wlan);

	// ---- Choose static or DHCP for IPV4 : uncomment one of the 2 lines after
	//enableDhcpv4(wlan); // This one for DHCP
	//disableDhcpv4(wlan); // This one for static

	// ---- Set static IP address, netmask and gateway for WLAN adapter : uncomment the line after
	//setIPv4StaticAddress(wlan, "192.168.1.2", "255.255.255.0", "192.168.1.6");

	// ---- Set the IGMP version : uncomment one of the 2 lines after
	//setIgmpVersion(wlan,3); // ---- This one for IGMP V3
	//setIgmpVersion(wlan,2); // ---- This one for IGMP V2

	// FOR WLAN, uncomment the line depending on your appropriate WLAN mode
	//------------------------------------------------------------
	// 1 - Adhoc mode
	//------------------------------------------------------------
	// ADHOC channel:
	//  -  0: channel no required
	//  -  1: channel  1, 2412 MHz
	// 	-  2: channel  2, 2417 MHz
	// 	-  3: channel  3, 2422 MHz
	//  -  4: channel  4, 2427 MHz
	// 	-  5: channel  5, 2432 MHz
	//  -  6: channel  6, 2437 MHz
	//  -  7: channel  7, 2442 MHz
	//  -  8: channel  8, 2447 MHz
	// 	-  9: channel  9, 2452 MHz
	//  - 10: channel 10, 2457 MHz
	// 	- 11: channel 11, 2462 MHz
	//------------------------------------------------------------
	//setWLanModeAdhoc(wlan, "your_WLAN_SSID", false, 0); // ---- This one for mode Adhoc, SSID your_WLAN_SSID, SSID not hidden, channel
	//------------------------------------------------------------
	// 2 - Infrastructure - no security mode
	//------------------------------------------------------------
	//setWLanModeInfra(wlan, "your_WLAN_SSID", false); // ---- This one for mode Infra, SSID your_WLAN_SSID, no security, SSID not hidden
	//------------------------------------------------------------
	// 3 - Infrastructure - WEP
	// choose 10 or 26 hexa characters key
	//------------------------------------------------------------
	//setWLanModeInfraWithKey(wlan, "your_WLAN_SSID", false, "WEP", 0, 0, "123456789A"); // ---- This one for mode Infra, SSID your_WLAN_SSID, SSID not hidden, pairwise cipher: NA, group cipher: NA, security WEP, key value: 123456789A, 10 hexa characters
	//setWLanModeInfraWithKey(wlan, "your_WLAN_SSID", false, "WEP", 0, 0, "ABCDEF0123456789ABCDEF0123"); // ---- This one for mode Infra, SSID your_WLAN_SSID, SSID not hidden, pairwise cipher: NA, group cipher: NA, security WEP, key value: 26 hexa characters
	//------------------------------------------------------------
	// 4 - Infrastructure - WPA-Personal
	// Choose the cipher key. Possible values are Ci.nsISystemWpaSecurity. + suffix:
	// ENCR_TKIP
	// ENCR_CCMP
	// ENCR_CCMP_TKIP
	// (note: CCMP is used for AES)
	//------------------------------------------------------------
	//setWLanModeInfraWithKey(wlan, "your_WLAN_SSID", true, "WPA", Ci.nsISystemWpaSecurity.ENCR_TKIP, Ci.nsISystemWpaSecurity.ENCR_TKIP, "abcdefgh"); // ---- This one for mode Infra, SSID your_WLAN_SSID, SSID hidden, security WPA, pairwise cipher: TKIP, group cipher: TKIP, key: abcdefgh (from 8 ASCII characters ...)
	//------------------------------------------------------------
	// 5 - Infrastructure - WPA2-Personal
	// Choose the cipher key. Possible values are Ci.nsISystemWpaSecurity. + suffix:
	// ENCR_TKIP
	// ENCR_CCMP
	// ENCR_CCMP_TKIP
	// (note: CCMP is used for AES)
	//------------------------------------------------------------
	//setWLanModeInfraWithKey(wlan, "your_WLAN_SSID", false, "WPA2", Ci.nsISystemWpaSecurity.ENCR_CCMP, Ci.nsISystemWpaSecurity.ENCR_CCMP, "ABCDEF9876543210ABCDEF9876543210ABCDEF9876543210ABCDEF987654321"); // ---- This one for mode Infra, SSID your_WLAN_SSID, SSID not hidden, security WPA2, pairwise cipher: CCMP, group cipher: CCMP, key: ABCDEF9876543210ABCDEF9876543210ABCDEF9876543210ABCDEF987654321 (... to 63 ASCII characters)
	//------------------------------------------------------------
	// 6 - WPA-Enterprise
	//------------------------------------------------------------
	// Choose the EAP method for 802.1X security. Possible values are Ci.nsISystemEapSecurity. + suffix:
	// METHOD_EAP_TLS
	// METHOD_EAP_TTLS_EAP_MD5
	// METHOD_EAP_TTLS_EAP_GTC
	// METHOD_EAP_TTLS_EAP_MSCHAPV2
	// METHOD_EAP_TTLS_EAP_TLS
	// METHOD_EAP_TTLS_MSCHAPV2
	// METHOD_EAP_TTLS_MSCHAP
	// METHOD_EAP_TTLS_PAP
	// METHOD_EAP_TTLS_CHAP
	// METHOD_EAP_PEAPV0_MSCHAPV2
	// METHOD_EAP_PEAPV0_GTC
	// METHOD_EAP_PEAPV0_MD5
	// METHOD_EAP_FAST
	// Choose the cipher key. Possible values are Ci.nsISystemWpaSecurity. + suffix:
	// ENCR_TKIP
	// ENCR_CCMP
	// ENCR_CCMP_TKIP
	// (note: CCMP is used for AES)
	//------------------------------------------------------------
	//setWLanModeInfraWithEap(wlan, "your_WLAN_SSID", false, "WPA", Ci.nsISystemWpaSecurity.ENCR_TKIP, Ci.nsISystemWpaSecurity.ENCR_TKIP, Ci.nsISystemEapSecurity.METHOD_EAP_TLS);  // ---- This one for mode Infra, SSID your_WLAN_SSID, SSID not hidden, security WPA2, pairwise cipher: CCMP, group cipher: CCMP, security: METHOD_EAP_TLS
	//------------------------------------------------------------
	// 7 - WPA2-Enterprise
	//------------------------------------------------------------
	// ---- Choose the EAP method for 802.1X security. Possible values are Ci.nsISystemEapSecurity. + suffix:
	// ---- METHOD_EAP_TLS
	// ---- METHOD_EAP_TTLS_EAP_MD5
	// ---- METHOD_EAP_TTLS_EAP_GTC
	// ---- METHOD_EAP_TTLS_EAP_MSCHAPV2
	// ---- METHOD_EAP_TTLS_EAP_TLS
	// ---- METHOD_EAP_TTLS_MSCHAPV2
	// ---- METHOD_EAP_TTLS_MSCHAP
	// ---- METHOD_EAP_TTLS_PAP
	// ---- METHOD_EAP_TTLS_CHAP
	// ---- METHOD_EAP_PEAPV0_MSCHAPV2
	// ---- METHOD_EAP_PEAPV0_GTC
	// ---- METHOD_EAP_PEAPV0_MD5
	// ---- METHOD_EAP_FAST
	// ---- Choose the cipher key. Possible values are Ci.nsISystemWpaSecurity. + suffix:
	// ---- ENCR_TKIP
	// ---- ENCR_CCMP
	// ---- ENCR_CCMP_TKIP
	// (note: CCMP is used for AES)
	//------------------------------------------------------------
	//setWLanModeInfraWithEap(wlan, "your_WLAN_SSID", false, "WPA2", Ci.nsISystemWpaSecurity.ENCR_CCMP, Ci.nsISystemWpaSecurity.ENCR_CCMP, Ci.nsISystemEapSecurity.METHOD_EAP_TLS);  // ---- This one for mode Infra, SSID your_WLAN_SSID, SSID not hidden, security WPA2, pairwise cipher: CCMP, group cipher: CCMP, security: METHOD_EAP_TLS
}

// ---------------------------------------
// ---- Output configuration
// ---------------------------------------

if ((Platform != "dme204") && (Platform != "nt_ia32")) {
	// ---- Retrieve display : DO NOT COMMENT THE FOLLOWING LINE !!!
	let display = getDisplayAdapter();
	// ---- Change display mode : uncomment the line after
	//setDisplayMode(display, "1920x1080 60Hz VESA");
	// ---- Change display rotation : uncomment the line after
	//display.rotation = 0; // ---- Possible values are 0, 90, 180, 270
	// --- Change the display area (overscan)
	//setOverscan(100, 50, 200, 300); // ---- This one for enabling and change the parameters
	//disableOverscan(); // ---- This one for disabling

	// ---- Choose if the sound card is activated : uncomment one of the 2 lines after
	//setSoundCardIsActivated(true); // ---- This one for sound card activated
	//setSoundCardIsActivated(false); // ---- This one for sound card deactivated
	// ---- Choose if audio is muted : uncomment one of the 2 lines after
	//setAudioIsDisable(true); // ---- This one for audio mute
	setAudioIsDisable(false); // ---- This one for audio activated
	// ---- Choose audio output : uncomment one of the line after
	//setAudioOutput("JACK35");
	//setAudioOutput("HDMI");
	// ---- Defines the audio volume L/R : uncomment the line after
	//setAudioVolume(50, 50);
}

// ---------------------------------------
// ---- CEC configuration
// ---------------------------------------

// ---- Enable or disable CEC : uncomment one of the 2 lines after
//setCecIsActivated(true);
//setCecIsActivated(false);

// ---------------------------------------
// ---- App

// ---------------------------------------
// ---- Configuring local deposit: uncomment the 5 lines below
disablePlugnCastG2();
disablePlugnCastG3();
disableStatusServer();
disableAddonServer();
setAppModePushArchive();

// ---- Configuring push Webdav: uncomment the 5 lines below
//disablePlugnCastG2();
//disablePlugnCastG3();

//disableStatusServer();
//disableAddonServer();

// ---- Configuring pull Webdav: uncomment the 4 lines below
//disablePlugnCastG2();
//setPlugnCastG3("http://<ip_addr>/.frontals/.webdav/<domain>/", 1, "login", "password");
//setStatusServer("http://<ip_addr>/.frontals/.webdav/<domain>/.device-status/", 1, "login", "password");
//setAddonServer("http://<ip_addr>/.frontals/.webdav/<domain>/.setup/", 1, "login", "password");


// ---- Configuring pull Webdav-XPF compatibility: uncomment the 4 lines below

//disablePlugnCastG3();
//disableStatusServer();
//disableAddonServer();
//setPlugnCastG2("http://<ip_addr>/", 1);


// ---------------------------------------
// ---- Servers configuration
// ---------------------------------------

// ---- Choose static or DHCP for DNS : uncomment one of the 2 lines after
//enableDnsDhcp(lan); // ---- This one for DHCP
//disableDnsDhcp(lan); // ---- This one for static

// ---- set static DNS servers and suffix : uncomment the line after
//setDns(lan, "192.168.0.1", "192.168.0.1","dns_suffix");

// ---- Defines NTP settings : uncomment the line after
//setNtpSettings("fr.pool.ntp.org", 20, 10);

// ---- Choose if NTP is enabled : uncomment one of the 2 lines after
//setNtpIsEnable(true); // ---- This one for enabling
//setNtpIsEnable(false); // ---- This one for disabling

// ---- Choose if proxy is used, and its type : uncomment one of the 3 lines after
//setProxyType(0); // ---- This one for disabling
//setProxyType(1); // ---- This one for enabling manual configuration
//setProxyType(2); // ---- This one for enabling automatic configuration

// ---- Defines http proxy : uncomment one of the 2 lines after
//setProxyHttp(true, "<proxy-http-address>", 3128, "login", "password"); // ---- This one for definition
//setProxyHttp(false, "", 0, "", ""); // ---- This one for resetting

// ---- Defines https proxy : uncomment one of the 2 lines after
//setProxyHttps(true, "<proxy-https-address>", 3128, "login", "password"); // ---- This one for definition
//setProxyHttps(false, "", 0, "", ""); // ---- This one for resetting

// ---- Defines ftp proxy : uncomment one of the 2 lines after
//setProxyFtp(true, "<proxy-ftp-address>", 3128, "login", "password"); // ---- This one for definition
//setProxyFtp(false, "", 0, "", ""); // ---- This one for resetting

// ---- Defines 'No proxy for ' : uncomment one of the 2 lines after
//setNoProxyFor("localhost, 127.0.0.1"); // ---- This one for enabling
//setNoProxyFor(""); // ---- This one for resetting

//setNoProxyForDeliveryServer(true); 
//setNoProxyForStatusServer(true); 
//setNoProxyForSoftwareAndConfigurationInstallationServer(true); 

// ---- Defines automatic configuration adress : uncomment one of the 2 lines after
//setProxyConfig("proxy-autoconfig-url"); // ---- This one for enabling
//setProxyConfig(""); // ---- This one for resetting


// ---------------------------------------
// ---- Licence configuration
// ---------------------------------------

// ---- Set licence code : uncomment the line after
//setlicense("00000-0000-0000-0000-00000");


// ---------------------------------------
// ---- Regional configuration
// ---------------------------------------

// ---- Set Regional language : uncomment one of the 4 lines after
//Services.prefs.setCharPref("general.useragent.locale", "en"); // ---- This one for English
//Services.prefs.setCharPref("general.useragent.locale", "fr"); // ---- This one for French
//Services.prefs.setCharPref("general.useragent.locale", "de"); // ---- This one for German
//Services.prefs.setCharPref("general.useragent.locale", "es"); // ---- This one for Spanish


// ---------------------------------------
// ---- Variables configuration
// ---------------------------------------

// ---- Set Field1 : uncomment one of the 2 lines after
Services.prefs.setCharPref("innes.player.device-info.field1", "AABBCCDDEEFF"); // ---- This one to define
//Services.prefs.setCharPref("innes.player.device-info.field1", ""); // ---- This one to reset
// ---- Set Field2 : uncomment one of the 2 lines after
//Services.prefs.setCharPref("innes.player.device-info.field2", "field2"); // ---- This one to define
//Services.prefs.setCharPref("innes.player.device-info.field2", ""); // ---- This one to reset
// ---- Set Field3 : uncomment one of the 2 lines after
//Services.prefs.setCharPref("innes.player.device-info.field3", "field3"); // ---- This one to define
//Services.prefs.setCharPref("innes.player.device-info.field3", ""); // ---- This one to reset
// ---- Set Field4 : uncomment one of the 2 lines after
//Services.prefs.setCharPref("innes.player.device-info.field4", "field4"); // ---- This one to define
//Services.prefs.setCharPref("innes.player.device-info.field4", ""); // ---- This one to reset
// ---- Set Field5 : uncomment one of the 2 lines after
//Services.prefs.setCharPref("innes.player.device-info.field5", "field5"); // ---- This one to define
//Services.prefs.setCharPref("innes.player.device-info.field5", ""); // ---- This one to reset


// ---------------------------------------------------
// ---- Test card
// ---------------------------------------------------

// ---- test card mode : uncomment one of the 2 lines after
//enableTestCard(); /* activate test card */
disableTestCard(); /* inactivate test card */

// ---- test card display on key press : uncomment one of the 2 lines after
//enableTestCardKeyEvent();
//disableTestCardKeyEvent();
// ---- Reset all the preferences : if you chosse to uncomment the following line, don't uncomment any other one
//Services.prefs.resetUserPrefs(null);

// ----------------------------------------------------------------------------------
// ---- Adding a certificate to Gekkota
// 1) Fully fill the variable let cert = "" by replacing the existing certificate (shown as example) by yours (exported from Web browser when connected to PlugnCast G3 by example)
// 2) With a text editor (like Notepad++), open the certificate file (exported from Web browser when connected to domain PlugnCast), encode in base64 and copy all the lines and paste between the characters "" of cert variable
// 3) Add character \n\ at the end of each certificate line except for the last line (as shown below)
// 4) Uncomment function GekkotaAddCertificate(cert);
// Take cake: the certificate below is given as an example and must not be used
// ----------------------------------------------------------------------------------
let cert="-----BEGIN CERTIFICATE-----\n\
MIIF0zCCA7ugAwIBAgIDASW2MA0GCSqGSIb3DQEBBQUAMFQxFDASBgNVBAoTC0NB\n\
Y2VydCBJbmMuMR4wHAYDVQQLExVodHRwOi8vd3d3LkNBY2VydC5vcmcxHDAaBgNV\n\
BAMTE0NBY2VydCBDbGFzcyAzIFJvb3QwHhcNMTMwNjA1MjEzNDU1WhcNMTUwNjA1\n\
MjEzNDU1WjAWMRQwEgYDVQQDEwtsaW51eGZyLm9yZzCCASIwDQYJKoZIhvcNAQEB\n\
BQADggEPADCCAQoCggEBANM18jdVjtsiBhSLAlieCK+KzbgsKjwEZyFuFRujaCsR\n\
i6muPoPYeox8+EXJwcLi6G72TvDAI/o39nCXbeTk5s+051N4bpV1NPkHOXOS91Xm\n\
dUk9MVJgQEahbFYUvxJyXm1JbU39TZcAdM/F182cYwzhemRMfF3/yuMcW1bNwrkW\n\
tOx/D8KZY0wS2hKTIlnKS5txsTBY2MR0wEXguQ2K3Wskgdf6if2aAS0Ci7Y8tgWg\n\
xPuKbEcvV4yWNBxAqY7tdoX+7OxLM3KeOVsxaz2vSPCVsaxPk82cjIJgBRaQGBDe\n\
cFiw9eG/jBDN8c92jCdlsJNOqYHO3BPCpUH6Ais+ZOUCAwEAAaOCAeowggHmMAwG\n\
A1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgOoMDQGA1UdJQQtMCsGCCsGAQUFBwMC\n\
BggrBgEFBQcDAQYJYIZIAYb4QgQBBgorBgEEAYI3CgMDMDMGCCsGAQUFBwEBBCcw\n\
JTAjBggrBgEFBQcwAYYXaHR0cDovL29jc3AuY2FjZXJ0Lm9yZy8wOAYDVR0fBDEw\n\
LzAtoCugKYYnaHR0cDovL2NybC5jYWNlcnQub3JnL2NsYXNzMy1yZXZva2UuY3Js\n\
MIIBHwYDVR0RBIIBFjCCARKCC2xpbnV4ZnIub3JnoBkGCCsGAQUFBwgFoA0MC2xp\n\
bnV4ZnIub3JnggtsaW51eGZyLm9yZ6AZBggrBgEFBQcIBaANDAtsaW51eGZyLm9y\n\
Z4IPZGV2LmxpbnV4ZnIub3JnoB0GCCsGAQUFBwgFoBEMD2Rldi5saW51eGZyLm9y\n\
Z4IQcHJvZC5saW51eGZyLm9yZ6AeBggrBgEFBQcIBaASDBBwcm9kLmxpbnV4ZnIu\n\
b3JnghFhbHBoYS5saW51eGZyLm9yZ6AfBggrBgEFBQcIBaATDBFhbHBoYS5saW51\n\
eGZyLm9yZ4INKi5saW51eGZyLm9yZ6AbBggrBgEFBQcIBaAPDA0qLmxpbnV4ZnIu\n\
b3JnMA0GCSqGSIb3DQEBBQUAA4ICAQCZYHbyIeqVvh8cpK3fLEHQ9IR48hRACQux\n\
4w86C8gEO4AudfCkyCMtmzxB52pkS5XpEtW6Gc73QRYbfjcYrI60whvl+e3/5fAt\n\
l+9tNJku4kfVgikj6omPWrJ9yopZZFbQgr9Bx5uvsr5Fwa7xU0TW+QeytObKoN/b\n\
334KqsvrSuB+QeYaUi+fnLlxteSPv1YyOXmSuH8RxJc9K4MgyYlSFtHsznCDxezx\n\
N6cx09nzwwx0hR13JX0HHZEuc6vBE6kDATgCpJzhcrQDDxk8mDzjYg9mciXKwP7s\n\
M0lDz1EHonz8VEOt1wjqyNqdGXPSq+Jh+KiKHcrLG882vNk6v6A6bqDChFfils+J\n\
PDYdZvdrvozStou0jXgI4ETnBF+H6LeCanSAco89yrMImejGBlQp1hll0A+RzWSe\n\
F7xS8mAhavqYUNDntpgkk0ZyuLeGlSCkOwlMDWSMIp7r+m21Sa+eY/yxmvheNETK\n\
MaIq8ZkXZNdYgz7UU8oVZG/za7oIcnoBspa811cQJ+LL7luAV8k42F8ePHtszEeV\n\
XvIqk3tfSxqg874IDy++VguraiXaog+De1DPRzTmmVgd3wQKUWXPlGbnyEogGNj6\n\
LvfWMWHvlwJd6ubKD370YL64YwOFxYJ+Cg2JHgB6pU2Q1SmVEK8zRlS71OZNfg/j\n\
4KXRE1PlTw==\n\
-----END CERTIFICATE-----";

// ---- Add a certificate : uncomment the line after
//GekkotaAddCertificate(cert);


// ---------------------------------------
// ---- Other configuration
// ---------------------------------------

// ---- Date and time
// Fill the string by matching the date format: MMDDhhmmYYYY, MM: Month value, DD: day value, hh: hours value, mm: minutes value, YYYY: year value
// Warning: fill with the wished Coordinated Universal Time (UTC) date&time value
//setUtcTime("123123592020"); // (for 31 Dec 2020, 23h59 )

// ---- Choose hid Usage
//enableHidPointer();
//disableHidPointer();
//enableHidKeyboard();
//disableHidKeyboard();

// ---- Choose if clock synchronization is enabled : uncomment one of the 3 lines after
//setClockSyncDisable(); // ---- This one for disabling
//setClockSyncEnableNtp(); // ---- This one for enabling ntp
//setClockSyncEnablePtpLayer2(); // ---- This one for enabling ptp layer 2

// ---- if clock synchronization using ptp is enabled
//setClockSyncSetPtpDomain(0); // ---- Set ptp domain number (0-127)
//setClockSyncSetPtpTimeout(30); // ---- Set ptp timeout at startup (0-65535)


// ---- Set the color adjustment on display output
// depends on HW Chipset: check Gekkota release note if supported on your hw_platform
// display output index	"1","2",... (in case several connectors on the player)
// Brightness			0 to 100
// Brightness Max 		0 to 255
// Brightness enabled	true or false
// Contrast 			0 to 100
// Contrast Max 		0 to 127
// Contrast enabled		true or false
// Opacity				0 to 100
// Opacity Max			0 to 255
// Opacity enabled		true or false
// Gamma				0 to 100
// Gamma Max = 			1 to 100
// Color temperature 	2000 to 15000
// Grey filter Enable	true or false
// Grey filter ITURBT	"BT.601-7" or "BT.709-6"

// ---- Enable color adjustment configuration : uncomment the line after
// setColorAdjustment("1", 50, 90, true, 50, 70, true, 0, 255, true, 50, 10, 6500, false, "BT.601-7");


// ---------------------------------------
// ---- Audio/Video decoding configuration
// ---------------------------------------
// ---- Choose if support of decoding groups must be enabled, depending on the capability of your CMS : uncomment one of the 2 lines after
//setDecodingGroupIsEnable(true);  // ---- This one to authorize video multi-decoding (requires using of Screen Composer 3.12.20 or PlugnCast 3.10.39)
//setDecodingGroupIsEnable(false); // ---- This one to authorize video mono-decoding

// ---- Choose the default video renderer: overlay or gpu
//setDefaultVideoRenderer("overlay"); // default enhanced video processing mode to support properly Ultra HD video rendering and use enhanced hardware interlacing filter for TNT MpegTS video rendering
//setDefaultVideoRenderer("gpu"); // to enhance video transition and increase number of video decoding to more than 2 videos

// ---- Choose the maximum bitrate of the representation (= quality level) to be selected when playing Http Adaptive Streams (DASH)
//setHttpAdaptiveStreamingMaxBitrate(5);  // integer value in MBits/s

// ---- On DMB400, choose the maximum width of the screenshot. Aspect ratio of the display mode is conserved.
//setScreenshotMaxWidth(960); // integer value in pixels

// ----------------------------------------------------------------------------------
// ---- AVCmd: custom device profile example for toshiba_m1_custom
// for more information about other API, refer to Gekkota application note AVCmd
// ----------------------------------------------------------------------------------
let TVDeviceName="toshiba_m1_custom";
let TVDeviceProtocol=
{
    "name":"toshiba_m1_custom",
    "description":"Commands (on,off) for display TOSHIBA type AV/RV625D",
	"commands":
	[
		{
			"name":"power-mode_ON",
			"command":[
				"0x77","0x30","0x34","0x20","0x00","0x20","0x01","0x0D"
			]
		},
		{
			"name":"power-mode_OFF",
			"command":[
				"0x77","0x30","0x34","0x20","0x00","0x20","0x00","0x0D"
			]
		}
	]
};

// ----------------------------------------------------------------------------------
// ---- AVCmd: custom device profile example for samsung_m1_custom (supporting daisy chain by Id)
// for more information about other API, refer to Gekkota application note AVCmd
// ----------------------------------------------------------------------------------
let TVDeviceNameSamsungM1="samsung_m1_custom";
let TVDeviceProtocolSamsungM1=
{
   "name":"samsung_m1_custom",
   "description":"Commands (on,off,dvi,dtv,pc,hdmi)",
   "protocol":
   {
      "valueDeviceIdBroadcast":"0xFE"
   },
   "commands":
   [
      {
         "name":"power-mode_OFF",
         "command":["0xAA","0xF9","%ID","0x1","0x1","%SUM(1,-2)"]
      },
      {
         "name":"power-mode_ON",
         "command":["0xAA","0xF9","%ID","0x1","0x0","%SUM(1,-2)"]
      },
      {
         "name":"mute_ON_cust",
         "command":["0xAA","0x13","%ID","0x1","0x1","%SUM(1,-2)"]
      }
	]
};

// ----------------------------------------------------------------------------------
// ---- AVCmd: init installation for custom TV device protocol for serial profile
// ----------------------------------------------------------------------------------
// ---- Get the "av-cmd" from the uart_1 profile : uncomment the line after
// ---- Double check which player COM number (COM1 on uart1, COM2 on uart2... )
// ---- is used to control the TV set through the serial cable
// ---- and set the uart_n according to
//let avCmdSerial = AvCmdGetProfile("uart_1");
//let avCmdSerial = AvCmdGetProfile("uart_2");
//let avCmdSerial = AvCmdGetProfile("uart_3");

// ----------------------------------------------------------------------------------
// ---- AVCmd: activate and install a custom TV device protocol for serial profile
// ----------------------------------------------------------------------------------
// ---- Activate the serial profile : uncomment the line after
//AvCmdActivateProfile(avCmdSerial);
// ---- Install a protocol for the serial profile: uncomment the line after
//AvCmdInstallProtocol(avCmdSerial,TVDeviceName,TVDeviceProtocol);

// ----------------------------------------------------------------------------------
// ---- AVCmd: inactivate and uninstall a custom TV device protocol for serial profile
// ----------------------------------------------------------------------------------
// ---- Inactivate the serial profile : uncomment the line after
//AvCmdDesactivateProfile(avCmdSerial);
// ---- Uninstall custom device protocol for the serial profile: uncomment the line after
//AvCmdDesinstallProtocol(avCmdSerial,TVDeviceName);

// ----------------------------------------------------------------------------------
// ---- AVCmd: init installation for custom TV device protocol for TCP/IP profile
// ----------------------------------------------------------------------------------
// ---- Get the "av-cmd" from TCP/IP profile: uncomment the line after
//let avCmdTCPIP = AvCmdGetProfile("network");

// ----------------------------------------------------------------------------------
// ---- AVCmd: activate and install a custom TV device protocol for TCP/IP profile
// ----------------------------------------------------------------------------------
// ---- Activate the TCP/IP profile : uncomment the line after
//AvCmdActivateProfile(avCmdTCPIP);
// ---- Install a device protocol for the TCP/IP profile : uncomment the line after
//AvCmdInstallProtocol(avCmdTCPIP,TVDeviceName,TVDeviceProtocol);

// ----------------------------------------------------------------------------------
// ---- AVCmd: inactivate and uninstall a custom TV device protocol for TCP/IP profile
// ----------------------------------------------------------------------------------
// ---- Uninstall custom device protocol for the TCP/IP profile : uncomment the line after
//AvCmdDesinstallProtocol(avCmdTCPIP,TVDeviceName);
// ---- Inactivate the TCP/IP profile : uncomment the line after
//AvCmdDesactivateProfile(avCmdTCPIP);

// ----------------------------------------------------------------------------------
// ---- AVCmd: enable or disable DDC-CI profile on HDMI output
// ----------------------------------------------------------------------------------
//let avCmdDdcCi = AvCmdGetProfileWithInstance("i2c_1", "");
//AvCmdActivateProfile(avCmdDdcCi);
//AvCmdDesactivateProfile(avCmdDdcCi);

// ---- AVCmd: enable or disable DDC-CI features
//AvCmdIsActivatedPowerMode(avCmdDdcCi, true);
//AvCmdIsActivatedPowerMode(avCmdDdcCi, false);
//AvCmdIsActivatedVideoInput(avCmdDdcCi, true);
//AvCmdIsActivatedVideoInput(avCmdDdcCi, false);
//AvCmdIsActivatedVolume(avCmdDdcCi, true);
//AvCmdIsActivatedVolume(avCmdDdcCi, false);
//AvCmdIsActivatedMute(avCmdDdcCi, true);
//AvCmdIsActivatedMute(avCmdDdcCi, false);
//AvCmdIsActivatedBrightness(avCmdDdcCi, true);
//AvCmdIsActivatedBrightness(avCmdDdcCi, false);
//AvCmdIsActivatedBacklight(avCmdDdcCi, true);
//AvCmdIsActivatedBacklight(avCmdDdcCi, false);
//AvCmdIsActivatedCustomCommands(avCmdDdcCi, true);
//AvCmdIsActivatedCustomCommands(avCmdDdcCi, false);


// ----------------------------------------------------------------------------------
// ---- AVCmd: enable or disable CEC profile for TV on HDMI output
// ----------------------------------------------------------------------------------
//let avCmdCec = AvCmdGetProfileWithInstance("cec_1", "tv");
//AvCmdActivateProfile(avCmdCec);
//AvCmdDesactivateProfile(avCmdCec);

// ---- AVCmd: enable or disable CEC features
//AvCmdIsActivatedPowerMode(avCmdCec, true);
//AvCmdIsActivatedPowerMode(avCmdCec, false);
//AvCmdIsActivatedVideoInput(avCmdCec, true);
//AvCmdIsActivatedVideoInput(avCmdCec, false);

// ----------------------------------------------------------------------------------
// ---- GPIO: configuration
// ----------------------------------------------------------------------------------


// Select the GPIOs you want to configure, and comment/uncomment the correct lines


// GPIO1 : uncomment one line below corresponding to your choice
//setPhoenixGPIO("1", false, "in",  100000000);   // GPIO1 : Input, Debouncing 100ms
//setPhoenixGPIO("1", false, "in",  0);         // GPIO1 : Input, No Debouncing
//setPhoenixGPIO("1", true,  "in",  100000000); // GPIO1 : Input, Invert, Debouncing 100ms
//setPhoenixGPIO("1", true,  "in",  0);         // GPIO1 : Input, Invert, No Debouncing
//setPhoenixGPIO("1", false, "out", 0);         // GPIO1 : Output
//setPhoenixGPIO("1", false, "disable", 0);     // GPIO1 : Disable

// GPIO2 : uncomment one line below corresponding to your choice
//setPhoenixGPIO("2", false, "in",  100000000);   // GPIO2 : Input, Debouncing 100ms
//setPhoenixGPIO("2", false, "in",  0);         // GPIO2 : Input, No Debouncing
//setPhoenixGPIO("2", true,  "in",  100000000); // GPIO2 : Input, Invert, Debouncing 100ms
//setPhoenixGPIO("2", true,  "in",  0);         // GPIO2 : Input, Invert, No Debouncing
//setPhoenixGPIO("2", false, "out", 0);         // GPIO2 : Output
//setPhoenixGPIO("2", false, "disable", 0);     // GPIO2 : Disable

// GPIO3 : uncomment one line below corresponding to your choice
//setPhoenixGPIO("3", false, "in",  100000000);   // GPIO3 : Input, Debouncing 100ms
//setPhoenixGPIO("3", false, "in",  0);         // GPIO3 : Input, No Debouncing
//setPhoenixGPIO("3", true,  "in",  100000000); // GPIO3 : Input, Invert, Debouncing 100ms
//setPhoenixGPIO("3", true,  "in",  0);         // GPIO3 : Input, Invert, No Debouncing
//setPhoenixGPIO("3", false, "out", 0);         // GPIO3 : Output
//setPhoenixGPIO("3", false, "disable", 0);     // GPIO3 : Disable

// GPIO4 : uncomment one line below corresponding to your choice
//setPhoenixGPIO("4", false,  "in", 100000000);   // GPIO4 : Input, Debouncing 100ms
//setPhoenixGPIO("4", false, "in",  0);         // GPIO4 : Input, No Debouncing
//setPhoenixGPIO("4", true,  "in",  100000000); // GPIO4 : Input, Invert, Debouncing 100ms
//setPhoenixGPIO("4", true,  "in",  0);         // GPIO4 : Input, Invert, No Debouncing
//setPhoenixGPIO("4", false, "out", 0);         // GPIO4 : Output
//setPhoenixGPIO("4", false, "disable", 0);     // GPIO4 : Disable

// GPIO5 : uncomment one line below corresponding to your choice
//setPhoenixGPIO("5", false, "in",  100000000);   // GPIO5 : Input, Debouncing 100ms
//setPhoenixGPIO("5", false, "in",  0);         // GPIO5 : Input, No Debouncing
//setPhoenixGPIO("5", true,  "in",  100000000); // GPIO5 : Input, Invert, Debouncing 100ms
//setPhoenixGPIO("5", true,  "in",  0);         // GPIO5 : Input, Invert, No Debouncing
//setPhoenixGPIO("5", false, "out", 0);         // GPIO5 : Output
//setPhoenixGPIO("5", false, "disable", 0);     // GPIO5 : Disable

// GPIO6 : uncomment one line below corresponding to your choice
//setPhoenixGPIO("6", false, "in",  100000000);   // GPIO6 : Input, Debouncing 100ms
//setPhoenixGPIO("6", false, "in",  0);         // GPIO6 : Input, No Debouncing
//setPhoenixGPIO("6", true,  "in",  100000000); // GPIO6 : Input, Invert, Debouncing 100ms
//setPhoenixGPIO("6", true,  "in",  0);         // GPIO6 : Input, Invert, No Debouncing
//setPhoenixGPIO("6", false, "out", 0);         // GPIO6 : Output
//setPhoenixGPIO("6", false, "disable", 0);     // GPIO6 : Disable

// Jack GPIO : uncomment one line below corresponding to your choice
//setJackGPIO(false, "in",  100000000);   		// Jack GPIO : Input, Debouncing 100ms
//setJackGPIO(false, "in",  0);         		// Jack GPIO : Input, No Debouncing
//setJackGPIO(true,  "in",  100000000); 		// Jack GPIO : Input, Invert, Debouncing 100ms
//setJackGPIO(true,  "in",  0);         		// Jack GPIO : Input, Invert, No Debouncing
//setJackGPIO(false, "out", 0);         		// Jack GPIO : Output
//setJackGPIO(false, "disable", 0);     		// Jack GPIO : Disable, Enable Infrared

// Set UART to hangle USB to WPAN adapter
setUartForUSB2WPANAdapter();

// ----------------------------------------------------------------------------------
// ---- Slate106 Pairing configuration
// ----------------------------------------------------------------------------------
// ---- This configuration is permitting to configure one or several hub SMH300 with the same USB stick.
// ---- In case multiple Hub configuration, each SMH300 is identified by its MAC address.
// ---- For the configuration of only one Hub SMH300, it is possible to let mac address empty (value : "")
// ---- Please do respect the PSN format 00900-XXXXX else the configuration will not work.

// ---- Uncomment this block to pair and configure Slates for any SMH300


/*var WpanHubServerConfiguration =
{
	"": {
		"pictureframe.vibration_sensor.enabled": false,
		"pictureframe.key.enabled": false,
		"pictureframe.wakeup.heartbeat.enabled": true,
		"pictureframe.wakeup.heartbeat.mode": "quarter",
		"pictureframe.wakeup.heartbeat.period": 15,
		"pictureframe.wakeup.day.interval": "T0800/T1900",
		"pictureframe.wakeup.weekdays.mask": 31,
		"pictureframe.wpan.enabled": true,
		"pictureframe.overlay.message.enabled": false,
		"pictureframe.action.delay1": 2500,
		"pictureframe.picture.filename": "hub.ppk",
		"pictureframe.key.picture.duration": 60,
		"pictureframe.after_usb_ms_actions.mask": 1024,
		"pictureframe.after_heartbeat_actions.mask": 1024,
		"pictureframe.after_nfc_writer_actions.mask": 32,
		"pictureframe.after_nfc_tag_actions.mask": 17,
		"pictureframe.after_key_actions.mask": 1092,
		"pictureframe.after_vibration_actions.mask": 512,
		"pictureframe.after_testcard_actions.mask": 1024,
		"pictureframe.action.key_lock.idle_time": 5,
		"pictureframe.action.delay2": 2500,
		"pictureframe.key.left.map": 268435456,
		"pictureframe.key.middle.map": 536870912,
		"pictureframe.key.right.map": 805306368,
		"pictureframe.wakeup.timer.enabled": false,
		"pictureframe.wakeup.timer.period": 30,
		"pictureframe.wakeup.timer.max_repeat":3,
		"pictureframe.after_timer_actions.mask":1024,
		"pictureframe.nfc.tag.protocol":0,
		"pictureframe.nfc.enabled":false,
		"devices": {
			"00900-00016": {
				"pictureframe.index": 1,
				"pictureframe.hostname": "new-york",
				"pictureframe.wpan1.authentication.method": "none",
				"pictureframe.wpan1.authentication.pincode": 0,
				"pictureframe.wpan2.authentication.method": "pincode",
				"pictureframe.testcard.enabled": true,
				"pictureframe.display.mode": 0,
			},
			"00900-00078": {
				"pictureframe.index": 3,
				"pictureframe.hostname": "munich",
				"pictureframe.wpan1.authentication.method": "pincode",
				"pictureframe.wpan1.authentication.pincode": 1234,
				"pictureframe.wpan2.authentication.method": "pincode",
				"pictureframe.testcard.enabled": true,
				"pictureframe.display.mode": 0,
			}
		}
	}
};
SetWpanHubServerConfiguration(WpanHubServerConfiguration);*/


// ---- Uncomment this block to configure common parameters for any SMH300


/*var WpanHubServerConfiguration =
{
	"": {
		"pictureframe.vibration_sensor.enabled": false,
		"pictureframe.key.enabled": false,
		"pictureframe.wakeup.heartbeat.enabled": true,
		"pictureframe.wakeup.heartbeat.mode": "quarter",
		"pictureframe.wakeup.heartbeat.period": 15,
		"pictureframe.wakeup.day.interval": "T0800/T1900",
		"pictureframe.wakeup.weekdays.mask": 31,
		"pictureframe.wpan.enabled": true,
		"pictureframe.overlay.message.enabled": false,
		"pictureframe.action.delay1": 2500,
		"pictureframe.picture.filename": "hub.ppk",
		"pictureframe.key.picture.duration": 60,
		"pictureframe.after_usb_ms_actions.mask": 1024,
		"pictureframe.after_heartbeat_actions.mask": 1024,
		"pictureframe.after_nfc_writer_actions.mask": 32,
		"pictureframe.after_nfc_tag_actions.mask": 17,
		"pictureframe.after_key_actions.mask": 1092,
		"pictureframe.after_vibration_actions.mask": 512,
		"pictureframe.after_testcard_actions.mask": 1024,
		"pictureframe.action.key_lock.idle_time": 5,
		"pictureframe.action.delay2": 2500,
		"pictureframe.key.left.map": 268435456,
		"pictureframe.key.middle.map": 536870912,
		"pictureframe.key.right.map": 805306368,
		"pictureframe.wakeup.timer.enabled": false,
		"pictureframe.wakeup.timer.period": 30,
		"pictureframe.wakeup.timer.max_repeat":3,
		"pictureframe.after_timer_actions.mask":1024,
		"pictureframe.nfc.tag.protocol":0,
		"pictureframe.nfc.enabled":false
	}
};
SetWpanHubServerConfiguration(WpanHubServerConfiguration);*/


// ----Slate Pairing configuration parameters explanation
// Configuration example with comments for the Mac address specified. Key values are the default ones.
// Mac address of the SMH the specific Slate Hub Server configuration below is for.
// DO NOT UNCOMMENT THIS BLOCK
/*"00-1C-E6-02-28-D6": {
	// 								****** Common configuration for every Slates paired to the SMH with the above Mac address ******
	//    Explanation : Enables the vibration sensor feature.
	//    Possibles values : true, false
	"pictureframe.vibration_sensor.enabled": false,
	//    Explanation : Enables the keys detection feature.
	//    Possibles values : true, false
	"pictureframe.key.enabled": false,
	//    Explanation : Enables the wakeup by heartbeat.
	//    Possibles values : true, false
	"pictureframe.wakeup.heartbeat.enabled": true,
	//    Explanation : Heartbeat time wakeup mode, usefull only if pictureframe.wakeup.heartbeat.enabled=true.
	//					"period": time-relative wakeup, which doesn’t need date/time set.
	//					"quarter": time absolute wakeup. The wakeup occurs only at each quarter of an hour.
	//    Possibles values : "period", "quarter"
	"pictureframe.wakeup.heartbeat.mode": "quarter",
	//    Explanation : Defines the period if pictureframe.wakeup.heartbeat.mode = "period".
	//    Possibles values : 15 to 1440
	"pictureframe.wakeup.heartbeat.period": 15,
	//    Explanation : Pictureframe active time interval. During this time interval, Pictureframe enables the wakeup by heartbeat time ("period" or "quarter"), or by vibration.
	// 					These wakeup are inhibited outside of this period. USB connection/disconnection is always valid, and isn’t affected by this key.
	//					This interval is ISO8601, but limited to hour:minute. Use only a simplified representation without ‘ :’.
	//					Use only start and end, no duration. ‘T2400’ is not authorized as start, but authorized as end.
	//					Example :
	//					T0800/T1702 = 8h00 to 17h02
	//					T1702/T0800 = 17h02 to 8h00 the next day
	//					/T1702 = 0h00 to 17h02
	//					T0800/ = 08h00 to 24h00.
	//    Possibles values : Any valid interval (see explanation). 11 characters max, 6 characters min. ‘0’ to ‘9’, ‘T’ and ‘/’.
	"pictureframe.wakeup.day.interval": "T0800/T1900",
	//    Explanation : Defines the active days, on which the key pictureframe.wakeup.day.interval is applied. Other days are inactive.
	//					1 => Monday
	//					2 => Tuesday
	//					4 => Wednesday
	//					8 => Thursday
	//					16 => Friday
	//					32 => Saturday
	//					64 => Sunday
	//					Add each number corresponding to the active day, to obtain the key.
	//					Example :
	//					31 value represents active days from Monday to Friday included.
	//    Possibles values : 1 to 127
	"pictureframe.wakeup.weekdays.mask": 31,
	//    Explanation : Enables the wpan feature.
	//    Possibles values : true, false
	"pictureframe.wpan.enabled": true,
	//    Explanation : Enables the message overlay feature.
	//    Possibles values : true, false
	"pictureframe.overlay.message.enabled": false,
	//    Explanation : Delay in ms which can be used during any action group
	//    Possibles values : 1 to 5000
	"pictureframe.action.delay1": 2500,
	//    Explanation : Picture filename used to display image.
	//    				This filename serves too as the filename requested during a ble connection to the ble central. During display,
	//   				if the picture is invalid (or absent), Pictureframe will display a white screen instead.
	//    Possibles values : 12 characters max, 5 characters min, must end by ".ppk" (case insensitive).
	//					 	 Characters authorized:
	// 						 ‘a’ to ‘z’, ‘A’ to ‘Z’, ‘0’ to ‘9’, ‘!’, ‘#’, ‘$’, ‘%’, ‘&’, ‘'’, ‘(‘, ‘)’, ‘-‘, ‘@’, ‘^’, ‘_’, ‘`’, ‘{‘, ‘}’, ‘~’, ‘.’.
	"pictureframe.picture.filename": "hub.ppk",
	// 								****** Specific configuration for every Slates paired to the SMH with the above Mac address ******
	// List of devices paired to this Slate Hub Server filtered by their Product Serial Number
	// This key can be removed so only the common configuration parameters are set for this SMH300
	"devices": {
		// Example Pruduct Serial Number (PSN) of a Slate
		"00900-00077": {
			"pictureframe.index": 1,
			//    Explanation : Defines the Slate Bluetooth device name.
			//    Possibles values : 8 characters max, 0 character min, with <hostname> constraints: ‘a’ to ‘z’, ‘A’ to ‘Z’, ‘0’ to ‘9’, ‘-‘ and ‘.’.
			//						 The characters ‘-‘ and ‘.’ Don’t have the right to be the first or the last.
			"pictureframe.hostname": "slate106",
			//    Explanation : Authentication method used for WPAN1 connexions.
			//					"none" = any authorized WPAN host is accepted.
			//					"pincode" = pictureframe accepts any authorized WPAN host which pincode = pictureframe.wpan1.authentication.pincode.
			//    Possibles values : "none", "pincode".
			"pictureframe.wpan1.authentication.method": "none",
			//    Explanation : Defines the pincode used for WPAN1 connexions, if pictureframe.wpan1.authentication.method = "pincode".
			//					The pincode is a 4-digits number (not less), but as this type is not defined, an unsigned int is used instead, so when pincode="0001", the key will be ="1".
			//    Possibles values : 0 to 9999
			"pictureframe.wpan1.authentication.pincode": 0,
			//    Explanation : Displays the testcard instead of image/message overlay.
			//    Possibles values : true, false
			"pictureframe.testcard.enabled": true,
		}
	}
},
// Key values might not be the default ones in the example below.
// This configuration example shows a configuration for more than one Slate
// Mac address of the SMH the specific Slate Hub Server configuration below is for.
"00-1D-E6-12-28-D8": {
	"picture.filename": "hub.ppk",
	"wpan.enabled": true,
	"wakeup.heartbeat.enabled": true,
	"wakeup.heartbeat.mode": "quarter",
	"wakeup.heartbeat.period": 15,
	"wakeup.day.interval": "T0700/T1830",
	"wakeup.weekdays.mask": 30,
	"key.enabled": true,
	"overlay.message.enabled": true,
	"vibration_sensor.enabled": true,
	"action.delay1": 1000,
	"devices": {
		"00900-00016": {
			"pictureframe.index": 1,
			"pictureframe.hostname": "new-york",
			"pictureframe.wpan1.authentication.method": "none",
			"pictureframe.wpan1.authentication.pincode": 0,
			"pictureframe.testcard.enabled": false,
		},
		"00900-00078": {
			"pictureframe.index": 3,
			"pictureframe.hostname": "munich",
			"pictureframe.wpan1.authentication.method": "pincode",
			"pictureframe.wpan1.authentication.pincode": 1234,
			"pictureframe.testcard.enabled": false,
		},
		"00900-00264": {
			"pictureframe.index": 5,
			"pictureframe.hostname": "london",
			"pictureframe.wpan1.authentication.method": "pincode",
			"pictureframe.wpan1.authentication.pincode": 8884,
			"pictureframe.testcard.enabled": true,
		}
	}
}
*/

/*var WpanHubServerPushButtonEnOceanConfiguration =
{
	"": {
		"devices": {
			"E215000062DC": {
        "id": 2
      },
			"E215000062DD": {
        "id": 7
      }
		}
	}
};
SetHubServerPushButton(WpanHubServerPushButtonEnOceanConfiguration);*/


/*var WpanHubServerSensorConfiguration =
{
  "": {
    "devices": {
      "E500000002ED": {
        "id": 1
      },
      "E500000001ED": {
        "id": 5
      }
    }
  }
};
SetHubServerSensor(WpanHubServerSensorConfiguration);*/

// ----------------------------------------------------------------------------------
// ---- dme204 specific configuration
// ----------------------------------------------------------------------------------
// ---- This configuration allows to configure encoder and/or streamer on the dme204 platform.

//setEncoderVideo("1280x720 (HD)", 30);                //  resolution ("1280x720 (HD)"/"1024x768"/"1024x576"/"720x576 (PAL)"/"720x480 (NTSC)"/"352x288 (CIF)"/"176x144 (QCIF)"), framerate (25/30/50/60)
//setEncoderVideoH264("high", "4", "CABAC");           //  profile ("main"/"high"/"baseline"), level ("1.2"/"1.3"/"2"/"2.1"/"2.2"/"3.1"/"3.2"/"4"/"4.1"/"4.2"), vlc-mode ("CABAC"/"CAVLC")

//setEncoderVideoBitrateConst(10000);                   //  bitrate (1000 to 24000)
//setEncoderVideoBitrateVariable(10000, 15000);        //  bitrate (1000 to 23999), bitrate peak (1001 to 24000), bitrate < bitrate peak

//enableEncoderAudio ("MPEG1 Layer2");                 //  codec ("MPEG1 Layer2"/"MPEG4 AAC-LC")
//disableEncoderAudio ();                              //  none

//setEncoderAudioBitrateConst(256);                    //  MPEG1 Layer 2: bitrates (64/96/112/128/160/192/224/256/320/384)
//setEncoderAudioBitrateVariable(300, 500);		 // MPEG4 AAC-LC: bitrate (128 to 511), bitrate peak (129 to 512), bitrate < bitrate peak

//setEncoderService("Qeedji TV", 257, "Innes TV");      //  service name, service ID (1 to 65535), service provider name

//setEncoderNetwork("Qeedji Network", 8442);            //  network name, network ID (0 to 65535)

//setEncoderTransportStream(1);                        //  transport stream ID (0 to 65535)

//setEncoderLcn(1);                                    //  logical channel number (1 to 999)

//setEncoderNitVersion(26);                            //  nit table version (0 to 31)

//enableEncoderVisibleService();                       //  none
//disableEncoderVisibleService();                      //  none

//enableEncoderMultiServices();                        //  none
//disableEncoderMultiServices();                       //  none

//setStreamerOutputASI();                              //  none
//setStreamerOutputEthernet();                         //  none
//enableStreamerProtocolUdp("224.1.2.3", 1234, 7, 64); //  destination IP address, destination port, number of TS packet per IP (1 to 7), time to live (1 to 255)

//enableStreamerProtocolRtp("224.1.2.3", 1234, 7, 64); //  destination IP address, destination port, number of TS packet per IP (1 to 7), time to live (1 to 255)
//enableStreamerProtocolRtmp("192.168.1.16/live", "myStream"); // RTMP server, stream key
//setStreamerAudioSamplerate(48000);				   //  audio samplerate at streamer output (44100/48000)
//enableMulticastOutputOnLAN1();                       // none
//enableMulticastOutputOnLAN2();                       // none
//enableMulticastOutputOnLAN1LAN2();                   // none

// ----------------------------------------------------------------------------------
// ---- Playlog: configure the playlog feature which allows to write all day long some events information in a `Playlog` reporting file which is daily sent on a WebDAV server
// ----------------------------------------------------------------------------------
// ---- Uncomment this line enables the Playlog feature with a standard configuration
//setPlaylog("http://<webdav_server_ip_addr>/...", "login", "password", "23:30");  // URL of the remote WebDAV server, username of the remote WebDAV server, password of the remote WebDAV server, time of the daily file sending
// ---- Uncomment this line enables the Playlog feature with an extended configuration
//setPlaylogExtended("http://<webdav_server_ip_addr>/...", "login", "password", "23:00", 20, 5, 60, 10);  // URL of the remote WebDAV server, username of the remote WebDAV server, password of the remote WebDAV server, time of the daily file sending, time interval for recording events in memory in the local file (minutes), maximum retry number in case of failure to send the event file, waiting time between retry (secondes), maximum value of the random delay added at the time of deposit (secondes).
// ---- Uncomment this line disables the Playlog feature
//disablePlaylog();

// ----------------------------------------------------------------------------------
// ---- PowerManager: configure the power manager energie profiles
// Parameter 1 : Energie profiles: "min" (low power), "low", "high", "max" (high power)
// Parameter 2 : Screen standby : 0: standby, 1: ON
// Parameter 3 : Sound: true muted; false: unmuted
// Parameter 4 : Volume: from 0: min. volume to 100: max. volume
// Parameter 5 : Brightness: from 0: min. brightness to 100: max. brightness
// Parameter 6 : Backlight: from 0: min. backlight to 100: max. backlight
// Parameter 7 : Opacity: from 0: min. opacity to 100: max. opacity
// ----------------------------------------------------------------------------------
// ---- Uncomment the appropriate 4 lines to configure the different values for the required energy profile
// setPowerManagerLevels("min" , 0,  true,   0,   0,   0, 100);
// setPowerManagerLevels("low" , 1, false,  10,  10,  10,  80);
// setPowerManagerLevels("high", 1, false,  80,  80,  80,  20);
// setPowerManagerLevels("max" , 1, false, 100, 100, 100,   0);

// ----------------------------------------------------------------------------------
// ---- PowerManager: set the delay between 2 consecutive AV commands
// Parameter 1 : delay in ms
// ----------------------------------------------------------------------------------
// setPowerManagerAvcmdDelay(150);

// ----------------------------------------------------------------------------------
// ---- PowerManager: add a power manager standby task
// Example of variable corresponding to a "Power manager standby task1" allowing to set your device in low power (MIN) every day from 20:15 to 7:15 the day after
// Possible value for X-POWER-MANAGER-LEVEL: MIN, LOW, HIGH or MAX
// The best practise here is to create the task in the WebUI (Gekkota 4.12.10 or above), and copy here the value of the user preference innes.power-manager.calendar. Then add the appropriate \n\ at the end of each carriage return. For further information, contact support@qeedji.tech
// ----------------------------------------------------------------------------------
let powerManagerCalendar="\n\
BEGIN:VCALENDAR\n\
VERSION:1.0\n\
BEGIN:VEVENT\n\
SUMMARY:Power manager task1\n\
X-POWER-MANAGER-LEVEL:MIN\n\
DTSTART:20190808T201500\n\
DTEND:20190809T071500\n\
RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR,SA,SU;UNTIL=20300907T235959\n\
END:VEVENT\n\
END:VCALENDAR\n\
";
// ---- Uncomment this line to define the calendar of power manager
//setPowerManagerCalendar(powerManagerCalendar);

// ----------------------------------------------------------------------------------
// ---- RebootManager: add a reboot manager task
//
// The best practise here is to create the task in the WebUI (Gekkota 4.13.10 or above), and copy here the value of the user preference innes.reboot-manager.calendar. Then add the appropriate \n\ at the end of each carriage return. For further information, contact support@qeedji.tech
// ----------------------------------------------------------------------------------
let rebootManagerCalendar="\n\
BEGIN:VCALENDAR\n\
VERSION:1.0\n\
BEGIN:VEVENT\n\
SUMMARY:Reboot manager task1\n\
DTSTART:20190808T050000\n\
DURATION:5S\n\
RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR,SA,SU;UNTIL=20300907T235959\n\
END:VEVENT\n\
END:VCALENDAR\n\
";
// ---- Uncomment this line to define the calendar of power manager
//setRebootManagerCalendar(rebootManagerCalendar);

// ---- Save any previous preference changed : DO NOT COMMENT THE FOLLOWING LINE !!!
Services.prefs.savePrefFile(null);

// ---------------------------------------
// ---------------------------------------
// ---- END of the user configuration
// ---------------------------------------
// ---------------------------------------




























// ---- Functions section

/**
 * Configuring a Plugncast G2 server.
 * @param aBaseuri : baseuri of Plugncast server
 * @param aHeartbeat : heartbeat of download in minutes */
function setPlugnCastG2 (aBaseuri, aHeartbeat) {
	let unexistantPref = false;
	Services.prefs.setCharPref("innes.app-profile.manifest-downloader.*.*.*.class-name", "g2");
    let basepref="innes.app-profile.manifest-downloader:g2.*.*.*.";
	Services.prefs.setBoolPref(basepref + "authorized", true);
    if (aHeartbeat <= 0)
	   aHeartbeat = 1;
	Services.prefs.setIntPref(basepref + "heartbeat", aHeartbeat*60);
	if (aBaseuri.charAt(aBaseuri.length-1) == '/')     {
       aBaseuri = aBaseuri.substr(0,aBaseuri.length-1);
	   log ("setPlugnCastG2 after aBaseuri = " + aBaseuri);
    }
    if (aBaseuri.lastIndexOf("ftp:") == 0) {
        Services.prefs.setCharPref(basepref + "base-uri", aBaseuri);
        let adr=aBaseuri.substr(4);
        Services.prefs.setCharPref(basepref + "wsman.base-uri",
		    "http:" + adr + "/wsman");
    }
	else {
        Services.prefs.setCharPref(basepref + "base-uri",
		    aBaseuri + "/plugnCast/");
        Services.prefs.setCharPref(basepref + "wsman.base-uri",
		    aBaseuri + "/wsman");
    }

	try {
		let webdav_mode = Services.prefs.getCharPref("innes.webui.servers.wizard.mode");
	} catch(e) {
		unexistantPref = true;
	}

	if (unexistantPref == false) 	{
		Services.prefs.setCharPref("innes.webui.servers.wizard.mode", "g2");
	}
}
/**
 * Disable a Plugncast G2 server.  */
function disablePlugnCastG2 () {
	let unexistantPref = false;
	let basepref="innes.app-profile.manifest-downloader:g2.*.*.*.";
	Services.prefs.setBoolPref(basepref + "authorized", false);

	setAppModePush();








}

/**
 * Configuring a Plugncast G3 server.
 * @param aBaseuri : baseuri of Plugncast server
 * @param aHeartbeat : heartbeat of download in minutes
 * @param aUsername : username for authentication
 * @param aPassword : password for authentication
 * @param  aPasswordCrypted : indicate if the passsword is crypted or not
 */
function setPlugnCastG3 (aBaseuri, aHeartbeat, aUsername, aPassword, aPasswordCrypted) {
	let unexistantPref = false;
	Services.prefs.setCharPref("innes.app-profile.manifest-downloader.*.*.*.class-name", "g3");
    let basepref="innes.app-profile.manifest-downloader:g3.*.*.*.";
	Services.prefs.setBoolPref(basepref + "authorized", true);
    if (aHeartbeat <= 0)
	   aHeartbeat = 1;
	Services.prefs.setIntPref(basepref + "heartbeat", aHeartbeat*60);
    Services.prefs.setCharPref(basepref + "base-uri", aBaseuri);
    Services.prefs.setCharPref(basepref + "username", aUsername);
    Services.prefs.setCharPref(basepref + "password", aPassword);
	if (aPasswordCrypted == undefined)
		aPasswordCrypted = false;
	Services.prefs.setBoolPref(basepref + "password-crypted", aPasswordCrypted);

	try {
		let webdav_mode = Services.prefs.getCharPref("innes.webui.servers.wizard.mode");
	} catch(e) {
		unexistantPref = true;
	}

	if (unexistantPref == false) {
		Services.prefs.setCharPref("innes.webui.servers.wizard.mode", "manual");
	}
}
/**
 * Disable a Status server.  */
function disableStatusServer () {
    let basepref="innes.launcher.status.";
	Services.prefs.setBoolPref(basepref + "enabled", false);
}
/**
 * Configuring a Status server.
 * @param aBaseuri : baseuri of Status server
 * @param aHeartbeat : heartbeat of download in minutes
 * @param aUsername : username for authentication
 * @param aPassword : password for authentication
 * @param  aPasswordCrypted : indicate if the passsword is crypted or not
 */
function setStatusServer (aBaseuri, aHeartbeat, aUsername, aPassword, aPasswordCrypted) {
    let basepref="innes.launcher.status.";
	Services.prefs.setBoolPref(basepref + "enabled", true);
    if (aHeartbeat <= 0)
	   aHeartbeat = 1;
	Services.prefs.setIntPref(basepref + "heartbeat", aHeartbeat*60);
    Services.prefs.setCharPref(basepref + "base-uri", aBaseuri);
    Services.prefs.setCharPref(basepref + "username", aUsername);
    Services.prefs.setCharPref(basepref + "password", aPassword);
	if (aPasswordCrypted == undefined)
		aPasswordCrypted = false;
	Services.prefs.setBoolPref(basepref + "password-crypted", aPasswordCrypted);
}
/**
 * Disable the addon manager.  */
function disableAddonManager () {
    let basepref="innes.app-profile.addon-manager.*.*.*.";
	Services.prefs.setBoolPref(basepref + "authorized", false);
}
/**
 * Disable a Addon server.  */
function disableAddonServer () {
    let basepref="innes.app-profile.addon-manager.*.*.*.http-downloader.";
	Services.prefs.setBoolPref(basepref + "enabled", false);
}
/**
 * Configuring a addon server.
 * @param aBaseuri : baseuri of addon server
 * @param aHeartbeat : heartbeat of download in minutes
 * @param aUsername : username for authentication
 * @param aPassword : password for authentication
 * @param  aPasswordCrypted : indicate if the passsword is crypted or not
 */
function setAddonServer (aBaseuri, aHeartbeat, aUsername, aPassword, aPasswordCrypted) {
    let basepref="innes.app-profile.addon-manager.*.*.*.";
	Services.prefs.setBoolPref(basepref + "authorized", true);
	basepref += "http-downloader.";
	Services.prefs.setBoolPref(basepref + "enabled", true);
    if (aHeartbeat <= 0)
	   aHeartbeat = 1;
	Services.prefs.setIntPref(basepref + "heartbeat", aHeartbeat*60);
    Services.prefs.setCharPref(basepref + "base-uri", aBaseuri);
    Services.prefs.setCharPref(basepref + "username", aUsername);
    Services.prefs.setCharPref(basepref + "password", aPassword);
	if (aPasswordCrypted == undefined)
		aPasswordCrypted = false;
	Services.prefs.setBoolPref(basepref + "password-crypted", aPasswordCrypted);
}
/**
 * Disable a Plugncast G3 server.  */
function disablePlugnCastG3 () {
    let unexistantPref = false;
	let basepref="innes.app-profile.manifest-downloader:g3.*.*.*.";
	Services.prefs.setBoolPref(basepref + "authorized", false);

	setAppModePush();








}

/**
 * Set and active the maximun bitrate value for a network adapter.
 * @param aAdapter : the network adapter to be modified
 * @param aMaxBirateValue : the maximun bitrate value in kbps */
 function setMaxBitrateValue(aAdapter, aMaxBirateValue) {
	if (!aAdapter.isMaxBitrateSupported)
		return;
    aAdapter.isMaxBitrateEnabled = true;
    aAdapter.maxBitrateValue = aMaxBirateValue;
 }
/**
 * Disable the maximun bitrate feature. */
 function disableMaxBitrate(aAdapter) {
 	if (!aAdapter.isMaxBitrateSupported)
		return;
    aAdapter.isMaxBitrateEnabled = false;
 }
/**
 * Disable the maximun bitrate feature. */
 function enableMaxBitrate(aAdapter) {
 	if (!aAdapter.isMaxBitrateSupported)
		return;
    aAdapter.isMaxBitrateEnabled = true;
 }

/**
 * Select activation of 802.1X security and EAP method. */
function setLanSecurity(aAdapter, aSecurity, aMethod) {
	aAdapter.setConnectionSettings(aSecurity, { method: aMethod });
}

/**
 * Enable the DHCP for IPv4.
 * @param aAdapter : the network adapter to be modified */
 function enableDhcpv4(aAdapter) {
    aAdapter.isDhcpv4Enabled=true;
 }
/**
 * Disable the DHCP for IPv4. Use static IPV4 adress.
 * @param aAdapter : the network adapter to be modified */
 function disableDhcpv4(aAdapter) {
    aAdapter.isDhcpv4Enabled=false;
 }
/**
 * Set the static IPV4 adress for a network adapter.
 * @param aAdapter : the network adapter to be modified
 * @param aAdress : the string for the IP adress
 * @param aNetmask : the string for the netmask
 * @param aGateway : the string for the gateway adress */
 function setIPv4StaticAddress(aAdapter,aAdress,aNetmask,aGateway) {
    aAdapter.setIpv4Address(
	   createIPv4Adress(aAdress),
	   createIPv4Adress(aNetmask),
	   createIPv4Adress(aGateway),
	   Ci.nsISystemAdapterIP.METRIC_AUTOMATIC);
 }
/**
 * Enable the UPnP discover gateway.
 * Not that if DHCP for IPv4 is enabled, the gateway will be defined by DHCP, not by UPnP.
 * @param aAdapter : the network adapter to be modified */
 function enableGatewayUpnp(aAdapter) {
    aAdapter.isGatewayUPnPDiscovered=true;
 }
/**
 * Disable the UPnP discover gateway.
 * @param aAdapter : the network adapter to be modified */
 function disableGatewayUpnp(aAdapter) {
    aAdapter.isGatewayUPnPDiscovered=false;
 }
/**
 * Enable the DHCP for DNS.
 * @param aAdapter : the network adapter to be modified */
 function enableDnsDhcp(aAdapter) {
    aAdapter.isDnsDhcpEnabled=true;
 }
/**
 * Disable the DHCP for DNS. Use static DNS
 * @param aAdapter : the network adapter to be modified */
 function disableDnsDhcp(aAdapter) {
    aAdapter.isDnsDhcpEnabled=false;
 }
/**
 * Set the primary, secondary and suffixes DNS server for a network adapter.
 * @param aAdapter : the network adapter to be modified
 * @param aDns1 : the string adress for the primary DNS server
 * @param aDns2 : the string adress for the secondary DNS server
 * @param aSuffix : the string DNS suffix
*/
function setDns(aAdapter,aDns1,aDns2,aSuffix) {
	aAdapter.setDns(createIPv4Adress(aDns1),createIPv4Adress(aDns2));
	aAdapter.dnsSuffixList = aSuffix;
}
/**
 * Set the IGMP version for a network adapter.
 * @param aAdapter : the network adapter to be modified
 * @param aValue : the version
*/
function setIgmpVersion(aAdapter,aValue) {
   aAdapter.igmpVersion=aValue;
}
/**
 * Enable the WLAN.
 * @param aAdapter : the network adapter to be modified */
 function enableWLan(aAdapter) {
    aAdapter.isEnabled=true;
 }
/**
 * Disable the WLAN.
 * @param aAdapter : the network adapter to be modified */
 function disableWLan(aAdapter) {
    aAdapter.isEnabled=false;
 }
/**
 * Set the mode adhoc for a WLAN network adapter.
 * @param aSsid : the string for the SSID
 * @param aChannel : the channel */
 function setWLanModeAdhoc(aAdapter,aSsid,aSSidHidden,aChannel) {
    aAdapter.setAdvancedConnectionSettings(aSsid,aSSidHidden,Ci.nsISystemAdapterWLAN.MODE_ADHOC,aChannel,Ci.nsISystemAdapterWLAN.SECURITY_NONE,{},{});
 }
/**
 * Set the mode infra without security for a WLAN network adapter.
 * @param aSsid : the string for the SSID */
 function setWLanModeInfra(aAdapter,aSsid,aSSidHidden) {
    aAdapter.setAdvancedConnectionSettings(aSsid,aSSidHidden,Ci.nsISystemAdapterWLAN.MODE_INFRA,0,Ci.nsISystemAdapterWLAN.SECURITY_NONE,{},{});
 }
/**
 * Set the mode infra with security for a WLAN network adapter.
 * @param aSsid : the string for the SSID
 * @param aSecurity : the security
 * @param aKey : the string for the security key */
 function setWLanModeInfraWithKey(aAdapter,aSsid,aSSidHidden,aSecurity,aPairwise,aGroup,aKey) {
	if (aSecurity == "WEP") {
		aAdapter.setAdvancedConnectionSettings(aSsid,aSSidHidden,Ci.nsISystemAdapterWLAN.MODE_INFRA,0,Ci.nsISystemAdapterWLAN.SECURITY_WEP,{},{ key: aKey });
		return;
	}
	if (aSecurity == "WPA") {
		aAdapter.setAdvancedConnectionSettings(aSsid,aSSidHidden,Ci.nsISystemAdapterWLAN.MODE_INFRA,0,Ci.nsISystemAdapterWLAN.SECURITY_WPA,{},{ pairwise: aPairwise, group: aGroup, key: aKey });
		return;
	}
	if (aSecurity == "WPA2") {
		aAdapter.setAdvancedConnectionSettings(aSsid,aSSidHidden,Ci.nsISystemAdapterWLAN.MODE_INFRA,0,Ci.nsISystemAdapterWLAN.SECURITY_WPA2,{},{ pairwise: aPairwise, group: aGroup, key: aKey });
		return;
	}
	throw new Error("undefined security for the WLAN network adapter");
 }

/**
 * Set the mode infra with security for a WLAN network adapter.
 * @param aSsid : the string for the SSID
 * @param aSecurity : the security
 * @param aKey : the string for the security key */
function setWLanModeInfraWithEap(aAdapter,aSsid,aSSidHidden,aSecurity,aPairwise,aGroup,aMethod) {
	if (aSecurity == "WPA") {
		aAdapter.setAdvancedConnectionSettings(aSsid,aSSidHidden,Ci.nsISystemAdapterWLAN.MODE_INFRA,0,Ci.nsISystemAdapterWLAN.SECURITY_WPA_EAP,{ method: aMethod },{ pairwise: aPairwise, group: aGroup });
		return;
	}
	if (aSecurity == "WPA2") {
		aAdapter.setAdvancedConnectionSettings(aSsid,aSSidHidden,Ci.nsISystemAdapterWLAN.MODE_INFRA,0,Ci.nsISystemAdapterWLAN.SECURITY_WPA2_EAP,{ method: aMethod },{ pairwise: aPairwise, group: aGroup });
		return;
	}
}

/**
 * Retrieve the component for a network adapter
 * @param aName : type of the adapter (lan, wlan, wwan)
 * @return component of interface nsISystemIP for a network adapter */
function getNetAdapter(aName) {
    let iids = {
       LAN: Ci.nsISystemAdapterLAN,
       WLAN: Ci.nsISystemAdapterWLAN,
       WWAN: Ci.nsISystemAdapterWWAN
    };
    let id = iids[aName];
	log ("id = " + id);
	if (id == undefined) {
	   error ("undefined network adapter type");
       throw new Error("undefined network adapter type");
    }
	let list = systemManager.getAdaptersByIId(id);
    if (list.lenght == 0)
       throw new Error("no adapter found");
    let adapter = list.queryElementAt(0, id);
    adapter = adapter.registered;
	log ("getNetAdapter OK adapter = " + adapter);
    return adapter;
}
/**
 * Retrieve the WLAN network adapter
 * @param aName : type of the adapter (lan, wlan, wwan)
 * @return component of interface nsISystemIP for a network adapter */
function getWLanNetAdapter(aName) {
	let wlan = null;
	try {
		wlan = getNetAdapter(aName);
	} catch(e) {
		log ("no WLan adapter");
	}
    return wlan;
}
/**
 * Retrieve the first display adapter
 * @return component of interface nsISystemAdapterDisplayOutput for the display adapter */
function getDisplayAdapter() {
   let id = Ci.nsISystemAdapterDisplayOutput;
   let list = systemManager.getAdaptersByIId(id);
   if (list.lenght == 0)
       throw new Error("no adapter found");
   let adapter = list.queryElementAt(0, id);
   return adapter.registered;
}
/**
 * Set the display mode of a display adapter
 * @param aDisplay : the display adapter to be modified
 * @param aModeLabel : label of mode to be setted
 */
function setDisplayMode(aDisplay, aModeLabel) {
   let list = aDisplay.displayModesList;
   let l = list.length;
   for (let i = 0; i < l; i++) {
      let mode = list.queryElementAt(i, Ci.nsISystemDisplayMode);
      if (mode.label.toUpperCase() == aModeLabel.toUpperCase()) {
         aDisplay.displayMode = mode;
		 return;
      }
   }
   throw new Error("mode not found");
}
/**
* Set the display area (overscan).
* @param aTop The top  position of the display area (can be negative)
* @param aLeft The left position of the display area (can be negative)
* @param aWidth the width of display area. Use 0 for complete width of display
* @param aHeight the height of display area. Use 0 for complete height of display  */
function setOverscan(aTop, aLeft, aWidth, aHeight) {
	Services.prefs.setIntPref("innes.player.display.top", aTop);
	Services.prefs.setIntPref("innes.player.display.left", aLeft);
	Services.prefs.setIntPref("innes.player.display.width", aWidth);
	Services.prefs.setIntPref("innes.player.display.height", aHeight);
}
/**
* Disable the overscan */
function disableOverscan() {
   setOverscan(0,0,0,0);
}
function createIPv4Adress (aAdress) {
   let ip = Cc["@innes/system/ipv4structure;1"].createInstance(Ci.nsISystemIPv4Structure);
   log("createIPv4Adress aAdress = " + aAdress);
   ip.stringAddress = aAdress;
   return ip;
}
/**
 * Set the hostname of the platforme
* @param aName : the new hostname
*/
function setHostname(aName) {
	let settings = Cc["@innes/system/generalsettings;1"].getService(Ci.nsISystemGeneralSettings);
// Verify hostname
	log("setHostname begin aName =" + aName);
    let pattern="[A-Za-z0-9][A-Za-z0-9.-]{";
	pattern += aName.length-1 + "}";
	let re = new RegExp(pattern);
		log ("setHostname re = " + re);
    if (!re.test(aName)) {
       throw new Error("unauthorized character in hostname");
    }
	settings.hostname = aName;
	log("setHostname end");
}
/**
 * Set the Identification method of the platforme
* @param aMethod : the new method : "MAC" or "Hostname" or "UUID"
*/
function setIdMethod(aMethod) {
	if (aMethod == "MAC") {
		Services.prefs.setIntPref("innes.appli.device-id-type", 0);
	}
	if (aMethod == "Hostname") {
		Services.prefs.setIntPref("innes.appli.device-id-type", 1);
	}
	if (aMethod == "UUID") {
		Services.prefs.setIntPref("innes.appli.device-id-type", 2);
	}
}
/**
* Set the audio volume
* @param aVolumeL : volume for left channel between 0 to 100
* @param aVolumeR : volume for rigth channel between 0 to 100
*/
function setAudioVolume(aVolumeL, aVolumeR) {
	let volume = aVolumeL | (aVolumeR << 8);
	if (isG4()) 	{
		Services.prefs.setIntPref("system.sound-output_1.volume", volume);
	}
	else {
		var systemPref = Cc["@innes/systemprefservice;1"].getService(Ci.nsIPrefBranch);
		systemPref.setIntPref("system/display/audio/volume", volume);
	}
}

/**
* Set the audio output
* @param output_type : type of the audio output connector: JACK35 or HDMI
*/
function setAudioOutput(output_type) {
	getPlatform();
	if (isG4()) {
		if (Platform == "dmb400") {
			if (output_type == "HDMI") {
				Services.prefs.setBoolPref("system.connector.hdmi_2.*.tmds.scu_1.enabled",true);
				Services.prefs.setBoolPref("system.connector.jack35_2.*.analog.scu_1.enabled",false);
			}
			else {
				Services.prefs.setBoolPref("system.connector.hdmi_2.*.tmds.scu_1.enabled",false);
				Services.prefs.setBoolPref("system.connector.jack35_2.*.analog.scu_1.enabled",true);
			}
		}
		if (Platform == "sma300") {
			if (output_type == "HDMI") {
				Services.prefs.setBoolPref("system.connector.hdmi_1.*.tmds.scu_1.enabled",true);
				Services.prefs.setBoolPref("system.connector.jack35_2.*.analog.scu_1.enabled",false);
			}
			else {
				Services.prefs.setBoolPref("system.connector.hdmi_1.*.tmds.scu_1.enabled",false);
				Services.prefs.setBoolPref("system.connector.jack35_2.*.analog.scu_1.enabled",true);
			}
		}
	}
	else {
		var systemPref = Cc["@innes/systemprefservice;1"].getService(Ci.nsIPrefBranch);
		systemPref.setCharPref("system/display/audio/output_connector", output_type);
	}
}

/**
* Enable or disable audio
* @param aDisable : false to enable audio, true to mute audio
*/
function setAudioIsDisable(aDisable) {
	if (isG4()) {
		Services.prefs.setBoolPref("system.sound-output_1.mute", aDisable);
	}
	else {
		var systemPref = Cc["@innes/systemprefservice;1"].getService(Ci.nsIPrefBranch);
		systemPref.setBoolPref("system/display/audio/mute", aDisable);
	}
}

/**
* Activate or disable sound card
* @param aActivate : true to activate sound card, false to disable sound card
*/
function setSoundCardIsActivated(aActivate) {
	if (isG4()) {
		Services.prefs.setBoolPref("system.sound-output_1.enabled", aActivate);
	}
}

/**
* Enable or disable CEC
* @param aActivate : true to activate CEC, false to disable
*/
function setCecIsActivated(aActivate) {
	if (isG4()) {
		getPlatform();
		if (Platform === "sma300") {
			Services.prefs.setBoolPref("system.connector.hdmi_1.*.cec.cec_1.enabled", aActivate);
		}
		else if (Platform === "dmb400") {
			Services.prefs.setBoolPref("system.connector.*.*.cec.cec_1.enabled", aActivate);
		}
	}
}

/**
* Enable or disable NTP service
* @param aEnable : true to enable the NTP service, false otherwise
*/
function setNtpIsEnable(aEnable) {
	getPlatform();
	if (Platform == "nt_ia32") {
		return;
	}
	if (isG4()) {
		Services.prefs.setBoolPref("system.network.ntp.enabled", aEnable);
	}
	else {
		var systemPref = Cc["@innes/systemprefservice;1"].getService(Ci.nsIPrefBranch);
		systemPref.setBoolPref("system/network/ntp_enabled", aEnable);
	}
}

/**
* Set the NTP configuration
* @param aServer : the adresse of NTP server
* @param aNbTries : the maximum number of try
* @param aTimeout : the delay between 2 tries in secondes
*/
function setNtpSettings(aServer,aNbTries,aTimeout) {
	getPlatform();
	if (Platform == "nt_ia32") {
		return;
	}
	if (isG4()) {
		Services.prefs.setCharPref("system.network.ntp.server", aServer);
		Services.prefs.setIntPref("system.network.ntp.nbtries", aNbTries);
		Services.prefs.setIntPref("system.network.ntp.timeout", aTimeout);
	}
	else {
		var systemPref = Cc["@innes/systemprefservice;1"].getService(Ci.nsIPrefBranch);
		systemPref.setCharPref("system/network/ntp_server", aServer);
		systemPref.setIntPref("system/network/ntp_nbtries", aNbTries);
		systemPref.setIntPref("system/network/ntp_timeout", aTimeout);
	}
}

/**
* Set proxies configuration.
* @param aType : 0=disable, 1=manual, 2=automatic
*/
function setProxyType(aType) {
	Services.prefs.setIntPref("innes.network.proxy.type", aType);
	Services.prefs.setIntPref("network.proxy.type", aType);
}

/**
* Set list of URLs with direct access.
* @param aNoProxyFor: list of URL separate by ',' caractere
*/
function setNoProxyFor(aNoProxyFor) {
	Services.prefs.setCharPref("network.proxy.no_proxies_on", aNoProxyFor);
}

function setNoProxyForDeliveryServer(aEnabled) {
	if (isG4()) {
		Services.prefs.setBoolPref("innes.network.no_proxy_on.app_server", aEnabled);
	}
}	

function setNoProxyForStatusServer(aEnabled){
	if (isG4()) {
		Services.prefs.setBoolPref("innes.network.no_proxy_on.status_server", aEnabled);		
	}
}	

function setNoProxyForSoftwareAndConfigurationInstallationServer(aEnabled){
	if (isG4()) {
		Services.prefs.setBoolPref("innes.network.no_proxy_on.software_server", aEnabled);
	}
}	 

/**
* Set URL of proxy automatic configuration
* @param aProxyConfig: URL
*/
function setProxyConfig(aProxyConfig) {
	Services.prefs.setCharPref("network.proxy.autoconfig_url", aProxyConfig);
}

/**
* Set the HTTP proxy configuration
* @param aEnabled:  true to use proxy, false otherwise
* @param aServer:  URL of proxy server
* @param aPort:  Port of proxy server
* @param aLogin:  Login to proxy connexion
* @param aPassword:  Passord to proxy connexion
*/
function setProxyHttp(aEnabled,aServer,aPort,aLogin,aPassword) {
	setProxy("http", aEnabled,aServer,aPort,aLogin,aPassword);
}

/**
* Set the HTTPS proxy configuration
* @param aEnabled:  true to use proxy, false otherwise
* @param aServer:  URL of proxy server
* @param aPort:  Port of proxy server
* @param aLogin:  Login to proxy connexion
* @param aPassword:  Passord to proxy connexion
*/
function setProxyHttps(aEnabled,aServer,aPort,aLogin,aPassword) {
	setProxy("ssl", aEnabled,aServer,aPort,aLogin,aPassword);
}

/**
* Set the FTP proxy configuration
* @param aEnabled:  true to use proxy, false otherwise
* @param aServer:  URL of proxy server
* @param aPort:  Port of proxy server
* @param aLogin:  Login to proxy connexion
* @param aPassword:  Passord to proxy connexion
*/
function setProxyFtp(aEnabled,aServer,aPort,aLogin,aPassword) {
	setProxy("ftp", aEnabled,aServer,aPort,aLogin,aPassword);
}

function setProxy(aPrefix, aEnabled,aServer,aPort,aLogin,aPassword) {
	let prefix = "network.proxy.";
	let prefixInnes =  "innes.network.proxy.";
	Services.prefs.setBoolPref(prefixInnes + aPrefix + "_enabled", aEnabled);
	Services.prefs.setCharPref(prefix + aPrefix, (aEnabled) ? aServer : "");
	Services.prefs.setIntPref(prefix + aPrefix + "_port", (aEnabled) ? aPort : 0);
	Services.prefs.setCharPref(prefixInnes + aPrefix, aServer);
	Services.prefs.setIntPref(prefixInnes + aPrefix + "_port", aPort);
	Services.prefs.setCharPref(prefixInnes + aPrefix + "_login", aLogin);
	Services.prefs.setCharPref(prefixInnes + aPrefix + "_password", aPassword);
}

/**
 * Set the UTC date and time
* @param aDateTime : UTC date and time in format MMDDhhmmYYYY
*/
function setUtcTime(aDateTime) {
	if (isG4()) {
		let systemClock = Cc["@innes/system/clock;1"].getService(Ci.nsISystemClock);
		if ((systemClock == undefined) || (systemClock == null)) {
			error ("cannot get system clock interface");
			throw new Error("cannot get system clock interface");
		}
		let dateTimeSec = aDateTime + ".00";
		systemClock.utcTime = dateTimeSec;
		logger.debug("UTC date and time set to " + dateTimeSec);
	}
	/* else not available */
}

function enableHidPointer() {
	Services.prefs.setBoolPref("innes.hid.pointer-event.*.authorized", true);
}

function disableHidPointer() {
	Services.prefs.setBoolPref("innes.hid.pointer-event.*.authorized", false);
}

function enableHidKeyboard() {
	Services.prefs.setBoolPref("innes.hid.keyboard-event.*.authorized", true);
}

function disableHidKeyboard() {
	Services.prefs.setBoolPref("innes.hid.keyboard-event.*.authorized", false);
}

function setClockSyncDisable() {
	getPlatform();
	if (Platform == "nt_ia32") {
		return;
	}
	if (isG4()) {
		Services.prefs.setBoolPref("system.clock-sync.enabled", false);
	}
	else {
		var systemPref = Cc["@innes/systemprefservice;1"].getService(Ci.nsIPrefBranch);
		systemPref.setBoolPref("system/clock_sync/enable", false);
	}
}

function setClockSyncEnableNtp() {
	getPlatform();
	if (Platform == "nt_ia32") {
		return;
	}
	if (isG4()) {
		Services.prefs.setBoolPref("system.clock-sync.enabled", true);
		Services.prefs.setCharPref ("system.clock-sync.source", "ntp");
	}
	else {
		var systemPref = Cc["@innes/systemprefservice;1"].getService(Ci.nsIPrefBranch);
		systemPref.setBoolPref("system/clock_sync/enable", true);
		systemPref.setCharPref("system/clock_sync/source", "ntp");
	}
}

function setClockSyncEnablePtpLayer2() {
	if (isG4OS()) {
		Services.prefs.setBoolPref("system.clock-sync.enabled", true);
		Services.prefs.setCharPref ("system.clock-sync.source", "ptp-l2");
	}
	/* else not available */
}

function setClockSyncSetPtpDomain(aDomain) {
	if (isG4OS()) {
		Services.prefs.setIntPref("system.clock-sync.ptp.domain", aDomain);
	}
	/* else not available */
}

function setClockSyncSetPtpTimeout(aTimeout) {
	if (isG4OS()) {
		Services.prefs.setIntPref("system.clock-sync.ptp.timeout.lock-on-master", aTimeout);
	}
	/* else not available */
}

/**
* Set the color adjustment
* @param aNumDisplay:  the index of the display output (start from 1)
* @param aBrightness:  the value of the brightness (0 <= brightness <= 100)
* @param aBrightnessMax:  the value of the brightness max (0 <= brightness max <= 255)
* @param aBrightnessEnable:  true to enable the Brightness, false to disable
* @param aContrast:  the value of the contrast (0 <= contrast <= 100)
* @param aContrastMax:  the value of the contrast max (0 <= contrast max <= 127)
* @param aContrastEnable:  true to enable the Contrast, false to disable
* @param aOpacity:  the value of the opacity (0 <= opacity <= 100)
* @param aOpacityMax:  the value of the opacity max (0 <= opacity max <= 255)
* @param aOpacityEnable:  true to enable the Opacity, false to disable
* @param aGamma:  the value of the gamma (0 <= gamma <= 100)
* @param aGammaMax:  the value of the gamma max (1 <= gamma max <= 100)
* @param aGammaEnable:  true to enable the Gamma, false to disable
* @param aTemperature:  the value of the color temperature (2000 <= temperature <= 15000)
* @param aTemperatureEnable:  true to enable the Temperature, false to disable
* @param aGreyFilterEnable:  true to enable the grey filter, false to disable
* @param aGreyFilterITURBT:  "BT.601-7" or "BT.709-6"
*/
function setColorAdjustment(aIndexDisplay, aBrightness, aBrightnessMax, aBrightnessEnable, aContrast, aContrastMax, aContrastEnable, aOpacity, aOpacityMax, aOpacityEnable, aGamma, aGammaMax, aGammaEnable, aTemperature, aTemperatureEnable, aGreyFilterEnable, aGreyFilterITURBT) {
	getPlatform();
	if (Platform == "nt_ia32") {
		return;
	}
	if (isG4()) {
		Services.prefs.setBoolPref("system.display-output_" + aIndexDisplay + ".color-adjustment.brightness.enabled", aBrightnessEnable);
		if((aBrightness >= 0) && (aBrightness <= 100)) {
			Services.prefs.setIntPref("system.display-output_" + aIndexDisplay + ".color-adjustment.brightness.value", aBrightness);
		}
		if((aBrightnessMax >= 0) && (aBrightnessMax <= 255)) {
			Services.prefs.setIntPref("system.display-output_" + aIndexDisplay + ".color-adjustment.brightness.max-value", aBrightnessMax);
		}
		Services.prefs.setBoolPref("system.display-output_" + aIndexDisplay + ".color-adjustment.contrast.enabled", aContrastEnable);
		if((aContrast >= 0) && (aContrast <= 100)) {
			Services.prefs.setIntPref("system.display-output_" + aIndexDisplay + ".color-adjustment.contrast.value", aContrast);
		}
		if((aContrastMax >= 0) && (aContrastMax <= 127)) {
			Services.prefs.setIntPref("system.display-output_" + aIndexDisplay + ".color-adjustment.contrast.max-value", aContrastMax);
		}
		Services.prefs.setBoolPref("system.display-output_" + aIndexDisplay + ".color-adjustment.opacity.enabled", aOpacityEnable);
		if((aOpacity >= 0) && (aOpacity <= 100)) {
			Services.prefs.setIntPref("system.display-output_" + aIndexDisplay + ".color-adjustment.opacity.value", aOpacity);
		}
		if((aOpacityMax >= 0) && (aOpacityMax <= 255)) {
			Services.prefs.setIntPref("system.display-output_" + aIndexDisplay + ".color-adjustment.opacity.max-value", aOpacityMax);
		}
		Services.prefs.setBoolPref("system.display-output_" + aIndexDisplay + ".color-adjustment.gamma.enabled", aGammaEnable);
		if((aGamma >= 0) && (aGamma <= 100)) {
			Services.prefs.setIntPref("system.display-output_" + aIndexDisplay + ".color-adjustment.gamma.value", aGamma);
		}
		if((aGammaMax >= 1) && (aGammaMax <= 100)) {
			Services.prefs.setIntPref("system.display-output_" + aIndexDisplay + ".color-adjustment.gamma.max-value", aGammaMax);
		}
		Services.prefs.setBoolPref("system.display-output_" + aIndexDisplay + ".color-adjustment.temperature.enabled", aTemperatureEnable);
		if((aTemperature >= 2000) && (aTemperature <= 15000)) {
			Services.prefs.setIntPref("system.display-output_" + aIndexDisplay + ".color-adjustment.temperature.value", aTemperature);
		}
		Services.prefs.setBoolPref("system.display-output_" + aIndexDisplay + ".color-adjustment.grey-filter.enabled", aGreyFilterEnable);
		if((aGreyFilterITURBT == "BT.601-7") || (aGreyFilterITURBT == "BT.709-6")) {
			Services.prefs.setIntPref("system.display-output_" + aIndexDisplay + ".color-adjustment.grey-filter.iturbt", aGreyFilterITURBT);
		}
	}
	else {
		var systemPref = Cc["@innes/systemprefservice;1"].getService(Ci.nsIPrefBranch);
		let prefix = "system/display_output" + aIndexDisplay + "/color_adjustment/";
		if((aBrightness >= 0) && (aBrightness <= 100)) {
			try {
				let temp = systemPref.getIntPref(prefix + "brightness");
				systemPref.setIntPref(prefix + "brightness", aBrightness);
			} catch (e) {
			}
		}
		if((aBrightnessMax >= 0) && (aBrightnessMax <= 255)) {
			try {
				let temp = systemPref.getIntPref(prefix + "brightness_max");
				systemPref.setIntPref(prefix + "brightness_max", aBrightnessMax);
			} catch (e) {
			}
		}
		if((aContrast >= 0) && (aContrast <= 100)) {
			try {
				let temp = systemPref.getIntPref(prefix + "contrast");
				systemPref.setIntPref(prefix + "contrast", aContrast);
			} catch (e) {
			}
		}
		if((aContrastMax >= 0) && (aContrastMax <= 127)) {
			try {
				let temp = systemPref.getIntPref(prefix + "contrast_max");
				systemPref.setIntPref(prefix + "contrast_max", aContrastMax);
			} catch (e) {
			}
		}
		if((aOpacity >= 0) && (aOpacity <= 100)) {
			try {
				let temp = systemPref.getIntPref(prefix + "opacity");
				systemPref.setIntPref(prefix + "opacity", aOpacity);
			} catch (e) {
			}
		}
		if((aOpacityMax >= 0) && (aOpacityMax <= 255)){
			try {
				let temp = systemPref.getIntPref(prefix + "opacity_max");
				systemPref.setIntPref(prefix + "opacity_max", aOpacityMax);
			} catch (e) {
			}
		}
		if((aGamma >= 0) && (aGamma <= 100)){
			try {
				let temp = systemPref.getIntPref(prefix + "gamma");
				systemPref.setIntPref(prefix + "gamma", aGamma);
			} catch (e) {
			}
		}
		if((aGammaMax >= 1) && (aGammaMax <= 100)){
			try {
				let temp = systemPref.getIntPref(prefix + "gamma_max");
				systemPref.setIntPref(prefix + "gamma_max", aGammaMax);
			} catch (e) {
			}
		}
		if((aTemperature >= 2000) && (aTemperature <= 15000)){
			try {
				let temp = systemPref.getIntPref(prefix + "temperature");
				systemPref.setIntPref(prefix + "temperature", aTemperature);
			} catch (e) {
			}
		}
		try {
			let temp = systemPref.getCharPref(prefix + "grey_filter_enable");
			if (aGreyFilterEnable==true) {
				systemPref.setCharPref(prefix + "grey_filter_enable", "y");
			}
			else {
				systemPref.setCharPref(prefix + "grey_filter_enable", "n");
			}
		} catch (e) {
		}
		if((aGreyFilterITURBT == "BT.601-7") || (aGreyFilterITURBT == "BT.709-6")){
			try {
				let temp = systemPref.getCharPref(prefix + "grey_filter_iturbt");
				systemPref.setCharPref(prefix + "grey_filter_iturbt", aGreyFilterITURBT);
			} catch (e) {
			}
		}
	}
}

/**
* Retrieve a "av-cmd" profile for the given device id.
* @param aDeviceId: (exemple "network" or "uart_<n>"
* @return the entry of profile or null
*/
function AvCmdGetProfile(aDeviceId) {
	let profiles = systemManager.instantiateApplicationProfileBindings(
			"av-cmd","simple-protocol", aDeviceId,"","");
		if (profiles.length > 0) {
			logger.debug("Has profile");
			let entry = profiles.queryElementAt(0, Ci.nsISystemAPBEntry);
			return entry;
		}	return null;
}

/**
* Retrieve a "av-cmd" profile for the given device id and instance name.
* @param aDeviceId: (exemple "network" or "uart_<n>"
* @return the entry of profile or null
*/
function AvCmdGetProfileWithInstance(aDeviceId, aInstanceName) {
	if (isG4()) {
		let profiles = systemManager.instantiateApplicationProfileBindings(
			"av-cmd","", aDeviceId,"","");
		if (profiles.length > 0) {
			logger.debug("Has profile");
			let entry = profiles.queryElementAt(0, Ci.nsISystemAPBEntry);
			return entry;
		}
	}
	return null;
}

/**
* Activate a "av-cmd" profile.
* @param aProfileEntry: the entry for the "av-cmd" profile.
*/
function AvCmdActivateProfile(aProfileEntry) {
    logger.debug("Activate profile");
	if(aProfileEntry != null)
	{
		aProfileEntry.activated = true;
	}
}

/**
* Desactivate a "av-cmd" profile.
* @param aProfileEntry: the entry for the "av-cmd" profile.
*/
function AvCmdDesactivateProfile(aProfileEntry) {
    if(aProfileEntry != null)
	{
		aProfileEntry.activated = false;
	}
}

/**
* Install a "av-cmd" protocol.
* @param aProfileEntry: the entry for the "av-cmd" profile
* @param aName: the name of protocol
* @paran aProtocol: the protocol object */
function AvCmdInstallProtocol(aProfileEntry, aName, aProtocol) {
    if(aProfileEntry != null)
	{
		aProfileEntry.profile.setProtocol(aName, aProtocol);
		aProfileEntry.prefBranch.setCharPref("protocol", aName);
	}
}

/**
* Desinstall a "av-cmd" protocol.
* @param aProfileEntry: the entry for the "av-cmd" profile
* @param aName: the name of protocol */
function AvCmdDesinstallProtocol(aProfileEntry, aName) {
    if(aProfileEntry != null)
	{	aProfileEntry.profile.setProtocol(aName, null);
		aProfileEntry.prefBranch.setCharPref("protocol", "");
	}
}

function AvCmdIsActivatedPowerMode(aProfileEntry, aActivated)
{
	if (isG4()) {
		getPlatform();
		if (Platform == "dmb400" || Platform == "sma300") {
			aProfileEntry.prefBranch.setBoolPref("features.power-mode", aActivated);
		}
	}
}

function AvCmdIsActivatedVideoInput(aProfileEntry, aActivated)
{
	if (isG4()) {
		getPlatform();
		if (Platform == "dmb400" || Platform == "sma300") {
			aProfileEntry.prefBranch.setBoolPref("features.video-input", aActivated);
		}
	}
}

function AvCmdIsActivatedVolume(aProfileEntry, aActivated)
{
	if (isG4()) {
		getPlatform();
		if (Platform == "dmb400" || Platform == "sma300") {
			aProfileEntry.prefBranch.setBoolPref("features.volume", aActivated);
		}
	}
}

function AvCmdIsActivatedMute(aProfileEntry, aActivated)
{
	if (isG4()) {
		getPlatform();
		if (Platform == "dmb400" || Platform == "sma300") {
			aProfileEntry.prefBranch.setBoolPref("features.mute", aActivated);
		}
	}
}

function AvCmdIsActivatedBrightness(aProfileEntry, aActivated)
{
	if (isG4()) {
		getPlatform();
		if (Platform == "dmb400" || Platform == "sma300") {
			aProfileEntry.prefBranch.setBoolPref("features.brightness", aActivated);
		}
	}
}

function AvCmdIsActivatedBacklight(aProfileEntry, aActivated)
{
	if (isG4()) {
		getPlatform();
		if (Platform == "dmb400" || Platform == "sma300") {
			aProfileEntry.prefBranch.setBoolPref("features.backlight", aActivated);
		}
	}
}

function AvCmdIsActivatedCustomCommands(aProfileEntry, aActivated)
{
	if (isG4()) {
		getPlatform();
		if (Platform == "dmb400" || Platform == "sma300") {
			aProfileEntry.prefBranch.setBoolPref("features.custom-commands", aActivated);
		}
	}
}

/**
* Add a certificate to Gekkota.
* The certificate string must be copied from the certificate file and placed into
* a JavaScript string witch start with a caractere " and finish with ". Each line
* must be manualy ended with the sequence \n\.
* @param aCertString the string certificate
*/
function GekkotaAddCertificate(aCertString) {
	let clientCert = Cc["@innes/network/networkclientcerts;1"].getService(Ci.nsINetworkClientCerts);
	let tab=[];
	let l = aCertString.length;
	for (let i = 0; i < l; i++) {
		tab[i] = aCertString.charCodeAt(i);
	}
	clientCert.add(l,tab);
}

/**
* Add the Gekkota license
* @param aLicense the string license
*/
function setlicense(aLicense) {
	var prefService= Cc["@innes/ipc/prefs;1"].getService(Ci.nsIInnesProfilePrefs);
	prefService.setCharPrefInFile("license-key.js", "innes.appli.license-key", "innes.appli.license-key", aLicense);
}

/**
* activate test card
* @param
*/
function enableTestCard() {
	getPlatform();
	if (Platform != "smh300") {
		Services.prefs.setBoolPref("innes.player.mire", true);
	}
}
/**
* inactivate test card
* @param aEnable : true to enable the support of video decoding groups, false otherwise
*/
function disableTestCard() {
	getPlatform();
	if (Platform != "smh300") {
		Services.prefs.setBoolPref("innes.player.mire", false);
	}
}
/**
* Enable or disable support of video decoding groups
* @param aEnable : true to enable the support of video decoding groups, false otherwise
*/
function setDecodingGroupIsEnable(aEnable) {
	if (isG4OS()) {
		Services.prefs.setBoolPref("innes.video.decoding-group.enabled", aEnable);
	}
	/* else not available */
}

/**
* Select the default video renderer
* @param aRenderer : "overlay" or "gpu"
*/
function setDefaultVideoRenderer(aRenderer) {
	if (isG4OS()) {
		Services.prefs.setCharPref("innes.video.renderer.default", aRenderer);
	}
	/* else not available */
}

/**
* setAppModePushArchive (*.zip, *.tar.gz, *.tar, *.tgz)
*/
function setAppModePushArchive() {
	let unexistantPref = false;

	try {
		let webdav_mode = Services.prefs.getCharPref("innes.webui.servers.wizard.mode");
	} catch(e) {
		unexistantPref = true;
	}

	if (unexistantPref == false) {
		Services.prefs.setCharPref("innes.webui.servers.wizard.mode", "push-archive");
	}
}
/**
* setAppModePush : Push WebDAV
*/
function setAppModePush() {
	let unexistantPref = false;

	try {
		let webdav_mode = Services.prefs.getCharPref("innes.webui.servers.wizard.mode");
	} catch(e) {
		unexistantPref = true;
	}

	if (unexistantPref == false) {
		Services.prefs.setCharPref("innes.webui.servers.wizard.mode", "push");
	}
}

/**
* For Http Adaptive Streaming, set the maximum bitrate of the representation to be selected
* @param aValueMBitsPerSec : bitrate in MBits/s
*/
function setHttpAdaptiveStreamingMaxBitrate(aValueMBitsPerSec) {
	if (isG4OS()) {
		Services.prefs.setIntPref("innes.video.has.max-bitrate", aValueMBitsPerSec);
	}
	/* else not available */
}

/**
* Set the maximum width of the screenshot
* @param aValueMaxWidth : maximum width of the screenshot in pixels
*/
function setScreenshotMaxWidth(aValueMaxWidth) {
	if (isG4()) {
		getPlatform();
		if (Platform === "dmb400") {
			Services.prefs.setIntPref("innes.screenshot.width-max", aValueMaxWidth);
		}
	}
}

/**
* Init somes GPIOs to avoid conflict
*/
function setInitGPIO() {
	getPlatform();
	if (isG4()) {
		logger.debug("setInitGPIO : Platform = " + Platform);
	}
	else {
		var systemPref = Cc["@innes/systemprefservice;1"].getService(Ci.nsIPrefBranch);
		logger.debug("setInitGPIO : Platform = " + Platform);
		if (Platform == "dmc200") {
			systemPref.setBoolPref("system/connector/phoenix_1/3/rs485/uart_1/enable", false);
			systemPref.setBoolPref("system/connector/phoenix_1/15/rs422/uart_1/enable", false);
		}
		else if (Platform == "smt210") {
			Services.prefs.setBoolPref("innes.app-profile.gpio-input.phoenix-gpio_1.phoenix_1.1.authorized", false);
			Services.prefs.setBoolPref("innes.app-profile.gpio-output.phoenix-gpio_1.phoenix_1.1.authorized", true);
			systemPref.setBoolPref("system/connector/phoenix_1/1/io/phoenix-gpio_1/enable", true);
		}
	}
}

/**
* Get platform
*/
function getPlatform() {
    if (Platform != undefined)
	   return Platform;
	var generalSettings = Cc["@innes/system/generalsettings;1"].getService(Ci.nsISystemGeneralSettings);
	Platform = generalSettings.platform;
	logger.debug("getPlatform : Platform = " + Platform);
	return Platform;
}


/**
* Set the GPIO on Phoenix connector
* @param aPort : GPIO number
* @param aInvert : true to invert data input
* @param aDirection : direction on the GPIO1, in for input, out for output, disable to don't set the drection
* @param aDebouncing : to set the duration of the debouncing (in ns), maximum=10000000000 (10s) mimimum=0 (no deboucning)
*/
function setPhoenixGPIO(aPort, aInvert, aDirection, aDebouncing) {
	setInitGPIO();

	if (aPort == 1) {
		PortNumber = 1;
	}
	else if (aPort == 2) {
		PortNumber = 2;
	}
	else if (aPort == 3) {
		PortNumber = 4;
	}
	else if (aPort == 4) {
		PortNumber = 8;
	}
	else if (aPort == 5) {
		PortNumber = 16;
	}
	else if (aPort == 6) {
		PortNumber = 32;
	}

	if (!isG4()) {
		if ((Platform == "dmc200") && (aPort >= 1) && (aPort <= 4)) {
			setPhoenixGPIOfunction(PortNumber, aInvert, aDirection, aDebouncing);
		}

		if ((Platform == "dmb300") && (aPort >= 1) && (aPort <= 6)) {
			setPhoenixGPIOfunction(PortNumber, aInvert, aDirection, aDebouncing);
		}
	}

	if ((Platform == "smt210") && (aPort >= 2) && (aPort <= 3)) {
		setPhoenixGPIOfunction(PortNumber, aInvert, aDirection, aDebouncing);
	}
}

function setPhoenixGPIOfunction(aPort, aInvert, aDirection, aDebouncing) {
	if (isG4()) {
		if (Platform == "smt210") {
			//Set the direction : input or output
			if (aDirection == "out") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.phoenix-gpio_1.phoenix_1." + aPort + ".authorized", false);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.phoenix-gpio_1.phoenix_1." + aPort + ".authorized", true);
				Services.prefs.setBoolPref("system.connector.phoenix_1." + aPort + ".io.phoenix-gpio_1.enabled", true);
			}
			else if (aDirection == "in") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.phoenix-gpio_1.phoenix_1." + aPort + ".authorized", true);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.phoenix-gpio_1.phoenix_1." + aPort + ".authorized", false);
				Services.prefs.setBoolPref("system.connector.phoenix_1." + aPort + ".io.phoenix-gpio_1.enabled", true);
			}
			else if (aDirection == "disable") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.phoenix-gpio_1.phoenix_1." + aPort + ".authorized", false);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.phoenix-gpio_1.phoenix_1." + aPort + ".authorized", false);
				Services.prefs.setBoolPref("system.connector.phoenix_1." + aPort + ".io.phoenix-gpio_1.enabled", false);
			}

			//Set invert or not
			Services.prefs.setBoolPref("innes.app-profile.gpio-input.phoenix-gpio_1.phoenix_1." + aPort + ".invert-value", aInvert);
			// Set the debouncing time
			if (aDirection == "in") {
				Services.prefs.setIntPref("system.connector.phoenix_1." + aPort + ".io.phoenix-gpio_1.debouncing.period", aDebouncing);
				if (aDebouncing == 0) 				{
					Services.prefs.setBoolPref("system.connector.phoenix_1." + aPort + ".io.phoenix-gpio_1.debouncing.enabled", false);
				}
				else {
					Services.prefs.setBoolPref("system.connector.phoenix_1." + aPort + ".io.phoenix-gpio_1.debouncing.enabled", true);
				}
			}
			else {
				Services.prefs.setBoolPref("system.connector.phoenix_1." + aPort + ".io.phoenix-gpio_1.debouncing.enabled", false);
			}
		}
	}
	else {
		var systemPref = Cc["@innes/systemprefservice;1"].getService(Ci.nsIPrefBranch);
		if (Platform == "dmc200") {
			//Set the direction : input or output
			if (aDirection == "out") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.io_expander_1.phoenix_1." + aPort + ".authorized", false);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.io_expander_1.phoenix_1." + aPort + ".authorized", true);
				systemPref.setBoolPref("system/connector/phoenix_1/" + aPort + "/io/io_expander_1/enable", true);
			}
			else if (aDirection == "in") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.io_expander_1.phoenix_1." + aPort + ".authorized", true);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.io_expander_1.phoenix_1." + aPort + ".authorized", false);
				systemPref.setBoolPref("system/connector/phoenix_1/" + aPort + "/io/io_expander_1/enable", true);
			}
			else if (aDirection == "disable") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.io_expander_1.phoenix_1." + aPort + ".authorized", false);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.io_expander_1.phoenix_1." + aPort + ".authorized", false);
				systemPref.setBoolPref("system/connector/phoenix_1/" + aPort + "/io/io_expander_1/enable", false);
			}
			//Set invert or not
			Services.prefs.setBoolPref("innes.app-profile.gpio-input.io_expander_1.phoenix_1." + aPort + ".invert-value", aInvert);
			// Set the debouncing time
			if (aDirection == "in") {
				systemPref.setIntPref("system/connector/phoenix_1/" + aPort + "/io/io_expander_1/debouncing/time", aDebouncing);
				if (aDebouncing == 0) {
					systemPref.setBoolPref("system/connector/phoenix_1/" + aPort + "/io/io_expander_1/debouncing/enable", false);
				}
				else {
					systemPref.setBoolPref("system/connector/phoenix_1/" + aPort + "/io/io_expander_1/debouncing/enable", true);
				}
			}
			else {
				systemPref.setBoolPref("system/connector/phoenix_1/" + aPort + "/io/io_expander_1/debouncing/enable", false);
			}
		}
		else if (Platform == "dmb300") {
			//Set the direction : input or output
			if (aDirection == "out") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.epld_1.phoenix_1." + aPort + ".authorized", false);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.epld_1.phoenix_1." + aPort + ".authorized", true);
				systemPref.setBoolPref("system/connector/phoenix_1/" + aPort + "/io/epld_1/enable", true);
			}
			else if (aDirection == "in") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.epld_1.phoenix_1." + aPort + ".authorized", true);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.epld_1.phoenix_1." + aPort + ".authorized", false);
				systemPref.setBoolPref("system/connector/phoenix_1/" + aPort + "/io/epld_1/enable", true);
			}
			else if (aDirection == "disable") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.epld_1.phoenix_1." + aPort + ".authorized", false);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.epld_1.phoenix_1." + aPort + ".authorized", false);
				systemPref.setBoolPref("system/connector/phoenix_1/" + aPort + "/io/epld_1/enable", false);
			}
			//Set invert or not
			Services.prefs.setBoolPref("innes.app-profile.gpio-input.epld_1.phoenix_1." + aPort + ".invert-value", aInvert);
			// Set the debouncing time
			if (aDirection == "in") {
				systemPref.setIntPref("system/connector/phoenix_1/" + aPort + "/io/epld_1/debouncing/time", aDebouncing);
				if (aDebouncing == 0) {
					systemPref.setBoolPref("system/connector/phoenix_1/" + aPort + "/io/epld_1/debouncing/enable", false);
				}
				else {
					systemPref.setBoolPref("system/connector/phoenix_1/" + aPort + "/io/epld_1/debouncing/enable", true);
				}
			}
			else {
				systemPref.setBoolPref("system/connector/phoenix_1/" + aPort + "/io/epld_1/debouncing/enable", false);
			}
		}
		else if (Platform == "smt210") {
			//Set the direction : input or output
			if (aDirection == "out") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.phoenix-gpio_1.phoenix_1." + aPort + ".authorized", false);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.phoenix-gpio_1.phoenix_1." + aPort + ".authorized", true);
				systemPref.setBoolPref("system/connector/phoenix_1/" + aPort + "/io/phoenix-gpio_1/enable", true);
			}
			else if (aDirection == "in") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.phoenix-gpio_1.phoenix_1." + aPort + ".authorized", true);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.phoenix-gpio_1.phoenix_1." + aPort + ".authorized", false);
				systemPref.setBoolPref("system/connector/phoenix_1/" + aPort + "/io/phoenix-gpio_1/enable", true);
			}
			else if (aDirection == "disable") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.phoenix-gpio_1.phoenix_1." + aPort + ".authorized", false);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.phoenix-gpio_1.phoenix_1." + aPort + ".authorized", false);
				systemPref.setBoolPref("system/connector/phoenix_1/" + aPort + "/io/phoenix-gpio_1/enable", false);
			}
			//Set invert or not
			Services.prefs.setBoolPref("innes.app-profile.gpio-input.phoenix-gpio_1.phoenix_1." + aPort + ".invert-value", aInvert);
			// Set the debouncing time
			if (aDirection == "in") {
				systemPref.setIntPref("system/connector/phoenix_1/" + aPort + "/io/phoenix-gpio_1/debouncing/time", aDebouncing);
				if (aDebouncing == 0) {
					systemPref.setBoolPref("system/connector/phoenix_1/" + aPort + "/io/phoenix-gpio_1/debouncing/enable", false);
				}
				else {
					systemPref.setBoolPref("system/connector/phoenix_1/" + aPort + "/io/phoenix-gpio_1/debouncing/enable", true);
				}
			}
			else {
				systemPref.setBoolPref("system/connector/phoenix_1/" + aPort + "/io/phoenix-gpio_1/debouncing/enable", false);
			}
		}
	}
}


/**
* Set the GPIO on Phoenix connector
* @param aInvert : true to invert data input
* @param aDirection : direction on the GPIO, in for input, out for output, disable to don't set the drection
* @param aDebouncing : to set the duration of the debouncing (in ns), maximum=10000000000 (10s) mimimum=0 (no deboucning)
*/
function setJackGPIO(aInvert, aDirection, aDebouncing) {
    setInitGPIO();
	if (isG4()) {
		if (Platform == "dmb400" || Platform == "sma300" || Platform == "smh300" || Platform == "smt210") {
			if (Platform == "sma300" || Platform == "smh300" || Platform == "smt210") {
				if (aDirection == "disable") {
					Services.prefs.setBoolPref("system.connector.jack35_1.1.io.uart_1.enabled", true);
				}
				else {
					Services.prefs.setBoolPref("system.connector.jack35_1.1.io.uart_1.enabled", false);
				}
			}

			// Set the direction : input or output
			if (aDirection == "out") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.jack35-gpio_1.jack35_1.*.authorized", false);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.jack35-gpio_1.jack35_1.*.authorized", true);
				Services.prefs.setBoolPref("system.connector.jack35_1.1.io.jack35-gpio_1.enabled", true);
			}
			else if (aDirection == "in") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.jack35-gpio_1.jack35_1.*.authorized", true);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.jack35-gpio_1.jack35_1.*.authorized", false);
				Services.prefs.setBoolPref("system.connector.jack35_1.1.io.jack35-gpio_1.enabled", true);
			}
			else if (aDirection == "disable") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.jack35-gpio_1.jack35_1.*.authorized", false);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.jack35-gpio_1.jack35_1.*.authorized", false);
				Services.prefs.setBoolPref("system.connector.jack35_1.1.io.jack35-gpio_1.enabled", false);
			}

			// Set invert or not
			Services.prefs.setBoolPref("innes.app-profile.gpio-input.jack35-gpio_1.jack35_1.*.invert-value", aInvert);

			// Set the debouncing time
			if (aDirection == "in") {
				Services.prefs.setIntPref("system.connector.jack35_1.1.io.jack35-gpio_1.debouncing.period", aDebouncing);

				if (aDebouncing == 0) {
					Services.prefs.setBoolPref("system.connector.jack35_1.1.io.jack35-gpio_1.debouncing.enabled", false);
				}
				else {
					Services.prefs.setBoolPref("system.connector.jack35_1.1.io.jack35-gpio_1.debouncing.enabled", true);
				}
			}
			else {
				Services.prefs.setBoolPref("system.connector.jack35_1.1.io.jack35-gpio_1.debouncing.enabled", false);
			}
		}
		else if (Platform == "dme204") {
			// Set the direction : input or output
			if (aDirection == "out") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.epld_1.jack35_1.*.authorized", false);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.epld_1.jack35_1.*.authorized", true);
			}
			else if (aDirection == "in") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.epld_1.jack35_1.*.authorized", true);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.epld_1.jack35_1.*.authorized", false);
			}
			else if (aDirection == "disable") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.epld_1.jack35_1.*.authorized", false);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.epld_1.jack35_1.*.authorized", false);
			}
			// Set invert or not
			Services.prefs.setBoolPref("innes.app-profile.gpio-input.epld_1.jack35_1.*.invert-value", aInvert);
			// Set the debouncing time
			if (aDirection == "in") {
				Services.prefs.setIntPref("system.connector.jack35_1.1.io.epld_1.debouncing.period", aDebouncing);
				if (aDebouncing == 0) {
					Services.prefs.setBoolPref("system.connector.jack35_1.1.io.epld_1.debouncing.enabled", false);
				}
				else {
					Services.prefs.setBoolPref("system.connector.jack35_1.1.io.epld_1.debouncing.enabled", true);
				}
			}
			else {
				Services.prefs.setBoolPref("system.connector.jack35_1.1.io.epld_1.debouncing.enabled", false);
			}
		}
	}
	else {
		var systemPref = Cc["@innes/systemprefservice;1"].getService(Ci.nsIPrefBranch);

		if (Platform == "dmc200" || Platform == "dmb300") {
			if (Platform == "dmc200") {
				systemPref.setBoolPref("system/connector/jack35_1/1/io/uart_1/enable", false);
			}
			else if (Platform == "dmb300") {
				systemPref.setBoolPref("system/connector/jack35_1/1/io/uart_2/enable", false);
			}
			// Set the direction : input or output
			if (aDirection == "out") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.epld_1.jack35_1.*.authorized", false);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.epld_1.jack35_1.*.authorized", true);
				systemPref.setBoolPref("system/connector/jack35_1/1/io/epld_1/enable", true);
			}
			else if (aDirection == "in") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.epld_1.jack35_1.*.authorized", true);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.epld_1.jack35_1.*.authorized", false);
				systemPref.setBoolPref("system/connector/jack35_1/1/io/epld_1/enable", true);
			}
			else if (aDirection == "disable") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.epld_1.jack35_1.*.authorized", false);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.epld_1.jack35_1.*.authorized", false);
				systemPref.setBoolPref("system/connector/jack35_1/1/io/epld_1/enable", false);
				if (Platform == "dmc200") {
					systemPref.setBoolPref("system/connector/jack35_1/1/io/uart_1/enable", true);
				}
				else if (Platform == "dmb300") {
					systemPref.setBoolPref("system/connector/jack35_1/1/io/uart_2/enable", true);
				}
			}
			// Set invert or not
			Services.prefs.setBoolPref("innes.app-profile.gpio-input.epld_1.jack35_1.*.invert-value", aInvert);
			// Set the debouncing time
			if (aDirection == "in") {
				systemPref.setIntPref("system/connector/jack35_1/1/io/epld_1/debouncing/time", aDebouncing);
				if (aDebouncing == 0) {
					systemPref.setBoolPref("system/connector/jack35_1/1/io/epld_1/debouncing/enable", false);
				}
				else {
					systemPref.setBoolPref("system/connector/jack35_1/1/io/epld_1/debouncing/enable", true);
				}
			}
			else {
				systemPref.setBoolPref("system/connector/jack35_1/1/io/epld_1/debouncing/enable", false);
			}
		}
		else if (Platform == "smt210" || Platform == "sma200" || Platform == "sma300" || Platform == "smh300") {
			systemPref.setBoolPref("system/connector/jack35_1/1/io/uart_1/enable", false);
			// Set the direction : input or output
			if (aDirection == "out") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.jack35-gpio_1.jack35_1.*.authorized", false);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.jack35-gpio_1.jack35_1.*.authorized", true);
				systemPref.setBoolPref("system/connector/jack35_1/1/io/jack35-gpio_1/enable", true);
			}
			else if (aDirection == "in") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.jack35-gpio_1.jack35_1.*.authorized", true);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.jack35-gpio_1.jack35_1.*.authorized", false);
				systemPref.setBoolPref("system/connector/jack35_1/1/io/jack35-gpio_1/enable", true);
			}
			else if (aDirection == "disable") {
				Services.prefs.setBoolPref("innes.app-profile.gpio-input.jack35-gpio_1.jack35_1.*.authorized", false);
				Services.prefs.setBoolPref("innes.app-profile.gpio-output.jack35-gpio_1.jack35_1.*.authorized", false);
				systemPref.setBoolPref("system/connector/jack35_1/1/io/jack35-gpio_1/enable", false);
				systemPref.setBoolPref("system/connector/jack35_1/1/io/uart_1/enable", true);
			}
			// Set invert or not
			Services.prefs.setBoolPref("innes.app-profile.gpio-input.jack35-gpio_1.jack35_1.*.invert-value", aInvert);
			// Set the debouncing time
			if (aDirection == "in") {
				systemPref.setIntPref("system/connector/jack35_1/1/io/jack35-gpio_1/debouncing/time", aDebouncing);
				if (aDebouncing == 0) {
					systemPref.setBoolPref("system/connector/jack35_1/1/io/jack35-gpio_1/debouncing/enable", false);
				}
				else {
					systemPref.setBoolPref("system/connector/jack35_1/1/io/jack35-gpio_1/debouncing/enable", true);
				}
			}
			else {
				systemPref.setBoolPref("system/connector/jack35_1/1/io/jack35-gpio_1/debouncing/enable", false);
			}
		}
	}
}


// -------------------------------------------------
// ---- Hub Server - SMH300 configuration      ----
// -------------------------------------------------
/**
* Set the default picture name
* @param aConfiguration : JS Object that specifies specific configurations for a device specified by mac addr for every Slate of PSN key
**/
function SetWpanHubServerConfiguration(aConfiguration) {
	log("SetWpanHubServerConfiguration begin");
	try {
		if (!isG4() || (Platform != "smh300")) {
			log("SetWpanHubServerConfiguration end wrong platform");
			return;
		}
		let WpanHubSrv = Cc["@innes/hub/wpanhubsrv;1"].getService(Ci.nsIWpanHubSrv);
		WpanHubSrv.maintenanceMode = true;
		var WPANHUBSRV_MAX_PAIRED_DEVICES = WpanHubSrv.maxPairedDevices;
		var hubServerMacAddr = getCurrentHubServerMacAddr();
		var hubServerCfgObj = new Object();
		var foundCfgObj = false;

		var pairedList = [];
		for (let i = 0; i < WPANHUBSRV_MAX_PAIRED_DEVICES; i++) {
			pairedList[i] = "";
		}

		var setCommonConfig = function (hubServerCfgObj) {
			log("setCommonConfig");
			if (hubServerCfgObj["pictureframe.vibration_sensor.enabled"] != undefined) {
				log("innes.wpan-hub-srv.device.slate.*.pictureframe.vibration_sensor.enabled " + hubServerCfgObj["pictureframe.vibration_sensor.enabled"]);
				Services.prefs.setBoolPref("innes.wpan-hub-srv.device.slate.*.pictureframe.vibration_sensor.enabled", hubServerCfgObj["pictureframe.vibration_sensor.enabled"]);
			}
			if (hubServerCfgObj["pictureframe.key.enabled"] != undefined) {
				log("innes.wpan-hub-srv.device.slate.*.pictureframe.key.enabled " + hubServerCfgObj["pictureframe.key.enabled"]);
				Services.prefs.setBoolPref("innes.wpan-hub-srv.device.slate.*.pictureframe.key.enabled", hubServerCfgObj["pictureframe.key.enabled"]);
			}
			if (hubServerCfgObj["pictureframe.wakeup.heartbeat.enabled"] != undefined) {
				log("innes.wpan-hub-srv.device.slate.*.pictureframe.wakeup.heartbeat.enabled " + hubServerCfgObj["pictureframe.wakeup.heartbeat.enabled"]);
				Services.prefs.setBoolPref("innes.wpan-hub-srv.device.slate.*.pictureframe.wakeup.heartbeat.enabled", hubServerCfgObj["pictureframe.wakeup.heartbeat.enabled"]);
			}
			if (hubServerCfgObj["pictureframe.wakeup.heartbeat.mode"] != undefined) {
				if ((hubServerCfgObj["pictureframe.wakeup.heartbeat.mode"] == "period") || (hubServerCfgObj["pictureframe.wakeup.heartbeat.mode"] == "quarter")) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.wakeup.heartbeat.mode " + hubServerCfgObj["pictureframe.wakeup.heartbeat.mode"]);
					Services.prefs.setCharPref("innes.wpan-hub-srv.device.slate.*.pictureframe.wakeup.heartbeat.mode", hubServerCfgObj["pictureframe.wakeup.heartbeat.mode"]);
				}
			}
			if (hubServerCfgObj["pictureframe.wakeup.heartbeat.period"] != undefined) {
				if ((hubServerCfgObj["pictureframe.wakeup.heartbeat.period"] >= 15) && (hubServerCfgObj["pictureframe.wakeup.heartbeat.period"] <= 1440)) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.wakeup.heartbeat.period " + hubServerCfgObj["pictureframe.wakeup.heartbeat.period"]);
					Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate.*.pictureframe.wakeup.heartbeat.period", hubServerCfgObj["pictureframe.wakeup.heartbeat.period"]);
				}
			}
			if (hubServerCfgObj["pictureframe.wakeup.day.interval"] != undefined) {
				const dayIntervalRegExp = /^(T(([0-2][0-9])[:]?([0-5][0-9])))?\/(T(([0-2][0-9])[:]?([0-5][0-9])))?$/g;
				const rangeValues = dayIntervalRegExp.exec(hubServerCfgObj["pictureframe.wakeup.day.interval"]);
				if (rangeValues !== null) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.wakeup.day.interval " + hubServerCfgObj["pictureframe.wakeup.day.interval"]);
					Services.prefs.setCharPref("innes.wpan-hub-srv.device.slate.*.pictureframe.wakeup.day.interval", hubServerCfgObj["pictureframe.wakeup.day.interval"]);
				}
			}
			if (hubServerCfgObj["pictureframe.wakeup.weekdays.mask"] != undefined) {
				if ((hubServerCfgObj["pictureframe.wakeup.weekdays.mask"] >= 1) && (hubServerCfgObj["pictureframe.wakeup.weekdays.mask"] <= 127)) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.wakeup.weekdays.mask " + hubServerCfgObj["pictureframe.wakeup.weekdays.mask"]);
					Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate.*.pictureframe.wakeup.weekdays.mask", hubServerCfgObj["pictureframe.wakeup.weekdays.mask"]);
				}
			}
			if (hubServerCfgObj["pictureframe.wpan.enabled"] != undefined) {
				log("innes.wpan-hub-srv.device.slate.*.pictureframe.wpan.enabled " + hubServerCfgObj["pictureframe.wpan.enabled"]);
				Services.prefs.setBoolPref("innes.wpan-hub-srv.device.slate.*.pictureframe.wpan.enabled", hubServerCfgObj["pictureframe.wpan.enabled"]);
			}
			if (hubServerCfgObj["pictureframe.overlay.message.enabled"] != undefined) {
				log("innes.wpan-hub-srv.device.slate.*.pictureframe.overlay.message.enabled " + hubServerCfgObj["pictureframe.overlay.message.enabled"]);
				Services.prefs.setBoolPref("innes.wpan-hub-srv.device.slate.*.pictureframe.overlay.message.enabled", hubServerCfgObj["pictureframe.overlay.message.enabled"]);
			}
			if (hubServerCfgObj["pictureframe.action.delay1"] != undefined) {
				if ((hubServerCfgObj["pictureframe.action.delay1"] >= 1) && (hubServerCfgObj["pictureframe.action.delay1"] <= 5000)) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.action.delay1" + hubServerCfgObj["pictureframe.action.delay1"]);
					Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate.*.pictureframe.action.delay1", hubServerCfgObj["pictureframe.action.delay1"]);
				}
			}
			if (hubServerCfgObj["pictureframe.picture.filename"] != undefined) {
				let length = hubServerCfgObj["pictureframe.picture.filename"].length;
				if ((length >= 5) && (length <= 12) && (hubServerCfgObj["pictureframe.picture.filename"].indexOf(".ppk") == length - 4)) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.picture.filename " + hubServerCfgObj["pictureframe.picture.filename"]);
					Services.prefs.setCharPref("innes.wpan-hub-srv.device.slate.*.pictureframe.picture.filename", hubServerCfgObj["pictureframe.picture.filename"]);
				}
			}
			if (hubServerCfgObj["pictureframe.key.picture.duration"] != undefined) {
				if ((hubServerCfgObj["pictureframe.key.picture.duration"] >= 0) && (hubServerCfgObj["pictureframe.key.picture.duration"] <= 65535)) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.key.picture.duration " + hubServerCfgObj["pictureframe.key.picture.duration"]);
					Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate.*.pictureframe.key.picture.duration", hubServerCfgObj["pictureframe.key.picture.duration"]);
				}
			}
			if (hubServerCfgObj["pictureframe.after_usb_ms_actions.mask"] != undefined) {
				if ((hubServerCfgObj["pictureframe.after_usb_ms_actions.mask"] >= 0) && (hubServerCfgObj["pictureframe.after_usb_ms_actions.mask"] <= 65535)) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.after_usb_ms_actions.mask " + hubServerCfgObj["pictureframe.after_usb_ms_actions.mask"]);
					Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate.*.pictureframe.after_usb_ms_actions.mask", hubServerCfgObj["pictureframe.after_usb_ms_actions.mask"]);
				}
			}
			if (hubServerCfgObj["pictureframe.after_usb_power_actions.mask"] != undefined) {
				if ((hubServerCfgObj["pictureframe.after_usb_power_actions.mask"] >= 0) && (hubServerCfgObj["pictureframe.after_usb_power_actions.mask"] <= 65535)) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.after_usb_power_actions.mask " + hubServerCfgObj["pictureframe.after_usb_power_actions.mask"]);
					Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate.*.pictureframe.after_usb_power_actions.mask", hubServerCfgObj["pictureframe.after_usb_power_actions.mask"]);
				}
			}
			if (hubServerCfgObj["pictureframe.after_heartbeat_actions.mask"] != undefined) {
				if ((hubServerCfgObj["pictureframe.after_heartbeat_actions.mask"] >= 0) && (hubServerCfgObj["pictureframe.after_heartbeat_actions.mask"] <= 65535)) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.after_heartbeat_actions.mask " + hubServerCfgObj["pictureframe.after_heartbeat_actions.mask"]);
					Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate.*.pictureframe.after_heartbeat_actions.mask", hubServerCfgObj["pictureframe.after_heartbeat_actions.mask"]);
				}
			}
			if (hubServerCfgObj["pictureframe.after_nfc_writer_actions.mask"] != undefined) {
				if ((hubServerCfgObj["pictureframe.after_nfc_writer_actions.mask"] >= 0) && (hubServerCfgObj["pictureframe.after_nfc_writer_actions.mask"] <= 65535)) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.after_nfc_writer_actions.mask " + hubServerCfgObj["pictureframe.after_nfc_writer_actions.mask"]);
					Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate.*.pictureframe.after_nfc_writer_actions.mask", hubServerCfgObj["pictureframe.after_nfc_writer_actions.mask"]);
				}
			}
			if (hubServerCfgObj["pictureframe.after_nfc_tag_actions.mask"] != undefined) {
				if ((hubServerCfgObj["pictureframe.after_nfc_tag_actions.mask"] >= 0) && (hubServerCfgObj["pictureframe.after_nfc_tag_actions.mask"] <= 65535)) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.after_nfc_tag_actions.mask " + hubServerCfgObj["pictureframe.after_nfc_tag_actions.mask"]);
					Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate.*.pictureframe.after_nfc_tag_actions.mask", hubServerCfgObj["pictureframe.after_nfc_tag_actions.mask"]);
				}
			}
			if (hubServerCfgObj["pictureframe.after_key_actions.mask"] != undefined) {
				if ((hubServerCfgObj["pictureframe.after_key_actions.mask"] >= 0) && (hubServerCfgObj["pictureframe.after_key_actions.mask"] <= 65535)) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.after_key_actions.mask " + hubServerCfgObj["pictureframe.after_key_actions.mask"]);
					Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate.*.pictureframe.after_key_actions.mask", hubServerCfgObj["pictureframe.after_key_actions.mask"]);
				}
			}
			if (hubServerCfgObj["pictureframe.after_vibration_actions.mask"] != undefined) {
				if ((hubServerCfgObj["pictureframe.after_vibration_actions.mask"] >= 0) && (hubServerCfgObj["pictureframe.after_vibration_actions.mask"] <= 65535)) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.after_vibration_actions.mask " + hubServerCfgObj["pictureframe.after_vibration_actions.mask"]);
					Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate.*.pictureframe.after_vibration_actions.mask", hubServerCfgObj["pictureframe.after_vibration_actions.mask"]);
				}
			}
			if (hubServerCfgObj["pictureframe.after_testcard_actions.mask"] != undefined) {
				if ((hubServerCfgObj["pictureframe.after_testcard_actions.mask"] >= 0) && (hubServerCfgObj["pictureframe.after_testcard_actions.mask"] <= 65535)) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.after_testcard_actions.mask " + hubServerCfgObj["pictureframe.after_testcard_actions.mask"]);
					Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate.*.pictureframe.after_testcard_actions.mask", hubServerCfgObj["pictureframe.after_testcard_actions.mask"]);
				}
			}
			if (hubServerCfgObj["pictureframe.action.key_lock.idle_time"] != undefined) {
				if ((hubServerCfgObj["pictureframe.action.key_lock.idle_time"] >= 1) && (hubServerCfgObj["pictureframe.action.key_lock.idle_time"] <= 10)) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.action.key_lock.idle_time " + hubServerCfgObj["pictureframe.action.key_lock.idle_time"]);
					Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate.*.pictureframe.action.key_lock.idle_time", hubServerCfgObj["pictureframe.action.key_lock.idle_time"]);
				}
			}
			if (hubServerCfgObj["pictureframe.action.delay2"] != undefined) {
				if ((hubServerCfgObj["pictureframe.action.delay2"] >= 1) && (hubServerCfgObj["pictureframe.action.delay2"] <= 5000)) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.action.delay2 " + hubServerCfgObj["pictureframe.action.delay2"]);
					Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate.*.pictureframe.action.delay2", hubServerCfgObj["pictureframe.action.delay2"]);
				}
			}
			if (hubServerCfgObj["pictureframe.key.left.map"] != undefined) {
				if ((hubServerCfgObj["pictureframe.key.left.map"] >= -2147483648) && (hubServerCfgObj["pictureframe.key.left.map"] <= 2147483647)) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.key.left.map " + hubServerCfgObj["pictureframe.key.left.map"]);
					Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate.*.pictureframe.key.left.map", hubServerCfgObj["pictureframe.key.left.map"]);
				}
			}
			if (hubServerCfgObj["pictureframe.key.middle.map"] != undefined) {
				if ((hubServerCfgObj["pictureframe.key.middle.map"] >= -2147483648) && (hubServerCfgObj["pictureframe.key.middle.map"] <= 2147483647)) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.key.middle.map " + hubServerCfgObj["pictureframe.key.middle.map"]);
					Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate.*.pictureframe.key.middle.map", hubServerCfgObj["pictureframe.key.middle.map"]);
				}
			}
			if (hubServerCfgObj["pictureframe.key.right.map"] != undefined) {
				if ((hubServerCfgObj["pictureframe.key.right.map"] >= -2147483648) && (hubServerCfgObj["pictureframe.key.right.map"] <= 2147483647)) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.key.right.map " + hubServerCfgObj["pictureframe.key.right.map"]);
					Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate.*.pictureframe.key.right.map", hubServerCfgObj["pictureframe.key.right.map"]);
				}
			}
			if (hubServerCfgObj["pictureframe.wakeup.timer.period"] != undefined) {
				if ((hubServerCfgObj["pictureframe.wakeup.timer.period"] >= 30) && (hubServerCfgObj["pictureframe.wakeup.timer.period"] <= 60)) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.wakeup.timer.period " + hubServerCfgObj["pictureframe.wakeup.timer.period"]);
					Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate.*.pictureframe.wakeup.timer.period", hubServerCfgObj["pictureframe.wakeup.timer.period"]);
				}
			}
			if (hubServerCfgObj["pictureframe.wakeup.timer.max_repeat"] != undefined) {
				if ((hubServerCfgObj["pictureframe.wakeup.timer.max_repeat"] >= 0) && (hubServerCfgObj["pictureframe.wakeup.timer.max_repeat"] <= 9)) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.wakeup.timer.max_repeat " + hubServerCfgObj["pictureframe.wakeup.timer.max_repeat"]);
					Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate.*.pictureframe.wakeup.timer.max_repeat", hubServerCfgObj["pictureframe.wakeup.timer.max_repeat"]);
				}
			}
			if (hubServerCfgObj["pictureframe.after_timer_actions.mask"] != undefined) {
				if ((hubServerCfgObj["pictureframe.after_timer_actions.mask"] >= 0) && (hubServerCfgObj["pictureframe.after_timer_actions.mask"] <= 65535)) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.after_timer_actions.mask " + hubServerCfgObj["pictureframe.after_timer_actions.mask"]);
					Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate.*.pictureframe.after_timer_actions.mask", hubServerCfgObj["pictureframe.after_timer_actions.mask"]);
				}
			}
			if (hubServerCfgObj["pictureframe.nfc.tag.protocol"] != undefined) {
				if ((hubServerCfgObj["pictureframe.nfc.tag.protocol"] == 0) || (hubServerCfgObj["pictureframe.nfc.tag.protocol"] == 1) ||
					(hubServerCfgObj["pictureframe.nfc.tag.protocol"] == 3) || (hubServerCfgObj["pictureframe.nfc.tag.protocol"] == 23) ||
					(hubServerCfgObj["pictureframe.nfc.tag.protocol"] == 39) || (hubServerCfgObj["pictureframe.nfc.tag.protocol"] == 8) ||
					(hubServerCfgObj["pictureframe.nfc.tag.protocol"] == 24) || (hubServerCfgObj["pictureframe.nfc.tag.protocol"] == 40)) {
					log("innes.wpan-hub-srv.device.slate.*.pictureframe.nfc.tag.protocol " + hubServerCfgObj["pictureframe.nfc.tag.protocol"]);
					Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate.*.pictureframe.nfc.tag.protocol", hubServerCfgObj["pictureframe.nfc.tag.protocol"]);
				}
			}
			if (hubServerCfgObj["pictureframe.wakeup.timer.enabled"] != undefined) {
				log("innes.wpan-hub-srv.device.slate.*.pictureframe.wakeup.timer.enabled " + hubServerCfgObj["pictureframe.wakeup.timer.enabled"]);
				Services.prefs.setBoolPref("innes.wpan-hub-srv.device.slate.*.pictureframe.wakeup.timer.enabled", hubServerCfgObj["pictureframe.wakeup.timer.enabled"]);
			}
			if (hubServerCfgObj["pictureframe.nfc.enabled"] != undefined) {
				log("innes.wpan-hub-srv.device.slate.*.pictureframe.nfc.enabled " + hubServerCfgObj["pictureframe.nfc.enabled"]);
				Services.prefs.setBoolPref("innes.wpan-hub-srv.device.slate.*.pictureframe.nfc.enabled", hubServerCfgObj["pictureframe.nfc.enabled"]);
			}
		};

		var setDeviceConfig = function (deviceConfig, psn) {
			log("setDeviceConfig psn " + psn);
			var index = 0;
			if (deviceConfig["pictureframe.index"]) {
				if ((deviceConfig["pictureframe.index"] >= 1) && (deviceConfig["pictureframe.index"] <= 20)) {
					index = deviceConfig["pictureframe.index"];
				}
			}
			if (index >= 1) {
				log("setDeviceConfig index = " + index);
				pairedList[index - 1] = psn;
				Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate." + index + ".pictureframe.index", index);
				if (deviceConfig["pictureframe.hostname"] != undefined) {
					const hostnameRegEx = /(^(([a-zA-Z0-9])(([a-zA-Z0-9\\.-]*)([a-zA-Z0-9])))*?$)/m;
					const valid = hostnameRegEx.exec(deviceConfig["pictureframe.hostname"]);
					if (valid !== null) {
						log("setDeviceConfig set innes.wpan-hub-srv.device.slate." + index + ".pictureframe.hostname " + deviceConfig["pictureframe.hostname"]);
						Services.prefs.setCharPref("innes.wpan-hub-srv.device.slate." + index + ".pictureframe.hostname", deviceConfig["pictureframe.hostname"]);
					}
				}
				if (deviceConfig["pictureframe.wpan1.authentication.method"] != undefined) {
					if ((deviceConfig["pictureframe.wpan1.authentication.method"] == "pincode") || (deviceConfig["pictureframe.wpan1.authentication.method"] == "none")) {
						log("setDeviceConfig set innes.wpan-hub-srv.device.slate." + index + ".pictureframe.wpan1.authentication.method " + deviceConfig["pictureframe.wpan1.authentication.method"]);
						Services.prefs.setCharPref("innes.wpan-hub-srv.device.slate." + index + ".pictureframe.wpan1.authentication.method", deviceConfig["pictureframe.wpan1.authentication.method"]);
					}
				}
				if (deviceConfig["pictureframe.wpan2.authentication.method"] != undefined) {
					if ((deviceConfig["pictureframe.wpan2.authentication.method"] == "pincode") || (deviceConfig["pictureframe.wpan2.authentication.method"] == "none")) {
						log("setDeviceConfig set innes.wpan-hub-srv.device.slate." + index + ".pictureframe.wpan2.authentication.method " + deviceConfig["pictureframe.wpan2.authentication.method"]);
						Services.prefs.setCharPref("innes.wpan-hub-srv.device.slate." + index + ".pictureframe.wpan2.authentication.method", deviceConfig["pictureframe.wpan2.authentication.method"]);
					}
				}
				if (deviceConfig["pictureframe.wpan1.authentication.pincode"] != undefined) {
					if ((deviceConfig["pictureframe.wpan1.authentication.pincode"] >= 0) && (deviceConfig["pictureframe.wpan1.authentication.pincode"] <= 9999)) {
						log("setDeviceConfig set innes.wpan-hub-srv.device.slate." + index + ".pictureframe.wpan1.authentication.pincode " + deviceConfig["pictureframe.wpan1.authentication.pincode"]);
						Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate." + index + ".pictureframe.wpan1.authentication.pincode", deviceConfig["pictureframe.wpan1.authentication.pincode"]);
					}
				}
				if (deviceConfig["pictureframe.pictureframe.display.mode"] != undefined) {
					if ((deviceConfig["pictureframe.pictureframe.display.mode"] >= 0) && (deviceConfig["pictureframe.pictureframe.display.mode"] <= 1)) {
						log("setDeviceConfig set innes.wpan-hub-srv.device.slate." + index + ".pictureframe.pictureframe.display.mode " + deviceConfig["pictureframe.pictureframe.display.mode"]);
						Services.prefs.setIntPref("innes.wpan-hub-srv.device.slate." + index + ".pictureframe.pictureframe.display.mode", deviceConfig["pictureframe.pictureframe.display.mode"]);
					}
				}
				if (deviceConfig["pictureframe.testcard.enabled"] != undefined) {
					log("setDeviceConfig set innes.wpan-hub-srv.device.slate." + index + ".pictureframe.testcard.enabled " + deviceConfig["pictureframe.testcard.enabled"]);
					Services.prefs.setBoolPref("innes.wpan-hub-srv.device.slate." + index + ".pictureframe.testcard.enabled", deviceConfig["pictureframe.testcard.enabled"]);
				}
			}
		};

		for (var macAddr in aConfiguration) {
			if ((macAddr == hubServerMacAddr)) {
				foundCfgObj = true;
				hubServerCfgObj = aConfiguration[macAddr];
				break;
			}
			if (!foundCfgObj && (macAddr == "")) {
				foundCfgObj = true;
				hubServerCfgObj = aConfiguration[macAddr];
			}
		}
		if (!foundCfgObj) {
			return;
		}

		setCommonConfig(hubServerCfgObj);
		var devices = hubServerCfgObj["devices"];
		if (devices) {
			for (var psn in devices) {
				var deviceConfig = devices[psn];
				setDeviceConfig(deviceConfig, psn);
			}
			WpanHubSrv.deleteAllDevices();
			WpanHubSrv.setPairedDevices_slate(pairedList, pairedList.length);
			WpanHubSrv.hasUpdatedConfigurationPreferences(pairedList, pairedList.length);
		}
		WpanHubSrv.maintenanceMode = false;
	} catch (e) {
		log("SetWpanHubServerConfiguration catch error " + e);
	}
	log("SetWpanHubServerConfiguration end");
}

function SetHubServerPushButton(aConfiguration) {
	log("SetHubServerPushButton begin");
	try {
		var foundCfgObj = false;
		let WpanHubSrv = Cc["@innes/hub/wpanhubsrv;1"].getService(Ci.nsIWpanHubSrv);
		WpanHubSrv.maintenanceMode = true;
		var WPANHUBSRV_MAX_PAIRED_DEVICES = WpanHubSrv.maxPairedDevices;
		var hubServerMacAddr = getCurrentHubServerMacAddr();
		var hubServerCfgObj = new Object();

		var enabledList = [];
		for (let i = 0; i < WPANHUBSRV_MAX_PAIRED_DEVICES; i++) {
			enabledList[i] = "";
		}
		if (!isG4() || (Platform != "smh300")) {
			log("SetHubServerPushButton end wrong platform");
			return;
		}

		for (var macAddr in aConfiguration) {
			if ((macAddr == hubServerMacAddr)) {
				foundCfgObj = true;
				hubServerCfgObj = aConfiguration[macAddr];
				break;
			}
			if (!foundCfgObj && (macAddr == "")) {
				foundCfgObj = true;
				hubServerCfgObj = aConfiguration[macAddr];
			}
		}
		if (!foundCfgObj) {
			return;
		}

		var devices = hubServerCfgObj["devices"];
		if (devices) {
			for (var macAddr in devices) {
				let id = devices[macAddr].id;
				if (id != undefined) {
					if ((id > 0) && (id <= WPANHUBSRV_MAX_PAIRED_DEVICES))
					{
						enabledList[id - 1] = macAddr;
					}
				}
			}
			WpanHubSrv.setPairedDevices_pushbutton(enabledList, enabledList.length);
		}
		WpanHubSrv.maintenanceMode = false;
	} catch (e) {
		log("SetHubServerPushButton catch error " + e);
	}
	log("SetHubServerPushButton end");
}

function SetHubServerSensor(aConfiguration) {
	log("SetHubServerSensor begin");
	try {
		var foundCfgObj = false;
		let WpanHubSrv = Cc["@innes/hub/wpanhubsrv;1"].getService(Ci.nsIWpanHubSrv);
		WpanHubSrv.maintenanceMode = true;
		var WPANHUBSRV_MAX_PAIRED_DEVICES = WpanHubSrv.maxPairedDevices;
		var hubServerMacAddr = getCurrentHubServerMacAddr();
		var hubServerCfgObj = new Object();

		var enabledList = [];
		for (let i = 0; i < WPANHUBSRV_MAX_PAIRED_DEVICES; i++) {
			enabledList[i] = "";
		}
		if (!isG4() || (Platform != "smh300")) {
			log("SetHubServerSensor end wrong platform");
			return;
		}

		for (var macAddr in aConfiguration) {
			if ((macAddr == hubServerMacAddr)) {
				foundCfgObj = true;
				hubServerCfgObj = aConfiguration[macAddr];
				break;
			}
			if (!foundCfgObj && (macAddr == "")) {
				foundCfgObj = true;
				hubServerCfgObj = aConfiguration[macAddr];
			}
		}
		if (!foundCfgObj) {
			return;
		}

		var devices = hubServerCfgObj["devices"];
		if (devices) {
			for (var macAddr in devices) {
				let id = devices[macAddr].id;
				if (id != undefined) {
					if ((id > 0) && (id <= WPANHUBSRV_MAX_PAIRED_DEVICES))
					{
						enabledList[id - 1] = macAddr;
					}
				}
			}
			WpanHubSrv.setPairedDevices_sensor(enabledList, enabledList.length);
		}
		WpanHubSrv.maintenanceMode = false;
	} catch (e) {
		log("SetHubServerSensor catch error " + e);
	}
	log("SetHubServerSensor end");
}

/*
* SMH300: get Hub srv MAC address
*
**/
function getCurrentHubServerMacAddr() {
	let generalSettings = Cc["@innes/system/generalsettings;1"].getService(Ci.nsISystemGeneralSettings);
	var byteMacAddr = generalSettings.mac;
	var strMacAddr = new String();
	strMacAddr = byteMacAddr.stringAddress;
	return strMacAddr;
}
/**
* DME204 specific functions
*/
function setEncoderVideo (aResolution, aFramerate) {
	getPlatform();
	if (isG4() && (Platform == "dme204")) {
		Services.prefs.setBoolPref("system.encoder_1.video.enabled", true);
		const currentConfig = EncodingCapabilities.getVideoEncodingFromPrefs();
		currentConfig.mode = aResolution;
		currentConfig.framerate = aFramerate;
		currentConfig.rateControl = "CBR";
		currentConfig.bitrate = 10000;
		currentConfig.peakBitrate = 10000;
		if (EncodingCapabilities.isVideoEncodingConfigAllowed(currentConfig)) {
			EncodingCapabilities.videoEncodingToPrefs(currentConfig);
		} else {
			error ("setEncoderVideo: required configuration for video encoder is not allowed");
		}
	}
}

function setEncoderVideoH264(aProfile, aLevel, aVlcMode) {
	getPlatform();
	if (isG4() && (Platform == "dme204")) {
		const currentConfig = EncodingCapabilities.getVideoEncodingFromPrefs();
		currentConfig.codec = "H264";
		currentConfig.profile = aProfile;
		currentConfig.level = aLevel;
		currentConfig.vlcMode = aVlcMode;
		if (EncodingCapabilities.isVideoEncodingConfigAllowed(currentConfig)) {
			EncodingCapabilities.videoEncodingToPrefs(currentConfig);
		} else {
			error ("setEncoderVideoH264: required configuration for H264 encoder is not allowed");
		}
	}
}

function setEncoderVideoBitrateConst(aBitRate) {
	getPlatform();
	if (isG4() && (Platform == "dme204")) {
		const currentConfig = EncodingCapabilities.getVideoEncodingFromPrefs();
		currentConfig.rateControl = "CBR";
		currentConfig.bitrate = aBitRate;
		currentConfig.peakBitrate = aBitRate;
		if (EncodingCapabilities.isVideoEncodingConfigAllowed(currentConfig)) {
			EncodingCapabilities.videoEncodingToPrefs(currentConfig);
		} else {
			error ("setEncoderVideoBitrateConst: required constant bitrate for video encoder is not allowed");
		}
	}
}

function setEncoderVideoBitrateVariable(aBitRate, aBitRatePeak) {
	getPlatform();
	if (isG4() && (Platform == "dme204")) {
		const currentConfig = EncodingCapabilities.getVideoEncodingFromPrefs();
		currentConfig.rateControl = "VBR";
		currentConfig.bitrate = aBitRate;
		currentConfig.peakBitrate = aBitRatePeak;
		if (EncodingCapabilities.isVideoEncodingConfigAllowed(currentConfig)) {
			EncodingCapabilities.videoEncodingToPrefs(currentConfig);
		} else {
			error ("setEncoderVideoBitrateVariable: required variable bitrate for video encoder is not allowed");
		}
	}
}

function enableEncoderAudio (aCodec) {
	getPlatform();
	if (isG4() && (Platform == "dme204")) {
		Services.prefs.setBoolPref("system.encoder_1.audio.enabled", true);
		Services.prefs.setCharPref("system.encoder_1.audio.codec", aCodec);
	}
}

function setUartForUSB2WPANAdapter () {
	getPlatform();
	if (isG4() && ((Platform == "dmb400") || (Platform == "sma300") || (Platform == "smt210"))) {
		Services.prefs.setCharPref("innes.adapters.serial.uart_1.syspath", "/dev/ttyACM0");
	}
}

function disableEncoderAudio () {
	getPlatform();
	if (isG4() && (Platform == "dme204")) {
		Services.prefs.setBoolPref("system.encoder_1.audio.enabled", false);
	}
}

function setEncoderAudioBitrateConst(aBitRate) {
	getPlatform();
	if (isG4() && (Platform == "dme204")) {
		const currentConfig = EncodingCapabilities.getAudioEncodingFromPrefs();
		currentConfig.rateControl = "CBR";
		currentConfig.bitrate = aBitRate;
		currentConfig.peakBitrate = aBitRate;
		if (EncodingCapabilities.isAudioEncodingConfigAllowed(currentConfig)) {
			EncodingCapabilities.audioEncodingToPrefs(currentConfig);
		} else {
			error ("setEncoderAudioBitrateConst: required constant bitrate for audio encoder is not allowed");
		}
	}
}

function setEncoderAudioBitrateVariable(aBitRate, aBitRatePeak) {
	getPlatform();
	if (isG4() && (Platform == "dme204")) {
		const currentConfig = EncodingCapabilities.getAudioEncodingFromPrefs();
		currentConfig.rateControl = "VBR";
		currentConfig.bitrate = aBitRate;
		currentConfig.peakBitrate = aBitRatePeak;
		if (EncodingCapabilities.isAudioEncodingConfigAllowed(currentConfig)) {
			EncodingCapabilities.audioEncodingToPrefs(currentConfig);
		} else {
			error ("setEncoderAudioBitrateVariable: required variable bitrate for audio encoder is not allowed");
		}
	}
}

function setEncoderService(aServiceName, aServiceId, aServiceProviderName) {
	getPlatform();
	if (isG4() && (Platform == "dme204")) {
		Services.prefs.setCharPref("system.encoder_1.service-name", aServiceName);
		Services.prefs.setIntPref("system.encoder_1.service-id", aServiceId);
		Services.prefs.setCharPref("system.encoder_1.service-provider-name", aServiceProviderName);
	}
}

function setEncoderNetwork(aNetworkName, aNetworkId) {
	getPlatform();

	if (isG4() && (Platform == "dme204")) {
		Services.prefs.setCharPref("system.encoder_1.network-name", aNetworkName);
		Services.prefs.setIntPref("system.encoder_1.network-id", aNetworkId);
	}
}

function setEncoderTransportStream(aTsId) {
	getPlatform();
	if (isG4() && (Platform == "dme204")) {
		Services.prefs.setIntPref("system.encoder_1.ts-id", aTsId);
	}
}

function setEncoderLcn(aLcn) {
	getPlatform();
	if (isG4() && (Platform == "dme204")) {
		Services.prefs.setIntPref("system.encoder_1.lcn", aLcn);
	}
}

function setEncoderNitVersion(aVersion) {
	getPlatform();
	if (isG4() && (Platform == "dme204")) {
		Services.prefs.setIntPref("system.encoder_1.nit-version", aVersion);
	}
}

function enableEncoderVisibleService() {
	getPlatform();
	if (isG4() && (Platform == "dme204")) {
		Services.prefs.setBoolPref("system.encoder_1.visible-service", true);
	}
}

function disableEncoderVisibleService() {
	getPlatform();
	if (isG4() && (Platform == "dme204")) {
		Services.prefs.setBoolPref("system.encoder_1.visible-service", false);
	}
}

function enableEncoderMultiServices() {
	getPlatform();
	if (isG4() && (Platform == "dme204")) {
		Services.prefs.setBoolPref("system.encoder_1.dvb-multi-services", true);
	}
}

function disableEncoderMultiServices() {
	getPlatform();
	if (isG4() && (Platform == "dme204")) {
		Services.prefs.setBoolPref("system.encoder_1.dvb-multi-services", false);
	}
}

function setStreamerOutputASI() {
	getPlatform();
	if (isG4() && (Platform == "dme204")) {
		Services.prefs.setCharPref("system.streamer_1.output", "ASI");
	}
}

function setStreamerOutputEthernet() {
	getPlatform();
	if (isG4() && (Platform == "dme204")) {
		Services.prefs.setCharPref("system.streamer_1.output", "Ethernet");
	}
}

function enableStreamerProtocolUdp(aDestIpAddr, aDestPort, aTsPerIp, aTtl) {
	getPlatform();
	if (isG4() && (Platform == "dme204")) {
		Services.prefs.setCharPref("system.streamer_1.protocol", "UDP");
		Services.prefs.setCharPref("system.streamer_1.protocol.udp.dest-ip-addr", aDestIpAddr);
		Services.prefs.setIntPref("system.streamer_1.protocol.udp.dest-port", aDestPort);
		Services.prefs.setIntPref("system.streamer_1.protocol.udp.ts-per-ip", aTsPerIp);
		Services.prefs.setIntPref("system.streamer_1.protocol.udp.ttl", aTtl);
	}
}

function enableStreamerProtocolRtp(aDestIpAddr, aDestPort, aTsPerIp, aTtl) {
	getPlatform();
	if (isG4() && (Platform == "dme204")) {
		Services.prefs.setCharPref("system.streamer_1.protocol", "RTP");
		Services.prefs.setCharPref("system.streamer_1.protocol.udp.dest-ip-addr", aDestIpAddr);
		Services.prefs.setIntPref("system.streamer_1.protocol.udp.dest-port", aDestPort);
		Services.prefs.setIntPref("system.streamer_1.protocol.udp.ts-per-ip", aTsPerIp);
		Services.prefs.setIntPref("system.streamer_1.protocol.udp.ttl", aTtl);
	}
}

function enableStreamerProtocolRtmp(aServerAddr, aStreamKey) {
	getPlatform();
	if (isG4() && (Platform == "dme204")) {
		Services.prefs.setCharPref("system.streamer_1.protocol", "RTMP");
		Services.prefs.setCharPref("system.streamer_1.protocol.rtmp.server-addr", aServerAddr);
		Services.prefs.setCharPref("system.streamer_1.protocol.rtmp.stream-key", aStreamKey);
	}
}

function setStreamerAudioSamplerate(aSampleRate)
{
	getPlatform();

	if (isG4() && (Platform == "dme204"))
	{
		Services.prefs.setIntPref("system.streamer_1.audio.samplerate", aSampleRate);
	}
}

function enableMulticastOutputOnLAN1() {
	getPlatform();
	if (isG4() && (Platform == "dme204")) {
		Services.prefs.setBoolPref("system.connector.rj45_1.*.ethernet.lan_1.streaming_multicast.output.enabled", true);
		Services.prefs.setBoolPref("system.connector.rj45_2.*.ethernet.lan_1.streaming_multicast.output.enabled", false);
	}
}

function enableMulticastOutputOnLAN2() {
	getPlatform();
	if (isG4() && (Platform == "dme204")) {
		Services.prefs.setBoolPref("system.connector.rj45_1.*.ethernet.lan_1.streaming_multicast.output.enabled", false);
		Services.prefs.setBoolPref("system.connector.rj45_2.*.ethernet.lan_1.streaming_multicast.output.enabled", true);
	}
}

function enableMulticastOutputOnLAN1LAN2() {
	getPlatform();

	if (isG4() && (Platform == "dme204")) {
		Services.prefs.setBoolPref("system.connector.rj45_1.*.ethernet.lan_1.streaming_multicast.output.enabled", true);
		Services.prefs.setBoolPref("system.connector.rj45_2.*.ethernet.lan_1.streaming_multicast.output.enabled", true);
	}
}
/**
 * Enable the Playlog feature with a simple configuration.
 * @param  aServerUrl URL of the remote WebDAV server,
 * @param  aUsername Username of the remote WebDAV server,
 * @param  aPassword Password of the remote WebDAV server,
 * @param  aTimeSend Time of the daily file sending.
 */
function setPlaylog(aServerUrl, aUsername, aPassword, aTimeSend) {
	Services.prefs.setBoolPref("innes.launcher.playlog.enabled", true);
	Services.prefs.setCharPref("innes.launcher.playlog.remote.base-uri", aServerUrl);
	Services.prefs.setCharPref("innes.launcher.playlog.remote.username", aUsername);
	Services.prefs.setCharPref("innes.launcher.playlog.remote.password", aPassword);
	Services.prefs.setCharPref("innes.launcher.playlog.remote.time", aTimeSend);
}
/**
 * Enable the Playlog feature with a extented configuration.
 * @param  aServerUrl URL of the remote WebDAV server,
 * @param  aUsername Username of the remote WebDAV server,
 * @param  aPassword Password of the remote WebDAV server,
 * @param  aTimeSend Time of the daily file sending,
 * @param  aMemoryDumpDelai Time interval for recording events in memory in the local file (minutes),
 * @param  aMaxRetry Maximum retry number in case of failure to send the event file,
 * @param  aRetryDelay Waiting time between retry (secondes),
 * @param  aRandomDelay Maximum value of the random delay added at the time of deposit (secondes).
 */
function setPlaylogExtended(aServerUrl, aUsername, aPassword, aTimeSend, aMemoryDumpDelai, aMaxRetry, aRetryDelay, aRandomDelay) {
	Services.prefs.setBoolPref("innes.launcher.playlog.enabled", true);
	Services.prefs.setCharPref("innes.launcher.playlog.remote.base-uri", aServerUrl);
	Services.prefs.setCharPref("innes.launcher.playlog.remote.username", aUsername);
	Services.prefs.setCharPref("innes.launcher.playlog.remote.password", aPassword);
	Services.prefs.setCharPref("innes.launcher.playlog.remote.time", aTimeSend);
	Services.prefs.setIntPref("innes.launcher.playlog.local.write-delay", aMemoryDumpDelai);
	Services.prefs.setIntPref("innes.launcher.playlog.remote.max-retry", aMaxRetry);
	Services.prefs.setIntPref("innes.launcher.playlog.remote.retry-delay", aRetryDelay);
	Services.prefs.setIntPref("innes.launcher.playlog.remote.random-delay", aRandomDelay);
}
function disablePlaylog() {
	Services.prefs.setBoolPref("innes.launcher.playlog.enabled", false);
}
function enableTestCardKeyEvent() {
	if (isG4OS()) {
		getPlatform();
		if ( (Platform != "smh300") && (Platform != "dme204") && (Platform != "smt210") ) {
			Services.prefs.setBoolPref("innes.player.mire.key-event.*.authorized", true);
		}
	}
}

function disableTestCardKeyEvent() {
	if (isG4OS()) {
		getPlatform();
		if ( (Platform != "smh300") && (Platform != "dme204") && (Platform != "smt210") ) {
			Services.prefs.setBoolPref("innes.player.mire.key-event.*.authorized", false);
		}
	}
}

/**
 * Configure the attribute values of a energie level
 * @param aPowerLevel The power manager energie profile to be configured; "min", "low", "high", "max"
 * @param aPowerMode The power mode set for displayoutput adapters (0 or 1)
 * @param aMute The mute indicator set for soundoutput adapters (true or false)
 * @param aVolume The volume set for soundoutput adapters (0 to 100)
 * @param aBrightness The brightness set for the 'av-cmd' profiles (0 to 100)
 * @param aBacklight The backlight set for the 'av-cmd' profiles (0 to 100)
 * @param aOpacity The opacity set for displayoutput adapters (0 to 100)
 */
function setPowerManagerLevels(aPowerLevel, aPowerMode, aMute, aVolume, aBrightness, aBacklight, aOpacity)
{
	if (isG4())
	{
		getPlatform();
		let baseadapter = "innes.power-manager.level." + aPowerLevel + ".adapter.";
		Services.prefs.setIntPref(baseadapter + "power-mode", aPowerMode);
		if (Platform != "dme204") {
			Services.prefs.setIntPref(baseadapter + "opacity", aOpacity);
		}
		Services.prefs.setBoolPref(baseadapter + "mute", aMute);
		Services.prefs.setIntPref(baseadapter + "volume", aVolume);

		if (Platform != "dme204") {
			let baseavcmd = "innes.power-manager.level." + aPowerLevel + ".av-cmd.";
			Services.prefs.setIntPref(baseavcmd + "power-mode", aPowerMode);
			Services.prefs.setIntPref(baseavcmd + "brightness", aBrightness);
			Services.prefs.setIntPref(baseavcmd + "backlight", aBacklight);
			Services.prefs.setBoolPref(baseavcmd + "mute", aMute);
			Services.prefs.setIntPref(baseavcmd + "volume", aVolume);
		}
	}
}
/**
 * Configure the delay between 2 AV commands in the power manager context
 * @param aValueDelayInMs The value in ms of the delay between 2 AVcmd sent to a monitor
  */
function setPowerManagerAvcmdDelay(aValueDelayInMs) {
	if (isG4()) {
		getPlatform();
		if (Platform != "dme204") {
			Services.prefs.setIntPref("innes.power-manager.av-cmd.delay", aValueDelayInMs);
		}
	}
	/* else not available */
}
/**
 * Define the calendar of power manager.
 * */
function setPowerManagerCalendar(aCalendar)
{
	if (isG4())
	{
		Services.prefs.setCharPref("innes.power-manager.calendar", aCalendar);
	}
}
/**
 * Define the calendar of reboot manager.
 * */
function setRebootManagerCalendar(aCalendar)
{
	if (isG4())
	{
		Services.prefs.setCharPref("innes.reboot-manager.calendar", aCalendar);
	}
}
/**
* Test if Gekkota is G4 generation
*/
var gIsG4 = undefined;
function isG4() {
     if (gIsG4 == undefined)      {
		let version = Services.prefs.getCharPref("extensions.lastAppVersion");
		let tab = version.split(".");
		let major = parseInt(tab[0]);
		gIsG4 = (major == 4);
	}
	return gIsG4;
}
/**
* Test if Gekkota is type OS and G4 generation
*/
var gIsG4OS = undefined;
function isG4OS() {
     if (gIsG4OS == undefined)      {
		let version = Services.prefs.getCharPref("extensions.lastAppVersion");
		let tab = version.split(".");
		let major = parseInt(tab[0]);
		let name = Services.prefs.getCharPref("extensions.lastAppName");

		gIsG4OS = (major == 4) && (name.toLowerCase() == "gekkota os");
	}
	return gIsG4OS;
}

function log(str) {
    logger.debug(str, null);
}

function warn(str) {
    logger.warn(str, null);
}

function error(str) {
    logger.error(str, null);
}
