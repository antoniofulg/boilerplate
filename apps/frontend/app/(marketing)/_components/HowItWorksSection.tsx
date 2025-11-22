import { Typography } from '@shared/ui';

/**
 * How It Works Section Component
 * 
 * Displays 3 steps explaining how the system works
 */
export function HowItWorksSection() {
  const steps = [
    {
      number: '1',
      title: 'Acesse o Sistema',
      description: 'Faça login com suas credenciais institucionais para acessar o painel de controle.',
    },
    {
      number: '2',
      title: 'Gerencie Sessões',
      description: 'Crie e gerencie sessões, adicione pautas e acompanhe a presença dos membros.',
    },
    {
      number: '3',
      title: 'Acompanhe Resultados',
      description: 'Visualize resultados de votações em tempo real e gere relatórios completos.',
    },
  ];

  return (
    <section className="py-16 px-4 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        <Typography variant="h2" className="text-center mb-12">
          Como Funciona
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <Typography variant="h3" className="mb-3">
                {step.title}
              </Typography>
              <Typography variant="body" className="text-neutral-600">
                {step.description}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

