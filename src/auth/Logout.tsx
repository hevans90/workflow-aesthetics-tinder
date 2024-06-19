import { serpApiKeyStore } from '@/_state/serp-token';
import { Button } from '@/ui/Button';

export const Logout = ({ className }: { className?: string }) => (
  <Button className={className} onClick={() => serpApiKeyStore.set(null)}>
    Logout
  </Button>
);
