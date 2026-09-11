import type { ReactNode } from "react";

export default function CompareLayout({ children }: { children: ReactNode }) {
  return (
    <div data-compare-page className="w-screen min-w-full max-w-none overflow-x-hidden">
      <style>{`
        [data-compare-page],
        [data-compare-page] > div,
        [data-compare-page] main,
        [data-compare-page] main > section {
          width: 100vw;
          max-width: 100vw;
        }

        /* The comparison matrix must use the full device viewport rather than
           inheriting the marketing site's centered max-width container. */
        [data-compare-page] main > section:nth-of-type(2) {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }

        [data-compare-page] main > section:nth-of-type(2) > div {
          width: 100% !important;
          max-width: none !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }

        [data-compare-page] main > section:nth-of-type(2) > div > div:first-child {
          padding-left: 1rem;
          padding-right: 1rem;
        }

        [data-compare-page] main > section:nth-of-type(2) > div > div:nth-child(2) {
          width: 100% !important;
          max-width: none !important;
          border-left-width: 0 !important;
          border-right-width: 0 !important;
          border-radius: 0 !important;
        }

        [data-compare-page] main > section:nth-of-type(2) > div > div:nth-child(2) > div:first-child {
          width: 100% !important;
          max-width: 100vw !important;
          overflow-x: auto !important;
          -webkit-overflow-scrolling: touch;
        }

        @media (min-width: 640px) {
          [data-compare-page] main > section:nth-of-type(2) > div > div:first-child {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }

        @media (min-width: 1024px) {
          [data-compare-page] main > section:nth-of-type(2) > div > div:first-child {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }
      `}</style>
      {children}
    </div>
  );
}
