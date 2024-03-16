import pexpect

def add_ssh_key(user, host, password, public_key_path):
    command = f"ssh-copy-id -i {public_key_path} {user}@{host}"
    child = pexpect.spawn(command)

    # Ожидаем запрос о добавлении нового ключа
    i = child.expect([pexpect.TIMEOUT, "Are you sure you want to continue connecting (yes/no)?"])

    if i == 0:  # Если получен TIMEOUT
        print("Timed out. Unable to connect.")

    if i == 1:  # Если получен запрос "Are you sure you want to continue connecting"
        child.sendline("yes")
        # Ждем запроса пароля
        j = child.expect([pexpect.TIMEOUT, "password:"])
        
        if j == 0:  # Если получен TIMEOUT после ответа "yes"
            print("Timed out. Unable to connect.")
        elif j == 1:  # Если получен запрос пароля
            child.sendline(password)
            child.expect(pexpect.EOF)
            print("SSH key added successfully.")


