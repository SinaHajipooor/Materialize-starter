// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Button } from '@mui/material'
import Link from 'next/link'

const QuickSearchToolbar = props => {

    return (
        <Box
            sx={{
                gap: 2,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: theme => theme.spacing(2, 5, 4, 5)
            }}
        >
            {/* <GridToolbarFilterButton /> */}
            <Button variant='contained' LinkComponent={Link} href=''>ایجاد</Button>
            <TextField
                size='small'
                value={props.value}
                onChange={props.onChange}
                placeholder='جستجو...'
                InputProps={{
                    startAdornment: (
                        <Box sx={{ mr: 2, display: 'flex' }}>
                            <Icon icon='mdi:magnify' fontSize={20} />
                        </Box>
                    ),
                    endAdornment: (
                        <IconButton size='small' title='Clear' aria-label='Clear' onClick={props.clearSearch}>
                            <Icon icon='mdi:close' fontSize={20} />
                        </IconButton>
                    )
                }}
                sx={{
                    width: {
                        xs: 1,
                        sm: 'auto'
                    },
                    '& .MuiInputBase-root > svg': {
                        mr: 2
                    }
                }}
            />
        </Box>
    )
}

export default QuickSearchToolbar
