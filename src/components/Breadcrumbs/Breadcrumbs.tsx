'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Breadcrumbs.module.css';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  const pathSegments = pathname.split('/').filter(Boolean);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const isLast = index === pathSegments.length - 1;

    // Convert path segment to readable text
    const label =
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

    return {
      href,
      label,
      isLast,
    };
  });

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
      <div className="container mx-auto">
        <ol className={styles.breadcrumbsList}>
          <li className={styles.breadcrumbItem}>
            <Link href="/" className={styles.breadcrumbLink}>
              <Home size={16} />
              <span className="sr-only">Головна</span>
            </Link>
            <ChevronRight className={styles.separator} size={16} />
          </li>

          {breadcrumbItems.map((item) => (
            <li key={item.href} className={styles.breadcrumbItem}>
              {item.isLast ? (
                <span className={styles.currentPage}>{item.label}</span>
              ) : (
                <>
                  <Link href={item.href} className={styles.breadcrumbLink}>
                    {item.label}
                  </Link>
                  <ChevronRight className={styles.separator} size={16} />
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
