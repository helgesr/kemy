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
    <div className="bg-kemy-white dark:bg-kemy-dark-surface rounded-2xl shadow-sm border border-kemy-border dark:border-kemy-dark-border overflow-hidden">
      {/* Lokalitet row */}
      <div className="flex items-center px-4 py-3 border-b border-kemy-border dark:border-kemy-dark-border">
        <label htmlFor="meta-location" className="text-sm font-medium text-kemy-dark dark:text-kemy-dark-text w-24 shrink-0">
          Lokalitet
        </label>
        <input
          id="meta-location"
          type="text"
          value={locationName}
          onChange={(e) => onLocationChange(e.target.value)}
          placeholder="Navn på lokalitet"
          className="flex-1 text-sm bg-transparent text-kemy-dark dark:text-kemy-dark-text placeholder:text-kemy-light dark:placeholder:text-kemy-gray focus:outline-none"
        />
      </div>
      {/* Dato row */}
      <div className="flex items-center px-4 py-3">
        <label htmlFor="meta-date" className="text-sm font-medium text-kemy-dark dark:text-kemy-dark-text w-24 shrink-0">
          Dato
        </label>
        <input
          id="meta-date"
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className="flex-1 text-sm bg-transparent text-kemy-dark dark:text-kemy-dark-text focus:outline-none"
        />
      </div>
    </div>
  );
}
