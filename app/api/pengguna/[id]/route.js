import db from "@/lib/db";

export async function GET(request, {params}){
 
    try{
        let [data] = await db.query("SELECT * FROM pengguna WHERE id = ?", [params.id]);
        
        return new Response(JSON.stringify({
            "data":data[0]
        }), {
            status: 200,
        });
        
    }catch(e){
        return new Response(JSON.stringify({
            "message": params.id
        }), {
            status: 400
        });
    }
   
}
