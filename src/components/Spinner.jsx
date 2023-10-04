import { Box } from "@mui/material"

import { SyncLoader } from "react-spinners"

function Spinner() {

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",

            }}
        >
            <SyncLoader color="#36afd7" />

        </Box>
    )
}

export default Spinner
