import { useEffect } from 'react';
import { ArrowLeft, Mountain } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcherScrolled } from '@/components/LanguageSwitcherScrolled';
import { legalDocuments, type LegalLanguage, type LegalPageType } from '@/data/legal';

interface LegalPageProps {
  page: LegalPageType;
}

export function LegalPage({ page }: LegalPageProps) {
  const { i18n } = useTranslation();
  const language = (i18n.resolvedLanguage?.split('-')[0] ?? 'en') as LegalLanguage;
  const localizedDocuments = legalDocuments[language] ?? legalDocuments.en;
  const content = localizedDocuments[page];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${content.title} | BakurianiSki`;
    document.documentElement.lang = language;
  }, [content.title, language]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-2 text-xl font-bold text-slate-900">
            <Mountain className="h-7 w-7 text-sky-500" />
            <span>Bakuriani<span className="text-sky-500">Ski</span></span>
          </a>
          <LanguageSwitcherScrolled />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        <a
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-sky-700 transition-colors hover:text-sky-900"
        >
          <ArrowLeft className="h-4 w-4" />
          {content.homeLabel}
        </a>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <header className="mb-10 border-b border-slate-100 pb-7">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-sky-700">
              BakurianiSki
            </p>
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {content.title}
            </h1>
            <p className="mb-4 leading-relaxed text-slate-600">{content.intro}</p>
            <p className="text-sm text-slate-500">{content.updated}</p>
          </header>

          <div className="space-y-8">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="mb-3 text-xl font-semibold text-slate-900">
                  {section.heading}
                </h2>
                <div className="space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="leading-7 text-slate-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 border-t border-slate-100 pt-6 text-sm text-slate-600">
            {content.contactLabel}{' '}
            <a
              href="mailto:bakurianiski@gmail.com"
              className="font-medium text-sky-700 underline decoration-sky-300 underline-offset-4 hover:text-sky-900"
            >
              bakurianiski@gmail.com
            </a>
          </div>
        </article>
      </main>
    </div>
  );
}
