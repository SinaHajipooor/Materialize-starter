import { QueryClient } from "@tanstack/react-query"

const queryClientSetup = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0 // the amount of time that the data in the cache will stay fresh
        }
    }
})


export default queryClientSetup