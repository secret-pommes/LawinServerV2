@echo off
:start
title LawinServerV2
set NODE_NO_WARNINGS=1
echo.
echo - LawinServerV2
echo.
node index.js
title Restarting..
cls
goto start