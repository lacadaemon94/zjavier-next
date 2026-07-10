import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Footer from "../components/Footer";
import { getI18n } from "../i18n/server";
import type { Dictionary } from "../i18n/dictionaries";
import PrintButton from "./PrintButton";
import styles from "../styles/cv.module.css";

type CvCopy = Dictionary["cv"];
type Experience = CvCopy["experience"][number];
type SkillGroupCopy = CvCopy["skills"][number];
type SelectedWork = CvCopy["selectedWork"][number];
type Education = CvCopy["education"][number];
type Certification = CvCopy["certifications"][number];

export async function generateMetadata(): Promise<Metadata> {
  const { dictionary } = await getI18n();

  return {
    title: dictionary.cv.metadataTitle,
    description: dictionary.cv.metadataDescription,
  };
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className={styles.sectionTitle}>{children}</h2>
);

const ExperienceItem = ({ item }: { item: Experience }) => {
  const isCurrent = item.dates.toLowerCase().includes("present")
    || item.dates.toLowerCase().includes("actualidad");

  return (
  <article className={styles.experienceItem} data-iscurrent={isCurrent}>
    <div className={styles.itemHeader}>
      <div>
        <h3>{item.role}</h3>
        <p>{item.company}</p>
      </div>
      <span>{item.dates}</span>
    </div>
    <p className={styles.meta}>
      {item.location} / {item.mode}
    </p>
    {item.bullets.length > 0 && (
      <ul className={styles.bullets}>
        {item.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    )}
  </article>
  );
};

const SkillGroup = ({ group }: { group: SkillGroupCopy }) => (
  <article className={styles.skillGroup}>
    <h3>{group.group}</h3>
    <ul>
      {group.items.map((skill) => (
        <li key={skill}>{skill}</li>
      ))}
    </ul>
  </article>
);

const SelectedWorkItem = ({ item }: { item: SelectedWork }) => (
  <article className={styles.workItem}>
    <h3>{item.title}</h3>
    <p>{item.description}</p>
  </article>
);

const EducationItem = ({ item }: { item: Education }) => (
  <article className={styles.educationItem}>
    <div className={styles.itemHeader}>
      <div>
        <h3>{item.school}</h3>
        <p>{item.credential}</p>
      </div>
      <span>{item.dates}</span>
    </div>
    {item.details && <p className={styles.meta}>{item.details}</p>}
  </article>
);

const CertificationItem = ({ item }: { item: Certification }) => (
  <article className={styles.certificationItem}>
    <h3>{item.name}</h3>
    <p>{item.issuer}</p>
    <span>{item.date}</span>
  </article>
);

export default async function CvPage() {
  const { locale, dictionary } = await getI18n();
  const copy = dictionary.cv;

  return (
    <main className={styles.cvPage}>
      <div className={styles.toolbar}>
        <Link href="/" className={styles.homeLink}>
          {copy.home}
        </Link>
        <div className={styles.toolbarActions}>
          <PrintButton label={copy.print} className={styles.printButton} />
          <LanguageSwitcher locale={locale} labels={dictionary.language} />
        </div>
      </div>

      <header className={styles.hero}>
        <div className={styles.portrait}>
          <Image
            src="/images/cv-photo.jpg"
            alt={copy.photoAlt}
            width={720}
            height={900}
            priority
          />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{copy.pageLabel}</p>
          <h1>{copy.name}</h1>
          <p className={styles.role}>{copy.title}</p>
          <p className={styles.location}>{copy.location}</p>
          <p className={styles.availability}>{copy.availability}</p>
          <nav className={styles.contactList} aria-label={copy.contactTitle}>
            {copy.contacts.map((contact) => (
              <a key={contact.href} href={contact.href}>
                <span>{contact.label}</span>
                <small>{contact.value}</small>
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section className={styles.profileSection}>
        <SectionTitle>{copy.profileTitle}</SectionTitle>
        <p>{copy.profile}</p>
      </section>

      <div className={styles.contentGrid}>
        <section className={styles.primaryColumn}>
          <SectionTitle>{copy.experienceTitle}</SectionTitle>
          <div className={styles.timeline}>
            {copy.experience.map((item) => (
              <ExperienceItem
                key={`${item.company}-${item.dates}`}
                item={item}
              />
            ))}
          </div>
        </section>

        <aside className={styles.sideColumn}>
          <section>
            <SectionTitle>{copy.skillsTitle}</SectionTitle>
            <div className={styles.skillsGrid}>
              {copy.skills.map((group) => (
                <SkillGroup key={group.group} group={group} />
              ))}
            </div>
          </section>

          <section>
            <SectionTitle>{copy.selectedWorkTitle}</SectionTitle>
            <div className={styles.workList}>
              {copy.selectedWork.map((item) => (
                <SelectedWorkItem key={item.title} item={item} />
              ))}
            </div>
          </section>

          <section>
            <SectionTitle>{copy.educationTitle}</SectionTitle>
            <div className={styles.educationList}>
              {copy.education.map((item) => (
                <EducationItem
                  key={`${item.school}-${item.dates}-${item.credential}`}
                  item={item}
                />
              ))}
            </div>
          </section>

          <section>
            <SectionTitle>{copy.certificationsTitle}</SectionTitle>
            <div className={styles.certificationList}>
              {copy.certifications.map((item) => (
                <CertificationItem key={item.name} item={item} />
              ))}
            </div>
          </section>
        </aside>
      </div>

      <div className={styles.screenFooter}>
        <Footer copy={dictionary.footer} />
      </div>
    </main>
  );
}
