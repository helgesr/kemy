export default function Footer() {
  return (
    <footer className="border-t border-kemy-border dark:border-kemy-dark-border bg-kemy-white dark:bg-kemy-dark-bg px-6 py-4">
      <p className="text-center text-sm text-kemy-gray dark:text-kemy-dark-text">
        Powered by Kemy AS &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}
