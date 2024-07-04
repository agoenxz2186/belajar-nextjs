export function toDate(tgllahir){
    if(tgllahir === "")return null;
    let date = new Date(tgllahir);
    return date.toISOString().split('T')[0];
}
 