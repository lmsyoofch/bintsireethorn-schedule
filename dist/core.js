export function dateInZone(date, timezone='UTC') {
  const p=new Intl.DateTimeFormat('en-CA',{timeZone:timezone||'UTC',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(date);
  const v=k=>p.find(x=>x.type===k).value;
  return `${v('year')}-${v('month')}-${v('day')}`;
}
export function zonedDate(date,time,timezone) {
  const wall=Date.parse(`${date}T${time}:00Z`);
  let stamp=wall;
  for(let i=0;i<3;i++){
    const parts=new Intl.DateTimeFormat('en-GB',{timeZone:timezone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(new Date(stamp));
    const p=Object.fromEntries(parts.map(x=>[x.type,x.value]));
    const asUTC=Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second);
    stamp+=wall-asUTC;
  }
  return new Date(stamp);
}
export function nextDay(date){return new Date(Date.parse(date+'T12:00:00Z')+86400000).toISOString().slice(0,10)}
export function isPast(e,now=new Date()){
  if(e.status==='completed')return true;
  if(['cancelled','postponed'].includes(e.status))return false;
  if(e.end_time&&e.timezone)return zonedDate(e.end_date||e.date,e.end_time,e.timezone)<now;
  return (e.end_date||e.date)<dateInZone(now,e.timezone||'UTC');
}
export function calendarURL(e,title,description){
  if(['cancelled','postponed'].includes(e.status))return null;
  let dates;
  if(e.start_time&&e.timezone){
    const start=zonedDate(e.date,e.start_time,e.timezone);
    const end=e.end_time?zonedDate(e.end_date||e.date,e.end_time,e.timezone):new Date(start.getTime()+3600000);
    const stamp=d=>d.toISOString().replace(/[-:]/g,'').replace('.000','');
    dates=stamp(start)+'/'+stamp(end);
  }else dates=e.date.replaceAll('-','')+'/'+nextDay(e.end_date||e.date).replaceAll('-','');
  const params=new URLSearchParams({action:'TEMPLATE',text:title,dates,details:description,location:e.calendarLocation||'',...(e.timezone?{ctz:e.timezone}:{})});
  return 'https://calendar.google.com/calendar/render?'+params;
}
export function filteredEvents(events,{year,month,category,country}){
  return events.filter(e=>(year==='all'||e.date.slice(0,4)===year)&&(month==='all'||e.date.slice(5,7)===month)&&(category==='all'||e.category===category)&&(country==='all'||(e.country||'tbc')===country));
}
