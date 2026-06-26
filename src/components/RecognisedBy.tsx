export default function RecognisedBy() {
  return (
    <section className="bg-white py-12 md:py-16 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 xs:px-6 md:px-12">
        <div className="p-8 md:p-10 bg-white rounded-2xl border border-slate-200/90 shadow-sm">
          <p className="text-center text-[13px] font-bold text-slate-500 uppercase tracking-widest mb-6">
            RECOGNISED BY
          </p>
          <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap mb-6">
            <img src="/assets/incubation/ministry-of-micro-small-and-medium-enterprises-logo.png" alt="MSME" className="h-14 md:h-16 w-auto object-contain" />
            <img src="/assets/incubation/RshivakumarFoundation.jpeg" alt="R Shivakumar Foundation" className="h-14 md:h-16 w-auto object-contain" />
            <img src="/assets/incubation/TRP.png" alt="TRP" className="h-14 md:h-16 w-auto object-contain" />
            <img src="/assets/incubation/startuptn.jpg" alt="StartupTN" className="h-14 md:h-16 w-auto object-contain" />
          </div>
          <p className="text-center text-[13px] text-slate-500">
            <span className="font-semibold text-slate-900">Trusted by manufacturers across Tamil Nadu.</span> Incubated at R Shivakumar Foundation – TBIF, SRM TRP Engineering College. Backed by industry expertise and local support infrastructure.
          </p>
        </div>
      </div>
    </section>
  );
}
