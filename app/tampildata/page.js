"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";

const moment = require('moment');
require('moment/locale/id'); 

export default function TampilDataPage(){
    const [data, setData] = useState([]);
    const route = useRouter();
    

    useEffect(()=>{
        fetch("/api/pengguna")
        .then(response => response.json())
        .then(data => setData(data.data));
    }, []);

    return (
        <div className="mt-4 "> 
            <button className="bg-blue-400 px-10 py-2 rounded-md text-white hover:bg-orange-500" 
                onClick={()=>route.push("/tambah")}><i className="fa fa-plus"></i> Tambah</button>
            
            <table className="table-auto mt-4 w-full divide-y divide-gray-400">
                <thead className="bg-gray-50 text-gray-700">
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Tanggal Lahir</th>
                        <th>Jenis Kelamin</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-400">
                {data.map((element, index) => (
                    <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{element.nama}</td>
                    <td>{moment( element.tgllahir ).format("dddd, DD MMM YYYY") }</td>
                    <td style={{textAlign:"center"}}>{element.gender}</td>
                    <td>
                        <button className="bg-blue-400 px-2 py-2 rounded-md text-white hover:bg-orange-500">
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