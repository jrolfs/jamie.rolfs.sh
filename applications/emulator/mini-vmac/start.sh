#!/usr/bin/env bash

/usr/bin/Xvfb :$1 -screen 0 1032x692x24 -ac +extension GLX +render -noreset -audit 4  &

sleep 1

x11vnc -xkb -noxrecord -noxfixes -noxdamage -display :$1 -forever -rfbauth /home/macintosh/.vnc/passwd -rfbport $((59000 + $1)) -clip 1024x684+8+8 -flag /tmp/.x11vnc-ports/X11VNC$1 -rmflag /tmp/.x11vnc-ports/X11VNC$1 &

sleep 1

DISPLAY=:$1 /mini-vmac/mini-vmac-4x
