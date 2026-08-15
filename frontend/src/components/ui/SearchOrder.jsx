
import { getOrder } from "../../services/order";

import {useForm} from 'react-hook-form'
import { useNavigate} from 'react-router-dom'


export default function SearchOrder() {
   const navigate = useNavigate()
   const {register , handleSubmit } = useForm()

   async function onSubmit(data){
   
   const mainData = await getOrder(data.searchQuery) 
   
navigate(`order/${mainData.id}`)
   }
    return (
        <form onSubmit={handleSubmit(onSubmit)} >

        <input
       {...register('searchQuery')}
            type="text"
            placeholder="کد سفارش خودرا وارد کنید..."
            className= "px-4 py-2 w-[500px] focus:w-[700px] focus:shadow focus:shadow-stone-200 treansition-all duration-300 rounded bg-white placeholder:text-stone-400 outline-none px-4 py-2 transition-all duration-300"
        />
        </form>
    );
}
