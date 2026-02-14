
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ShoppingCart, Menu as MenuIcon, X, Plus, Minus, Send, Phone, MapPin, Instagram, Clock, Star, Sparkles, ChefHat, Play, MessageCircle, Facebook, Twitter, ArrowRight, ShoppingBag, Share2, CreditCard } from 'lucide-react';
import { PIZZAS, INITIAL_REVIEWS } from './constants';
import { Pizza, CartItem, Review } from './types';
import { GoogleGenAI, Type } from "@google/genai";

// Número do WhatsApp Business da Pizzaria
const WHATSAPP_NUMBER = "5511999999999";

// Função utilitária para abrir WhatsApp
const openWhatsApp = (msg: string) => {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
};

// Navbar Component
const Navbar: React.FC<{ cartCount: number, onOpenCart: () => void }> = ({ cartCount, onOpenCart }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-neutral-950/90 backdrop-blur-xl border-b border-neutral-900 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ChefHat className="text-amber-500 w-7 h-7 sm:w-8 sm:h-8" />
          <span className="text-xl sm:text-2xl font-serif font-bold tracking-tighter text-white uppercase">
            BELLA <span className="text-amber-500">NOTTE</span>
          </span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">
          <a href="#inicio" className="hover:text-amber-500 transition-colors">Início</a>
          <a href="#cardapio" className="hover:text-amber-500 transition-colors">Cardápio</a>
          <a href="#cozinha" className="hover:text-amber-500 transition-colors">Cozinha</a>
          <a href="#sobre" className="hover:text-amber-500 transition-colors">A Casa</a>
          <a href="#avaliacoes" className="hover:text-amber-500 transition-colors">Avaliações</a>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-white hover:text-amber-500 transition-colors"
            aria-label="Abrir carrinho"
          >
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-[9px] font-black w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          
          <button 
            onClick={() => openWhatsApp("Olá! Vi o site de vocês e gostaria de fazer meu pedido agora no WhatsApp Business.")}
            className="hidden sm:flex items-center gap-2 bg-amber-500 text-black px-5 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20 active:scale-95"
          >
            Pedido WhatsApp <ArrowRight className="w-3 h-3" />
          </button>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden absolute top-20 left-0 w-full bg-neutral-950 border-b border-neutral-900 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-6 flex flex-col gap-6 text-center text-xs font-bold uppercase tracking-widest text-neutral-400">
          <a href="#inicio" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-500">Início</a>
          <a href="#cardapio" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-500">Cardápio</a>
          <a href="#cozinha" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-500">Cozinha</a>
          <a href="#sobre" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-500">A Casa</a>
          <a href="#avaliacoes" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-amber-500">Avaliações</a>
          <button 
            onClick={() => { setIsMobileMenuOpen(false); openWhatsApp("Olá! Gostaria de fazer um pedido."); }}
            className="bg-amber-500 text-black py-4 font-black uppercase tracking-widest text-[10px]"
          >
            Pedir agora via WhatsApp
          </button>
        </div>
      </div>
    </nav>
  );
};

// Kitchen Video Component
const KitchenVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section id="cozinha" className="py-16 sm:py-24 bg-neutral-950 overflow-hidden border-y border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-10 sm:mb-16">
          <span className="text-amber-500 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mb-4 block">Processo Artesanal</span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white mb-4 leading-tight">Excelência no Preparo</h2>
          <div className="w-16 sm:w-24 h-1 bg-amber-500 mx-auto"></div>
        </div>
        
        <div className="relative group aspect-video max-w-5xl mx-auto border border-neutral-800 bg-neutral-900 overflow-hidden shadow-2xl rounded-lg">
          <video 
            ref={videoRef}
            className="w-full h-full object-cover saturate-125 brightness-110"
            poster="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200"
            loop
            muted
            playsInline
          >
            <source src="https://player.vimeo.com/external/370331493.sd.mp4?s=27d73983da3e144a1e944d67356247072e17163f&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          
          <div className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
            <button 
              onClick={togglePlay}
              className="w-16 h-16 sm:w-24 sm:h-24 bg-amber-500 rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform shadow-amber-500/40 shadow-2xl"
            >
              {isPlaying ? <X className="w-8 h-8" /> : <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Reviews Section
const ReviewsSection: React.FC<{ reviews: Review[], onAddReview: (r: Review) => void }> = ({ reviews, onAddReview }) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !comment || !email || !phone) return;
    
    const newReview: Review = {
      id: Date.now().toString(),
      name: firstName,
      email,
      phone,
      rating,
      comment,
      date: new Date().toLocaleDateString('pt-BR')
    };
    
    onAddReview(newReview);
    
    // Simulação de sistema de captura de dados para email da pizzaria
    console.log("Sistema de Captura de Dados Ativado:", newReview);
    alert("Obrigado, " + firstName + "! Sua avaliação foi capturada e enviada para o nosso sistema.");
    
    setFirstName("");
    setEmail("");
    setPhone("");
    setComment("");
    setRating(5);
    setShowForm(false);
  };

  return (
    <section id="avaliacoes" className="py-16 sm:py-24 bg-neutral-900/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Experiências</span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white mb-4">A Voz dos Nossos Clientes</h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {reviews.map(review => (
            <div key={review.id} className="bg-neutral-950 p-6 sm:p-8 border border-neutral-800 hover:border-amber-500/40 transition-all rounded-lg shadow-xl">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < review.rating ? 'text-amber-500 fill-current' : 'text-neutral-800'}`} />
                ))}
              </div>
              <p className="text-neutral-300 font-light italic mb-6 leading-relaxed text-sm sm:text-base">"{review.comment}"</p>
              <div className="flex items-center justify-between border-t border-neutral-800 pt-4">
                <span className="text-white font-serif text-sm sm:text-base">{review.name}</span>
                <span className="text-neutral-600 text-[10px] uppercase font-bold tracking-widest">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          {!showForm ? (
            <button 
              onClick={() => setShowForm(true)}
              className="w-full sm:w-auto px-10 py-4 border-2 border-amber-500/50 text-amber-500 hover:bg-amber-500 hover:text-black font-black uppercase tracking-widest transition-all text-xs"
            >
              Fazer uma Avaliação
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-neutral-950 p-6 sm:p-10 border border-neutral-800 text-left rounded-lg shadow-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-neutral-500 text-[10px] font-black uppercase tracking-widest mb-2">Seu Primeiro Nome</label>
                  <input value={firstName} onChange={e => setFirstName(e.target.value)} type="text" placeholder="Ex: Maria" className="w-full bg-neutral-900 border border-neutral-800 p-4 text-white text-sm focus:border-amber-500 outline-none rounded-none" required />
                </div>
                <div>
                  <label className="block text-neutral-500 text-[10px] font-black uppercase tracking-widest mb-2">Nota</label>
                  <select value={rating} onChange={e => setRating(Number(e.target.value))} className="w-full bg-neutral-900 border border-neutral-800 p-4 text-white text-sm focus:border-amber-500 outline-none rounded-none">
                    <option value="5">5 Estrelas - Divino</option>
                    <option value="4">4 Estrelas - Excelente</option>
                    <option value="3">3 Estrelas - Bom</option>
                    <option value="2">2 Estrelas - Regular</option>
                    <option value="1">1 Estrela - Ruim</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-neutral-500 text-[10px] font-black uppercase tracking-widest mb-2">Seu Email</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="contato@exemplo.com" className="w-full bg-neutral-900 border border-neutral-800 p-4 text-white text-sm focus:border-amber-500 outline-none rounded-none" required />
                </div>
                <div>
                  <label className="block text-neutral-500 text-[10px] font-black uppercase tracking-widest mb-2">Seu WhatsApp</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="(00) 00000-0000" className="w-full bg-neutral-900 border border-neutral-800 p-4 text-white text-sm focus:border-amber-500 outline-none rounded-none" required />
                </div>
              </div>
              <div className="mb-8">
                <label className="block text-neutral-500 text-[10px] font-black uppercase tracking-widest mb-2">Seu Depoimento</label>
                <textarea value={comment} onChange={e => setComment(e.target.value)} className="w-full bg-neutral-900 border border-neutral-800 p-4 text-white text-sm h-32 focus:border-amber-500 outline-none resize-none rounded-none" placeholder="Conte como foi sua experiência conosco..." required></textarea>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button type="submit" className="flex-1 bg-amber-500 text-black py-5 font-black uppercase tracking-widest text-xs active:scale-95 transition-all">Enviar para a Pizzaria</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-8 py-5 border border-neutral-800 text-neutral-500 uppercase tracking-widest font-black text-xs hover:text-white transition-all">Cancelar</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

// AI Sophisticated Chat Assistant
const AIChatAssistant: React.FC<{ onAddToCart: (p: Pizza) => void, onCheckout: () => void }> = ({ onAddToCart, onCheckout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'ai' | 'user', text: string }[]>([
    { role: 'ai', text: 'Benvenuti alla Bella Notte! Sou seu concierge digital. Como posso tornar seu pedido inesquecível?' }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input || loading) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Você é o concierge sofisticado da Pizzaria Bella Notte. 
        Menu: ${PIZZAS.map(p => `${p.name}: ${p.description} (R$${p.price})`).join(', ')}.
        O cliente disse: "${userMsg}". 
        Responda de forma curta e luxuosa.
        Retorne um JSON com: { "reply": "string", "addPizzaId": number|null, "intent": "order|info|checkout" }`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reply: { type: Type.STRING },
              addPizzaId: { type: Type.NUMBER, nullable: true },
              intent: { type: Type.STRING }
            },
            required: ["reply", "intent"]
          }
        }
      });

      const data = JSON.parse(response.text);
      setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
      
      if (data.addPizzaId) {
        const p = PIZZAS.find(pizza => pizza.id === data.addPizzaId);
        if (p) onAddToCart(p);
      }
      if (data.intent === 'checkout') {
        onCheckout();
      }

    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Perdoe-me, senhor. Como posso serví-lo?' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 sm:bottom-28 sm:right-8 z-[90] bg-amber-500 text-black w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-90"
      >
        <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-8 sm:right-8 z-[110] w-full sm:max-w-sm h-full sm:h-[550px] bg-neutral-950 border sm:border-neutral-800 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-6">
          <div className="p-5 bg-neutral-900 border-b border-neutral-800 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <ChefHat className="w-5 h-5 text-amber-500" />
              <h4 className="text-white font-serif text-sm">Concierge Digital</h4>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-neutral-500 hover:text-white p-2">
              <X className="w-6 h-6 sm:w-5 sm:h-5" />
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-950">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 text-sm ${m.role === 'user' ? 'bg-amber-500 text-black font-bold' : 'bg-neutral-900 text-neutral-300 border border-neutral-800 italic'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex gap-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} placeholder="Sua mensagem..." className="flex-1 bg-neutral-950 border border-neutral-800 p-3 text-white text-sm outline-none focus:border-amber-500" />
            <button onClick={handleSend} className="bg-amber-500 text-black p-3 hover:bg-amber-400 transition-colors"><Send className="w-5 h-5" /></button>
          </div>
        </div>
      )}
    </>
  );
};

// Main App Component
export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'Tudo' | 'Tradicional' | 'Gourmet' | 'Doce'>('Tudo');
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  const addToCart = (pizza: Pizza) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === pizza.id);
      if (existing) return prev.map(item => item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...pizza, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item).filter(item => item.quantity > 0));
  };

  const cartTotal = useMemo(() => cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0), [cart]);

  const checkoutWhatsApp = () => {
    if (cart.length === 0) return;
    const message = `Olá! Gostaria de finalizar meu pedido gourmet na Bella Notte:%0A%0A` +
      cart.map(item => `- ${item.quantity}x ${item.name} (R$ ${item.price * item.quantity})`).join('%0A') +
      `%0A%0A*Total Geral: R$ ${cartTotal}*%0A%0A_Favor confirmar o tempo médio para entrega._`;
    openWhatsApp(message);
  };

  const payMercadoPago = () => {
    alert("Redirecionando para o ambiente seguro do Mercado Pago...");
    window.open("https://www.mercadopago.com.br", "_blank");
  };

  const filteredPizzas = useMemo(() => activeCategory === 'Tudo' ? PIZZAS : PIZZAS.filter(p => p.category === activeCategory), [activeCategory]);

  return (
    <div className="min-h-screen selection:bg-amber-500 selection:text-black bg-neutral-950 flex flex-col antialiased">
      <Navbar cartCount={cart.reduce((acc, c) => acc + c.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="flex-1">
        {/* Hero */}
        <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover opacity-60 saturate-150" alt="Hero" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-neutral-950"></div>
          </div>
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-serif font-bold text-white mb-8 tracking-tighter leading-tight">A Arte da <span className="text-amber-500 italic">Pizza</span></h1>
            <p className="text-neutral-400 text-lg sm:text-xl mb-12 font-light max-w-2xl mx-auto">A verdadeira experiência gourmet italiana, com cores vibrantes e sabores inesquecíveis.</p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button onClick={() => openWhatsApp("Olá! Quero aproveitar agora e fazer meu pedido pelo site.")} className="bg-amber-500 text-black px-12 py-5 font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-amber-400 flex items-center justify-center gap-3 active:scale-95 transition-all">Fazer Pedido Agora <ArrowRight className="w-4 h-4" /></button>
              <a href="#cardapio" className="border border-white/20 text-white px-12 py-5 font-black uppercase tracking-widest text-[11px] hover:bg-white hover:text-black active:scale-95 transition-all flex items-center justify-center">Ver Cardápio</a>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="cardapio" className="py-20 sm:py-32 px-4 bg-neutral-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 sm:mb-24">
              <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Cardápio Completo</span>
              <h2 className="text-4xl sm:text-6xl font-serif text-white mb-6">Nossas Pizzas</h2>
              <div className="w-20 h-1 bg-amber-500 mx-auto mb-10"></div>
              <div className="flex flex-wrap justify-center gap-3 text-[10px] font-black uppercase tracking-widest overflow-x-auto pb-4 scrollbar-hide">
                {(['Tudo', 'Tradicional', 'Gourmet', 'Doce'] as const).map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-8 py-3.5 border transition-all ${activeCategory === cat ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-neutral-500 border-neutral-900 hover:text-white hover:border-neutral-700'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredPizzas.map(pizza => (
                <div key={pizza.id} className="group relative bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-amber-500/50 transition-all duration-500">
                  <div className="h-56 sm:h-64 overflow-hidden relative cursor-pointer" onClick={() => openWhatsApp(`Olá! Gostaria de pedir uma pizza *${pizza.name}* (R$ ${pizza.price}).`)}>
                    <img src={pizza.image} alt={pizza.name} className="w-full h-full object-cover saturate-150 group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                      <Phone className="w-8 h-8 text-amber-500" />
                      <span className="text-white text-[10px] uppercase font-black tracking-widest px-4 py-1.5 border border-white/20">Pedir no WhatsApp</span>
                    </div>
                  </div>
                  <div className="p-5 sm:p-7">
                    <div className="flex justify-between items-start mb-3 gap-2">
                      <h3 className="text-lg sm:text-xl font-serif font-bold text-white group-hover:text-amber-500 transition-colors leading-tight flex-1">{pizza.name}</h3>
                      {/* Correção: whitespace-nowrap para impedir que R$ e valor se separem */}
                      <span className="text-amber-500 font-black text-sm whitespace-nowrap">R$ {pizza.price}</span>
                    </div>
                    <p className="text-neutral-500 text-xs sm:text-sm font-light leading-relaxed mb-6 h-12 overflow-hidden">{pizza.description}</p>
                    <div className="flex gap-2">
                      <button onClick={() => addToCart(pizza)} className="flex-1 py-3 border border-neutral-800 text-neutral-400 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Add à Cesta</button>
                      <button onClick={() => openWhatsApp(`Olá! Gostaria de pedir agora a pizza *${pizza.name}*.`)} className="flex-1 py-3 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all flex items-center justify-center gap-1">Pedir <ArrowRight className="w-3 h-3" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <KitchenVideo />

        {/* About */}
        <section id="sobre" className="py-24 sm:py-32 bg-neutral-900/40">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <img src="https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&q=80&w=800" className="w-full h-[400px] sm:h-[600px] object-cover shadow-2xl saturate-125 rounded-sm" alt="About" />
            <div>
              <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] mb-6 block">Tradição & Modernidade</span>
              <h2 className="text-4xl sm:text-6xl font-serif text-white mb-10 leading-tight">Excelência em Cada Detalhe.</h2>
              <p className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed mb-10">Tudo começa na seleção rigorosa dos ingredientes. Nossos pizzaiolos fundem a tradição milenar italiana com a sofisticação da alta gastronomia moderna paulistana.</p>
              <button onClick={() => openWhatsApp("Olá! Quero saber mais sobre a Bella Notte e sua história.")} className="bg-white text-black px-10 py-5 font-black uppercase tracking-widest text-[10px] hover:bg-amber-500 transition-colors active:scale-95 rounded-none">Falar com Concierge</button>
            </div>
          </div>
        </section>

        <ReviewsSection reviews={reviews} onAddReview={(r) => setReviews(prev => [r, ...prev])} />
      </main>

      {/* Cart Sidebar */}
      <div className={`fixed inset-0 z-[200] transition-opacity duration-500 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md" onClick={() => setIsCartOpen(false)}></div>
        <div className={`absolute top-0 right-0 w-full sm:max-w-md h-full bg-neutral-950 shadow-2xl transition-transform duration-500 border-l border-neutral-900 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-neutral-900 flex items-center justify-between">
              <h2 className="text-xl font-serif text-white font-bold uppercase">Sua Cesta</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-neutral-500 hover:text-white p-2"><X className="w-7 h-7" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? <p className="text-neutral-600 text-center py-20 italic">Sua cesta está vazia.</p> : cart.map(item => (
                <div key={item.id} className="flex gap-5 border-b border-neutral-900 pb-6">
                  <img src={item.image} className="w-20 h-20 object-cover saturate-150" alt={item.name} />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-serif text-white font-bold">{item.name}</h4>
                      <span className="text-amber-500 font-black text-sm whitespace-nowrap">R$ {item.price * item.quantity}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center border border-neutral-800">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-2 text-neutral-500 hover:text-white"><Minus className="w-3 h-3" /></button>
                        <span className="px-3 text-xs text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-2 text-neutral-500 hover:text-white"><Plus className="w-3 h-3" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="p-8 border-t border-neutral-900 bg-neutral-900/20 backdrop-blur-xl space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500 font-black uppercase text-[10px]">Total Geral</span>
                  <span className="text-3xl font-serif text-white font-bold whitespace-nowrap">R$ {cartTotal}</span>
                </div>
                <button onClick={checkoutWhatsApp} className="w-full bg-amber-500 text-black py-5 font-black uppercase text-xs flex items-center justify-center gap-2 active:scale-95 transition-all">Pedir via WhatsApp Business <Send className="w-4 h-4" /></button>
                <button onClick={payMercadoPago} className="w-full bg-blue-600 text-white py-4 font-black uppercase text-[10px] flex items-center justify-center gap-2 hover:bg-blue-500 transition-colors shadow-lg active:scale-95"><CreditCard className="w-4 h-4" /> Pagar com Mercado Pago</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer id="contato" className="bg-neutral-950 border-t border-neutral-900 pt-24 pb-32 sm:pb-12 text-center sm:text-left">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-8">
              <ChefHat className="text-amber-500 w-10 h-10" />
              <span className="text-3xl font-serif font-bold tracking-tighter text-white uppercase">BELLA <span className="text-amber-500">NOTTE</span></span>
            </div>
            <p className="text-neutral-500 max-w-sm mx-auto sm:mx-0 mb-10 leading-relaxed italic">"A verdadeira paixão por pizza, servida com cores e sabores vibrantes."</p>
          </div>
          <div>
            <h4 className="text-white font-serif text-xl mb-8 font-bold">Horário</h4>
            <div className="space-y-2 text-sm text-neutral-500">
              <p>Ter - Qui: 18:00 - 23:30</p>
              <p>Sex - Sáb: 18:00 - 01:00</p>
              <p>Domingo: 18:00 - 00:00</p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-serif text-xl mb-8 font-bold">Contato</h4>
            <p className="text-neutral-500 text-sm mb-4">Av. Paulista, 1000 - Jardins, SP</p>
            <button onClick={() => openWhatsApp("Olá! Preciso de ajuda com meu pedido.")} className="text-amber-500 text-[10px] font-black uppercase tracking-widest flex items-center justify-center sm:justify-start gap-3">WhatsApp Business <Phone className="w-3.5 h-3.5" /></button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 border-t border-neutral-900 pt-10 text-neutral-700 text-[9px] uppercase font-black tracking-widest text-center">© 2024 Bella Notte Pizzaria Gourmet - O Sabor da Excelência.</div>
      </footer>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-24 sm:bottom-8 right-6 sm:right-8 z-[100]">
        <button onClick={() => openWhatsApp("Olá! Gostaria de fazer um pedido imediato.")} className="bg-green-500 text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-3xl animate-pulse-custom active:scale-90 transition-transform" aria-label="WhatsApp Business"><Phone className="w-7 h-7 sm:w-8 sm:h-8 fill-current" /></button>
      </div>

      <AIChatAssistant onAddToCart={addToCart} onCheckout={checkoutWhatsApp} />

      {/* Mobile Sticky Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-900 p-4 z-[95] flex gap-3 shadow-2xl">
        <button onClick={() => setIsCartOpen(true)} className="flex-1 bg-neutral-900 text-white py-4 font-black uppercase tracking-widest text-[10px] border border-neutral-800">Cesta ({cart.reduce((acc, c) => acc + c.quantity, 0)})</button>
        <button onClick={() => openWhatsApp("Olá! Quero fazer meu pedido pelo site.")} className="flex-1 bg-amber-500 text-black py-4 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-amber-500/10">WhatsApp Pedido</button>
      </div>
    </div>
  );
}
