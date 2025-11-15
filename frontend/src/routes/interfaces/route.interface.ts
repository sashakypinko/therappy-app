import { type FC } from 'react';

export interface RouteInterface {
  path: string;
  Component: FC;
  authOnly?: boolean;
  notAuthOnly?: boolean;
  redirectTo?: string;
}
