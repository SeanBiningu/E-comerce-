import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { supabase } from './lib/supabase';

const categories = [
  ['jeans', 'Jeans', 'https://images.unsplash.com/photo-1542272604-787c3835534?auto=format&fit=crop&w=900&q=85'],
  ['bottoms-shorts', 'Bottoms & Shorts', 'https://images.unsplash.com/photo-1627225924765-552d49cf47ad?auto=format&fit=crop&w=900&q=85'],
  ['tops', 'T-Shirts & Shirts', 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=85'],
  ['formal-trousers', 'Formal Trousers', 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=900&q=85'],
  ['hats', 'Caps & Bucket Hats', 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85'],
  ['tracksuits-jackets', 'Tracksuits & Jackets', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85'],
  ['footwear', 'Slides & Sneakers', 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85'],
];

const womensCategories = [
  ['womens-jeans', 'Jeans', 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85'],
  ['skirts', 'Skirts', 'https://images.unsplash.com/photo-1582142407894-ec85a1260a46?auto=format&fit=crop&w=900&q=85'],
  ['dresses', 'Dresses', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85'],
  ['blouses', 'Blouses', 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85'],
  ['ladies-suits', 'Ladies Suits', 'https://images.unsplash.com/photo-1588661601676-e91b61cc08b3?auto=format&fit=crop&w=900&q=85'],
  ['womens-tops', 'Tops', 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=85'],
  ['handbags', 'Handbags', 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=900&q=85'],
  ['heels', 'Heels', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85'],
  ['womens-sneakers', 'Sneakers', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=85'],
  ['pumps', 'Pumps', 'https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=900&q=85'],
];

function Logo() { return <Link to="/" className="brand-mark"><span>53</span><i className="ml-0.5 font-normal text-rust">133 | 134</i><small>XCLUSIVE</small></Link> }
function ProfileIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[17px] w-[17px] fill-none stroke-current stroke-[1.8]"><circle cx="12" cy="8" r="3.25"/><path d="M5.5 20c.7-3.25 3.1-5 6.5-5s5.8 1.75 6.5 5"/></svg> }
function Header({ onSearch, isWomens }) { return <div className="fixed inset-x-0 top-0 z-50 shadow-[0_5px_22px_rgba(23,23,22,.13)]"><div className="flex h-9 items-center justify-center bg-ink px-4 text-center font-mono text-[9px] tracking-[.12em] text-paper sm:text-[10px]">FREE DELIVERY ON ORDERS OVER £80 <span className="mx-3 text-tan">•</span> SHOP NOW, PAY LATER WITH CLEARPAY</div><header className="flex h-24 items-center justify-between border-b border-ink/10 bg-nav/95 px-[5.5vw] backdrop-blur-md"><Logo/><nav className="hidden items-center gap-9 font-mono text-[10px] uppercase tracking-[.12em] md:flex"><NavLink className="nav-link" to={isWomens ? "/womens" : "/mens"} end>New in</NavLink><NavLink className="nav-link" to="/shop">Shop</NavLink><NavLink className="nav-link" to="/about">Our story</NavLink></nav><div className="flex items-center gap-2 font-mono text-[11px] sm:gap-4"><button onClick={onSearch} className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-xl transition hover:border-rust hover:text-rust" aria-label="Search products">⌕</button><Link to="/account" className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 transition hover:border-rust hover:text-rust" aria-label="Account"><ProfileIcon/></Link><Link className="ml-1 rounded-full border border-ink/15 px-3 py-2 transition hover:border-rust" to="/bag">BAG <b className="font-normal text-rust">0</b></Link></div></header></div> }
function SearchPanel({ onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const normalizedQuery = query.trim().toLowerCase();
  const results = categories.filter(([slug, name]) => `${slug} ${name}`.toLowerCase().includes(normalizedQuery));
  function choose(slug) { navigate(`/shop/${slug}`); onClose(); }
  return <div className="fixed inset-0 z-[60] bg-ink/55 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label="Search clothing"><div className="mx-auto mt-20 max-w-2xl bg-paper p-6 shadow-2xl sm:p-9"><div className="flex items-center justify-between"><p className="font-mono text-[10px] uppercase tracking-[.13em] text-rust">Find your next piece</p><button onClick={onClose} className="font-mono text-xs tracking-[.1em]" aria-label="Close search">CLOSE ×</button></div><label className="mt-7 block"><span className="sr-only">Search clothes</span><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search jeans, shirts, sneakers..." className="w-full border-b-2 border-ink bg-transparent py-4 text-2xl font-semibold outline-none placeholder:text-ink/35 focus:border-rust sm:text-3xl"/></label><div className="mt-7"><p className="font-mono text-[10px] uppercase tracking-[.1em] text-ink/55">{normalizedQuery ? `${results.length} matching collections` : 'Popular collections'}</p><div className="mt-3 grid gap-2 sm:grid-cols-2">{results.map(([slug, name])=><button key={slug} onClick={()=>choose(slug)} className="flex items-center justify-between border border-tan px-4 py-4 text-left font-semibold transition hover:border-rust hover:bg-tan/40"><span>{name}</span><span className="text-rust">→</span></button>)}</div>{normalizedQuery && !results.length && <p className="mt-5 text-sm text-ink/65">No collection matches “{query}”. Try jeans, shirts, hats, jackets, or sneakers.</p>}</div></div></div>;
}
function Footer() { return <footer className="flex items-end justify-between bg-ink px-[5.5vw] py-14 text-paper"><Logo/><p className="hidden font-mono text-[9px] tracking-[.08em] md:block">© 2026 53:133 / 53:134. ALL RIGHTS RESERVED.</p><div className="flex gap-5 font-mono text-[9px] tracking-[.08em]"><a href="https://instagram.com">INSTAGRAM</a><Link to="/admin">ADMIN</Link><Link to="/about">CONTACT</Link></div></footer> }
function Home() { return <><section className="relative min-h-[570px] h-[calc(100vh-132px)] overflow-hidden text-paper"><img className="absolute inset-0 h-full w-full object-cover brightness-[.72]" src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1800&q=90" alt="Menswear collection"/><div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"/><div className="absolute left-[9vw] top-1/2 -translate-y-1/2"><p className="mb-5 font-mono text-[10px] uppercase tracking-[.13em]">The new collection</p><h1 className="font-bold leading-[.86] tracking-[-.08em] text-[clamp(56px,7.5vw,112px)]">THE STANDARD<br/>IS <em className="font-serif font-medium">YOURS.</em></h1><p className="my-7 text-sm">Elevated essentials for every version of you.</p><Link className="inline-flex items-center gap-7 bg-paper px-5 py-4 font-mono text-[10px] tracking-[.08em] text-ink" to="/shop">SHOP NEW IN <span className="text-lg">→</span></Link></div></section><CategoryGrid categories={categories} title="YOUR UNIFORM." /><section className="grid min-h-[630px] md:grid-cols-[1.15fr_.85fr]"><img className="h-[450px] w-full object-cover md:h-full" src="https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=1000&q=85" alt="Menswear style"/><div className="self-center bg-rust px-[8vw] py-20"><p className="mb-5 font-mono text-[10px] uppercase tracking-[.13em]">Made for the everyday</p><h2 className="font-bold leading-[.86] tracking-[-.08em] text-[clamp(52px,6vw,92px)]">BUILT TO<br/><em className="font-serif font-medium">MOVE.</em></h2><p className="my-7 max-w-sm text-sm leading-7">From the first coffee to after-hours, our pieces are designed around your life — cut right and made to last.</p><Link className="inline-flex items-center gap-7 bg-ink px-5 py-4 font-mono text-[10px] tracking-[.08em] text-paper" to="/shop">DISCOVER THE DROP <span className="text-lg">→</span></Link></div></section></> }
function WomensHome() { return <><section className="relative min-h-[570px] h-[calc(100vh-132px)] overflow-hidden text-paper"><img className="absolute inset-0 h-full w-full object-cover brightness-[.72]" src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=90" alt="Womenswear collection"/><div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"/><div className="absolute left-[9vw] top-1/2 -translate-y-1/2"><p className="mb-5 font-mono text-[10px] uppercase tracking-[.13em]">Eunique Fashion Xclusive</p><h1 className="font-bold leading-[.86] tracking-[-.08em] text-[clamp(56px,7.5vw,112px)]">SHOP <br/> <em className="font-serif font-medium">53:134</em></h1><p className="my-7 text-sm">Ladies shop for every occasion.</p><Link className="inline-flex items-center gap-7 bg-paper px-5 py-4 font-mono text-[10px] tracking-[.08em] text-ink" to="/shop">SHOP WOMENS <span className="text-lg">→</span></Link></div></section><CategoryGrid categories={womensCategories} title="YOUR STYLE." /><section className="grid min-h-[630px] md:grid-cols-[1.15fr_.85fr]"><img className="h-[450px] w-full object-cover md:h-full" src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85" alt="Womenswear style"/><div className="self-center bg-tan px-[8vw] py-20 text-ink"><p className="mb-5 font-mono text-[10px] uppercase tracking-[.13em]">Elegant & Trendy</p><h2 className="font-bold leading-[.86] tracking-[-.08em] text-[clamp(52px,6vw,92px)]">OWN THE<br/><em className="font-serif font-medium">ROOM.</em></h2><p className="my-7 max-w-sm text-sm leading-7">Find the perfect Jeans, Skirts, Dresses, Blouses, Ladies Suits with skirts, tops, Handbags, Heels, Sneakers, Slopes, and pumps to stand out.</p><Link className="inline-flex items-center gap-7 bg-ink px-5 py-4 font-mono text-[10px] tracking-[.08em] text-paper" to="/shop">EXPLORE COLLECTION <span className="text-lg">→</span></Link></div></section></> }
function CategoryGrid({ categories, title = "YOUR UNIFORM." }){return <section className="bg-paper px-[5.5vw] py-28 md:py-32"><div className="flex justify-between"><p className="font-mono text-[10px] uppercase tracking-[.13em]">Shop by category</p><Link to="/shop" className="hidden border-b border-ink pb-2 font-mono text-[10px] tracking-[.08em] md:block">VIEW ALL COLLECTIONS →</Link></div><h2 className="mb-12 mt-5 font-bold leading-[.86] tracking-[-.08em] text-[clamp(54px,7vw,105px)]" dangerouslySetInnerHTML={{__html: title.replace(/(.*?\b)/, '$1<em className="font-serif font-medium">').replace(/\b$/, '</em>')}}></h2><div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">{categories.map(([slug,name,img],i)=><Link key={slug} to={`/shop/${slug}`} className={`category-card group h-80 text-white md:h-[455px] ${i>3?'md:mt-4':''} ${i===6?'md:col-span-2':''}`}><img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={img} alt={name}/><div className="absolute bottom-5 left-5 z-10"><span className="font-mono text-[9px] tracking-[.08em]">0{i+1}</span><h3 className="my-2 text-xl font-bold tracking-[-.05em]">{name}</h3><b className="font-mono text-[9px] font-normal tracking-[.08em]">EXPLORE →</b></div></Link>)}</div></section>}
function Shop(){return <section className="bg-paper px-[5.5vw] py-20"><p className="font-mono text-[10px] uppercase tracking-[.13em]">All categories</p><h1 className="mt-4 font-bold leading-none tracking-[-.08em] text-[clamp(56px,9vw,128px)]">SHOP <em className="font-serif font-medium">THE DROP.</em></h1><div className="mt-16 grid gap-px bg-tan sm:grid-cols-2 lg:grid-cols-3">{[...categories, ...womensCategories].map(([slug,name,img])=><Link to={`/shop/${slug}`} key={slug} className="group bg-paper p-5"><img className="h-96 w-full object-cover transition group-hover:opacity-80" src={img} alt={name}/><div className="flex items-center justify-between pt-5"><h2 className="text-xl font-bold tracking-[-.05em]">{name}</h2><span>→</span></div></Link>)}</div></section>}
function ProductCategory(){return <section className="bg-paper px-[5.5vw] py-20"><Link className="font-mono text-[10px] tracking-[.1em]" to="/shop">← ALL COLLECTIONS</Link><h1 className="mt-8 font-bold tracking-[-.08em] text-[clamp(52px,8vw,110px)]">COLLECTION <em className="font-serif font-medium">COMING SOON.</em></h1><p className="mt-7 max-w-md text-sm leading-7">This collection is being curated. Connect Supabase to manage live product inventory, prices and product photography.</p></section>}
function About(){return <section className="min-h-[620px] bg-tan px-[8vw] py-32"><p className="font-mono text-[10px] uppercase tracking-[.13em]">53:133 / 53:134</p><h1 className="mt-5 font-bold leading-[.87] tracking-[-.08em] text-[clamp(52px,7vw,105px)]">NOT JUST WHAT<br/>YOU WEAR. <em className="font-serif font-medium">HOW<br/>YOU ARRIVE.</em></h1><p className="mt-16 max-w-xs text-sm leading-7">Independent menswear and exclusive womenswear for those who set their own pace.</p></section>}
function LoginScreen({ onGuest }) {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [mode, setMode] = useState('signin'); const [message, setMessage] = useState(''); const [loading, setLoading] = useState(false);
  async function submit(e) { e.preventDefault(); if (!supabase) return setMessage('Account sign-in is unavailable until valid Supabase credentials are configured.'); setLoading(true); setMessage(''); const { error } = mode === 'signin' ? await supabase.auth.signInWithPassword({email,password}) : await supabase.auth.signUp({email,password}); setLoading(false); if (error) return setMessage(error.message); if (mode === 'signup') return setMessage('Account created. Check your email to confirm your account, then sign in.'); }
  return <div className="grid min-h-screen place-items-center bg-tan p-6"><div className="w-full max-w-md bg-paper p-8 shadow-2xl"><p className="font-mono text-[10px] uppercase tracking-[.13em] text-rust">Exclusive Fashion Wear</p><h1 className="mt-3 text-5xl font-bold tracking-[-.07em]">{mode === 'signin' ? <>SIGN<br/><em className="font-serif font-medium">IN.</em></> : <>CREATE<br/><em className="font-serif font-medium">ACCOUNT.</em></>}</h1><form onSubmit={submit} className="mt-10 space-y-4"><input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="EMAIL ADDRESS" required className="w-full border border-ink bg-transparent p-4 font-mono text-xs outline-none focus:border-rust"/><input value={password} onChange={e=>setPassword(e.target.value)} type="password" minLength="6" placeholder="PASSWORD" required className="w-full border border-ink bg-transparent p-4 font-mono text-xs outline-none focus:border-rust"/><button disabled={loading} className="w-full bg-ink p-4 font-mono text-[10px] tracking-[.1em] text-paper disabled:opacity-60">{loading ? 'PLEASE WAIT...' : mode === 'signin' ? 'SIGN IN →' : 'CREATE ACCOUNT →'}</button><button type="button" onClick={onGuest} className="w-full border border-ink p-4 font-mono text-[10px] tracking-[.1em] text-ink transition hover:bg-ink hover:text-paper">CONTINUE AS GUEST →</button></form>{message && <p className="mt-4 font-mono text-xs text-rust">{message}</p>}<button onClick={()=>{setMode(mode === 'signin' ? 'signup' : 'signin');setMessage('')}} className="mt-6 font-mono text-[10px] tracking-[.08em] underline">{mode === 'signin' ? 'NEW HERE? CREATE AN ACCOUNT' : 'ALREADY HAVE AN ACCOUNT? SIGN IN'}</button></div></div>;
}

function Account() {
  const [user, setUser] = useState(null);
  useEffect(()=>{ if (!supabase) return; supabase.auth.getSession().then(({data})=>setUser(data.session?.user || null)); }, []);
  return <section className="min-h-[570px] bg-tan px-[6vw] py-24"><div className="mx-auto max-w-md"><p className="font-mono text-[10px] uppercase tracking-[.13em] text-rust">Your account</p><h1 className="mt-3 text-5xl font-bold tracking-[-.07em]">WELCOME<br/><em className="font-serif font-medium">BACK.</em></h1><p className="mt-8 text-sm">Signed in as {user ? user.email : 'Guest'}</p>{supabase && <button onClick={async()=>{await supabase.auth.signOut();}} className="mt-8 bg-ink px-5 py-4 font-mono text-[10px] tracking-[.1em] text-paper">SIGN OUT</button>}</div></section>;
}
function AdminLogin({onAdmin}) {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [message, setMessage] = useState(''); const [loading, setLoading] = useState(false);
  async function signIn(e) { e.preventDefault(); if (!supabase) return setMessage('Add your Supabase credentials to .env first.'); setLoading(true); const { error } = await supabase.auth.signInWithPassword({ email, password }); setLoading(false); if (error) setMessage(error.message); else onAdmin(); }
  return <section className="min-h-[570px] bg-tan px-[6vw] py-24"><div className="mx-auto max-w-md"><p className="font-mono text-[10px] uppercase tracking-[.13em]">Restricted access</p><h1 className="mt-3 font-bold tracking-[-.07em] text-6xl">OWNER<br/><em className="font-serif font-medium">LOGIN.</em></h1><form onSubmit={signIn} className="mt-10 space-y-4"><input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="EMAIL ADDRESS" required className="w-full border border-ink bg-transparent p-4 font-mono text-xs outline-none focus:border-rust"/><input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="PASSWORD" required className="w-full border border-ink bg-transparent p-4 font-mono text-xs outline-none focus:border-rust"/><button disabled={loading} className="w-full bg-ink p-4 font-mono text-[10px] tracking-[.1em] text-paper disabled:opacity-60">{loading ? 'SIGNING IN...' : 'SIGN IN →'}</button>{message && <p className="font-mono text-xs text-rust">{message}</p>}</form></div></section>
}
function AdminDashboard({onSignOut}) {
  const [products, setProducts] = useState([]); const [message, setMessage] = useState(''); const [form, setForm] = useState({ name:'', slug:'', price:'', image_url:'', category_id:'' });
  async function loadProducts() { const { data, error } = await supabase.from('products').select('id,name,slug,price,image_url,categories(name)').order('created_at', { ascending:false }); if(error) setMessage(error.message); else setProducts(data || []); }
  useEffect(()=>{ loadProducts(); }, []);
  async function addProduct(e) { e.preventDefault(); const { error } = await supabase.from('products').insert([{ ...form, price:Number(form.price), category_id: form.category_id || null }]); if(error) return setMessage(error.message); setForm({name:'',slug:'',price:'',image_url:'',category_id:''}); setMessage('Product added.'); loadProducts(); }
  async function removeProduct(id) { if (!window.confirm('Remove this product?')) return; const { error } = await supabase.from('products').delete().eq('id',id); if(error) setMessage(error.message); else { setMessage('Product removed.'); loadProducts(); } }
  return <section className="min-h-[650px] bg-paper px-[5.5vw] py-16"><div className="flex items-end justify-between border-b border-tan pb-8"><div><p className="font-mono text-[10px] uppercase tracking-[.13em] text-rust">Authenticated owner</p><h1 className="mt-2 text-5xl font-bold tracking-[-.07em]">ADMIN <em className="font-serif font-medium">DASHBOARD.</em></h1></div><button onClick={onSignOut} className="font-mono text-[10px] tracking-[.1em] underline">SIGN OUT</button></div><div className="mt-12 grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><form onSubmit={addProduct} className="h-fit bg-tan p-7"><h2 className="text-2xl font-bold tracking-[-.05em]">ADD PRODUCT</h2><div className="mt-6 space-y-3">{[['name','Product name'],['slug','product-slug'],['price','Price e.g. 49.99'],['image_url','Image URL']].map(([key,label])=><input required={key !== 'image_url'} key={key} type={key==='price'?'number':'text'} step={key==='price'?'0.01':undefined} placeholder={label} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} className="w-full border border-ink/30 bg-paper p-3 font-mono text-xs outline-none focus:border-rust"/>)}<select value={form.category_id} onChange={e=>setForm({...form,category_id:e.target.value})} className="w-full border border-ink/30 bg-paper p-3 font-mono text-xs"><option value="">Category (optional)</option></select><button className="w-full bg-ink p-4 font-mono text-[10px] tracking-[.1em] text-paper">ADD TO STORE →</button></div></form><div><div className="mb-5 flex items-center justify-between"><h2 className="text-2xl font-bold tracking-[-.05em]">PRODUCTS</h2><span className="font-mono text-[10px] text-rust">{products.length} LIVE</span></div><div className="space-y-2">{products.map(product=><article key={product.id} className="flex items-center justify-between border border-tan p-3"><div className="flex items-center gap-4">{product.image_url && <img className="h-14 w-12 object-cover" src={product.image_url} alt=""/>}<div><h3 className="font-bold">{product.name}</h3><p className="font-mono text-[10px] text-ink/60">£{Number(product.price).toFixed(2)} · {product.slug}</p></div></div><button onClick={()=>removeProduct(product.id)} className="font-mono text-[10px] tracking-[.08em] text-rust">REMOVE</button></article>)}{!products.length && <p className="border border-dashed border-tan p-8 font-mono text-xs text-ink/60">No products yet. Add your first item.</p>}</div>{message && <p className="mt-4 font-mono text-xs text-rust">{message}</p>}</div></div></section>
}
function Admin() { const [state, setState] = useState('loading'); async function checkAdmin(){ if (!supabase) return setState('login'); const { data:{session} } = await supabase.auth.getSession(); if(!session) return setState('login'); const { data } = await supabase.from('profiles').select('role').eq('id',session.user.id).maybeSingle(); setState(data?.role === 'admin' ? 'admin' : 'denied'); } useEffect(()=>{checkAdmin();},[]); if(state==='loading') return <section className="min-h-[500px] bg-paper p-20 font-mono text-xs">CHECKING ACCESS...</section>; if(state==='admin') return <AdminDashboard onSignOut={async()=>{await supabase.auth.signOut();setState('login')}}/>; if(state==='denied') return <section className="min-h-[500px] bg-paper p-20"><h1 className="text-5xl font-bold">ACCESS DENIED.</h1><p className="mt-5 max-w-md">This account is not an administrator. Ask the store owner to assign the admin role through Supabase.</p></section>; return <AdminLogin onAdmin={checkAdmin}/> }
function MainLayout({ children, isWomens }) {
  const [searchOpen, setSearchOpen] = useState(false);
  return <div>
    <Header onSearch={()=>setSearchOpen(true)} isWomens={isWomens} />
    <main className="pt-[132px]">{children}</main>
    <Footer/>
    {searchOpen && <SearchPanel onClose={()=>setSearchOpen(false)}/>}
  </div>;
}

function Landing() {
  return (
    <div className="flex h-screen w-full flex-col md:flex-row">
      <Link to="/mens" className="group relative flex h-1/2 w-full flex-col items-center justify-center overflow-hidden bg-ink text-paper md:h-full md:w-1/2">
        <img className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-700 group-hover:scale-105 group-hover:opacity-70" src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=900&q=80" alt="Menswear"/>
        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="text-4xl font-bold tracking-[-.05em] sm:text-5xl md:text-6xl">53:133</h2>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[.15em] sm:text-xs">Man's Exclusive Menswear</p>
          <span className="mt-6 border border-paper px-6 py-3 font-mono text-[10px] tracking-[.1em] transition group-hover:bg-paper group-hover:text-ink">SHOP MENS →</span>
        </div>
      </Link>
      <Link to="/womens" className="group relative flex h-1/2 w-full flex-col items-center justify-center overflow-hidden bg-tan text-ink md:h-full md:w-1/2">
        <img className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-700 group-hover:scale-105 group-hover:opacity-70" src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80" alt="Womenswear"/>
        <div className="relative z-10 flex flex-col items-center text-center">
          <h2 className="text-4xl font-bold tracking-[-.05em] sm:text-5xl md:text-6xl">53:134</h2>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[.15em] sm:text-xs">Eunique Fashion Xclusive</p>
          <span className="mt-6 border border-ink px-6 py-3 font-mono text-[10px] tracking-[.1em] transition group-hover:bg-ink group-hover:text-tan">SHOP WOMENS →</span>
        </div>
      </Link>
    </div>
  );
}

function AuthGate({ children }) {
  const [sessionUser, setSessionUser] = useState(undefined);
  const [guest, setGuest] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setSessionUser(null);
      return;
    }
    supabase.auth.getSession().then(({data}) => setSessionUser(data.session?.user || null));
    const { data: subscriptionData } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionUser(session?.user || null);
    });
    return () => {
      if (subscriptionData?.subscription) {
        subscriptionData.subscription.unsubscribe();
      }
    };
  }, []);

  if (sessionUser === undefined) return <div className="grid h-screen place-items-center bg-paper font-mono text-xs">LOADING...</div>;
  if (!sessionUser && !guest) return <LoginScreen onGuest={()=>setGuest(true)} />;

  return <>{children}</>;
}

function App(){
  return (
    <AuthGate>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/mens" element={<MainLayout><Home/></MainLayout>}/>
        <Route path="/womens" element={<MainLayout isWomens><WomensHome/></MainLayout>}/>
        <Route path="/shop" element={<MainLayout><Shop/></MainLayout>}/>
        <Route path="/shop/:category" element={<MainLayout><ProductCategory/></MainLayout>}/>
        <Route path="/about" element={<MainLayout><About/></MainLayout>}/>
        <Route path="/account" element={<MainLayout><Account/></MainLayout>}/>
        <Route path="/admin" element={<MainLayout><Admin/></MainLayout>}/>
        <Route path="*" element={<MainLayout><Home/></MainLayout>}/>
      </Routes>
    </AuthGate>
  );
}
export default App;
