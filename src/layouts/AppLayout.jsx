import {useState} from 'react'
import {NavLink,Outlet,Navigate,Link} from 'react-router-dom'
import {LayoutDashboard,ClipboardList,Brain,FileText,Stethoscope,CalendarDays,User,Users,Clock,NotebookPen,ShieldCheck,BarChart3,BookOpen,Settings,LogOut,Menu,HeartPulse,Search,Bell,ChevronDown} from 'lucide-react'
import {useApp} from '../context/AppContext'
const L=(p,l,I)=>[p,l,I]
const GROUPS={
patient:[['Overview',[L('dashboard','Dashboard',LayoutDashboard)]],['Screening',[L('assessment','Health Assessment',ClipboardList),L('result','AI Screening',Brain),L('reports','My Reports',FileText)]],['Care',[L('doctors','Find Doctor',Stethoscope),L('appointments','Appointments',CalendarDays)]],['Account',[L('profile','Profile',User)]]],
doctor:[['Overview',[L('dashboard','Dashboard',LayoutDashboard)]],['Clinic',[L('patients','My Patients',Users),L('appointments','Appointments',CalendarDays),L('patient/1','Patient Assessments',ClipboardList),L('reports','Reports',FileText),L('consultation','Consultation Notes',NotebookPen)]],['Account',[L('availability','Availability',Clock),L('profile','Profile',User)]]],
admin:[['Overview',[L('dashboard','Dashboard',LayoutDashboard),L('analytics','Analytics',BarChart3)]],['People',[L('patients','Patients',Users),L('doctors','Doctors',Stethoscope),L('verification','Doctor Verification',ShieldCheck)]],['Operations',[L('appointments','Appointments',CalendarDays),L('assessments','Assessments',ClipboardList),L('education','Health Education',BookOpen)]],['System',[L('settings','Settings',Settings)]]]}
const WHO={patient:['Ananya Rao','AR'],doctor:['Dr. Aarav Mehta','AM'],admin:['Admin User','AU']}
export default function AppLayout({role}){
  const {role:cur,logout,notify}=useApp(); const [open,setOpen]=useState(false),[pop,setPop]=useState('')
  if(cur!==role) return <Navigate to="/login"/>
  const [name,ini]=WHO[role], prof=role==='admin'?'settings':'profile'
  return <div className="app">
    {open&&<div className="scrim" onClick={()=>setOpen(false)}/>}
    <aside className={'side'+(open?' open':'')} onClick={()=>setOpen(false)}>
      <Link to="/" className="logo"><i><HeartPulse size={20}/></i>HemoCare AI</Link>
      {GROUPS[role].map(([t,items])=><div key={t}><div className="nav-sec">{t}</div>{items.map(([p,l,I])=><NavLink key={p} to={`/${role}/${p}`}><I size={18}/>{l}</NavLink>)}</div>)}
      <div className="grow"/><button onClick={logout}><LogOut size={18}/>Logout</button>
    </aside>
    <div className="main">
      {pop&&<div className="scrim" style={{background:'none',zIndex:25}} onClick={()=>setPop('')}/>}
      <header className="top">
        <button className="iconbtn menu" aria-label="Menu" onClick={()=>setOpen(true)}><Menu size={18}/></button>
        <div className="search"><Search size={16}/><input placeholder="Search patients, reports, doctors…" onKeyDown={e=>e.key==='Enter'&&notify('Search is a demo feature')}/></div>
        <div className="sp"/>
        <div className="rel"><button className="iconbtn" aria-label="Notifications" onClick={()=>setPop(pop==='n'?'':'n')}><Bell size={18}/><span className="dot"/></button>
          {pop==='n'&&<div className="pop" style={{zIndex:40}}><div className="it"><b>Notifications</b></div><div className="it">New screening result is ready</div><div className="it">Appointment reminder: 12 Oct, 10:30</div><div className="it">Welcome to HemoCare AI</div></div>}</div>
        <div className="rel"><button className="me" onClick={()=>setPop(pop==='u'?'':'u')}><span className="av sm">{ini}</span>
          <span className="hide"><b>{name}</b><span className="bd in" style={{padding:'1px 8px',fontSize:11,textTransform:'capitalize'}}>{role}</span></span><ChevronDown size={16} className="hide"/></button>
          {pop==='u'&&<div className="pop" style={{zIndex:40}} onClick={()=>setPop('')}><Link to={`/${role}/${prof}`}><User size={16}/>{role==='admin'?'Settings':'My profile'}</Link><button onClick={logout}><LogOut size={16}/>Logout</button></div>}</div>
      </header>
      <div className="page"><Outlet/></div>
    </div></div>
}
