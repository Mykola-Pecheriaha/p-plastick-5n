'use client';

import { useState, FC, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { Menu, X, ChevronDown } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

// Визначення типу для підменю
interface SubMenuItem {
  name: string;
  path: string;
}

interface SubMenuSection {
  title: string;
  items: SubMenuItem[];
}

// Визначення типу для елементів навігації
interface NavItem {
  name: string;
  path: string;
  hasSubmenu?: boolean;
  submenu?: SubMenuSection[];
}

const navItems: NavItem[] = [
  { name: 'Головна', path: '/' },
  { name: 'Про нас', path: '/about' },
  {
    name: 'Послуги',
    path: '/services',
    hasSubmenu: true,
    submenu: [
      {
        title: 'Пластика обличчя',
        items: [
          {
            name: 'Підтяжка обличчя та шиї',
            path: '/services/face-surgery/face-lift',
          },
          {
            name: 'Блефаропластика',
            path: '/services/face-surgery/blefaro-plastic',
          },
          {
            name: 'Пластика підборіддя',
            path: '/services/face-surgery/chino-plasty',
          },
          {
            name: 'Корекція клаповухості',
            path: '/services/face-surgery/flap-correction',
          },
          {
            name: 'Пластика дольки вуха',
            path: '/services/face-surgery/ear-lobe-plastic',
          },
        ],
      },
      {
        title: 'Пластика грудей',
        items: [
          {
            name: 'Збільшення грудей',
            path: '/services/breast-surgery/breast-augmentation',
          },
          {
            name: 'Видалення імплантів',
            path: '/services/breast-surgery/breast-implant-removal',
          },
          {
            name: 'Підтяжка грудей',
            path: '/services/breast-surgery/breast-lift',
          },
          {
            name: 'Корекція соска та ареоли',
            path: '/services/breast-surgery/areola-correction',
          },
          {
            name: 'Заміна імплантів груді',
            path: '/services/breast-surgery/breast-implant-replacement',
          },
          {
            name: 'Гінекомастія',
            path: '/services/breast-surgery/ginecomastiya',
          },
        ],
      },
      {
        title: 'Пластика тіла',
        items: [
          {
            name: 'Абдомінопластика',
            path: '/services/body-surgery/abdominoplasty',
          },
          { name: 'Ліпосакція', path: '/services/body-surgery/liposuction' },
          { name: 'Пластика ніг', path: '/services/body-surgery/leg-plastic' },
          {
            name: 'Видалення шийного горба',
            path: '/services/body-surgery/neck-hump-removal',
          },
          {
            name: 'Збільшення сідниць',
            path: '/services/body-surgery/buttock-augmentation',
          },
        ],
      },
      {
        title: 'Загальна хірургія',
        items: [
          {
            name: 'Видалення пухлин',
            path: '/services/general-surgery/tumor-removal',
          },
          {
            name: 'Карпальний канал',
            path: '/services/general-surgery/carpal-tunnel',
          },
          {
            name: 'Видалення гриж',
            path: '/services/general-surgery/gerniotomiya',
          },
        ],
      },
    ],
  },
  { name: 'Портфоліо', path: '/portfolio' },
  { name: 'Контакти', path: '/contacts' },
];

const Header: FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState<string | null>(
    null
  );
  const subMenuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = (): void => {
    setMobileMenuOpen(!mobileMenuOpen);
    setMobileSubMenuOpen(null); // Закриваємо субменю при закритті головного меню
  };

  const handleSubMenuToggle = (menuName: string): void => {
    setActiveSubMenu(activeSubMenu === menuName ? null : menuName);
  };

  const toggleMobileSubMenu = (menuName: string): void => {
    setMobileSubMenuOpen(mobileSubMenuOpen === menuName ? null : menuName);
  };

  // Функція для перевірки, чи активний пункт меню
  const isActiveMenuItem = (itemPath: string): boolean => {
    if (itemPath === '/') {
      return pathname === '/';
    }

    // Для пункту "Послуги" перевіряємо тільки точний збіг
    if (itemPath === '/services') {
      return pathname === '/services';
    }

    return pathname.startsWith(itemPath);
  };

  // Закриття субменю при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        subMenuRef.current &&
        !subMenuRef.current.contains(event.target as Node)
      ) {
        setActiveSubMenu(null);
      }
    };

    if (activeSubMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeSubMenu]);

  // Закриття субменю при зміні маршруту
  useEffect(() => {
    setActiveSubMenu(null);
    setMobileMenuOpen(false);
    setMobileSubMenuOpen(null);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerWrapper}>
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logo}>
              <Image
                src="/images/logo/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className={styles.logoImage}
              />
              <strong>PlastikP</strong>
            </div>
          </Link>

          <nav className={styles.desktopNav}>
            <ul className={styles.navList}>
              {navItems.map((item) => (
                <li key={item.path} className={styles.navItem}>
                  {item.hasSubmenu ? (
                    <div className={styles.menuItem} ref={subMenuRef}>
                      <div
                        className={styles.navLinkWrapper}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSubMenuToggle('services');
                        }}
                      >
                        <Link
                          href={item.path}
                          className={`${styles.navLink} ${isActiveMenuItem(item.path) ? styles.active : ''}`}
                          onClick={(e) => e.stopPropagation()} // Запобігаємо спрацюванню кліку на обгортці
                        >
                          {item.name}
                        </Link>
                        <ChevronDown
                          size={16}
                          className={`${styles.chevron} ${activeSubMenu === 'services' ? styles.rotated : ''}`}
                        />
                      </div>
                      {activeSubMenu === 'services' && item.submenu && (
                        <div className={styles.subMenu}>
                          {item.submenu.map((section, sectionIndex) => (
                            <div
                              key={sectionIndex}
                              className={styles.subMenuSection}
                            >
                              <p className={styles.subMenuTitle}>
                                {section.title}
                              </p>
                              <div className={styles.subMenuColumn}>
                                {section.items.map((subItem) => (
                                  <Link
                                    key={subItem.path}
                                    href={subItem.path}
                                    className={`${styles.subMenuLink} ${pathname === subItem.path ? styles.activeSubLink : ''}`}
                                    onClick={() => setActiveSubMenu(null)}
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className={`${styles.navLink} ${isActiveMenuItem(item.path) ? styles.active : ''}`}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <ThemeToggle />
            <button
              className={styles.mobileMenuButton}
              onClick={toggleMobileMenu}
              aria-label="Меню"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={styles.mobileNav}>
            <ul className={styles.mobileNavList}>
              {navItems.map((item) => (
                <li key={item.path}>
                  {item.hasSubmenu ? (
                    <div className={styles.mobileMenuItem}>
                      <div className={styles.mobileMenuHeader}>
                        <Link
                          href={item.path}
                          className={`${styles.mobileNavLink} ${isActiveMenuItem(item.path) ? styles.active : ''}`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                        <button
                          className={styles.mobileSubMenuToggle}
                          onClick={() => toggleMobileSubMenu('services')}
                          aria-label={`Відкрити підменю ${item.name}`}
                          aria-expanded={mobileSubMenuOpen === 'services'}
                        >
                          <ChevronDown
                            size={16}
                            className={`${styles.mobileChevron} ${mobileSubMenuOpen === 'services' ? styles.rotated : ''}`}
                          />
                        </button>
                      </div>
                      {mobileSubMenuOpen === 'services' && item.submenu && (
                        <div className={styles.mobileSubMenu}>
                          {item.submenu.map((section, sectionIndex) => (
                            <div
                              key={sectionIndex}
                              className={styles.mobileSubMenuSection}
                            >
                              <p className={styles.mobileSubMenuTitle}>
                                {section.title}
                              </p>
                              {section.items.map((subItem) => (
                                <Link
                                  key={subItem.path}
                                  href={subItem.path}
                                  className={`${styles.mobileSubMenuLink} ${pathname === subItem.path ? styles.activeSubLink : ''}`}
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className={`${styles.mobileNavLink} ${isActiveMenuItem(item.path) ? styles.active : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
