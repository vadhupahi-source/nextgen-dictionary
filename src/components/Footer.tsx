export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-text-primary">
              NextGen English Academy
            </h3>
            <p className="text-sm text-text-secondary mt-1">
              Owned by Mohamed Niyas Mohamed Nilaam
            </p>
            <p className="text-xs text-text-secondary">
              B.A in English Language Teaching
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm text-text-secondary">
            <span>English &rarr; Tamil</span>
            <span>English &rarr; Arabic</span>
            <span>English &rarr; Sinhala</span>
            <span>English &rarr; French</span>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-border text-center">
          <p className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} NextGen English Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
