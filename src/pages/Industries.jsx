import { lazy, Suspense } from 'react';
import { industries } from '../data/industries';

const IndustriesSection = lazy(() => import('../components/Industries'));

function Industries() {
  return (
    <Suspense fallback={<div className="h-96" />}>
      <IndustriesSection industries={industries} />
    </Suspense>
  );
}

export default Industries;
