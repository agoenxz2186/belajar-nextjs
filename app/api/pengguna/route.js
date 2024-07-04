import db from "@/lib/db"

export async function GET(request){
    let [data] = await db.query("SELECT * FROM pengguna");
    return new Response(JSON.stringify({
        "data":data
    }), {
        status: 200,
    });
}

export async function POST(request){
    const body = await request.json();
    let [data] = await db.query("INSERT INTO pengguna SET ?", {
        "nama": body.nama,
        "tgllahir": body.tgllahir,
        "gender": body.gender,
        "alamat": body.alamat,
        "created_at": new Date(),
        "updated_at": ""
    });
    
    return new Response(JSON.stringify({
        "data":data
    }), {
        status: 200,
    });

}