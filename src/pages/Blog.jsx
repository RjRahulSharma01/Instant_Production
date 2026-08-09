import { lazy, Suspense } from 'react';
import { useSeo } from '../lib/seo';
import { portfolioItems } from '../data/portfolio';

const VideoGallerySection = lazy(() => import('../components/VideoGallery'));

function Blog() {
  useSeo({
    title: 'Video Gallery',
    description:
      'Watch brand films, reels and campaign work produced by Instant Production.',
    path: '/blog',
  });

  return (
    <Suspense fallback={<div className="h-96" />}>
      <VideoGallerySection videos={portfolioItems} />
    </Suspense>
  );
}

export default Blog;
