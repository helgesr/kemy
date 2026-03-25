import { useT } from '../../i18n/LanguageContext';

export default function Footer() {
  const { t } = useT();
  return (
    <footer className="py-6 px-4">
      <p className="text-center text-xs text-kemy-light dark:text-kemy-gray">
        {t('footer.powered')} &copy; 2026
      </p>
    </footer>
  );
}
