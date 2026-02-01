-- Seed data for ComUni

-- Insert service categories
INSERT INTO public.service_categories (name, icon, description) VALUES
('Eletricista', 'Zap', 'Serviços elétricos residenciais e comerciais'),
('Encanador', 'Droplet', 'Serviços de encanamento e hidráulica'),
('Pintor', 'Paintbrush', 'Pintura residencial e comercial'),
('Faz Tudo', 'Wrench', 'Serviços gerais e reparos diversos'),
('Limpeza', 'Sparkles', 'Serviços de limpeza residencial e comercial'),
('Montagem de Móveis', 'Package', 'Montagem e desmontagem de móveis'),
('Mecânico', 'Car', 'Serviços mecânicos automotivos'),
('Ar Condicionado', 'Wind', 'Instalação e manutenção de ar condicionado'),
('Pet Shop', 'Dog', 'Serviços para animais de estimação'),
('Jardinagem', 'Leaf', 'Serviços de jardinagem e paisagismo')
ON CONFLICT (name) DO NOTHING;

-- Insert sample companies in major Brazilian cities
INSERT INTO public.companies (name, cnpj, category, description, latitude, longitude, city, state, address, phone, rating, total_reviews) VALUES
-- São Paulo
('Casa de Ração Pet Love', '12.345.678/0001-01', 'Pet Shop', 'Loja de produtos para animais com atendimento especializado', -23.5505, -46.6333, 'São Paulo', 'SP', 'Av. Paulista, 1000', '(11) 99999-0001', 4.5, 128),
('Elétrica Luz SP', '12.345.678/0001-02', 'Eletricista', 'Serviços elétricos com profissionais certificados', -23.5489, -46.6388, 'São Paulo', 'SP', 'Rua Augusta, 500', '(11) 99999-0002', 4.8, 256),
('Encanamentos Express', '12.345.678/0001-03', 'Encanador', 'Atendimento 24h para emergências hidráulicas', -23.5600, -46.6500, 'São Paulo', 'SP', 'Rua Oscar Freire, 200', '(11) 99999-0003', 4.2, 89),
('Pinturas Arco-Íris', '12.345.678/0001-04', 'Pintor', 'Pintura residencial e comercial com acabamento premium', -23.5450, -46.6400, 'São Paulo', 'SP', 'Rua Haddock Lobo, 300', '(11) 99999-0004', 4.7, 167),
('Faz Tudo São Paulo', '12.345.678/0001-05', 'Faz Tudo', 'Reparos gerais para sua casa ou empresa', -23.5520, -46.6280, 'São Paulo', 'SP', 'Alameda Santos, 450', '(11) 99999-0005', 4.4, 203),
('Clean House SP', '12.345.678/0001-06', 'Limpeza', 'Limpeza profissional residencial e pós-obra', -23.5580, -46.6550, 'São Paulo', 'SP', 'Rua da Consolação, 1500', '(11) 99999-0006', 4.6, 312),
('Móveis Montados', '12.345.678/0001-07', 'Montagem de Móveis', 'Montagem rápida e profissional', -23.5400, -46.6200, 'São Paulo', 'SP', 'Av. Brasil, 800', '(11) 99999-0007', 4.3, 145),
('Auto Mecânica Central', '12.345.678/0001-08', 'Mecânico', 'Oficina mecânica completa com diagnóstico computadorizado', -23.5650, -46.6600, 'São Paulo', 'SP', 'Rua Vergueiro, 2000', '(11) 99999-0008', 4.9, 478),
('Clima Perfeito AC', '12.345.678/0001-09', 'Ar Condicionado', 'Instalação e manutenção de ar condicionado', -23.5550, -46.6450, 'São Paulo', 'SP', 'Av. Rebouças, 1200', '(11) 99999-0009', 4.5, 198),
('Jardim Verde SP', '12.345.678/0001-10', 'Jardinagem', 'Paisagismo e manutenção de jardins', -23.5480, -46.6350, 'São Paulo', 'SP', 'Rua Estados Unidos, 500', '(11) 99999-0010', 4.7, 87),

-- Rio de Janeiro
('Pet Center RJ', '23.456.789/0001-01', 'Pet Shop', 'Tudo para seu pet com carinho', -22.9068, -43.1729, 'Rio de Janeiro', 'RJ', 'Av. Atlântica, 500', '(21) 99999-0001', 4.6, 234),
('Eletricistas Cariocas', '23.456.789/0001-02', 'Eletricista', 'Serviços elétricos com garantia', -22.9100, -43.1800, 'Rio de Janeiro', 'RJ', 'Rua Barata Ribeiro, 300', '(21) 99999-0002', 4.4, 156),
('Hidráulica RJ', '23.456.789/0001-03', 'Encanador', 'Soluções em hidráulica residencial', -22.9150, -43.1750, 'Rio de Janeiro', 'RJ', 'Av. Nossa Senhora de Copacabana, 800', '(21) 99999-0003', 4.3, 112),

-- Belo Horizonte
('Casa Animal BH', '34.567.890/0001-01', 'Pet Shop', 'Pet shop completo com veterinário', -19.9167, -43.9345, 'Belo Horizonte', 'MG', 'Av. Afonso Pena, 1000', '(31) 99999-0001', 4.7, 189),
('BH Elétrica', '34.567.890/0001-02', 'Eletricista', 'Eletricistas profissionais certificados', -19.9200, -43.9400, 'Belo Horizonte', 'MG', 'Rua da Bahia, 500', '(31) 99999-0002', 4.5, 143),

-- Porto Alegre
('Pet Sul', '45.678.901/0001-01', 'Pet Shop', 'Produtos e serviços para pets', -30.0346, -51.2177, 'Porto Alegre', 'RS', 'Rua dos Andradas, 1500', '(51) 99999-0001', 4.8, 267),
('Gaúcha Elétrica', '45.678.901/0001-02', 'Eletricista', 'Serviços elétricos de qualidade', -30.0300, -51.2200, 'Porto Alegre', 'RS', 'Av. Ipiranga, 800', '(51) 99999-0002', 4.6, 178),

-- Salvador
('Pet Bahia', '56.789.012/0001-01', 'Pet Shop', 'Amor pelos animais em primeiro lugar', -12.9714, -38.5014, 'Salvador', 'BA', 'Av. Tancredo Neves, 2000', '(71) 99999-0001', 4.4, 145),

-- Brasília
('Casa Pet DF', '67.890.123/0001-01', 'Pet Shop', 'O melhor para seu animal', -15.7801, -47.9292, 'Brasília', 'DF', 'SCS Quadra 1, Bloco A', '(61) 99999-0001', 4.5, 198),
('Elétrica Capital', '67.890.123/0001-02', 'Eletricista', 'Serviços elétricos em todo DF', -15.7850, -47.9300, 'Brasília', 'DF', 'SHS Quadra 6, Bloco E', '(61) 99999-0002', 4.7, 212)
ON CONFLICT (cnpj) DO NOTHING;

-- Insert sample jobs based on companies
INSERT INTO public.jobs (company_id, title, description, category, salary_min, salary_max, job_type, requirements, benefits, latitude, longitude, city, state) 
SELECT 
  c.id,
  CASE c.category
    WHEN 'Pet Shop' THEN 'Atendente de Pet Shop'
    WHEN 'Eletricista' THEN 'Eletricista Residencial'
    WHEN 'Encanador' THEN 'Encanador Profissional'
    WHEN 'Pintor' THEN 'Pintor Profissional'
    WHEN 'Faz Tudo' THEN 'Auxiliar de Manutenção'
    WHEN 'Limpeza' THEN 'Auxiliar de Limpeza'
    WHEN 'Montagem de Móveis' THEN 'Montador de Móveis'
    WHEN 'Mecânico' THEN 'Mecânico Automotivo'
    WHEN 'Ar Condicionado' THEN 'Técnico de Ar Condicionado'
    WHEN 'Jardinagem' THEN 'Jardineiro'
    ELSE 'Auxiliar Geral'
  END,
  CASE c.category
    WHEN 'Pet Shop' THEN 'Atendimento ao cliente, cuidados com animais, organização de produtos, banho e tosa. Experiência com animais é um diferencial.'
    WHEN 'Eletricista' THEN 'Instalações e reparos elétricos residenciais e comerciais. Necessário conhecimento em NR-10.'
    WHEN 'Encanador' THEN 'Instalação e manutenção de sistemas hidráulicos. Experiência comprovada na área.'
    WHEN 'Pintor' THEN 'Pintura interna e externa, preparação de superfícies, acabamento de qualidade.'
    WHEN 'Faz Tudo' THEN 'Pequenos reparos e manutenções diversas em residências e empresas.'
    WHEN 'Limpeza' THEN 'Limpeza residencial e comercial, pós-obra, higienização de ambientes.'
    WHEN 'Montagem de Móveis' THEN 'Montagem e desmontagem de móveis, leitura de manuais, ferramentas próprias.'
    WHEN 'Mecânico' THEN 'Manutenção preventiva e corretiva de veículos, diagnóstico computadorizado.'
    WHEN 'Ar Condicionado' THEN 'Instalação, limpeza e manutenção de aparelhos de ar condicionado.'
    WHEN 'Jardinagem' THEN 'Manutenção de jardins, poda, plantio, paisagismo básico.'
    ELSE 'Atividades gerais de suporte e auxílio.'
  END,
  c.category,
  CASE c.category
    WHEN 'Pet Shop' THEN 1500.00
    WHEN 'Eletricista' THEN 2500.00
    WHEN 'Encanador' THEN 2200.00
    WHEN 'Pintor' THEN 2000.00
    WHEN 'Faz Tudo' THEN 1800.00
    WHEN 'Limpeza' THEN 1400.00
    WHEN 'Montagem de Móveis' THEN 1800.00
    WHEN 'Mecânico' THEN 3000.00
    WHEN 'Ar Condicionado' THEN 2800.00
    WHEN 'Jardinagem' THEN 1600.00
    ELSE 1500.00
  END,
  CASE c.category
    WHEN 'Pet Shop' THEN 2200.00
    WHEN 'Eletricista' THEN 4500.00
    WHEN 'Encanador' THEN 4000.00
    WHEN 'Pintor' THEN 3500.00
    WHEN 'Faz Tudo' THEN 3000.00
    WHEN 'Limpeza' THEN 2200.00
    WHEN 'Montagem de Móveis' THEN 3000.00
    WHEN 'Mecânico' THEN 5500.00
    WHEN 'Ar Condicionado' THEN 5000.00
    WHEN 'Jardinagem' THEN 2800.00
    ELSE 2500.00
  END,
  'full-time',
  CASE c.category
    WHEN 'Pet Shop' THEN ARRAY['Ensino médio completo', 'Gostar de animais', 'Boa comunicação', 'Disponibilidade de horários']
    WHEN 'Eletricista' THEN ARRAY['Curso técnico em eletrotécnica', 'NR-10 atualizado', 'Experiência mínima 2 anos', 'CNH categoria B']
    WHEN 'Encanador' THEN ARRAY['Experiência comprovada', 'Conhecimento em tubulações', 'Ferramentas próprias', 'Disponibilidade imediata']
    WHEN 'Pintor' THEN ARRAY['Experiência em pintura residencial', 'Conhecimento em preparação de superfícies', 'Capricho e organização']
    WHEN 'Faz Tudo' THEN ARRAY['Experiência em manutenção predial', 'Conhecimentos básicos de elétrica e hidráulica', 'Proatividade']
    WHEN 'Limpeza' THEN ARRAY['Experiência em limpeza profissional', 'Disponibilidade de horários', 'Pontualidade']
    WHEN 'Montagem de Móveis' THEN ARRAY['Experiência em montagem', 'Ferramentas próprias', 'Leitura de manuais', 'Veículo próprio']
    WHEN 'Mecânico' THEN ARRAY['Curso técnico em mecânica', 'Experiência mínima 3 anos', 'Conhecimento em injeção eletrônica', 'CNH']
    WHEN 'Ar Condicionado' THEN ARRAY['Curso técnico em refrigeração', 'NR-35 desejável', 'Experiência em split e multi-split']
    WHEN 'Jardinagem' THEN ARRAY['Experiência em jardinagem', 'Conhecimento de plantas', 'Ferramentas próprias']
    ELSE ARRAY['Ensino médio completo', 'Disponibilidade']
  END,
  ARRAY['Vale transporte', 'Vale refeição', 'Plano de saúde', 'Seguro de vida'],
  c.latitude,
  c.longitude,
  c.city,
  c.state
FROM public.companies c;

-- Add some additional job variations for Pet Shops (Casa de Ração specific jobs)
INSERT INTO public.jobs (company_id, title, description, category, salary_min, salary_max, job_type, requirements, benefits, latitude, longitude, city, state)
SELECT 
  c.id,
  'Vendedor de Ração e Acessórios',
  'Responsável pela venda de rações, acessórios e produtos para pets. Atendimento consultivo para indicar a melhor alimentação para cada animal.',
  c.category,
  1600.00,
  2500.00,
  'full-time',
  ARRAY['Conhecimento em nutrição animal', 'Experiência em vendas', 'Boa comunicação', 'Simpatia no atendimento'],
  ARRAY['Vale transporte', 'Vale refeição', 'Comissão por vendas', 'Desconto em produtos'],
  c.latitude,
  c.longitude,
  c.city,
  c.state
FROM public.companies c WHERE c.category = 'Pet Shop';

INSERT INTO public.jobs (company_id, title, description, category, salary_min, salary_max, job_type, requirements, benefits, latitude, longitude, city, state)
SELECT 
  c.id,
  'Tosador Profissional',
  'Banho e tosa de cães e gatos. Responsável pelo bem-estar e beleza dos pets durante os procedimentos.',
  c.category,
  1800.00,
  3500.00,
  'full-time',
  ARRAY['Curso de banho e tosa', 'Experiência mínima 1 ano', 'Amor pelos animais', 'Paciência'],
  ARRAY['Vale transporte', 'Vale refeição', 'Comissão por serviço', 'Plano de saúde'],
  c.latitude,
  c.longitude,
  c.city,
  c.state
FROM public.companies c WHERE c.category = 'Pet Shop';

INSERT INTO public.jobs (company_id, title, description, category, salary_min, salary_max, job_type, requirements, benefits, latitude, longitude, city, state)
SELECT 
  c.id,
  'Auxiliar de Loja',
  'Organização de produtos, reposição de estoque, limpeza do ambiente e auxílio no atendimento ao cliente.',
  c.category,
  1400.00,
  1800.00,
  'part-time',
  ARRAY['Ensino médio completo', 'Organização', 'Proatividade', 'Gostar de animais'],
  ARRAY['Vale transporte', 'Vale refeição'],
  c.latitude,
  c.longitude,
  c.city,
  c.state
FROM public.companies c WHERE c.category = 'Pet Shop';
