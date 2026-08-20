import { useState, useEffect } from 'react';
import { useLenis } from '@/hooks/useLenis';
import CustomCursor from '@/components/CustomCursor';
import Loader from '@/components/Loader';
import Header from '@/components/Header';
import Hero from '@/sections/Hero';
import Trust from '@/sections/Trust';
import Marquee from '@/sections/Marquee';
import About from '@/sections/About';
import Collection from '@/sections/Collection';
import Applications from '@/sections/Applications';
import WhyChooseUs from '@/sections/WhyChooseUs';
import Process from '@/sections/Process';
import Projects from '@/sections/Projects';
import Testimonials from '@/sections/Testimonials';
import Gallery from '@/sections/Gallery';
import CTA from '@/sections/CTA';
import Footer from '@/sections/Footer';
import CategoryPage from '@/pages/CategoryPage';
import ProductsPage from '@/pages/ProductsPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import type { CategorySlug } from '@/data/products';
import {
  getProductDetailById,
  getProductDetailBySlug,
  getProductSlug,
} from '@/data/productDetails';

type Route =
  | { kind: 'home' }
  | { kind: 'products' }
  | { kind: 'category'; slug: CategorySlug }
  | { kind: 'product'; slug: string };

function parseRoute(): Route {
  if (typeof window === 'undefined') return { kind: 'home' };
  const p = window.location.pathname;
  const hash = window.location.hash.replace(/^#\/?/, '');
  const candidate = hash || p;

  const productMatch = candidate.match(/\/?products?\/([a-zA-Z0-9-_]+)/);
  if (productMatch) return { kind: 'product', slug: productMatch[1] };

  if (/^\/?products?\/?$/.test(candidate)) return { kind: 'products' };

  const categoryMatch = candidate.match(/\/?category\/([a-zA-Z0-9-_]+)/);
  if (categoryMatch) return { kind: 'category', slug: categoryMatch[1] as CategorySlug };

  return { kind: 'home' };
}

function HomeSections() {
  return (
    <main>
      <Hero />
      <Trust />
      <Marquee />
      <About />
      <Collection />
      <Applications />
      <WhyChooseUs />
      <Process />
      <Projects />
      <Testimonials />
      <Gallery />
      <CTA />
    </main>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);
  const [route, setRoute] = useState<Route>(() => parseRoute());
  useLenis();

  useEffect(() => {
    const onChange = () => setRoute(parseRoute());
    window.addEventListener('popstate', onChange);
    window.addEventListener('hashchange', onChange);
    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener('hashchange', onChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: loaded ? 'smooth' : 'auto' });
  }, [route, loaded]);

  const navigate = (next: Route) => {
    setRoute(next);
    let url = '/';
    if (next.kind === 'category') url = `/#/category/${next.slug}`;
    if (next.kind === 'products') url = '/#/products';
    if (next.kind === 'product') url = `/#/products/${next.slug}`;
    try {
      window.history.pushState({}, '', url);
    } catch {
      window.location.hash = url.replace(/^#/, '');
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (slug: CategorySlug) => {
    navigate({ kind: 'category', slug });
  };

  const handleSelectProducts = () => navigate({ kind: 'products' });

  const handleSelectProduct = (productId: string) => {
    const slug = getProductSlug(productId);
    if (slug) {
      navigate({ kind: 'product', slug });
      return;
    }
    const d = getProductDetailById(productId);
    if (d) {
      navigate({ kind: 'product', slug: d.slug });
      return;
    }
    navigate({ kind: 'home' });
  };

  const handleBackHome = () => navigate({ kind: 'home' });
  const handleBackCategory = () => {
    let prev: Route = { kind: 'home' };
    if (route.kind === 'product') {
      const d =
        getProductDetailBySlug(route.slug) ?? getProductDetailById(route.slug);
      if (d) prev = { kind: 'category', slug: d.product.categorySlug };
    }
    navigate(prev);
  };

  const headerBackCategoryProp =
    route.kind === 'product'
      ? handleBackCategory
      : undefined;

  return (
    <>
      <CustomCursor />
      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      <Header
        onSelectProducts={handleSelectProducts}
        onSelectCategory={handleSelectCategory}
        onSelectProduct={handleSelectProduct}
      />

      {route.kind === 'home' && <HomeSections />}
      {route.kind === 'products' && (
        <ProductsPage
          onSelectProduct={handleSelectProduct}
          onBackHome={handleBackHome}
        />
      )}
      {route.kind === 'category' && (
        <CategoryPage
          slug={route.slug}
          onSelectCategory={handleSelectCategory}
          onSelectProduct={handleSelectProduct}
          onBackHome={handleBackHome}
        />
      )}
      {route.kind === 'product' && (
        <ProductDetailPage
          slug={route.slug}
          onSelectCategory={handleSelectCategory}
          onSelectProduct={handleSelectProduct}
          onBackHome={handleBackHome}
          onBackCategory={headerBackCategoryProp ?? handleBackHome}
        />
      )}

      <Footer />
    </>
  );
}

export default App;
