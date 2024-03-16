#!/bin/bash

# Устанавливаем пароль пользователя vagrant
password="vagrant"

# Проверяем наличие приватного ключа
if [ -f ~/.ssh/id_rsa ]; then
    ansible-playbook -i inventory/cluster all.yaml
else
    # Если файл конфигурации отсутствует, создать его
    # Создаем SSH ключ без ввода пароля (пустой пароль)
    ssh-keygen -t rsa -b 4096 -N '' -f ~/.ssh/id_rsa
    cat ~/.ssh/id_rsa.pub | sshpass -p "$password" ssh $SERVER_USER@$VAGRANT_IP_ADDRESS 'mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys'
    ansible-playbook -i inventory/cluster all.yml
fi
