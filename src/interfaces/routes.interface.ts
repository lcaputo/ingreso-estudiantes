interface IRouteGuard {
  isAllowed: boolean;
  children?: React.ReactNode;
  redirectTo?: string;
}
