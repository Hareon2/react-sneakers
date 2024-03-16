#!/bin/bash

# Устанавливаем пароль пользователя vagrant
password="vagrant"

# Путь к директории с ключами
ssh_dir="/home/runner/.ssh"

# Проверяем наличие приватного ключа
if [ -f "$ssh_dir/id_rsa" ]; then
    echo "everything is okay"
else
    # Если файл конфигурации отсутствует, создать его
    # Создаем SSH ключ без ввода пароля (пустой пароль)
    ssh-keygen -t rsa -b 4096 -N '' -f "$ssh_dir/id_rsa"
    cat "$ssh_dir/id_rsa.pub" | sshpass -p "$password" ssh vagrant@192.168.0.111 'mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys'
fi

