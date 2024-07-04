import Image from "next/image";

export default function Home() {
  const menuClick = (idx)=>{

  };

  return (
    <div className="container">
      <h3>Halo selamat datang</h3>
      <p>
        Ini adalah aplikasi yang dibuat menggunakan JS
      </p>
      <ul>
        <li onClick={menuClick(0)}>Menu 1</li>
        <li onClick={menuClick(1)}>Menu 2</li>
        <li onClick={menuClick(2)}>Menu 3</li>
      </ul>
    </div>
  );
}
