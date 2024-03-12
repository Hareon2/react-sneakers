import docker

# Создаем клиент Docker
client = docker.from_env()

# Получаем список всех контейнеров
containers = client.containers.list()

# Удаляем каждый контейнер
for container in containers:
    container.remove(force=True)
    print(f"Контейнер {container.id} удален.")

