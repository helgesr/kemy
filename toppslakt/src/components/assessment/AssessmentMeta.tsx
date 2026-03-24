interface AssessmentMetaProps {
  locationName: string;
  onLocationChange: (value: string) => void;
  date: string;
  onDateChange: (value: string) => void;
}

export default function AssessmentMeta({
  locationName,
  onLocationChange,
  date,
  onDateChange,
}: AssessmentMetaProps) {
  return (
    <div className="bg-kemy-white dark:bg-kemy-dark-surface rounded-xl shadow-sm border border-kemy-border dark:border-kemy-dark-border p-5">
      <h2 className="font-heading text-lg font-semibold text-kemy-dark dark:text-kemy-white mb-4">
        Vurdering
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Lokalitet */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="meta-location"
            className="text-sm font-medium text-kemy-gray dark:text-kemy-light"
          >
            Lokalitet
          </label>
          <input
            id="meta-location"
            type="text"
            value={locationName}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="Navn på lokalitet"
            className="
              w-full rounded-lg border border-kemy-border dark:border-kemy-dark-border
              bg-kemy-surface dark:bg-kemy-dark-bg
              text-kemy-dark dark:text-kemy-dark-text
              px-3.5 py-2.5 text-sm
              placeholder:text-kemy-light dark:placeholder:text-kemy-gray
              focus:outline-none focus:ring-2 focus:ring-kemy-plum/40 focus:border-kemy-plum
              transition-colors
            "
          />
        </div>

        {/* Dato */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="meta-date"
            className="text-sm font-medium text-kemy-gray dark:text-kemy-light"
          >
            Dato
          </label>
          <input
            id="meta-date"
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="
              w-full rounded-lg border border-kemy-border dark:border-kemy-dark-border
              bg-kemy-surface dark:bg-kemy-dark-bg
              text-kemy-dark dark:text-kemy-dark-text
              px-3.5 py-2.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-kemy-plum/40 focus:border-kemy-plum
              transition-colors
            "
          />
        </div>
      </div>
    </div>
  );
}
