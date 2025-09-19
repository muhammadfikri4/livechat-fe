import { useQuery } from "@tanstack/react-query";
import { friendService } from "../../../core/services/friend";

export const useFriend = () => {
    return useQuery({
        queryKey: ["friend"],
        queryFn: () => friendService.get(),
    });
}