"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from "./Breadcrumbs.module.css"
import { ChevronRight, Home } from "lucide-react"

export default function Breadcrumbs() {
  const pathname = usePathname()

  // Завжди показуємо breadcrumbs, навіть на головній сторінці
  const pathSegments = pathname === "/" ? [] : pathname.split("/").filter(Boolean)

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`
    const isLast = index === pathSegments.length - 1

    // Перетворення slug на читабельний текст
    let label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")

    // Якщо це динамічний маршрут [slug], спробуємо отримати більш читабельну назву
    if (segment.match(/^[a-z0-9-]+$/)) {
      // Для прикладу, можна додати спеціальну обробку для відомих slug
      const slugLabels: Record<string, string> = {
        "web-development": "Веб-розробка",
        "mobile-development": "Мобільна розробка",
        design: "Дизайн",
        seo: "SEO-оптимізація",
        services: "Послуги",
        about: "Про нас",
        contacts: "Контакти",
        portfolio: "Портфоліо",
      }

      if (slugLabels[segment]) {
        label = slugLabels[segment]
      }
    }

    return {
      href,
      label,
      isLast,
    }
  })

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
      <div className="container mx-auto">
        <ol className={styles.breadcrumbsList}>
          {/* Завжди показуємо головну сторінку */}
          <li className={styles.breadcrumbItem}>
            {pathname === "/" ? (
              // На головній сторінці показуємо як поточну сторінку
              <div className={styles.homeCurrentPage}>
                <Home size={16} />
                <span className={styles.homeText}>Головна</span>
              </div>
            ) : (
              // На інших сторінках показуємо як посилання
              <>
                <Link href="/" className={styles.breadcrumbLink}>
                  <Home size={16} />
                  <span className={styles.homeText}>Головна</span>
                </Link>
                <ChevronRight className={styles.separator} size={16} />
              </>
            )}
          </li>

          {/* Показуємо інші елементи breadcrumbs */}
          {breadcrumbItems.map(item => (
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
  )
}
