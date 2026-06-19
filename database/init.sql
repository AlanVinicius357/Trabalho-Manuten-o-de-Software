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