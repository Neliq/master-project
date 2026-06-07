/**
 * Site-wide footer.
 */

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/10">
      <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>
          An educational reference for designers and developers. Not legal
          advice.
        </p>
        <p>
          60 patterns · 3 with interactive demos · Categorised by Brignull,
          Mathur, Gray
        </p>
      </div>
    </footer>
  );
}
