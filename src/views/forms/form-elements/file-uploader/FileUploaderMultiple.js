import { Fragment, useState } from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Grow } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useDropzone } from 'react-dropzone'

const Img = styled('img')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(10),
        width: 200, // Increase width to 200px
        height: 200, // Increase height to 200px
    },
    [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.down('sm')]: {
        width: 250
    }
}))

const HeadingTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(4)
    }
}))

const FileUploaderMultiple = () => {
    const [files, setFiles] = useState([])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file)))
        }
    })

    const renderFilePreview = file => {
        if (file.type.startsWith('image')) {
            return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
        } else {
            return <Icon icon='mdi:file-document-outline' />
        }
    }

    const handleRemoveFile = file => {
        const uploadedFiles = files
        const filtered = uploadedFiles.filter(i => i.name !== file.name)
        setFiles([...filtered])
    }

    const fileList = files.map((file, i) => (
        <Grow key={file.name} in timeout={(i + 1) * 700}>
            <ListItem >
                <div className='file-details'>
                    <div className='file-preview'>
                        {/* Apply gradient black color to the image */}
                        <Box
                            sx={{
                                backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7))',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                width: 200,
                                height: 200,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {renderFilePreview(file)}
                        </Box>
                    </div>
                    <div>
                        <Typography className='file-name'>{file.name}</Typography>
                        <Typography className='file-size' variant='body2'>
                            {Math.round(file.size / 100) / 10 > 1000
                                ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                                : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
                        </Typography>
                    </div>
                </div>
                <IconButton onClick={() => handleRemoveFile(file)}>
                    <Icon icon='mdi:close' fontSize={20} />
                </IconButton>
            </ListItem>
        </Grow>
    ))

    const handleLinkClick = event => {
        event.preventDefault()
    }

    const handleRemoveAllFiles = () => {
        setFiles([])
    }

    return (
        <Fragment>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
                    <Img alt='Upload img' src='/images/misc/upload.png' />
                    <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
                        <HeadingTypography variant='h5'>فایل ها را اینجا رها کنید یا برای آپلود کلیک کنید</HeadingTypography>
                        <Typography color='textSecondary'>
                            فایل ها را اینجا رها کنید یا بر روی {' '}
                            <Link href='/' onClick={handleLinkClick}>
                                جستجو
                            </Link>{' '}
                            کلیک کنید
                        </Typography>
                    </Box>
                </Box>
            </div>
            {files.length ? (
                <Fragment>
                    {/* Wrap each row of 5 items in a Box component */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', marginBottom: '1rem' }}>
                        {fileList.reduce((rows, listItem, index) => {
                            if (index % 5 === 0) {
                                rows.push([]);
                            }
                            rows[Math.floor(index / 5)].push(listItem);

                            return rows;
                        }, []).map((row, rowIndex) => (
                            <Box key={rowIndex} sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                                {row}
                            </Box>
                        ))}
                    </Box>
                    <div className='buttons'>
                        <Button sx={{ fontFamily: 'inherit' }} color='error' variant='outlined' onClick={handleRemoveAllFiles}>
                            حذف همه
                        </Button>
                        <Button sx={{ fontFamily: 'inherit' }} variant='contained'>بارگذاری فایل ها</Button>
                    </div>
                </Fragment>
            ) : null}
        </Fragment>
    )
}

export default FileUploaderMultiple