import { Phone, Mail, MapPin, ArrowUp, Instagram, Facebook, Linkedin } from 'lucide-react';
import { COMPANY, NAV_LINKS } from '@/data/content';
import logo from '@/assets/logo/logo.png';

const PRODUCT_LINKS = [
  'Italian Marble',
  'Imported Marble',
  'Indian Marble',
  'Granite',
  'Quartz Stone',
  'Marble Temples',
  'Fireplaces',
  'Water Fountains',
];

export default function Footer() {
  return (
    <footer className="relative bg-[#083D34] pt-24 pb-8 text-white/75">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center">
              <img
                src={logo}
                alt="The Marble Boutique logo"
                className="h-[100px] w-[100px] object-contain"
                width={100}
                height={100}
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="mt-6 font-body text-xs leading-relaxed text-[#EAF5F2]/70">
              Premium manufacturer and supplier of luxury marble, granite and custom carved stone
              masterpieces for residential, commercial and architectural spaces.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[#C8A646] transition-colors hover:border-[#C8A646] hover:bg-[#C8A646]/10"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 font-button text-[11px] uppercase tracking-[0.3em] text-[#C8A646]">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="font-body text-xs text-[#EAF5F2]/70 transition-colors hover:text-[#C8A646]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-button text-[11px] uppercase tracking-[0.3em] text-[#C8A646]">Products</h4>
            <ul className="space-y-3">
              {PRODUCT_LINKS.map((p) => (
                <li key={p}>
                  <a href="#collection" className="font-body text-xs text-[#EAF5F2]/70 transition-colors hover:text-[#C8A646]">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-button text-[11px] uppercase tracking-[0.3em] text-[#C8A646]">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href={`tel:${COMPANY.phoneRaw}`} className="flex items-start gap-3 font-body text-xs text-[#EAF5F2]/70 transition-colors hover:text-[#C8A646]">
                  <Phone size={15} className="mt-0.5 shrink-0 text-[#C8A646]" />
                  {COMPANY.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="flex items-start gap-3 font-body text-xs text-[#EAF5F2]/70 transition-colors hover:text-[#C8A646]">
                  <Mail size={15} className="mt-0.5 shrink-0 text-[#C8A646]" />
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-start gap-3 font-body text-xs text-[#EAF5F2]/70">
                <MapPin size={15} className="mt-0.5 shrink-0 text-[#C8A646]" />
                India
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-hairline my-10" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="font-body text-[11px] text-[#EAF5F2]/45">
            © {new Date().getFullYear()} THE MARBLE BOUTIQUE. All rights reserved.
          </p>
          <p className="font-heading text-sm italic text-[#C8A646]">{COMPANY.tagline}</p>
          <a
            href="#home"
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[#EAF5F2]/70 transition-colors hover:border-[#C8A646] hover:text-[#C8A646]"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
