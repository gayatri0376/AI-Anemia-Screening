import {useState} from 'react'
import {useNavigate,useParams,Link} from 'react-router-dom'
import {ClipboardList,Activity,CalendarDays,FileText,Download} from 'lucide-react'
import {LineChart,Line,XAxis,YAxis,Tooltip} from 'recharts'
import {Head,Stat,Chart,Table,Badge,Disclaimer,Field,Tabs,Empty,Modal} from '../../components/ui'
import {assessments,cbc} from '../../data/mock'
import {useApp} from '../../context/AppContext'
const SYM=['Fatigue','Weakness','Dizziness','Headache','Shortness of breath','Pale skin']
const LAB=['Hemoglobin','RBC Count','Hematocrit','MCV','MCH','MCHC','RDW','WBC Count','Platelet Count']
export function PDash(){const nav=useNavigate();return <>
<Head title="Good morning, Ananya" sub="Your screening summary"/>
<div className="grid"><Stat icon={ClipboardList} label="Total Assessments" value="3"/><Stat icon={Activity} label="Latest Screening" value="Low Risk"/><Stat icon={CalendarDays} label="Upcoming Appointment" value="12 Oct"/><Stat icon={FileText} label="Reports" value="3"/></div>
<div className="g2"><Chart title="Assessment history (risk score %)"><LineChart data={[...assessments].reverse()}><XAxis dataKey="date"/><YAxis/><Tooltip/><Line dataKey="score" stroke="#2463A6" strokeWidth={2}/></LineChart></Chart>
<div className="card"><h3>Quick actions</h3><p>Start a new screening or review your latest results.</p>
<button className="btn" onClick={()=>nav('/patient/assessment')}>Start Assessment</button><button className="btn o" onClick={()=>nav('/patient/result')}>View Latest Report</button><button className="btn o" onClick={()=>nav('/patient/doctors')}>Find a Doctor</button></div></div></>}
export function Assess(){const [s,setS]=useState(0),[f,setF]=useState({}),[busy,setB]=useState(false),nav=useNavigate()
const set=(k,v)=>setF({...f,[k]:v}),submit=()=>{setB(true);setTimeout(()=>nav('/patient/result'),2500)}
if(busy)return <div className="card empty" style={{padding:70}}><div className="spin"/><h3 style={{marginTop:16}}>Processing your assessment…</h3><p>Running demo AI screening</p></div>
const T=['Personal Information','Health Information','Demo laboratory inputs','Review']
return <><Head title="Health Assessment" sub={`Step ${s+1} of 4: ${T[s]}`}/><div className="card"><div className="steps">{T.map((_,i)=><div key={i} className={i<=s?'on':''}/>)}</div>
{s===0&&<div className="f">{['Age','Gender','Weight (kg)','Height (cm)'].map(k=><Field key={k} label={k} value={f[k]||''} onChange={e=>set(k,e.target.value)}/>)}</div>}
{s===1&&<div className="f">{SYM.map(k=><div key={k}><label>{k}</label><select value={f[k]||'No'} onChange={e=>set(k,e.target.value)}><option>No</option><option>Yes</option></select></div>)}</div>}
{s===2&&<div className="f">{LAB.map(k=><Field key={k} label={k} type="number" value={f[k]||''} onChange={e=>set(k,e.target.value)}/>)}</div>}
{s===3&&<div className="f">{[...['Age','Gender','Weight (kg)','Height (cm)'],...SYM,...LAB].map(k=><div key={k}><label>{k}</label>{f[k]||'—'}</div>)}</div>}
<div style={{marginTop:20}}><Disclaimer/></div>
<div style={{marginTop:16}}>{s>0&&<button className="btn o" onClick={()=>setS(s-1)}>Back</button>}{s<3?<button className="btn" onClick={()=>setS(s+1)}>Next</button>:<button className="btn g" onClick={submit}>Submit Assessment</button>}</div></div></>}
export function Result(){const nav=useNavigate(),[r]=useState(()=>Math.random()>.5?{status:'Low Risk',score:28}:{status:'Needs Attention',score:68})
return <><Head title="AI Screening Result" sub="Assessment ID AS-1004 · 4 Oct 2026"/>
<div className="card" style={{textAlign:'center'}}><p>Screening Result</p><h1 style={{fontSize:40}}>{r.status}</h1><Badge s={r.status}/><p>Risk Score: <b>{r.score}%</b></p></div>
<div className="g2"><div className="card"><h3>CBC summary (demo)</h3>{cbc.map(([k,v])=><p key={k} style={{margin:'4px 0'}}>{k}: <b>{v}</b></p>)}</div>
<div className="card"><h3>Screening history</h3><Table cols={[{h:'ID',k:'id'},{h:'Date',k:'date'},{h:'Status',r:x=><Badge s={x.status}/>}]} rows={assessments}/>
<h3 style={{marginTop:16}}>Recommended next action</h3><p>Consider discussing your result with a qualified doctor.</p><button className="btn" onClick={()=>nav('/patient/doctors')}>Find a Doctor</button></div></div>
<div style={{marginTop:16}} className="note">This is a demonstration screening result generated from mock data. It is not a medical diagnosis. Please consult a qualified healthcare professional for medical advice.</div></>}
export function Reports(){const nav=useNavigate(),{notify}=useApp();return <><Head title="My Reports" sub="Your screening reports"/>
<Table cols={[{h:'Report ID',k:'id'},{h:'Assessment Date',k:'date'},{h:'Status',r:x=><Badge s={x.status}/>},{h:'Risk Score',r:x=>x.score+'%'},{h:'Action',r:()=><><button className="btn s" onClick={()=>nav('/patient/result')}>View</button><button className="btn s o" onClick={()=>notify('Demo report downloaded')}><Download size={14}/>Download Demo Report</button></>}]} rows={assessments}/></>}
export function Doctors(){const {docs}=useApp(),[q,setQ]=useState(''),[sp,setSp]=useState('')
const list=docs.filter(d=>d.status==='Verified'&&(d.name+d.spec).toLowerCase().includes(q.toLowerCase())&&(!sp||d.spec===sp))
return <><Head title="Find a Doctor" sub="Verified demo doctors"/><div className="f" style={{marginBottom:16}}><input placeholder="Search doctor by name or specialization" value={q} onChange={e=>setQ(e.target.value)}/>
<select value={sp} onChange={e=>setSp(e.target.value)}><option value="">All specializations</option>{[...new Set(docs.map(d=>d.spec))].map(s=><option key={s}>{s}</option>)}</select></div>
<div className="grid">{list.map(d=><div className="card" key={d.id}><div className="av">{d.name.split(' ')[1][0]}</div><h3 style={{marginTop:10}}>{d.name}</h3><p style={{margin:0}}>{d.spec} · {d.exp} yrs<br/>{d.loc} · Available {d.avail}<br/>Rating {d.rating}</p><Link to={`/patient/doctors/${d.id}`} className="btn s" style={{marginTop:10}}>View Profile</Link></div>)}
{!list.length&&<p>No doctors match your search.</p>}</div></>}
export function DoctorProfile(){const {id}=useParams(),{docs,setAppts,notify}=useApp(),d=docs.find(x=>x.id==id)||docs[0],[done,setDone]=useState(false),[b,setB]=useState({date:'2026-10-15',time:'10:00',why:''})
const book=()=>{setAppts(a=>[...a,{id:Date.now(),patient:'Ananya Rao',doctor:d.name,date:b.date,time:b.time,status:'Upcoming'}]);setDone(true);notify('Appointment confirmed')}
return <><Head title={d.name} sub={`${d.spec} · ${d.exp} years · ${d.loc}`}/><div className="g2" style={{marginTop:0}}>
<div className="card"><h3>About</h3><p>Fictional demo doctor experienced in anemia-related consultations.</p><p>Languages: English, Hindi · Consultation: 30 min, in-person or video (demo)</p><p>Time slots: 10:00, 11:30, 15:00, 16:30</p></div>
<div className="card">{done?<div style={{textAlign:'center'}}><h3>Appointment confirmed</h3><p>{b.date} at {b.time} with {d.name}</p><Link className="btn" to="/patient/appointments">View Appointments</Link></div>:<><h3>Book Appointment</h3><div className="f"><Field label="Date" type="date" value={b.date} onChange={e=>setB({...b,date:e.target.value})}/>
<div><label>Time</label><select value={b.time} onChange={e=>setB({...b,time:e.target.value})}>{['10:00','11:30','15:00','16:30'].map(t=><option key={t}>{t}</option>)}</select></div></div>
<label style={{marginTop:12}}>Reason for consultation</label><textarea rows={3} value={b.why} onChange={e=>setB({...b,why:e.target.value})}/><button className="btn" style={{marginTop:12}} onClick={book}>Confirm Appointment</button></>}</div></div></>}
export function Appts(){const {appts,setAppts,notify}=useApp(),[tab,setTab]=useState('Upcoming'),[ask,setAsk]=useState(null)
const rows=appts.filter(a=>a.patient==='Ananya Rao'&&a.status===tab)
return <><Head title="My Appointments" sub="Upcoming, completed and cancelled"/><Tabs tabs={['Upcoming','Completed','Cancelled']} value={tab} onChange={setTab}/>
<div className="grid">{rows.map(x=><div className="card" key={x.id}><div style={{display:'flex',gap:12,alignItems:'center'}}><span className="av sm">{x.doctor.split(' ')[1][0]}</span><div><b>{x.doctor}</b><br/><span style={{color:'var(--m)',fontSize:13}}>{x.date} · {x.time}</span></div></div>
<div style={{marginTop:14,display:'flex',justifyContent:'space-between',alignItems:'center'}}><Badge s={x.status}/>{x.status==='Upcoming'&&<button className="btn r s" onClick={()=>setAsk(x)}>Cancel</button>}</div></div>)}</div>
{!rows.length&&<div className="card"><Empty title={'No '+tab.toLowerCase()+' appointments'} text="Book a consultation from the Find Doctor page."/></div>}
<Modal open={!!ask} danger title="Cancel appointment?" confirmText="Cancel appointment" onClose={()=>setAsk(null)} onConfirm={()=>{setAppts(appts.map(a=>a.id===ask.id?{...a,status:'Cancelled'}:a));setAsk(null);notify('Appointment cancelled')}}>This will cancel your visit with {ask&&ask.doctor}.</Modal></>}
