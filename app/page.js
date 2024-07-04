"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [menu, setMenu] = useState()

  const menuClick = (idx)=>{
    setMenu(idx);
  };
 
  
  return (
    <div className="container">
      <h3>Halo selamat datang</h3>
      <p>
        Ini adalah aplikasi yang dibuat menggunakan JS
      </p>
      <ul>
        <li><a href="javascript:void(0);"  onClick={()=>menuClick(0)}>Menu 1</a></li>
        <li><a href="javascript:void(0);"   onClick={()=>menuClick(1)}>Menu 2</a></li>
        <li><a href="javascript:void(0);"  onClick={()=>menuClick(2)}>Menu 3</a></li>
      </ul>
      <center>Menu yang di click {menu}</center>
    </div>
  );
}
