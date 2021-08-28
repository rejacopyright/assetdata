import { useState, useMemo } from 'react'
import Chart from 'react-apexcharts'
import Calendar from '_components/calendar'
import UserLog from './userLog'
// INIT JS

function Card(props){
  return (
    <div className={`${props.divClass}`}>
      <div className="card mb-2 shadow-sm">
        <div className="card-body p-0">
          <div className={`media p-3 border border-${props.theme || 'gray'} radius-5`}>
            <div className="media-body lh-1 text-8 text-nowrap">
              <div className={`text-uppercase border-bottom border-2 pb-2 bold text-${props.theme || 'dark'}`}>{props.title}</div>
              <div className="d-flex align-items-center mt-2">
                <h2 className={`my-0 text-${props.theme || 'muted'}`}>{props.value}</h2>
                <div className={`icon-lg icon-dual-${props.theme || 'muted'} ml-auto bg-soft-${props.theme || 'muted'} p-1 radius-20`} data-feather={`${props.icon || 'check'}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
function Grafik(){
  const data = [44, 55, 13, 33];
  const setting = {
    chart: {
      toolbar: { show: false },
      stacked: false
    },
    labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
    // dataLabels: { enabled: true, formatter: function (val) { return parseInt(val) + "%x" } },
    colors: ["#ff80ab", "#82b1ff", "#ffbe0b", "#ff0957"],
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '80%'
        }
      }
    },
    legend: {
      position: 'bottom',
    },
    title: {
      text: 'Favourite Fruits',
      align: 'center',
    },
  }
  return <Chart options={setting} type="donut" series={data} />
}
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function Dashboard(){
  const [card, cardSet] = useState([]);
  useMemo(() => {
    document.title = 'Dashboard';
    import('feather-icons').then(f => f.replace())
    cardSet([
      {name: 'Policies', value: randInt(1,999), theme: 'primary', icon: 'alert-triangle'},
      {name: 'Unsigned Assets', value: randInt(1,999), theme: 'warning', icon: 'alert-octagon'},
      {name: 'Users', value: randInt(1,999), theme: 'info', icon: 'users'},
      {name: 'Assets', value: randInt(1,999), theme: 'danger', icon: 'save'},
      {name: 'Audited Assets', value: randInt(1,999), theme: 'success', icon: 'check'},
    ])
  }, []);
  return (
    <div className="container-fluid">
      <div className="row mt-3">
        {
          card.map((r, key) => (
            <Card key={key} divClass="col-xl-3 col-md-4 mb-2" title={r.name} value={r.value} theme={r.theme} icon={r.icon} />
          ))
        }
      </div>
      <div className="radius-10 shadow p-3"> <Calendar /> </div>
      <div className="row mt-3 center-left">
        <div className="col-md-6"> <UserLog /> </div>
        <div className="col-md-6 p-0"> <Grafik rowClass="mt-2" /> </div>
      </div>
    </div>
  );
}

export default Dashboard;
