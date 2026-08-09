import { lazy, Suspense } from 'react';
import { portfolioItems } from '../data/portfolio';

const VideoGallerySection = lazy(() => import('../components/VideoGallery'));

function Blog() {
  return (
    <Suspense fallback={<div className="h-96" />}>
      <VideoGallerySection videos={portfolioItems} />
    </Suspense>
  );
}

export default Blog;
