# Documentação do Projeto
* **Caso Selecionado:** Caso 4 — Fila de Atendimento

* **Link do Projeto no GitHub:** https://github.com/AlanVinicius357/Trabalho-Manuten-o-de-Software

* **Integrantes do Grupo:**
  1. Matrícula: 24114290015 - Alan Vinicius Borges de Souza (Líder do Grupo)
  2. Matrícula: 24114290157 - Luan Barboza

## Guia para iniciar o projeto:

Docker Desktop instalado e em execução.
Clonar o Repositório e Acessar a Pasta:

git clone https://github.com/AlanVinicius357/Trabalho-Manuten-o-de-Software.git
cd Trabalho-Manuten-o-de-Software

Inicializar o Ambiente Unificado: "docker-compose up --build -d"

Validar se o Ambiente está Ativo: "docker ps"

## Guia para testar as requisições no Postman

Passo 1: Cadastrar um Paciente
Método: POST

URL: http://localhost:3000/pacientes

Body (JSON):

JSON
{ "nome": "João da Silva", "data_nascimento": "1995-08-15" }
(O sistema criará o paciente e retornará o id: 1)

Passo 2: Inserir o Paciente na Fila
Método: POST

URL: http://localhost:3000/fila

Body (JSON):

JSON
{ "paciente_id": 1, "prioridade": "Alta" }
Passo 3: Listar Painel de Atendimento (Regra do Caso 4)
Método: GET

URL: http://localhost:3000/fila

Ação: Retorna a fila ativa. Cadastre outros pacientes com prioridades diferentes e veja a mágica acontecer: o backend ordena automaticamente trazendo as prioridades "Alta" no topo.

Passo 4: Finalizar o Atendimento
Método: PUT

URL: http://localhost:3000/fila/1/finalizar

Ação: Altera o status do paciente para concluído, retirando-o da listagem de espera ativa.

## 1. Banco de Dados 
O sistema utiliza um banco de dados relacional (PostgreSQL) focado na integridade dos dados e na correta ordenação por prioridades para a clínica-escola.

### Modelo Entidade-Relacionamento 
O modelo possui um relacionamento de **1 para Muitos (1:N)** entre Pacientes e Fila de Atendimento:
* **Pacientes:** Tabela base contendo dados cadastrais dos pacientes.
* **Fila de Atendimento:** Tabela operacional que gerencia o fluxo de chamadas do dia. Cada registro está vinculado a um paciente específico via chave estrangeira.

### Scripts de Criação (DDL)
O script localizado em database/init.sql define a estrutura automatizada do banco:
```sql
CREATE TABLE IF NOT EXISTS pacientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS fila_atendimento (
    id SERIAL PRIMARY KEY,
    paciente_id INT NOT NULL,
    prioridade VARCHAR(10) NOT NULL CHECK (prioridade IN ('Baixa', 'Média', 'Alta')),
    status VARCHAR(20) DEFAULT 'Aguardando' CHECK (status IN ('Aguardando', 'Em Atendimento', 'Finalizado')),
    data_entrada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);