import { useRouter } from "next/router"

function index() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    const id = router.query.id;

    return (
        <div>
            {id}
        </div>
    )
}

export default index
