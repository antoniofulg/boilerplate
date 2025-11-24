import { Typography } from '@shared/ui';
import { Card } from '@shared/ui';

/**
 * Benefits Section Component
 * 
 * Displays 3 key benefits: Security, Management, Real-time Results
 */
export function BenefitsSection() {
  const benefits = [
    {
      title: 'Segurança',
      description:
        'Sistema protegido com criptografia e autenticação robusta. Dados sensíveis protegidos com as melhores práticas de segurança.',
      icon: '🔒',
    },
    {
      title: 'Gestão',
      description:
        'Controle completo de sessões, pautas e membros. Interface intuitiva para facilitar o trabalho da secretaria.',
      icon: '📋',
    },
    {
      title: 'Resultados em Tempo Real',
      description:
        'Acompanhe votações e resultados instantaneamente. Transparência e agilidade para todos os envolvidos.',
      icon: '⚡',
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <Typography variant="h2" className="text-center mb-12">
          Benefícios
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <Typography variant="h3" className="mb-3">
                {benefit.title}
              </Typography>
              <Typography variant="body" className="text-neutral-600">
                {benefit.description}
              </Typography>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

