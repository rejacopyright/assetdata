import {useState} from 'react'
import Avatar from '_assets/images/avatar/c-1.png'

function Index(){
  const [data] = useState([
    {name: 'Budi Doremi', title: 'Ijin Cuti 1 Tahun'},
    {name: 'Sahrul Efendi', title: 'Request 1pcs Monitor LCD'},
    {name: 'Romi Nugroho', title: 'Ijin Dinas ke Luar Negeri'},
    {name: 'Juli Salsa Dewi', title: 'Permohonan uang kas Rp. 300.000 untuk keperluan membeli tinta printer'},
  ]);
  return (
    <div className="card">
      <div className="alerts bg-light my-0 py-2 px-4 bold">Users Log</div>
      <div className="card-body py-0 shadow-xs">
        {
          data.map((r, key) => (
            <div className="media border-top pt-3" key={key}>
              <img src={Avatar} className="avatar-sm rounded mr-3" alt="" />
              <div className="media-body oh">
                <h6 className="m-0 text-11">{r.name}</h6>
                <h6 className="text-muted text-8 mt-1 mb-0 text-truncate">{r.title}</h6>
                <span className="badge badge-sm badge-soft-success">18 Mei 2021</span>
              </div>
            </div>
          ))
        }
      </div>
      <div className="text-center my-0 py-2 pointer border-top text-primary">Lihat Semua</div>
    </div>
  )
}

export default Index;
