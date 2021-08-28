import {forwardRef} from 'react'
import moment from 'moment'
import 'moment/locale/id'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import bootstrapPlugin from "@fullcalendar/bootstrap"
import '_assets/scss/calendar.scss'

function Calendar(props, ref){
  const ev = [
    { title: 'Subscribe', id:'youtube', url: 'https://www.youtube.com/channel/UCpJkJj-ABw1xCWS51jb0a5g?sub_confirmation=1', start: moment().subtract(10, 'days').format('YYYY-MM-DD'), end: moment().subtract(8, 'days').format('YYYY-MM-DD'), color: '#cd3838' },
    { title: 'Rapat Gubernur', start: moment().subtract(2, 'days').format('YYYY-MM-DD'), end: moment().subtract(0, 'days').format('YYYY-MM-DD'), color: '#cd3838' },
    { title: 'Reja', start: moment().subtract(5, 'days').format('YYYY-MM-DD'), color: '#eb8215' },
    { title: 'Jamil', start: moment().subtract(4, 'days').format('YYYY-MM-DD'), color: '#43d39e' },
    { title: 'Cuti', start: moment().add(5, 'days').format('YYYY-MM-DD'), end: moment().add(9, 'days').format('YYYY-MM-DD'), color: '#1e70ec' },
  ]
  function handleDateClick(e){
    console.log(e);
  }
  function handleEvent(e){
    console.log(e.event.start, e.event.end);
  }
  function eventClick(e){
    e.jsEvent.preventDefault()
    e.event.url && window.open(e.event.url)
  }
  return(
    <FullCalendar
      themeSystem='bootstrap'
      bootstrapFontAwesome={{
        close: 'uil uil-times',
        prev: 'uil uil-angle-left',
        next: 'uil uil-angle-right',
        prevYear: 'uil uil-angle-double-left',
        nextYear: 'uil uil-angle-double-right'
      }}
      headerToolbar={{
        left: 'dayGridMonth,dayGridWeek',
        center: 'title',
        right: 'today,prev,next',
      }}
      plugins={[ dayGridPlugin, interactionPlugin, bootstrapPlugin ]}
      ref={ref}
      businessHours
      height="auto"
      contentHeight="auto"
      // aspectRatio={2.5}
      // stickyHeaderDates={true}
      initialView="dayGridMonth"
      dayHeaderFormat={{weekday: 'long'}}
      displayEventTime={true}
      snapDuration="00:025"
      now={new Date()}
      editable
      selectable
      selectMirror
      locale='id'
      select={e => {
        console.log(e);
      }}
      drop={e => {
        console.log(e);
      }}
      fixedWeekCount={false}
      firstDay={0}
      eventResizableFromStart
      eventDrop={handleEvent}
      eventResize={handleEvent}
      eventClick={eventClick}
      eventContent={e => (
        <div>
          {
            e.event.id === 'youtube' ?
            <p className="m-0"><span className="uil uil-youtube mr-1"></span>{e.event.title.toUpperCase()}</p>
            :
            <p className="m-0">{e.event.title.toUpperCase()}</p>
          }
        </div>
      )}
      dateClick={handleDateClick}
      // hiddenDays={[0,6]}
      events={ev}
    />
  )
}
export default forwardRef(Calendar)
