"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
 
export default function TambahPage(){

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [tglLahir, setTanggalLahir] = useState('');
    const [sex, setSex] = useState('');
    const [alamat, setAlamat] = useState('');

    const route = useRouter();

    const handleSubmit = (e)=>{
        e.preventDefault();
        setLoading(true);
        fetch("/api/pengguna", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nama: name,
                tgllahir: tglLahir,
                gender: sex,
                alamat: alamat
            })
        })
        .then((response) => {
            setLoading(false);

            if(response.ok){
                return response.json()
            }
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Terjadi kesalahan ' + response.text
            });
            return false;
        })
        .then(data => {
           
            if(data === false){
                
            }else{
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Data berhasil ditambahkan'
                }).then(()=>{
                    route.replace("/tampildata");
                });
            } 
        });
    };

    return (
        <div>
            <h1>Form Tambah Pengguna</h1> 
            <form onSubmit={handleSubmit} className="max-w-lg">
               <div className="mb-4 ml-4 mr-4 mt-4">
                <label className="block text-grey-700 text-sm font-bold mb-2" htmlFor="name">Nama Lengkap</label>
                    <input type="text" id="name" value={name} 
                        onChange={(e)=>setName(e.target.value)}
                        className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                        />
                </div>
                <div className="mt-4 ml-4 mb-4 mr-4">
                    <label className="block text-grey-700 text-sm font-bold mb-2" htmlFor="tglLahir">Tanggal Lahir</label>
                    <input type="date" 
                        value={tglLahir}
                        onChange={(e)=>setTanggalLahir(e.target.value)}
                        className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mt-4 ml-4 mb-4 mr-4">
                    <label className="block text-grey-700 text-sm font-bold mb-2">
                        Jenis Kelamin
                    </label>
                    <select className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                        value={sex}
                        onChange={(e)=>setSex(e.target.value)}
                    >
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                    </select>
                </div>
                <div className="mt-4 ml-4 mb-4 mr-4">
                    <label className="block text-grey-700 text-sm font-bold mb-2" htmlFor="alamat">
                        Alamat
                    </label>
                    <textarea
                        className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                        value={alamat}
                        onChange={(e)=>setAlamat(e.target.value)}
                        rows="4"
                    >{alamat}</textarea>
                </div>

                <div className="mt-4 ml-4 mb-4 mr-4">
                    <button 
                        disabled={loading}
                        className="bg-blue-400 px-10 py-2 rounded-md text-white hover:bg-orange-500">
                        { loading ? "Please wait..." : "Simpan" }
                    </button>
                </div>

            </form> 
        </div>
    );
}