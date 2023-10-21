// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import {
    Menu,
    MenuItem,
    IconButton,
    ListItemIcon,
} from '@mui/material';

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import QuickSearchToolbar from 'src/views/table/data-grid/QuickSearchToolbar'
import { IconDotsVertical, IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import useDeleteActivity from 'src/hooks/activity-history/useDeleteActivity'
import { useRouter } from 'next/router'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Data Import
import { rows } from 'src/@fake-db/table/static-data'

// ** renders client column
const renderClient = params => {
    const { row } = params
    const stateNum = Math.floor(Math.random() * 6)
    const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
    const color = states[stateNum]
    if (row.avatar.length) {
        return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
    } else {
        return (
            <CustomAvatar skin='light' color={color} sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}>
                {getInitials(row.full_name ? row.full_name : 'John Doe')}
            </CustomAvatar>
        )
    }
}

const statusObj = {
    1: { title: 'current', color: 'primary' },
    2: { title: 'professional', color: 'success' },
    3: { title: 'rejected', color: 'error' },
    4: { title: 'resigned', color: 'warning' },
    5: { title: 'applied', color: 'info' }
}

const escapeRegExp = value => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}



const useVerticalMenu = () => {
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const { isLoading, mutate } = useDeleteActivity()
    const router = useRouter()

    const handleMenuOpen = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    function navigating(destination, id) {
        router.push(`/activityHistories/${destination}/${id}`)
    }

    return {
        menuAnchorEl,
        handleMenuOpen,
        handleMenuClose,
        isLoading,
        mutate,
        navigating
    };
};


const columns = [
    {
        flex: 0.275,
        minWidth: 290,
        field: 'title',
        headerName: 'کاربر',
        renderCell: params => {
            const { row } = params

            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {renderClient(params)}
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                            {row.full_name}
                        </Typography>
                        <Typography noWrap variant='caption'>
                            {row.email}
                        </Typography>
                    </Box>
                </Box>
            )
        }
    },
    {
        flex: 0.2,
        minWidth: 120,
        headerName: 'تاریخ تولد',
        field: 'birthDate',
        renderCell: params => (
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
                {params.row.start_date}
            </Typography>
        )
    },
    {
        flex: 0.2,
        minWidth: 110,
        field: 'salary',
        headerName: 'شماره پذیرش',
        renderCell: params => (
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
                {params.row.salary}
            </Typography>
        )
    },

    {
        flex: 0.2,
        minWidth: 140,
        field: 'status',
        headerName: 'نوع همکاری',
        renderCell: params => {
            const status = statusObj[params.row.status]

            return (
                <CustomChip
                    size='small'
                    skin='light'
                    color={status.color}
                    label={status.title}
                    sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                />
            )
        }
    },
    {
        flex: 0.1,
        minWidth: 100,
        field: 'actions',
        headerName: 'عملیات',
        renderCell: (params) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { menuAnchorEl, handleMenuOpen, handleMenuClose, mutate, isLoading, navigating } = useVerticalMenu();

            return (
                <div>
                    <IconButton
                        aria-controls={`menu-${params.id}`}
                        aria-haspopup="true"
                        onClick={handleMenuOpen}
                    >
                        <IconDotsVertical size={20} />
                    </IconButton>
                    <Menu
                        id={`menu-${params?.row.id}`}
                        anchorEl={menuAnchorEl}
                        open={Boolean(menuAnchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem sx={{ fontSize: 13 }} onClick={() => navigating('show', params?.row.id)}>
                            <ListItemIcon>
                                <IconEye color='yellow' size={18} />
                            </ListItemIcon>
                            جزییات
                        </MenuItem>
                        {/* <Divider /> */}
                        <MenuItem sx={{ fontSize: 13 }} onClick={() => navigating('update', params?.row.id)}>
                            <ListItemIcon>
                                <IconEdit color='orange' size={18} />
                            </ListItemIcon>
                            تغییر
                        </MenuItem>
                        {/* <Divider /> */}
                        <MenuItem sx={{ fontSize: 13 }} disabled={isLoading} onClick={() => {
                            mutate(params?.row.id);
                        }}>
                            <ListItemIcon>
                                <IconTrash color='red' size={18} />
                            </ListItemIcon>
                            حذف
                        </MenuItem>
                    </Menu>
                </div>
            );
        },
    }

]

const TableColumns = () => {
    // ** States
    const [data] = useState(rows)
    const [pageSize, setPageSize] = useState(7)
    const [searchText, setSearchText] = useState('')
    const [filteredData, setFilteredData] = useState([])

    const handleSearch = searchValue => {
        setSearchText(searchValue)
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

        const filteredRows = data.filter(row => {
            return Object.keys(row).some(field => {
                // @ts-ignore
                return searchRegex.test(row[field].toString())
            })
        })
        if (searchValue.length) {
            setFilteredData(filteredRows)
        } else {
            setFilteredData([])
        }
    }

    return (
        <Card>
            <CardHeader title='Quick Filter' />
            <DataGrid
                autoHeight
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[7, 10, 25, 50]}
                components={{ Toolbar: QuickSearchToolbar }}
                rows={filteredData.length ? filteredData : data}
                onPageSizeChange={newPageSize => setPageSize(newPageSize)}
                componentsProps={{
                    baseButton: {
                        variant: 'outlined'
                    },
                    toolbar: {
                        value: searchText,
                        clearSearch: () => handleSearch(''),
                        onChange: event => handleSearch(event.target.value)
                    }
                }}
            />
        </Card>
    )
}

export default TableColumns
