import { revalidatePath } from "next/cache";

export default async function revalidateIt(path:any){
    revalidatePath(`/donors`,'layout');
}