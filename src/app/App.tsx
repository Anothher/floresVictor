import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Heart, Package, Truck, MessageCircle, Flower2, CheckCircle, MapPin, Clock, Phone, Mail, Facebook, Instagram, Twitter, ChevronDown, Search, Star, Plus, Minus, Trash2, TrendingUp, Users, Award, Sparkles, ArrowRight, Gift, Shield } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import whatsappIcon from '../assets/icons/whatsapp.png';
import brandLogo_nbg from '../assets/images/logo_flores_victor.png';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  badge?: string;
  discount?: number;
  stems?: string;
  delivery?: string;
  includes?: string[];
  idealFor?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Ramo de Rosas Rojas",
    category: "Ramos",
    price: 85000,
    description: "Ramo clásico para expresar amor",
    image: "https://images.unsplash.com/photo-1660885900192-82f5b5e75723?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    badge: "Más vendido",
    stems: "24 rosas",
    delivery: "Agenda con 24h",
    includes: ["Envoltura premium", "Tarjeta personalizada", "Confirmación por WhatsApp"],
    idealFor: "Aniversarios, pedidas y detalles románticos"
  },
  {
    id: 2,
    name: "Arreglo Floral Primavera",
    category: "Arreglos",
    price: 120000,
    description: "Flores frescas de temporada",
    image: "https://images.unsplash.com/photo-1587291085527-63fc4b9a156a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    badge: "Nuevo",
    stems: "Mix de temporada",
    delivery: "Entrega coordinada",
    includes: ["Base decorativa", "Flores seleccionadas", "Guía de cuidado"],
    idealFor: "Cumpleaños, agradecimientos y decoración"
  },
  {
    id: 3,
    name: "Ramo de Girasoles",
    category: "Ramos",
    price: 95000,
    description: "Ramo alegre y luminoso",
    image: "https://images.unsplash.com/photo-1752765579894-9a7aef6fb359?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    stems: "Girasoles frescos",
    delivery: "Según disponibilidad",
    includes: ["Envoltura artesanal", "Moño decorativo", "Mensaje corto"],
    idealFor: "Sorpresas alegres, cumpleaños y buenos deseos"
  },
  {
    id: 4,
    name: "Caja Floral Premium",
    category: "Regalos",
    price: 150000,
    description: "Caja elegante con flores seleccionadas",
    image: "https://images.unsplash.com/photo-1642991946115-9afea1d7d3d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    discount: 15,
    stems: "Caja premium",
    delivery: "Agenda recomendada",
    includes: ["Caja rígida", "Flores premium", "Tarjeta y empaque"],
    idealFor: "Regalos corporativos, fechas especiales y celebraciones"
  },
  {
    id: 5,
    name: "Arreglo de Condolencias",
    category: "Condolencias",
    price: 130000,
    description: "Arreglo sobrio y delicado",
    image: "https://images.unsplash.com/photo-1775298324722-3edc1cb382d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    stems: "Diseño sobrio",
    delivery: "Prioridad según zona",
    includes: ["Composición elegante", "Mensaje de condolencia", "Coordinación discreta"],
    idealFor: "Acompañar momentos sensibles con respeto"
  },
  {
    id: 6,
    name: "Ramo Personalizado",
    category: "Personalizados",
    price: 100000,
    description: "Según ocasión, colores y preferencias",
    image: "https://images.unsplash.com/photo-1662929733678-d3f62fe54878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    badge: "Popular",
    stems: "A elección",
    delivery: "Cotización personalizada",
    includes: ["Asesoría de color", "Propuesta a medida", "Ajuste de presupuesto"],
    idealFor: "Pedidos con estilo, color o intención específica"
  }
];

const reviews = [
  {
    name: "Laura Méndez",
    occasion: "Aniversario",
    rating: 5,
    text: "El ramo llegó precioso, puntual y con una presentación muy cuidada. La tarjeta escrita a mano hizo toda la diferencia.",
    detail: "Compra verificada",
  },
  {
    name: "Camilo Rojas",
    occasion: "Cumpleaños",
    rating: 5,
    text: "Me ayudaron a elegir colores, confirmaron la entrega por WhatsApp y enviaron foto antes de despachar. Muy confiables.",
    detail: "Entrega a domicilio",
  },
  {
    name: "Sofía Ramírez",
    occasion: "Regalo especial",
    rating: 5,
    text: "La caja floral se veía incluso mejor que en la foto. Se siente un servicio premium, pero cercano y fácil de pedir.",
    detail: "Pedido personalizado",
  },
];

const heroCards = [
  {
    image: "https://images.unsplash.com/photo-1660885900192-82f5b5e75723?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=70&w=640",
    eyebrow: "Colección romance",
    title: "Rosas rojas de tallo largo",
    description: "Un ramo cálido, dramático y listo para regalo.",
    price: "$85.000",
  },
  {
    image: "https://images.unsplash.com/photo-1587291085527-63fc4b9a156a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=70&w=640",
    eyebrow: "Flores de temporada",
    title: "Arreglo primavera",
    description: "Texturas suaves, color fresco y entrega coordinada.",
    price: "$120.000",
  },
  {
    image: "https://images.unsplash.com/photo-1752765579894-9a7aef6fb359?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=70&w=640",
    eyebrow: "Girasoles",
    title: "Ramo luminoso",
    description: "Una composición alegre para cumpleaños y sorpresas.",
    price: "$95.000",
  },
  {
    image: "https://images.unsplash.com/photo-1642991946115-9afea1d7d3d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=70&w=640",
    eyebrow: "Detalle premium",
    title: "Caja floral de autor",
    description: "Presentación elegante para ocasiones especiales.",
    price: "$150.000",
  },
];

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showCheckout, setShowCheckout] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [cartPulse, setCartPulse] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState<Product | null>(null);
  const [municipalityOptions, setMunicipalityOptions] = useState<string[]>([]);
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    phone: '',
    city: '',
    address: '',
    deliveryDate: '',
    deliveryTime: '',
    cardMessage: '',
    notes: ''
  });

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled((current) => {
          const next = window.scrollY > 50;
          return current === next ? current : next;
        });
        ticking = false;
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroCards.length);
    }, 3600);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!showCheckout || municipalityOptions.length > 0) return;
    let cancelled = false;
    import('../data/colombiaMunicipalities').then(({ colombiaMunicipalities }) => {
      if (!cancelled) setMunicipalityOptions(colombiaMunicipalities);
    });
    return () => {
      cancelled = true;
    };
  }, [showCheckout, municipalityOptions.length]);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    setCartPulse(true);
    setRecentlyAdded(product);
    window.setTimeout(() => setCartPulse(false), 700);
    window.setTimeout(() => setRecentlyAdded(null), 2600);
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = selectedCategory === "Todos"
    ? products
    : products.filter(p => p.category === selectedCategory);

  const featuredProducts = products.slice(0, 3);
  const isCatalogPage = currentPath === '/catalogo';
  const visibleHeroCards = [0, 1, 2].map((offset) => heroCards[(currentHeroImage + offset) % heroCards.length]);

  const handleCheckout = () => {
    const orderSummary = cart.map(item =>
      `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    const message = `*Pedido Flores Victor*\n\n*Productos:*\n${orderSummary}\n\n*Total:* $${cartTotal.toLocaleString()}\n\n*Datos de entrega:*\nNombre: ${checkoutData.name}\nTeléfono: ${checkoutData.phone}\nCiudad/Municipio: ${checkoutData.city}\nDirección: ${checkoutData.address}\nFecha: ${checkoutData.deliveryDate}\nHorario: ${checkoutData.deliveryTime}\n${checkoutData.cardMessage ? `Mensaje tarjeta: ${checkoutData.cardMessage}\n` : ''}${checkoutData.notes ? `Notas: ${checkoutData.notes}` : ''}`;

    const whatsappUrl = `https://wa.me/573226693139?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const scrollToSection = (id: string) => {
    if (currentPath !== '/') {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 0);
      setMobileMenuOpen(false);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      {/* Floating Navbar */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8"
      >
        <div
          className={`mx-auto transition-all duration-500 ease-out ${
            scrolled || mobileMenuOpen
              ? `max-w-6xl border border-white/70 bg-white/90 px-5 shadow-2xl shadow-rose-950/10 backdrop-blur-xl ${mobileMenuOpen ? 'rounded-3xl' : 'rounded-full'}`
              : 'max-w-7xl rounded-none border border-transparent bg-transparent px-0 shadow-none'
          }`}
        >
          <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>
            <motion.div
              className="flex cursor-pointer items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateTo('/')}
            >
              <img
                src={brandLogo_nbg}
                alt="Flores Victor"
                className={`w-auto object-contain transition-all duration-500 ${scrolled ? 'h-12' : 'h-16'}`}
              />
              <div className="min-w-0 leading-tight">
                <div className="text-[10px] font-black uppercase tracking-[0.12em] text-rose-600 sm:text-sm sm:tracking-[0.16em]">Distribuidor</div>
                <div className="text-xs font-black text-stone-950 sm:text-base">de flores</div>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {['Inicio', 'Catálogo', 'Ocasiones', 'Envíos', 'Contacto'].map((item, i) => (
                <motion.button
                  key={item}
                  onClick={() => item === 'Catálogo' ? navigateTo('/catalogo') : scrollToSection(item === 'Inicio' ? 'hero' : item === 'Ocasiones' ? 'occasions' : item === 'Envíos' ? 'shipping' : 'contact')}
                  className={`relative font-semibold transition group ${scrolled ? 'text-stone-600 hover:text-rose-600' : 'text-stone-700 hover:text-rose-700'}`}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-rose-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <motion.a
                href="https://wa.me/573226693139"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative hidden items-center gap-2 overflow-hidden rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#25D366]/30 transition-all hover:bg-[#25D366] hover:shadow-xl hover:shadow-[#25D366]/40 active:bg-[#25D366] md:flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={whatsappIcon} alt="" className="relative z-10 h-4 w-4 rounded-full" />
                <span className="text-sm font-medium relative z-10">WhatsApp</span>
              </motion.a>

              <motion.button
                onClick={() => setCartOpen(true)}
                className={`relative rounded-full p-2.5 transition ${scrolled ? 'text-stone-700 hover:bg-rose-50 hover:text-rose-600' : 'bg-white/65 text-stone-800 hover:bg-white hover:text-rose-600'}`}
                animate={cartPulse ? { scale: [1, 1.18, 1], rotate: [0, -8, 8, 0] } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingCart className="w-6 h-6" />
                <AnimatePresence>
                  {cartItemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={cartPulse ? { scale: [1, 1.45, 1] } : { scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.45 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                    >
                      {cartItemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`rounded-full p-2 md:hidden ${scrolled ? 'text-stone-700' : 'bg-white/65 text-stone-800'}`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden border-t border-white/20"
              >
                <div className="flex flex-col gap-2 py-4">
                  {['Inicio', 'Catálogo', 'Ocasiones', 'Envíos', 'Contacto'].map((item) => (
                    <button
                      key={item}
                      onClick={() => item === 'Catálogo' ? navigateTo('/catalogo') : scrollToSection(item === 'Inicio' ? 'hero' : item === 'Ocasiones' ? 'occasions' : item === 'Envíos' ? 'shipping' : 'contact')}
                      className="text-left px-4 py-2 text-gray-700 hover:bg-rose-50 rounded-xl transition"
                    >
                      {item}
                    </button>
                  ))}
                  <a
                    href="https://wa.me/573226693139"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mx-2 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white transition hover:bg-[#25D366] hover:shadow-lg hover:shadow-[#25D366]/30 active:bg-[#25D366]"
                  >
                    <img src={whatsappIcon} alt="" className="h-4 w-4 rounded-full" />
                    <span className="text-sm font-medium">Comprar por WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      <AnimatePresence>
        {recentlyAdded && (
          <motion.div
            initial={{ opacity: 0, y: -18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed left-1/2 top-24 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-[1.5rem] border border-white/80 bg-white/95 p-4 shadow-2xl shadow-rose-200/70 backdrop-blur-md"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl">
                <img
                  src={recentlyAdded.image}
                  alt={recentlyAdded.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-sm font-black text-emerald-600">
                  <CheckCircle className="h-4 w-4" />
                  Agregado al carrito
                </div>
                <p className="truncate text-sm font-bold text-stone-950">{recentlyAdded.name}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isCatalogPage && (
      /* Hero Section */
      <section id="hero" className="relative min-h-screen overflow-hidden bg-[#fff8f1] px-4 pt-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,248,241,0.96)_0%,rgba(255,241,242,0.86)_42%,rgba(255,247,237,0.95)_100%)]" />
        <div className="absolute left-0 top-0 h-full w-full opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,#9f1239_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="absolute -left-24 top-32 h-80 w-80 rounded-full bg-rose-200/50 blur-3xl" />
        <div className="absolute -right-28 bottom-20 h-96 w-96 rounded-full bg-amber-200/55 blur-3xl" />

        <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-12 py-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-2xl text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-7 inline-flex items-center gap-3 rounded-full border border-rose-200 bg-white/80 px-4 py-2 text-sm font-semibold text-rose-800 shadow-sm"
            >
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              Floristería artesanal con entrega a domicilio
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mb-6 text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-stone-950 sm:text-7xl lg:text-8xl"
            >
              Flores que se sienten personales.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mb-8 max-w-xl text-lg leading-8 text-stone-700 lg:mx-0"
            >
              Diseñamos ramos y arreglos con flores frescas, envolturas cuidadas y una experiencia de compra sencilla por WhatsApp.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-10 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <button
                onClick={() => navigateTo('/catalogo')}
                className="rounded-full bg-stone-950 px-8 py-4 font-bold text-white shadow-xl shadow-stone-900/15 transition hover:-translate-y-0.5 hover:bg-rose-950"
              >
                Ver catálogo
              </button>
              <a
                href="https://wa.me/573226693139"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-rose-200 bg-white/80 px-8 py-4 font-bold text-stone-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Pedir por WhatsApp
              </a>
            </motion.div>

            <div className="grid max-w-xl grid-cols-3 gap-3 rounded-[2rem] border border-white/80 bg-white/55 p-3 shadow-lg shadow-rose-100/60 backdrop-blur-sm">
              {[
                ['+500', 'entregas'],
                ['4.9/5', 'calificación'],
                ['24h', 'agenda previa'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-3xl bg-white px-3 py-4 text-center">
                  <div className="text-xl font-black text-stone-950">{value}</div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-400">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto h-[620px] w-full max-w-[650px] lg:mx-0">
            <motion.div
              key={visibleHeroCards[0].title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-1/2 top-1/2 z-20 w-[78%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2.75rem] border-[10px] border-white bg-white shadow-2xl shadow-rose-900/15"
            >
              <div className="relative h-[430px] overflow-hidden rounded-[2rem]">
                <img
                  src={visibleHeroCards[0].image}
                  alt={visibleHeroCards[0].title}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/65 via-stone-950/12 to-transparent" />
                <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-rose-700">
                  {visibleHeroCards[0].eyebrow}
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="mb-2 text-sm font-semibold text-white/80">Desde {visibleHeroCards[0].price}</div>
                  <h2 className="text-4xl font-semibold leading-none tracking-[-0.04em]">
                    {visibleHeroCards[0].title}
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-6 text-white/85">
                    {visibleHeroCards[0].description}
                  </p>
                </div>
              </div>
            </motion.div>

            <button
              type="button"
              onClick={() => setCurrentHeroImage((currentHeroImage + 1) % heroCards.length)}
              className="absolute right-2 top-16 z-10 hidden w-52 rotate-6 overflow-hidden rounded-[2rem] border-[8px] border-white bg-white text-left shadow-xl shadow-stone-900/10 transition hover:rotate-3 hover:scale-[1.02] md:block"
              aria-label="Siguiente arreglo destacado"
            >
              <img
                src={visibleHeroCards[1].image}
                alt={visibleHeroCards[1].title}
                loading="lazy"
                decoding="async"
                className="h-44 w-full object-cover"
              />
              <div className="p-4">
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-rose-400">Siguiente</div>
                <div className="mt-1 text-2xl leading-none text-stone-950">{visibleHeroCards[1].title}</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setCurrentHeroImage((currentHeroImage + 2) % heroCards.length)}
              className="absolute bottom-12 left-0 z-10 hidden w-48 -rotate-6 overflow-hidden rounded-[2rem] border-[8px] border-white bg-white text-left shadow-xl shadow-stone-900/10 transition hover:-rotate-3 hover:scale-[1.02] md:block"
              aria-label="Ver otra sugerencia floral"
            >
              <img
                src={visibleHeroCards[2].image}
                alt={visibleHeroCards[2].title}
                loading="lazy"
                decoding="async"
                className="h-36 w-full object-cover"
              />
              <div className="p-4">
                <div className="text-[11px] font-black uppercase tracking-[0.18em] text-amber-600">Favorito</div>
                <div className="mt-1 text-xl leading-none text-stone-950">{visibleHeroCards[2].title}</div>
              </div>
            </button>

            <div className="absolute bottom-4 right-8 z-30 rounded-[2rem] border border-white/80 bg-white/85 p-4 shadow-xl shadow-rose-900/10 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-stone-950">Entrega coordinada</div>
                  <div className="text-sm text-stone-500">Confirmamos horario por WhatsApp</div>
                </div>
              </div>
            </div>

            <div className="absolute left-1/2 top-4 z-30 flex -translate-x-1/2 gap-2 rounded-full bg-white/80 p-2 shadow-lg shadow-rose-900/10 backdrop-blur-sm">
              {heroCards.map((card, i) => (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => setCurrentHeroImage(i)}
                  className={`h-2.5 rounded-full transition-all ${i === currentHeroImage ? 'w-8 bg-stone-950' : 'w-2.5 bg-stone-300 hover:bg-rose-300'}`}
                  aria-label={`Ver ${card.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      )}
      {isCatalogPage ? (
        <section className="min-h-screen bg-[#fff8f1] px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <button
                  onClick={() => navigateTo('/')}
                  className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-stone-700 shadow-sm transition hover:text-rose-700"
                >
                  ← Volver al inicio
                </button>
                <span className="mb-3 inline-flex rounded-full bg-rose-100 px-4 py-2 text-sm font-bold text-rose-700">Catálogo completo</span>
                <h1 className="text-5xl font-semibold leading-none tracking-[-0.05em] text-stone-950 sm:text-7xl">
                  Arreglos para cada intención.
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
                  Explora opciones por categoría, revisa qué incluye cada arreglo y compra con carrito o por WhatsApp si necesitas asesoría.
                </p>
              </div>
              <div className="rounded-[2rem] border border-white/80 bg-white/75 p-5 shadow-xl shadow-rose-100/70 backdrop-blur-sm">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    ['Compra segura', 'Confirmamos cada detalle antes de enviar'],
                    ['Flores frescas', 'Selección del día según disponibilidad'],
                    ['Entrega clara', 'Coordinación de horario por WhatsApp'],
                  ].map(([title, desc]) => (
                    <div key={title} className="rounded-3xl bg-white p-4">
                      <CheckCircle className="mb-3 h-5 w-5 text-emerald-500" />
                      <div className="font-black text-stone-950">{title}</div>
                      <div className="mt-1 text-sm leading-6 text-stone-500">{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-10 flex flex-wrap gap-3">
              {["Todos", "Ramos", "Arreglos", "Regalos", "Condolencias", "Personalizados"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-5 py-3 text-sm font-bold transition ${
                    selectedCategory === cat
                      ? 'bg-stone-950 text-white shadow-lg shadow-stone-900/15'
                      : 'bg-white text-stone-600 shadow-sm hover:text-rose-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence>
                {filteredProducts.map((product, i) => (
                  <motion.article
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 18 }}
                    transition={{ delay: i * 0.04 }}
                    className="group flex overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-lg shadow-rose-100/60 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-rose-200/70"
                  >
                    <div className="flex w-full flex-col">
                      <div className="relative h-64 overflow-hidden bg-stone-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/45 via-transparent to-transparent" />
                        <div className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-rose-700 shadow-sm">
                          {product.category}
                        </div>
                        {product.badge && (
                          <div className="absolute right-4 top-4 rounded-full bg-rose-500 px-3 py-1.5 text-[11px] font-black text-white shadow-sm">
                            {product.badge}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-5">
                          <h2 className="text-2xl font-black leading-tight tracking-[-0.02em] text-stone-950">{product.name}</h2>
                          <p className="mt-2 text-sm leading-6 text-stone-600">{product.description}</p>
                        </div>

                        <div className="mb-4 grid grid-cols-2 gap-3">
                          <div className="rounded-2xl bg-stone-50 p-3">
                            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-stone-400">Formato</div>
                            <div className="mt-1 text-sm font-black text-stone-950">{product.stems}</div>
                          </div>
                          <div className="rounded-2xl bg-stone-50 p-3">
                            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-stone-400">Entrega</div>
                            <div className="mt-1 text-sm font-black text-stone-950">{product.delivery}</div>
                          </div>
                        </div>

                        <div className="mb-4 rounded-2xl bg-rose-50/80 p-4">
                          <div className="text-sm font-black text-stone-950">Ideal para</div>
                          <p className="mt-1 text-sm leading-6 text-stone-600">{product.idealFor}</p>
                        </div>

                        <div className="mb-6">
                          <div className="mb-2 text-sm font-black text-stone-950">Incluye</div>
                          <div className="flex flex-wrap gap-2">
                            {product.includes?.slice(0, 3).map((item) => (
                              <span key={item} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-stone-600 ring-1 ring-stone-200">{item}</span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-auto flex items-end justify-between gap-4 border-t border-stone-100 pt-5">
                          <div>
                            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-stone-400">Precio desde</div>
                            <div className="text-3xl font-black tracking-[-0.03em] text-stone-950">${product.price.toLocaleString()}</div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => addToCart(product)}
                              className="rounded-full bg-stone-950 px-4 py-3 text-sm font-black text-white transition hover:bg-rose-950"
                            >
                              Agregar
                            </button>
                            <a
                              href={`https://wa.me/573226693139?text=Hola, me interesa ${product.name}. ¿Me ayudas con disponibilidad?`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full bg-[#25D366] px-4 py-3 text-sm font-black text-white transition hover:bg-[#25D366] hover:shadow-lg hover:shadow-[#25D366]/25 active:bg-[#25D366]"
                            >
                              WhatsApp
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>          </div>
        </section>
      ) : (
        <>
      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Flower2, title: "Flores frescas seleccionadas", desc: "Calidad garantizada en cada arreglo", color: "from-rose-500 to-pink-500" },
              { icon: Truck, title: "Entrega a domicilio", desc: "Llevamos tus flores donde las necesites", color: "from-orange-500 to-amber-500" },
              { icon: Heart, title: "Arreglos personalizados", desc: "Diseños únicos según tu ocasión", color: "from-pink-500 to-rose-500" },
              { icon: MessageCircle, title: "Atención por WhatsApp", desc: "Respuesta inmediata a tus consultas", color: "from-green-500 to-emerald-500" }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/60 hover:bg-white/90 transition shadow-lg hover:shadow-2xl group cursor-pointer"
              >
                <motion.div
                  className={`w-14 h-14 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <benefit.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{benefit.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog Preview Section */}
      <section id="catalog" className="bg-white/40 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <span className="mb-3 inline-flex rounded-full bg-rose-100 px-4 py-2 text-sm font-bold text-rose-700">Selección destacada</span>
              <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-6xl">
                Una primera mirada al catálogo.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
                Estos son algunos favoritos para pedir rápido. En la sección completa puedes ver detalles, usos ideales e inclusiones de cada arreglo.
              </p>
            </div>
            <button
              onClick={() => navigateTo('/catalogo')}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-stone-950 px-7 py-4 font-bold text-white shadow-xl shadow-stone-900/15 transition hover:-translate-y-0.5 hover:bg-rose-950"
            >
              Ver catálogo completo
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featuredProducts.map((product, i) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-lg shadow-rose-100/60 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-rose-200/70"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/55 via-transparent to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-rose-700">
                    {product.category}
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <h3 className="text-3xl font-semibold leading-none">{product.name}</h3>
                    <p className="mt-2 text-sm text-white/85">{product.idealFor}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-bold text-stone-500">Desde</div>
                      <div className="text-2xl font-black text-stone-950">${product.price.toLocaleString()}</div>
                    </div>
                    <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{product.delivery}</div>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 px-5 py-3 font-bold text-white transition hover:shadow-lg hover:shadow-rose-500/25"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Agregar al carrito
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-1/2 h-64 -translate-y-1/2 bg-gradient-to-r from-rose-100/70 via-orange-50 to-rose-100/70" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <span className="mb-3 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-rose-700 shadow-sm">Clientes reales</span>
              <h2 className="text-4xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-6xl">
                Reseñas que ayudan a comprar con tranquilidad.
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-3 rounded-[2rem] border border-white/80 bg-white/75 p-3 shadow-xl shadow-rose-100/70 backdrop-blur-sm">
              {[
                ['4.9/5', 'promedio'],
                ['+500', 'entregas'],
                ['98%', 'recompra'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-3xl bg-stone-950 px-3 py-5 text-center text-white">
                  <div className="text-2xl font-black">{value}</div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/55">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <motion.article
                key={review.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-[2rem] border border-white/80 bg-white p-7 shadow-xl shadow-rose-100/70"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black text-stone-950">{review.name}</h3>
                    <p className="text-sm font-semibold text-stone-500">{review.occasion}</p>
                  </div>
                  <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">{review.detail}</div>
                </div>
                <div className="mb-5 flex gap-1 text-amber-400">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-base leading-8 text-stone-700">“{review.text}”</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      {/* Occasions Section */}
      <section id="occasions" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Flores para{' '}
              <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">cada ocasión</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Amor y aniversario", desc: "Expresa tu amor con rosas rojas y arreglos románticos", image: "https://images.unsplash.com/photo-1771164802337-3c980073df4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", emoji: "Amor" },
              { title: "Cumpleaños", desc: "Celebra con flores alegres y coloridas que transmiten felicidad", image: "https://images.unsplash.com/photo-1752765579894-9a7aef6fb359?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", emoji: "Fiesta" },
              { title: "Día de la madre", desc: "Honra a mamá con arreglos especiales llenos de amor", image: "https://images.unsplash.com/photo-1587291085527-63fc4b9a156a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", emoji: "Madre" },
              { title: "Condolencias", desc: "Acompaña en momentos difíciles con arreglos delicados", image: "https://images.unsplash.com/photo-1775298324722-3edc1cb382d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", emoji: "Calma" },
              { title: "Matrimonios", desc: "Decora tu día especial con flores elegantes y sofisticadas", image: "https://images.unsplash.com/photo-1771099077123-e9795202de0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", emoji: "Boda" },
              { title: "Detalles personalizados", desc: "Crea momentos únicos con arreglos diseñados a tu gusto", image: "https://images.unsplash.com/photo-1662929733678-d3f62fe54878?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800", emoji: "Especial" }
            ].map((occasion, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative rounded-3xl overflow-hidden h-72 group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow"
              >
                <motion.img
                  src={occasion.image}
                  alt={occasion.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2, type: "spring" }}
                    className="mb-3 inline-flex w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-white"
                  >
                    {occasion.emoji}
                  </motion.div>
                  <h3 className="font-bold text-xl text-white mb-2 group-hover:text-rose-300 transition-colors">{occasion.title}</h3>
                  <p className="text-sm text-white/90 leading-relaxed">{occasion.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Section */}
      <section id="shipping" className="relative overflow-hidden bg-[#fffaf5] px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_1px_1px,#be123c_1px,transparent_0)] [background-size:30px_30px]" />
        <div className="absolute left-[-10rem] top-20 h-96 w-96 rounded-full bg-rose-200/45 blur-3xl" />
        <div className="absolute right-[-8rem] bottom-10 h-96 w-96 rounded-full bg-amber-200/45 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-flex rounded-full border border-rose-200 bg-white/80 px-4 py-2 text-sm font-bold text-rose-700 shadow-sm"
            >
              Envíos y pedidos
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="mx-auto max-w-4xl text-4xl font-semibold leading-none tracking-[-0.045em] text-stone-950 sm:text-6xl"
            >
              Flores entregadas con calma, cuidado y buena comunicación.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-stone-600"
            >
              Te acompañamos por WhatsApp para confirmar disponibilidad, dirección, horario y cada detalle antes de preparar tu arreglo.
            </motion.p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[2.75rem] bg-stone-950 p-8 text-white shadow-2xl shadow-stone-900/20 sm:p-10"
            >
              <div className="absolute right-[-5rem] top-[-5rem] h-56 w-56 rounded-full bg-rose-500/25 blur-3xl" />
              <div className="absolute bottom-[-6rem] left-[-6rem] h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />

              <div className="relative flex h-full flex-col justify-between gap-10">
                <div>
                  <div className="mb-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white/80">Pedido acompañado</div>
                  <h3 className="text-4xl font-semibold leading-none tracking-[-0.04em] sm:text-5xl">
                    No compras a ciegas: confirmamos todo contigo.
                  </h3>
                  <p className="mt-5 max-w-md text-base leading-8 text-white/70">
                    Si tienes una ocasión importante, nos dices la intención del regalo y te guiamos con colores, formato y hora de entrega.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ['Foto previa', 'Puedes pedir referencia antes del envío.'],
                    ['Dedicatoria', 'Incluimos mensaje personalizado.'],
                    ['Horario', 'Coordinamos una franja realista.'],
                    ['Cobertura', 'Validamos zona antes de cobrar.'],
                  ].map(([title, desc]) => (
                    <div key={title} className="rounded-3xl border border-white/10 bg-white/8 p-4">
                      <CheckCircle className="mb-3 h-5 w-5 text-emerald-300" />
                      <div className="font-black text-white">{title}</div>
                      <p className="mt-1 text-sm leading-6 text-white/60">{desc}</p>
                    </div>
                  ))}
                </div>

                <a
                  href="https://wa.me/573226693139?text=Hola, quiero coordinar un envío de flores"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 font-black text-white shadow-lg shadow-[#25D366]/25 transition hover:-translate-y-0.5 hover:bg-[#25D366] hover:shadow-xl hover:shadow-[#25D366]/35 active:bg-[#25D366]"
                >
                  <img src={whatsappIcon} alt="" className="h-5 w-5 rounded-full" />
                  Coordinar mi pedido
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-[2.75rem] border border-white/80 bg-white/82 p-6 shadow-2xl shadow-rose-100/70 backdrop-blur-sm sm:p-8"
            >
              <div className="mb-7 flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-black uppercase tracking-[0.2em] text-rose-400">Ruta del pedido</div>
                  <h3 className="mt-2 text-2xl font-black text-stone-950">Así llega tu arreglo</h3>
                </div>
                <div className="hidden rounded-full bg-rose-50 px-4 py-2 text-sm font-black text-rose-700 sm:block">24h recomendado</div>
              </div>

              <div className="relative space-y-5">
                <div className="absolute bottom-10 left-6 top-10 w-px bg-gradient-to-b from-rose-200 via-orange-200 to-emerald-200" />
                {[
                  { icon: Flower2, title: 'Diseñamos contigo', desc: 'Elegimos estilo, colores y presupuesto según la ocasión.', tint: 'bg-rose-100 text-rose-700' },
                  { icon: MapPin, title: 'Confirmamos cobertura', desc: 'Validamos dirección, costo de envío y franja horaria.', tint: 'bg-orange-100 text-orange-700' },
                  { icon: Truck, title: 'Preparamos y entregamos', desc: 'Armamos el detalle con flores frescas y avisamos cuando esté listo.', tint: 'bg-emerald-100 text-emerald-700' },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="relative flex gap-5 rounded-[2rem] bg-[#fffaf5] p-5"
                  >
                    <div className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${item.tint}`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-400">Paso {i + 1}</div>
                      <h4 className="mt-1 text-lg font-black text-stone-950">{item.title}</h4>
                      <p className="mt-1 text-sm leading-7 text-stone-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[2rem] bg-white p-5 shadow-sm">
                  <Clock className="mb-3 h-6 w-6 text-rose-500" />
                  <div className="font-black text-stone-950">Horarios acordados</div>
                  <p className="mt-1 text-sm leading-6 text-stone-500">Te damos una franja de entrega clara por WhatsApp.</p>
                </div>
                <div className="rounded-[2rem] bg-white p-5 shadow-sm">
                  <Phone className="mb-3 h-6 w-6 text-emerald-500" />
                  <div className="font-black text-stone-950">Urgencias posibles</div>
                  <p className="mt-1 text-sm leading-6 text-stone-500">Si hay disponibilidad, buscamos una opción para el mismo día.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
        </>
      )}

      {/* Contact Section */}
      <section id="contact" className="relative overflow-hidden bg-[#fff8f1] px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute left-[-8rem] top-20 h-80 w-80 rounded-full bg-rose-200/45 blur-3xl" />
        <div className="absolute right-[-8rem] bottom-10 h-80 w-80 rounded-full bg-orange-200/45 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-rose-700 shadow-sm">Contacto</span>
            <h2 className="mx-auto max-w-3xl text-4xl font-black leading-tight tracking-[-0.04em] text-stone-950 sm:text-6xl">
              Hablemos de las flores para tu próximo detalle.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-stone-600">
              Escríbenos, visítanos o síguenos en redes para ver arreglos recientes, disponibilidad y entregas del día.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6">
              <div className="rounded-[2.5rem] border border-white/80 bg-white p-7 shadow-xl shadow-rose-100/70">
                <div className="mb-6 flex items-center gap-4">
                  <img src={brandLogo_nbg} alt="Flores Victor" className="h-20 w-auto rounded-2xl bg-white object-contain p-1 shadow-sm" />
                  <div>
                    <h3 className="text-2xl font-black text-stone-950">Flores Victor</h3>
                    <p className="text-sm font-semibold text-stone-500">Floristería artesanal y entregas a domicilio</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: Phone, title: 'Teléfono', value: '+57 322 6693139' },
                    { icon: Mail, title: 'Correo', value: 'sepulvedav88@gmail.com' },
                    { icon: MapPin, title: 'Ubicación', value: 'El Carmen de Viboral, Antioquia' },
                    { icon: Clock, title: 'Horario', value: 'Lun - Sáb: 8am - 6pm' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center gap-4 rounded-3xl bg-[#fff8f1] p-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-rose-600 shadow-sm">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs font-black uppercase tracking-[0.18em] text-stone-400">{item.title}</div>
                        <div className="font-bold text-stone-950">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2.5rem] border border-white/80 bg-white/85 p-7 shadow-2xl shadow-rose-100/70 backdrop-blur-sm">
                <h3 className="mb-2 text-xl font-black text-stone-950">Síguenos y escríbenos</h3>
                <p className="mb-5 text-sm leading-6 text-stone-500">Mira arreglos recientes, entregas del día y escríbenos por tu canal favorito.</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'WhatsApp', href: 'https://wa.me/573226693139', icon: whatsappIcon, brand: 'bg-[#25D366]' },
                    { name: 'Instagram', href: 'https://www.instagram.com/floresvictors?igsh=MWp3ZXc1MnNlbXFqOQ==', Icon: Instagram, brand: 'bg-gradient-to-br from-pink-500 to-orange-400' },
                    { name: 'Facebook', href: 'https://www.facebook.com/share/1EKjpEVKfP/?mibextid=wwXIfr', Icon: Facebook, brand: 'bg-blue-600' },
                    // { name: 'Twitter / X', href: 'https://x.com', Icon: Twitter, brand: 'bg-stone-800' },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-3xl border border-stone-100 bg-[#fff8f1] p-3 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg hover:shadow-rose-100/70"
                    >
                      <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${social.brand}`}>
                        {'icon' in social ? (
                          <img src={social.icon} alt="" className="h-6 w-6 rounded-full" />
                        ) : (
                          <social.Icon className="h-5 w-5 text-white" />
                        )}
                      </span>
                      <span className="font-bold text-stone-950">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-white p-3 shadow-2xl shadow-rose-100/70">
              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-2xl font-black text-stone-950">Encuéntranos en Google Maps</h3>
                  <p className="mt-1 text-sm leading-6 text-stone-500">Referencia de ubicación para coordinar recogidas o entregas cercanas.</p>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=El%20Carmen%20de%20Viboral%20Antioquia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-950 px-5 py-3 text-sm font-black text-white transition hover:bg-rose-950"
                >
                  Abrir mapa
                  <MapPin className="h-4 w-4" />
                </a>
              </div>
              <iframe
                title="Ubicación de Flores Victor en Google Maps"
                src="https://www.google.com/maps?q=El%20Carmen%20de%20Viboral%2C%20Antioquia&output=embed"
                className="h-[420px] w-full rounded-[2rem] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer id="footer" className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(251, 146, 60, 0.3) 0%, transparent 50%)`
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src={brandLogo_nbg} alt="Flores Victor" className="h-16 w-auto rounded-2xl bg-white object-contain p-1" />
              </div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Flores frescas, arreglos florales y detalles especiales para cada ocasión.
              </p>
              <div className="flex gap-4">
                {[
                  { Icon: Facebook, href: 'https://www.facebook.com/share/1EKjpEVKfP/?mibextid=wwXIfr' },
                  { Icon: Instagram, href: 'https://www.instagram.com/floresvictors?igsh=MWp3ZXc1MnNlbXFqOQ==' },
                  // { Icon: Twitter, href: 'https://x.com' },
                ].map(({ Icon, href }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-rose-500 hover:to-orange-500 transition-all"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Enlaces rápidos</h3>
              <div className="flex flex-col gap-2">
                {['Catálogo', 'Ocasiones', 'Envíos'].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => item === 'Catálogo' ? navigateTo('/catalogo') : scrollToSection(item === 'Ocasiones' ? 'occasions' : 'shipping')}
                    className="text-gray-400 hover:text-rose-400 transition text-left group flex items-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Contacto</h3>
              <div className="flex flex-col gap-3 text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-rose-400" />
                  <span className="text-sm">+57 322 6693139</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-rose-400" />
                  <span className="text-sm">sepulvedav88@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-rose-400" />
                  <span className="text-sm">Lun - Sáb: 8am - 6pm</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© 2026 Flores Victor. Todos los derechos reservados. Hecho con cuidado.</p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setCartOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-md overflow-y-auto bg-[#fffaf5] shadow-2xl"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-100 bg-white/95 p-6 backdrop-blur-md">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-400">Pedido floral</p>
                  <h2 className="text-2xl font-black text-stone-950">Tu carrito</h2>
                </div>
                <motion.button
                  onClick={() => setCartOpen(false)}
                  className="rounded-full bg-stone-100 p-2 text-stone-700 transition hover:bg-stone-200"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="p-6">
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                    </motion.div>
                    <p className="text-gray-500 mb-4 text-lg">Tu carrito está vacío</p>
                    <motion.button
                      onClick={() => {
                        setCartOpen(false);
                        navigateTo('/catalogo');
                      }}
                      className="rounded-full bg-stone-950 px-6 py-3 font-semibold text-white transition hover:bg-rose-950 hover:shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Ver catálogo
                    </motion.button>
                  </motion.div>
                ) : (
                  <>
                    <div className="mb-6 space-y-4">
                      <AnimatePresence>
                        {cart.map((item, i) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex gap-4 rounded-[1.5rem] border border-stone-100 bg-white p-4 shadow-lg shadow-rose-100/45"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              loading="lazy"
                              decoding="async"
                              className="h-20 w-20 object-cover rounded-2xl shadow-sm"
                            />
                            <div className="flex-1">
                              <h3 className="mb-1 font-black leading-tight text-stone-950">{item.name}</h3>
                              <p className="mb-2 text-sm font-bold text-stone-500">
                                ${item.price.toLocaleString()}
                              </p>
                              <div className="flex items-center gap-2">
                                <motion.button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-sm transition hover:bg-stone-950 hover:text-white"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Minus className="h-4 w-4" />
                                </motion.button>
                                <span className="w-10 text-center font-black text-stone-950">{item.quantity}</span>
                                <motion.button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-sm transition hover:bg-stone-950 hover:text-white"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Plus className="h-4 w-4" />
                                </motion.button>
                                <motion.button
                                  onClick={() => removeFromCart(item.id)}
                                  className="ml-auto rounded-full p-2 text-stone-400 transition hover:bg-red-50 hover:text-red-500"
                                  whileHover={{ scale: 1.2, rotate: 360 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    <div className="mb-6 rounded-[1.5rem] border border-stone-100 bg-white p-5 shadow-lg shadow-rose-100/45">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-stone-500">Subtotal</span>
                        <span className="font-bold text-stone-950">${cartTotal.toLocaleString()}</span>
                      </div>
                      <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-3 text-lg">
                        <span className="font-black text-stone-950">Total</span>
                        <span className="text-2xl font-black text-stone-950">
                          ${cartTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <motion.button
                      onClick={() => {
                        setShowCheckout(true);
                        setCartOpen(false);
                      }}
                      className="w-full rounded-full bg-[#25D366] py-4 text-lg font-black text-white shadow-xl shadow-[#25D366]/25 transition-all hover:shadow-2xl hover:shadow-[#25D366]/40"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Continuar pedido →
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setShowCheckout(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-4 z-50 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-stone-100 bg-white/95 p-6 backdrop-blur-md">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-400">Checkout</p>
                    <h2 className="text-2xl font-black text-stone-950">Finalizar pedido</h2>
                  </div>
                  <motion.button
                    onClick={() => setShowCheckout(false)}
                    className="rounded-full bg-stone-100 p-2 text-stone-700 transition hover:bg-stone-200"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-4"
                  >
                    <p className="text-sm leading-relaxed text-emerald-900">
                      <strong>Casi listo:</strong> Al finalizar, enviaremos el resumen por WhatsApp para confirmar disponibilidad, envío y hora.
                    </p>
                  </motion.div>

                  <form className="space-y-4">
                    {[
                      { label: "Nombre completo", type: "text", placeholder: "Tu nombre", key: "name" },
                      { label: "Teléfono", type: "tel", placeholder: "+57 322 6693139", key: "phone" },
                      { label: "Ciudad o municipio", type: "text", placeholder: "Ej: El Carmen de Viboral, Antioquia", key: "city" },
                      { label: "Dirección de entrega", type: "text", placeholder: "Calle, número, barrio, referencia", key: "address" },
                    ].map((field, i) => (
                      <motion.div
                        key={field.key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <label className="mb-2 block text-sm font-bold text-stone-700">{field.label} *</label>
                        <input
                          type={field.type}
                          list={field.key === 'city' ? 'colombia-municipalities' : undefined}
                          value={checkoutData[field.key as keyof typeof checkoutData]}
                          onChange={(e) => setCheckoutData({...checkoutData, [field.key]: e.target.value})}
                          className="w-full rounded-xl border-2 border-stone-200 bg-stone-50 px-4 py-3 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-stone-900"
                          placeholder={field.placeholder}
                        />
                      </motion.div>
                    ))}

                    <datalist id="colombia-municipalities">
                      {municipalityOptions.map((location, index) => (
                        <option key={`${location}-${index}`} value={location} />
                      ))}
                    </datalist>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        <label className="mb-2 block text-sm font-bold text-stone-700">Fecha de entrega *</label>
                        <input
                          type="date"
                          value={checkoutData.deliveryDate}
                          onChange={(e) => setCheckoutData({...checkoutData, deliveryDate: e.target.value})}
                          className="w-full rounded-xl border-2 border-stone-200 bg-stone-50 px-4 py-3 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-stone-900"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="mb-2 block text-sm font-bold text-stone-700">Horario preferido *</label>
                        <select
                          value={checkoutData.deliveryTime}
                          onChange={(e) => setCheckoutData({...checkoutData, deliveryTime: e.target.value})}
                          className="w-full rounded-xl border-2 border-stone-200 bg-stone-50 px-4 py-3 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-stone-900"
                        >
                          <option value="">Seleccionar</option>
                          <option value="8am - 12pm">8am - 12pm</option>
                          <option value="12pm - 4pm">12pm - 4pm</option>
                          <option value="4pm - 8pm">4pm - 8pm</option>
                        </select>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <label className="mb-2 block text-sm font-bold text-stone-700">Mensaje para tarjeta (opcional)</label>
                      <textarea
                        value={checkoutData.cardMessage}
                        onChange={(e) => setCheckoutData({...checkoutData, cardMessage: e.target.value})}
                        className="w-full resize-none rounded-xl border-2 border-stone-200 bg-stone-50 px-4 py-3 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-stone-900"
                        rows={3}
                        placeholder="Escribe un mensaje especial que incluiremos en una tarjeta..."
                      ></textarea>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="mb-2 block text-sm font-bold text-stone-700">Notas adicionales (opcional)</label>
                      <textarea
                        value={checkoutData.notes}
                        onChange={(e) => setCheckoutData({...checkoutData, notes: e.target.value})}
                        className="w-full resize-none rounded-xl border-2 border-stone-200 bg-stone-50 px-4 py-3 transition focus:border-transparent focus:outline-none focus:ring-2 focus:ring-stone-900"
                        rows={2}
                        placeholder="Instrucciones especiales, preferencias de colores, etc."
                      ></textarea>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="mt-6 border-t-2 border-stone-100 pt-6"
                    >
                      <div className="mb-4 rounded-2xl border border-stone-100 bg-[#fffaf5] p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-black text-stone-950">Total a pagar</span>
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', delay: 0.5 }}
                            className="text-3xl font-black text-stone-950"
                          >
                            ${cartTotal.toLocaleString()}
                          </motion.span>
                        </div>
                      </div>

                      <motion.button
                        type="button"
                        onClick={handleCheckout}
                        disabled={!checkoutData.name || !checkoutData.phone || !checkoutData.city || !checkoutData.address || !checkoutData.deliveryDate || !checkoutData.deliveryTime}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-4 text-lg font-bold text-white transition-all hover:bg-[#25D366] hover:shadow-2xl hover:shadow-[#25D366]/40 active:bg-[#25D366] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <img src={whatsappIcon} alt="" className="h-5 w-5 rounded-full transition-transform group-hover:rotate-12" />
                        Comprar por WhatsApp
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </motion.div>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/573226693139"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/45 transition hover:bg-[#25D366] hover:shadow-[#25D366]/60 active:bg-[#25D366]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/15">
          <img src={whatsappIcon} alt="WhatsApp" className="h-16 w-16 rounded-full" />
        </span>
        <motion.div
          className="absolute -inset-3 rounded-full bg-[#25D366] opacity-45 blur-xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.a>
    </div>
  );
}
