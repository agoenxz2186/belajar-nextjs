import db from "@/lib/db"
import { toDate } from "@/lib/library";

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
    let data;

    try{ 
        let newdata = {
            "nama": body.nama,
            "tgllahir": toDate(body.tgllahir),
            "gender": body.gender === "" ? null : body.gender,
            "alamat": body.alamat,
            "created_at": new Date()
        };

        for(let i=0;i<1000000;i++){
           db.query("INSERT INTO pengguna SET ?", newdata); 
        }

        return new Response(JSON.stringify({
            "data":data
        }), {
            status: 200,
        });

    }catch(e){
        return new Response(JSON.stringify({
            "message": e
        }), {
            status:400
        });
    }
     
}

export async function PATCH(request){
    const body = await request.json();
    let data;
    try{
        const query = `UPDATE pengguna SET 
                        nama = ?, 
                        tgllahir = ?, 
                        gender = ?, 
                        alamat = ?, 
                        updated_at = ? 
                    WHERE id = ?`;
        const values = [body.nama,  
                toDate(body.tgllahir), 
                body.gender === "" ? null : body.gender, 
                body.alamat, new Date(), body.id];
      
        [data] = await db.query(query, values);
        return new Response(JSON.stringify({
            "data":data
        }), {
            status: 200,
        });

    }catch(e){
        return new Response(JSON.stringify({
            "message": data
        }), {
            status: 400
        });
    }
}

export async function DELETE(request){
    const body = await request.json();
    
    try{
        const query = `DELETE FROM pengguna WHERE id IN (${body.id.join(",")})`;
        await db.query(query);
        return new Response(JSON.stringify({
            "message": "Data berhasil dihapus"
        }), {
            status: 200,
        });
    }catch(e){
        return new Response(JSON.stringify({
            "message": e
        }), {
            status: 400
        });
    }
}