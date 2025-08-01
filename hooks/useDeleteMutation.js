import { showToast } from "@/lib/showToast"
import axios from "axios"
import { useQueryClient,useMutation } from "@tanstack/react-query"


const useDeleteMutation=(queryKey,deleteEndpoint)=>{
    const quesryClient=useQueryClient()

    return useMutation({
        mutationFn:async ({ids,deleteType}) =>{
            const {data:response}=await axios({
                url:deleteEndpoint,
                method:deleteType==='PD' ? "DELETE" : "PUT",
                data:{ids,deleteType}
            })

            if(!response.success){
                throw new Error(response.message)

            }

            return response
        },
        onSuccess:(data)=>{
            showToast('success',data.message)
            quesryClient.invalidateQueries([queryKey])
        },
        onError:(error)=>{
            showToast('error',error.message)
        }
    })
}

export default useDeleteMutation;