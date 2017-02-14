# Start-Process "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe" -Argument "node_modules/.bin/karma start test/karma/chrome/chrome-watch.karma.conf"
Start-Process "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe" -Argument "../node_modules/.bin/karma start karma/chrome/chrome-watch.karma.conf"
Start-Process "chrome" -Argument "_reports\html-results.html"