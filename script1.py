import pexpect

def add_ssh_key(username, host, password, public_key_path):
    command = f"ssh-copy-id -i {public_key_path} {username}@{host}"
    child = pexpect.spawn(command, timeout=30)
    index = child.expect(["password:", pexpect.EOF, pexpect.TIMEOUT])

    if index == 0:  # Password prompt
        child.sendline(password)
        child.expect(pexpect.EOF)
    elif index == 1:  # EOF
        print("SSH key was added successfully or already exists.")
    elif index == 2:  # Timeout
        print("Connection timed out.")

# Replace the arguments with your actual username, host, password, and public key path
add_ssh_key('vagrant', '192.168.0.101', 'vagrant', '~/.ssh/id_rsa')


