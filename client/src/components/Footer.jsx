import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-noir-light border-t border-platine/20 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="mb-4 inline-flex items-center gap-3 group">
              <img
                src="/assets/logo-blanc.png"
                alt="Jumelles Amar"
                className="h-14 w-auto opacity-90 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span className="flex flex-col leading-none">
                <span className="font-serifDisplay text-xl tracking-[0.18em] uppercase text-ivory">
                  Jumelles
                </span>
                <span className="text-[10px] tracking-[0.5em] uppercase text-ivory/50">Amar</span>
              </span>
            </Link>
            <p className="text-sm text-ivory/60 leading-relaxed">
              Maison de haute couture. Créations uniques, sur-mesure et
              savoir-faire artisanal d'exception.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-ivory/50 hover:text-platine transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-ivory/50 hover:text-platine transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-platine mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li><Link to="/collections" className="text-ivory/60 hover:text-ivory transition-colors text-sm">Collections</Link></li>
              <li><Link to="/actualites" className="text-ivory/60 hover:text-ivory transition-colors text-sm">Actualités</Link></li>
              <li><Link to="/a-propos" className="text-ivory/60 hover:text-ivory transition-colors text-sm">À Propos</Link></li>
              <li><Link to="/contact" className="text-ivory/60 hover:text-ivory transition-colors text-sm">Contact</Link></li>
              <li><Link to="/login" className="text-ivory/40 hover:text-ivory/70 transition-colors text-sm">Espace Admin</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-platine mb-4">Services</h4>
            <ul className="space-y-3 text-sm text-ivory/60">
              <li>Sur-mesure</li>
              <li>Collections sur commande</li>
              <li>Accessoires couture</li>
              <li>Rendez-vous privés</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-widest text-platine mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-ivory/60">
              <li className="flex items-center gap-3">
                <FiPhone className="text-platine w-4 h-4" />
                +221 77 732 74 74
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-platine w-4 h-4" />
                contact@jumellesamar.com
              </li>
              <li className="flex items-center gap-3">
                <FiMapPin className="text-platine w-4 h-4" />
                Parcelles Assainies U21, Dakar, Sénégal
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-ivory/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ivory/40">
            © {new Date().getFullYear()} Jumelles Amar. Tous droits réservés.
          </p>
          <p className="text-xs text-ivory/40 tracking-widest uppercase">
            Haute Couture &amp; Savoir-Faire
          </p>
        </div>
      </div>
    </footer>
  );
}
