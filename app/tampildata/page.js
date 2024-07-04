"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";

const moment = require('moment');
require('moment/locale/id'); 

export default function TampilDataPage(){
    const [chk, setChk] = useState([]);
    const [data, setData] = useState([]);
    const route = useRouter();
    
    const editData = (e)=>{
        route.push(`/pengguna/${e}`);
    };

    const refreshData = ()=>{
        fetch("/api/pengguna")
        .then(response => response.json())
        .then(data => setData(data.data));
    }

    const checkDelete = (id, e)=>{
        if(e.target.checked){
            setChk([...chk, id])
        }else{
            setChk(chk.filter(e=>e!==id));
        }
    }
    

    const onHapus = ()=>{
        Swal.fire({ 
            title: 'Hapus Data',
            text: "Anda tidak dapat mengembalikan data ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((e)=>{
            if(e.isConfirmed){
                fetch('/api/pengguna', {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: chk
                    })
                })
                .then(response => response.json())
                .then(data => {
                     refreshData();
                     setChk([]);
                }).catch(e=>{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Terjadi kesalahan ' + e
                    });
                });
            }
        });
    };

    useEffect(()=>{
        refreshData();
    }, []);

    const columns = {
        name: "NO", selector: (row)=>row.id,
        name: "NAMA PENGGUNA", selector: (row)=>row.nama,
        name: "TANGGAL LAHIR", selector: (row)=>row.tgllahir,
        name: "JENIS KELAMIN", selector: (row)=>row.gender,
        name: "ACTIONS", cell: (row)=>{
            return (
                <button>
                    <i className="fa fa-pencil"></i>
                </button>
            );
        }
    };

    const datanya = [
        { id: 1, nama: 'John Doe', tgllahir: '1990-01-01', gender: 'Male', alamat: '123 Main St' },
        { id: 2, nama: 'Jane Doe', tgllahir: '1992-02-02', gender: 'Female', alamat: '456 Oak St' },
        { id: 3, nama: 'Jim Doe', tgllahir: '1985-03-03', gender: 'Male', alamat: '789 Pine St' }
      ];

    return (
        <div className="mt-4 "> 
        
            <button className="bg-blue-400 px-10 py-2 rounded-md text-white hover:bg-blue-700" 
                onClick={()=>route.push("/pengguna")}><i className="fa fa-plus"></i> Tambah</button>

            <button className="bg-red-400 px-10 py-2 ml-4 rounded-md text-white hover:bg-orange-500" 
                onClick={onHapus}><i className="fa fa-trash"></i> Hapus</button>
            
            <DataTable
                columns={columns} 
                pagination
                fixedHeader
                fixedHeaderScrollHeight="400px"
            ></DataTable>
            
            <table className="table-auto mt-4 w-full divide-y divide-gray-400">
                <thead className="bg-gray-50 text-gray-700">
                    <tr>
                        <th>No</th>
                        <th>Nama Pengguna</th>
                        <th>Tanggal Lahir</th>
                        <th>Jenis Kelamin</th>
                        <th>Edit</th> 
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-400">
                {data.map((element, index) => (
                    <tr key={index}>
                    <td>{index + 1} 
                        <input type="checkbox" 
                            onClick={(e)=>checkDelete(element.id, e)} 
                            checked={chk.filter((e)=>e === element.id).length > 0 ? true : false}
                            id="chk_{element.id}" value={element.id} /> </td>
                    <td>{element.nama}</td>
                    <td>{moment( element.tgllahir ).format("dddd, DD MMM YYYY") }</td>
                    <td style={{textAlign:"center"}}>{element.gender}</td>
                    <td>
                        <button onClick={()=>editData(element.id)} className="bg-blue-400 px-2 py-2 rounded-md text-white hover:bg-orange-500">
                            <i title="Edit" className="fa fa-pencil"></i>
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>  
        </div>
    );
}

 