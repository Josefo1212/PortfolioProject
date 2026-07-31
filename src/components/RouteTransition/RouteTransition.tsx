import { Suspense, type ReactNode } from 'react';
import { WaitComponent } from '../ui/WaitComponent';

interface RouteTransitionProps {
  children: ReactNode;
}

export const RouteTransition = ({ children }: RouteTransitionProps) => (
  <Suspense fallback={<WaitComponent />}>{children}</Suspense>
);
