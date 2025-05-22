import React, { FC } from 'react';
import styles from './About.module.css';
import Image from 'next/image';

// Визначення типу для компонента
const About: FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Про нас</h1>
      <div className={styles.content}>
        <div
          className={styles.imageWrapper}
          style={{ position: 'relative', height: '400px' }}
        >
          <Image
            src="/office-team-collaboration.png"
            alt="Наша команда"
            className={styles.image}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className={styles.textContent}>
          <h2 className={styles.subtitle}>Наша історія</h2>
          <p>
            Ми - команда професіоналів, які обapo;єдналися для створення
            інноваційних рішень. Наша компанія була заснована у 2015 році з
            метою надання якісних послуг у сфері веб-розробки та дизайну.
          </p>
          <p>
            За роки роботи ми реалізували понад 200 проєктів різної складності
            для клієнтів з України та інших країн. Наша місія - допомагати
            бізнесу розвиватися за допомогою сучасних технологій.
          </p>
          <h2 className={styles.subtitle}>Наші цінності</h2>
          <ul className={styles.valuesList}>
            <li>Якість та увага до деталей</li>
            <li>Інновації та постійний розвиток</li>
            <li>Чесність та прозорість у роботі</li>
            <li>Індивідуальний підхід до кожного клієнта</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
