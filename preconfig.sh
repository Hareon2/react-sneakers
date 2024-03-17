#!/bin/bash

# Устанавливаем пароль пользователя vagrant
password="vagrant"

# Проверяем наличие приватного ключа
if [ -f /home/runner/.ssh/id_rsa ]; then
    echo "Everything is okay"
else
    # Если файл конфигурации отсутствует, создаем его
    # Создаем SSH ключ без ввода пароля (пустой пароль)
    ssh-keygen -t rsa -b 4096 -N '' -f /home/runner/.ssh/id_rsa
    cat /home/runner/.ssh/id_rsa.pub | sshpass -p "$password" ssh vagrant@192.168.0.111 'mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys'
fi


