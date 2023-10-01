// ** React Imports
import { useEffect } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Hook Imports
import { useAuth } from 'src/hooks/useAuth'

export const getHomeRoute = role => {
    if (role === 'client') return '/home'
    else return '/home'
}

const Home = () => {
    // ** Hooks
    const auth = useAuth()
    const router = useRouter()

    useEffect(() => {

        // Redirect user to Home URL
        router.replace('/home')


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <Spinner />
}

export default Home
