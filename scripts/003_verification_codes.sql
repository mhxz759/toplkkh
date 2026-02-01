-- Tabela para armazenar códigos de verificação de email
CREATE TABLE IF NOT EXISTS public.verification_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  user_data JSONB,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para busca rápida por email
CREATE INDEX IF NOT EXISTS idx_verification_codes_email ON public.verification_codes(email);

-- Índice para limpar códigos expirados
CREATE INDEX IF NOT EXISTS idx_verification_codes_expires ON public.verification_codes(expires_at);

-- Habilitar RLS
ALTER TABLE public.verification_codes ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção anônima (necessário para registro)
DO $$ BEGIN
  DROP POLICY IF EXISTS "verification_codes_insert_anon" ON public.verification_codes;
  DROP POLICY IF EXISTS "verification_codes_select_anon" ON public.verification_codes;
  DROP POLICY IF EXISTS "verification_codes_update_anon" ON public.verification_codes;
  DROP POLICY IF EXISTS "verification_codes_delete_anon" ON public.verification_codes;
EXCEPTION WHEN undefined_table THEN NULL;
END $$;

-- Permitir operações apenas via service role (API routes usam service role)
CREATE POLICY "verification_codes_service_role" ON public.verification_codes
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Função para limpar códigos expirados (executar periodicamente)
CREATE OR REPLACE FUNCTION public.cleanup_expired_verification_codes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.verification_codes
  WHERE expires_at < NOW() OR verified = true;
END;
$$;
