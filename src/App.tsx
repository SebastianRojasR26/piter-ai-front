import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUp, BookOpen, Check, ChevronRight, CircleHelp, FileText, Menu, MessageSquare, Plus, ShieldCheck, Sparkles, X } from 'lucide-react';
import { isMock, sendMessage } from './services/chat';
import { friendlyError } from './services/errors';
import type { MockScenario } from './services/mock';

const suggestions = [
  { icon: FileText, label: 'Declaración de renta', question: '¿Cómo preparo mi declaración de renta?' },
  { icon: BookOpen, label: 'RUT y responsabilidades', question: '¿Qué es el RUT y para qué sirve?' },
  { icon: CircleHelp, label: 'IVA sin complicaciones', question: '¿Cómo sé si debo cobrar IVA?' },
  { icon: ShieldCheck, label: 'Retención en la fuente', question: '¿Qué es la retención en la fuente?' },
];
function Disclaimer({ compact = false }: { compact?: boolean }) {
  return <p className={compact ? 'disclaimer compact' : 'disclaimer'}><ShieldCheck size={15} aria-hidden="true" /><span>Las respuestas son orientativas y no reemplazan a un contador o asesor tributario.</span></p>;
}
function Logo() { return <Link className="logo" to="/" aria-label="PiterAi, inicio"><img src="/brand/logo-horizontal-white.png" alt="PiterAi · Tu impulso Tributario" /></Link>; }
function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  return <header className="header"><div className="header-inner"><Logo /><button className="icon-button menu-toggle" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><nav id="navigation" className={open ? 'navigation open' : 'navigation'} aria-label="Navegación principal"><NavLink to="/" end>Inicio</NavLink><NavLink to="/chat">Asistente tributario</NavLink><Link className="button small" to="/chat">Hablemos <ArrowRight size={16}/></Link></nav></div></header>;
}
function Home() {
  useEffect(() => { document.title = 'PiterAi · Tu impulso Tributario'; }, []);
  return <><Header /><main className="home"><section className="hero container"><div className="hero-copy"><div className="eyebrow"><span className="dot" /> TU ALIADO TRIBUTARIO EN COLOMBIA</div><h1>Menos dudas.<br />Más <span>tranquilidad.</span></h1><p className="hero-description">Tus impuestos no tienen por qué ser un enredo. Conversa con PiterAi y encuentra un punto de partida claro para tus decisiones tributarias.</p><Link to="/chat" className="button">Resuelve tu primera duda <ArrowRight size={19}/></Link><p className="hero-note"><Check size={15}/> Sin formularios complicados. A tu ritmo.</p><div className="hero-topics"><span>Renta</span><span>IVA</span><span>RUT</span><span>Retenciones</span></div></div><div className="hero-visual"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="floating-label"><Sparkles size={15}/> La claridad empieza aquí</div><div className="preview-card"><div className="preview-header"><div className="assistant-icon"><img src="/brand/icon-light.png" alt=""/></div><div><strong>PiterAi</strong><span>Tu impulso Tributario</span></div><span className="preview-status"><span className="dot"/> Asistente</span></div><div className="preview-body"><p className="preview-user">¿Declarar renta significa que debo pagar?</p><div className="preview-answer"><Sparkles size={19}/><div><strong>Son dos cosas distintas.</strong><p>Presentar una declaración no significa necesariamente que tengas un impuesto a pagar.</p><p>Vamos paso a paso para entender tu situación.</p><span className="sample-tag">Ejemplo de conversación</span></div></div><Link to="/chat" className="preview-input">Escribe tu pregunta…<span><ArrowUp size={18}/></span></Link></div></div><div className="visual-caption"><ShieldCheck size={18}/><span>Preguntas reales.<br/><strong>Explicaciones que entiendes.</strong></span></div></div></section><div className="trust-strip"><div className="container"><span>Un impulso para cada paso</span><span><MessageSquare size={18}/> Lenguaje cercano</span><span><BookOpen size={18}/> Contexto colombiano</span><span><ShieldCheck size={18}/> Orientación responsable</span></div></div><section className="features container" id="funciones"><div className="section-heading"><div><p className="eyebrow">CLARIDAD PARA TU DÍA A DÍA</p><h2>Un tema complejo.<br/>Una conversación sencilla.</h2></div><p>Desde esa primera pregunta hasta entender qué necesitas revisar con tu contador.</p></div><div className="feature-grid">{[{ icon: MessageSquare, number: '01', title: 'Pregunta como hablas', text: 'No necesitas conocer el término exacto. Cuéntanos tu duda con tus propias palabras.' }, { icon: BookOpen, number: '02', title: 'Entiende el siguiente paso', text: 'Explora conceptos tributarios y organiza la información que necesitas para tu caso.' }, { icon: ShieldCheck, number: '03', title: 'Decide con más contexto', text: 'Llega mejor preparado a una conversación con tu contador o asesor tributario.' }].map(({icon: Icon, number, title, text}) => <article className="feature-card" key={number}><div className="feature-top"><Icon size={25}/><span>{number}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div></section><section className="how container"><div><p className="eyebrow">ASÍ DE SENCILLO</p><h2>Tu próxima respuesta<br/>empieza con una pregunta.</h2></div><ol>{['Abre el asistente y escribe tu duda.', 'Añade contexto para orientar la conversación.', 'Revisa la orientación con un profesional.'].map((text, index) => <li key={text}><span>{index + 1}</span>{text}</li>)}</ol></section><section className="cta container"><div><span className="eyebrow">TU IMPULSO TRIBUTARIO</span><h2>Hagamos más claras tus dudas.</h2><p>PiterAi te acompaña a dar el primer paso.</p></div><Link to="/chat" className="button">Conversar con PiterAi <ArrowRight size={19}/></Link></section><div className="container home-disclaimer"><Disclaimer /></div></main><footer className="footer container"><Logo/><span>Hecho para conversar. Pensado para Colombia.</span><span>© {new Date().getFullYear()} PiterAi</span></footer></>;
}
type Message = { id: string; role: 'user' | 'assistant'; content: string };
type ChatStatus = 'idle' | 'loading' | 'typing' | 'error';
function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState<ChatStatus>('idle');
  const [error, setError] = useState('');
  const [scenario, setScenario] = useState<MockScenario>('normal');
  const [sidebar, setSidebar] = useState(false);
  const conversation = useRef<string | null>(null);
  const lastQuestion = useRef('');
  const controller = useRef<AbortController | null>(null);
  const generation = useRef(0);
  const typingTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const busy = status === 'loading' || status === 'typing';
  useEffect(() => { document.title = 'Asistente tributario · PiterAi'; return () => { generation.current++; controller.current?.abort(); if (typingTimer.current) clearInterval(typingTimer.current); }; }, []);
  useEffect(() => { bottom.current?.scrollIntoView({ behavior: 'instant', block: 'end' }); }, [messages, status]);
  function reset() {
    generation.current++; controller.current?.abort(); if (typingTimer.current) clearInterval(typingTimer.current);
    setMessages([]); setDraft(''); setStatus('idle'); setError(''); conversation.current = null; lastQuestion.current = ''; setSidebar(false); input.current?.focus();
  }
  async function submit(question: string, retry = false) {
    const text = question.trim();
    if (!text || text.length > 4000 || busy || (status === 'error' && !retry)) return;
    const current = ++generation.current;
    controller.current?.abort(); controller.current = new AbortController();
    lastQuestion.current = text;
    if (!retry) { setMessages(prev => [...prev, { id: crypto.randomUUID(), role: 'user', content: text }]); setDraft(''); }
    setError(''); setStatus('loading'); setSidebar(false);
    try {
      const result = await sendMessage({ message: text, conversation_id: conversation.current }, scenario, controller.current.signal);
      if (current !== generation.current) return;
      conversation.current = result.conversation_id;
      const id = crypto.randomUUID();
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setMessages(prev => [...prev, { id, role: 'assistant', content: reduced ? result.reply : '' }]);
      if (reduced) { setStatus('idle'); return; }
      setStatus('typing'); let position = 0;
      typingTimer.current = setInterval(() => {
        position = Math.min(position + 12, result.reply.length);
        setMessages(prev => prev.map(message => message.id === id ? { ...message, content: result.reply.slice(0, position) } : message));
        if (position === result.reply.length) { if (typingTimer.current) clearInterval(typingTimer.current); typingTimer.current = null; setStatus('idle'); }
      }, 20);
    } catch (err) { if (current !== generation.current) return; setError(friendlyError(err)); setStatus('error'); }
  }
  return <div className="chat-shell"><aside className={sidebar ? 'sidebar visible' : 'sidebar'}><div className="sidebar-brand"><Logo/><button className="icon-button sidebar-close" onClick={() => setSidebar(false)} aria-label="Cerrar menú"><X/></button></div><button className="new-chat" onClick={reset}><Plus size={19}/> Nueva conversación</button><p className="sidebar-label">TU ESPACIO TRIBUTARIO</p><div className="sidebar-active"><MessageSquare size={18}/> Asistente PiterAi <ChevronRight size={15}/></div><div className="sidebar-help"><div className="help-icon"><BookOpen size={23}/></div><h3>Una duda a la vez.</h3><p>Comienza con una pregunta. Te ayudamos a darle claridad.</p><Link to="/">Conoce PiterAi <ArrowRight size={15}/></Link></div><div className="sidebar-bottom"><ShieldCheck size={18}/><p>Comparte tu contexto,<br/><strong>protege tus datos personales.</strong></p></div></aside>{sidebar && <button className="sidebar-overlay" onClick={() => setSidebar(false)} aria-label="Cerrar menú lateral"/>}<div className="chat-main"><header className="chat-header"><div><button className="icon-button chat-menu" aria-label="Abrir menú" aria-expanded={sidebar} onClick={() => setSidebar(true)}><Menu size={21}/></button><span className="chat-title">Asistente tributario</span><span className="colombia">Colombia</span></div><div className="mode-badge"><span className="dot"/>{isMock ? 'Modo demostración' : 'Servicio conectado'}</div></header><main className="chat-content" id="conversation" aria-label="Conversación con PiterAi">{messages.length === 0 ? <div className="welcome"><div className="welcome-icon"><img src="/brand/icon-light.png" alt=""/></div><p className="eyebrow">TU IMPULSO TRIBUTARIO</p><h1>Hola, soy PiterAi.<br/><span>¿Qué duda resolvemos hoy?</span></h1><p className="welcome-description">Hablemos de tus impuestos, sin enredos.<br/>Elige una idea o escribe tu propia pregunta.</p><div className="suggestions">{suggestions.map(({icon: Icon, label, question}) => <button key={label} onClick={() => void submit(question)} disabled={busy}><Icon size={20}/><strong>{label}</strong><span>{question}</span><ArrowRight size={16}/></button>)}</div><p className="welcome-footnote"><ShieldCheck size={14}/> Evita compartir documentos, contraseñas o datos sensibles.</p></div> : <div className="messages">{messages.map(message => <article key={message.id} className={`message ${message.role}`} aria-label={message.role === 'user' ? 'Tu pregunta' : 'Respuesta de PiterAi'}>{message.role === 'assistant' && <div className="message-avatar"><img src="/brand/icon-light.png" alt=""/></div>}<div className="message-body"><span className="message-author">{message.role === 'user' ? 'Tú' : 'PiterAi'}</span><p>{message.content}{message.role === 'assistant' && status === 'typing' && message.id === messages.at(-1)?.id && <span className="typing-cursor" aria-hidden="true"/>}</p></div></article>)}{status === 'loading' && <div className="loading" role="status"><Sparkles size={18}/><span>PiterAi está preparando tu respuesta</span><span className="loading-dots" aria-hidden="true">•••</span></div>}{status === 'error' && <div className="error-card" role="alert"><strong>No pudimos responder esta vez</strong><p>{error}</p><button onClick={() => void submit(lastQuestion.current, true)}>Reintentar pregunta <ArrowRight size={15}/></button><button className="discard-error" onClick={() => { setStatus('idle'); setError(''); input.current?.focus(); }}>Escribir otra pregunta</button></div>}<div ref={bottom}/></div>}</main><div className="composer-area">{isMock && <details className="mock-controls"><summary>Controles de demostración</summary><label htmlFor="mock-scenario">Próxima respuesta</label><select id="mock-scenario" value={scenario} disabled={busy} onChange={event => setScenario(event.target.value as MockScenario)}><option value="normal">Normal</option><option value="network">Error de red</option><option value="timeout">Timeout</option>{['400','401','429','500','503'].map(code => <option value={code} key={code}>Error HTTP {code}</option>)}</select><p>Para reintentar con éxito, selecciona «Normal».</p></details>}<form className="composer" onSubmit={event => { event.preventDefault(); void submit(draft); }}><label className="sr-only" htmlFor="question">Tu pregunta tributaria</label><textarea id="question" ref={input} value={draft} onChange={event => setDraft(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); void submit(draft); } }} placeholder="Escribe tu pregunta tributaria…" rows={2} maxLength={4000} disabled={busy || status === 'error'}/><div className="composer-bottom"><span>{busy ? 'Preparando tu respuesta…' : status === 'error' ? 'Reintenta o elige escribir otra pregunta' : 'Enter para enviar · Shift + Enter para un salto'} {draft.length > 3500 && `· ${draft.length}/4000`}</span><button type="submit" aria-label="Enviar pregunta" disabled={!draft.trim() || busy || status === 'error'}><ArrowUp size={21}/></button></div></form><Disclaimer compact/><div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{status === 'loading' ? 'Preparando respuesta.' : status === 'idle' && messages.at(-1)?.role === 'assistant' ? messages.at(-1)?.content : ''}</div></div></div></div>;
}
export default function App() { return <><a href="#main-content" className="skip-link">Saltar al contenido</a><div id="main-content" tabIndex={-1}><Routes><Route path="/" element={<Home/>}/><Route path="/chat" element={<Chat/>}/><Route path="*" element={<><Header/><main className="not-found container"><h1>No encontramos esta página.</h1><p>Podemos empezar con una conversación.</p><Link className="button" to="/chat">Ir al asistente <ArrowRight size={18}/></Link></main></>}/></Routes></div></>; }
