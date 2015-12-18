headless server for zoa
=======================

Installation Instructions
-------------------------
Install node.js on your machine: https://nodejs.org/en/download/
Unzip zoa.zip into a directory

Run the Zoa Server
------------------
open a command shell/window
cd into zoa/src/serverHeadless
type: node ./serverMain.js

You should see a server start in the shell with an IP address like:
  7 Dec 2015 9:13:43pm zoa server (v1.1.0) (debug ON)
  7 Dec 2015 9:13:43pm server started on: 192.168.1.7:43770
  7 Dec 2015 9:13:43pm Press ^C^C to stop the server        

Open a browser and direct it to 192.168.1.7:43770
(Note thatthe IP address is usually a local host, but not always.)


----------------------------------------------------------------------
date.js: formats the date and time
serverConfig.js: wraps package.json and adds IpAddress access.
serverLogger.js: logs and displays the server's state.
serverMain.js:  main entry point. Creates the config object, server, logger.
serverServer.js: wraps express as a server




