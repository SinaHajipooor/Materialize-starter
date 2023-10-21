import { Grid } from "@mui/material"
import TableFilter from 'src/views/table/data-grid/TableFilter'


function FilterTable() {
    return (
        <Grid item xs={12}>
            <TableFilter />
        </Grid>
    )
}

export default FilterTable
