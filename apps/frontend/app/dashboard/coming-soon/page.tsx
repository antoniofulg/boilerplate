import { Typography } from '@shared/ui';

/**
 * Coming Soon Page
 * 
 * Shown when staticDashboardMvp feature flag is disabled
 */
export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center">
        <Typography variant="h1" className="mb-4">
          Em breve
        </Typography>
        <Typography variant="body" className="text-neutral-600">
          O dashboard estará disponível em breve.
        </Typography>
      </div>
    </div>
  );
}

