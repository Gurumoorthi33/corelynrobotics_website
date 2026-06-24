export default function RecognisedBy() {
  return (
    <section className="bg-white py-12 md:py-16 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 xs:px-6 md:px-12">
        <div className="p-8 md:p-10 bg-white rounded-2xl border border-slate-200/90 shadow-sm">
          <p className="text-center text-[13px] font-bold text-slate-500 uppercase tracking-widest mb-6">
            RECOGNISED BY
          </p>
          <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap">
            <img src="/assets/incubation/msme.png" alt="MSME" className="h-14 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300" />
            <img src="/assets/incubation/RshivakumarFoundation.jpeg" alt="R Shivakumar Foundation" className="h-14 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300" />
            <img src="/assets/incubation/startuptn.jpg" alt="StartupTN" className="h-14 md:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
