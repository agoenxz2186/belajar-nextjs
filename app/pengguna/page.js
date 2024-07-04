"use client"

import { toDate } from "@/lib/library";
import { useRouter } from "next/navigation"; 
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

 
export default function PenggunaPage({id}){
  
    const {register, handleSubmit, setValue, formState:{errors}} = useForm();
 
    const [loading, setLoading] = useState(false); 
    const route = useRouter(); 
 
    useEffect(()=>{
        if(id){
            fetch('/api/pengguna/' + id)
            .then(response => response.json())
            .then(data => {
                let dt = data.data;
                setValue("name", dt.nama);
                setValue("tglLahir", toDate(dt.tgllahir));
                setValue("gender", dt.gender);
                setValue("alamat", dt.alamat);
            });
        }
    }, [id, setValue]);

    const onSubmit = (e)=>{
       
        setLoading(true);
        let postdata = {            
                nama: e.name,
                tgllahir: e.tglLahir,
                gender: e.gender,
                alamat: e.alamat
            };
        if(id){
            postdata.id = id;
        }

        fetch("/api/pengguna", {
            method: id ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postdata)
        })
        .then(async(response) => {
            setLoading(false);

            if(response.status == 200){
                return response.json()
            }
            let l = await response.text();
             
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Terjadi kesalahan ' + l
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
                    route.push("/tampildata");
                });
            } 
        });
    };

    return (
        <div>
            <h1>Form {id ? "Edit" : "Tambah"} Pengguna </h1> 
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg">
          
               <div className="mb-4 ml-4 mr-4 mt-4">
                <label className="block text-grey-700 text-sm font-bold mb-2" htmlFor="name">Nama Lengkap</label>
                    <input type="text" id="name"
                        {...register('name', { required: 'Nama diperlukan' })}
                        className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                        />
                    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                </div>
                <div className="mt-4 ml-4 mb-4 mr-4">
                    <label className="block text-grey-700 text-sm font-bold mb-2" htmlFor="tglLahir">Tanggal Lahir</label>
                    <input id="tglLahir" type="date"
                        {...register('tglLahir')}
                        className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mt-4 ml-4 mb-4 mr-4">
                    <label className="block text-grey-700 text-sm font-bold mb-2">
                        Jenis Kelamin
                    </label>
                    <select id="gender" {...register('gender')} className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                       
                    >
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                    </select>
                </div>
                <div className="mt-4 ml-4 mb-4 mr-4">
                    <label className="block text-grey-700 text-sm font-bold mb-2" htmlFor="alamat">
                        Alamat
                    </label>
                    <textarea id="alamat" {...register('alamat')}
                        className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                        rows="4"
                    ></textarea>
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