import styles from './Сontacts.module.css';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from 'lucide-react';

export default function Contacts() {
  return (
    <div className={styles.contactsContainer}>
      <div className={styles.container}>
        <div className={styles.contactsWrapper}>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Phone className={styles.icon} size={16} />
              <span>+380 (50) 123-45-67</span>
            </div>
            <div className={styles.contactItem}>
              <Mail className={styles.icon} size={16} />
              <span>info@example.com</span>
            </div>
            <div className={styles.contactItem}>
              <MapPin className={styles.icon} size={16} />
              <span>м. Київ, вул. Хрещатик, 1</span>
            </div>
            <div className={styles.contactItem}>
              <Clock className={styles.icon} size={16} />
              <span>Пн-Пт: 9:00-18:00</span>
            </div>
          </div>

          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink} aria-label="Facebook">
              <Facebook size={16} />
            </a>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              <Instagram size={16} />
            </a>
            <a href="#" className={styles.socialLink} aria-label="Twitter">
              <Twitter size={16} />
            </a>
            <a href="#" className={styles.socialLink} aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
