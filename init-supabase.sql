-- Criar tabela de clientes
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de projetos
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  responsible TEXT NOT NULL,
  quantity_photos INTEGER DEFAULT 0,
  status TEXT DEFAULT 'recebidos',
  order_index BIGINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_clients_name ON clients(name);

-- Habilitar RLS (Row Level Security)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Criar políticas de acesso público (permitir leitura e escrita para todos)
CREATE POLICY "Allow public read on clients" ON clients FOR SELECT USING (true);
CREATE POLICY "Allow public insert on clients" ON clients FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on clients" ON clients FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on clients" ON clients FOR DELETE USING (true);

CREATE POLICY "Allow public read on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public insert on projects" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on projects" ON projects FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on projects" ON projects FOR DELETE USING (true);

