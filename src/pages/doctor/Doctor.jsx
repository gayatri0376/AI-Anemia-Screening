import {useState} from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import {Users,CalendarDays,Clock,FileText} from 'lucide-react'
import {BarChart,Bar,XAxis,YAxis,Tooltip} from 'recharts'
import {Head,Stat,Chart,Table,Badge,Field} from '../../components/ui'
import {patients,appointments,assessments,cbc,trend} from '../../data/mock'
import {useApp} from '../../context/AppContext'
export function DDash(){return <><Head title="Doctor Dashboard" sub="Dr. Aarav Mehta (demo)"/>
<div className="grid"><Stat icon={Users} label="Total Patients" value="48"/><Stat icon={CalendarDays} label="Today's Appointments" value="5"/><Stat icon={Clock} label="Pending Requests" value="3"/><Stat icon={FileText} label="Reports Reviewed" value="126"/></div>
<div className="g2"><Chart title="Appointments per month"><BarChart data={trend}><XAxis dataKey="m"/><YAxis/><Tooltip/><Bar dataKey="appts" fill="#287D8E"/></BarChart></Chart>
<div><h3>Upcoming appointments</h3><Table cols={[{h:'Patient',k:'patient'},{h:'Date',k:'date'},{h:'Time',k:'time'}]} rows={appointments.filter(a=>a.status==='Upcoming')}/></div></div></>}
export function DPatients(){const nav=useNavigate();return <><Head title="My Patients" sub="Patients under your care"/>
<Table cols={[{h:'Patient',k:'name'},{h:'Age',k:'age'},{h:'Last Assessment',k:'last'},{h:'Screening',r:x=><Badge s={x.risk}/>},{h:'Last Appointment',k:'last'},{h:'Action',r:x=><button className="btn s" onClick={()=>nav('/doctor/patient/'+x.id)}>View Patient</button>}]} rows={patients}/></>}
export function DPatient(){const {id}=useParams(),nav=useNavigate(),p=patients.find(x=>x.id==id)||patients[0];return <><Head title={p.name} sub={`${p.email} · Age ${p.age}`}><button className="btn" onClick={()=>nav('/doctor/consultation')}>Add Consultation Note</button></Head>
<div className="g2" style={{marginTop:0}}><div className="card"><h3>AI screening result (demo)</h3><Badge s={p.risk}/><p>Preliminary risk indication only. Not a diagnosis.</p><h3>CBC values</h3>{cbc.map(([k,v])=><p key={k} style={{margin:'3px 0'}}>{k}: <b>{v}</b></p>)}</div>
<div><h3>Previous reports</h3><Table cols={[{h:'ID',k:'id'},{h:'Date',k:'date'},{h:'Status',r:x=><Badge s={x.status}/>}]} rows={assessments}/><h3 style={{marginTop:16}}>Appointment history</h3><Table cols={[{h:'Doctor',k:'doctor'},{h:'Date',k:'date'},{h:'Status',r:x=><Badge s={x.status}/>}]} rows={appointments.filter(a=>a.patient===p.name)}/></div></div></>}
export function Form({title,sub,fields,cta,msg}){const {notify}=useApp();return <><Head title={title} sub={sub}/><div className="card"><div className="f">{fields.map(([l,t,v])=>t==='area'?<div key={l} style={{gridColumn:'1/-1'}}><label>{l}</label><textarea rows={4} defaultValue={v}/></div>:<Field key={l} label={l} type={t} defaultValue={v}/>)}</div><button className="btn" style={{marginTop:16}} onClick={()=>notify(msg)}>{cta}</button></div></>}
export function Notes(){return <Form title="Consultation Notes" sub="Record observations only. No prescriptions." cta="Save Consultation" msg="Consultation saved" fields={[['Patient','text','Ananya Rao'],['Date','date','2026-10-04'],['Notes','area',''],['Follow-up required','text','No']]}/>}
export function DReports(){return <><Head title="Reports" sub="Recent patient assessment reports"/><Table cols={[{h:'Patient',k:'name'},{h:'Screening',r:x=><Badge s={x.risk}/>},{h:'Date',k:'last'}]} rows={patients}/></>}
