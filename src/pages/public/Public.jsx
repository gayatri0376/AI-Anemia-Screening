import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {Droplet} from 'lucide-react'
import {useApp} from '../../context/AppContext'
import {Disclaimer,Field} from '../../components/ui'
const Nav=()=><header className="pub"><Link to="/" style={{fontWeight:700,fontSize:19,color:'var(--n)',display:'flex',gap:6,alignItems:'center'}}><Droplet/>HemoCare AI</Link>
<nav>{[['/about','About'],['/how-it-works','How It Works'],['/education','Health Education'],['/login','Login']].map(([p,l])=><Link key={p} to={p}>{l}</Link>)}</nav></header>
const Foot=()=><footer className="sec" style={{textAlign:'center'}}><Disclaimer/><p>© 2026 HemoCare AI · College major project demo</p></footer>
const Cards=({items})=><div className="grid">{items.map(([t,d])=><div className="card" key={t}><h3 style={{fontSize:17}}>{t}</h3><p>{d}</p></div>)}</div>
const STEPS=[['Register','Create your free patient account.'],['Enter Health Information','Share symptoms and basic details.'],['Submit CBC Values','Add your lab report numbers.'],['AI Screening','A demo model estimates a risk indication.'],['View Result','See your report and next action.'],['Connect With Doctor','Book a consultation with a verified doctor.']]
const EDU=[['What is Anemia?','A condition where the body has fewer healthy red blood cells than usual.'],['Common Symptoms','Tiredness, weakness, dizziness, headache, pale skin, shortness of breath.'],['Possible Risk Factors','Diet, chronic conditions, blood loss, pregnancy, family history.'],['CBC Basics','A complete blood count measures hemoglobin, red cells, white cells and platelets.'],['When to Consult a Doctor','If symptoms persist or your lab values concern you, talk to a qualified doctor.']]
export function Landing(){return <><Nav/>
<section className="hero"><h1>HemoCare AI</h1><h3 style={{color:'#9fd3dc'}}>AI-Powered Anemia Screening & Connected Care</h3>
<p>Early Screening. Better Awareness. Connected Care. Get preliminary screening support and connect with doctors.</p>
<Link to="/register" className="btn" style={{background:'var(--t)'}}>Get Started</Link><Link to="/login" className="btn o">Login</Link></section>
<div className="sec"><Disclaimer/><h2 style={{marginTop:30}}>How HemoCare AI works</h2><Cards items={STEPS}/>
<h2 style={{marginTop:30}}>Key features</h2><Cards items={[['AI Screening','Preliminary risk indication from your inputs.'],['Doctor Consultation','Find and book verified doctors.'],['Reports','Keep every screening report in one place.'],['Health Education','Learn the basics in plain language.']]}/>
<h2 style={{marginTop:30}}>FAQ</h2><Cards items={[['Is this a diagnosis?','No. It is a demo screening and not a medical diagnosis.'],['Is my data real?','No. All data in this prototype is mock data.']]}/></div><Foot/></>}
export function Info({kind}){const T={about:['About HemoCare AI',[['The problem','Anemia often goes unnoticed because symptoms are subtle and lab reports are hard to read.'],['Our solution','A platform that screens early using health inputs and CBC values.'],['AI screening','A demo model returns a preliminary risk indication.'],['Doctor consultation','Users can share reports with doctors and book appointments.'],['Benefits','Awareness, faster follow-up and connected care.']]],how:['How It Works',STEPS.map(([a,b],i)=>['Step '+(i+1)+': '+a,b])],edu:['Health Education',EDU]}[kind]
return <><Nav/><div className="sec"><h1>{T[0]}</h1><Cards items={T[1]}/></div><Foot/></>}
export function Auth({reg}){const {login,notify}=useApp(),nav=useNavigate(),[role,setRole]=useState('patient')
const go=r=>{login(r);notify('Welcome to HemoCare AI demo');nav(`/${r}/dashboard`)}
return <><Nav/><div className="sec" style={{maxWidth:480}}><div className="card"><h2>{reg?'Create account':'Welcome back'}</h2>
<div className="f" style={{gridTemplateColumns:'1fr'}}>
{reg&&<Field label="Full Name" defaultValue="Demo User"/>}<Field label="Email" defaultValue="demo@hemocare.ai"/>
{reg&&<Field label="Phone" defaultValue="9876543210"/>}<Field label="Password" type="password" defaultValue="demo1234"/>
{reg&&<Field label="Confirm Password" type="password" defaultValue="demo1234"/>}
<div><label>Role</label><select value={role} onChange={e=>setRole(e.target.value)}><option value="patient">Patient</option><option value="doctor">Doctor</option><option value="admin">Admin</option></select></div>
<button className="btn" onClick={()=>go(role)}>{reg?'Register':'Login'}</button></div>
<p>Quick demo login:</p>{['patient','doctor','admin'].map(r=><button key={r} className="btn o s" onClick={()=>go(r)}>{r}</button>)}
<p><Link to={reg?'/login':'/register'} style={{color:'var(--b)'}}>{reg?'Have an account? Login':'New here? Register'}</Link></p></div></div></>}
