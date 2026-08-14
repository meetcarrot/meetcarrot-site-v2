/** The outlined orange eyebrow pill that opens every section on this page. */
export function SectionBadge({ label }: { label: string }) {
  return (
    <div className="flex justify-center">
      <div className="px-4 h-8 md:h-9 lg:h-11 rounded-2xl md:rounded-[18px] lg:rounded-[22px] border border-pink inline-flex items-center mx-auto">
        <p className="text-[12px] md:text-[14px] lg:text-[16px] font-medium text-pink">
          {label}
        </p>
      </div>
    </div>
  );
}
