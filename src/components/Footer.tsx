import BuyMeACoffeeLogo from "../assets/bmc-full-logo-no-background.png";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-8 sm:px-8 md:px-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-4 text-sm text-zinc-100">

          <ul className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 md:order-1">        
            <li className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <span className="opacity-80">Made by</span>
              <a
                href="https://farhanmn.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-yellow-400 transition-colors"
              >
                Farhan Mahmood
              </a>
            </li>
            
            <li className="hidden sm:inline-flex items-center">
              <span className="opacity-50 pr-3">•</span>
              <a
                href="https://www.linkedin.com/in/farhan-mahmood-n/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-yellow-400 transition-colors" 
              >
                LinkedIn
              </a>
            </li>
          </ul>

          <ul className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 md:order-3">
            <li>
              <a
                href="/about"
                className="text-white hover:text-yellow-400 transition-colors font-medium"
              >
                About
              </a>
            </li>
            
            <li>
              <div className="text-sm opacity-80 text-center sm:text-left">
                A product of <span className="font-medium text-white">mindbrust</span>
              </div>
            </li>

            <li>
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="hidden sm:inline opacity-80">Support:</span>
                <a
                  href="https://www.buymeacoffee.com/mrlionbyte"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Buy me a coffee"
                  className="inline-flex items-center bg-yellow-400 p-0.5 rounded-md hover:ring-2 hover:ring-yellow-400 transition-all"
                >
                  <img
                    src={BuyMeACoffeeLogo}
                    alt="Buy me a coffee"
                    className="h-6 w-auto object-contain sm:h-8"
                  />
                </a>
              </div>
            </li>
          </ul>
          
        </div>
      </div>
    </footer>
  );
}
