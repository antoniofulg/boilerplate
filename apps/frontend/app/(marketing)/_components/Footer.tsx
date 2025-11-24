import { Typography } from '@shared/ui';

/**
 * Institutional Footer Component
 * 
 * Displays institutional information and links
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-800 text-neutral-300 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Typography variant="h4" className="text-white mb-4">
              Câmara Municipal
            </Typography>
            <Typography variant="small" className="text-neutral-400">
              Sistema de Votação Inteligente
            </Typography>
          </div>
          <div>
            <Typography variant="h4" className="text-white mb-4">
              Contato
            </Typography>
            <Typography variant="small" className="text-neutral-400">
              Email: contato@camara.gov.br
              <br />
              Telefone: (00) 0000-0000
            </Typography>
          </div>
          <div>
            <Typography variant="h4" className="text-white mb-4">
              Links
            </Typography>
            <Typography variant="small" className="text-neutral-400">
              <a href="#" className="hover:text-white underline">
                Portal da Câmara
              </a>
              <br />
              <a href="#" className="hover:text-white underline">
                Transparência
              </a>
            </Typography>
          </div>
        </div>
        <div className="border-t border-neutral-700 pt-8 text-center">
          <Typography variant="small" className="text-neutral-500">
            © {currentYear} Câmara Municipal. Todos os direitos reservados.
          </Typography>
        </div>
      </div>
    </footer>
  );
}

