# Documentação do Projeto

## Cabeçalho Obrigatório
* Caso Selecionado: Caso 4 — Fila de Atendimento
* Link do Projeto no GitHub: [https://github.com/AlanVinicius357/Trabalho-Manuten-o-de-Software]

* Integrantes do Grupo:
  1. Matrícula: 24114290015 -Alan Vinicius Borges de Souza (Líder do Grupo)
  2. Matrícula: 24114290157 - Luan Barboza

## 1. Banco de Dados
Explicação do modelo de dados e relacionamentos.

### Modelo Entidade-Relacionamento (MER)
O sistema utiliza um banco de dados relacional com as seguintes entidades principais:
* **Pacientes:** Armazena os dados cadastrais (ID, Nome, Data de Nascimento, etc.).
* **Atendimentos/Fila:** Controla a fila ativa (ID, ID_Paciente, Prioridade [Baixa/Média/Alta], Status [Aguardando/Em Atendimento/Finalizado], Data/Hora de Entrada).

### Scripts de Criação (DDL)
```sql
CREATE TABLE pacientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE
);

CREATE TABLE fila_atendimento (
    id SERIAL PRIMARY KEY,
    paciente_id INT REFERENCES pacientes(id),
    prioridade VARCHAR(10) CHECK (prioridade IN ('Baixa', 'Média', 'Alta')),
    status VARCHAR(20) DEFAULT 'Aguardando',
    data_entrada TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);