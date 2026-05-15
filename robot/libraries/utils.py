from faker import Faker
import random

fake = Faker('pt_BR')


def gerar_nome():
    return fake.name()


def gerar_numero_cartao():
    return ''.join([str(random.randint(0, 9)) for _ in range(16)])


def gerar_validade():
    return f"{random.randint(1,12):02d}/{random.randint(26,30)}"


def gerar_cvv():
    return str(random.randint(100, 999))