---
date: '2025-02-08T21:11:32-04:00'
title: 'Monitor command for changes'
---

I typically use this with `./monitor.sh lsusb` to tell when an nvidia jetson is in flashing mode.

Useful any time you find yourself typing the same command over and over again to
check the status of something. Use it with nslookup to see when your DNS changes 
have propagated. Etc.

```bash
#!/usr/bin/env bash

if [ "$#" -eq 0 ]; then
        echo "Usage: $0 <command_to_monitor> [arg1] [arg2] [...]"
        exit 1
fi

command_to_monitor=("$@")

while true; do
        result=$("${command_to_monitor[@]}")
        timestamp=$(date +"%Y-%m-%d %H:%M:%S")

        if [ "$result" != "$prev_result" ]; then
                printf "\e[1;34m%s\e[0m ------------ \n%s\n" "$timestamp" "$result"
                prev_result="$result"
        fi

        sleep 1
done
```
