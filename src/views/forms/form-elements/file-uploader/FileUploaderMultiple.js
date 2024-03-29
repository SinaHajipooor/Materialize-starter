// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { Grow } from '@mui/material'

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(10)
    },
    [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(4)
    },
    [theme.breakpoints.down('sm')]: {
        width: 250
    }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(4)
    }
}))

const FileUploaderMultiple = () => {
    // ** State
    const [files, setFiles] = useState([])

    // ** Hooks
    //     const { getRootProps, getInputProps } = useDropzone({
    //         onDrop: acceptedFiles => {
    //             setFiles(acceptedFiles.map(file => Object.assign(file)))
    //         }
    //     })

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: acceptedFiles => {
            const uniqueFiles = acceptedFiles.filter(file => {
                return !files.some(existingFile => existingFile.name === file.name);
            });
            setFiles(prevFiles => [...prevFiles, ...uniqueFiles]);
        }
    });

    const renderFilePreview = (file) => {
        if (file.type.startsWith('image')) {
            return URL.createObjectURL(file);
        } else {
            return <Icon icon='mdi:file-document-outline' />;
        }
    };

    const handleRemoveFile = file => {
        const uploadedFiles = files
        const filtered = uploadedFiles.filter(i => i.name !== file.name)
        setFiles([...filtered])
    }

    const fileList = files.map((file, i) => (
        <Grow key={file.name} in timeout={(i + 1) * 200}>
            <Box
                sx={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    margin: '8px'
                }}
            >
                <ListItem
                    style={{
                        position: 'relative',
                        width: '145px',
                        height: '172px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden'
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), transparent  , rgba(0, 0, 0, 0.6)), url(${renderFilePreview(file)})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '4px',
                                textAlign: 'center',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                                color: '#fff'
                            }}
                        >
                            <Typography
                                variant='subtitle1'
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '10px',
                                    marginBottom: '1px',
                                    display: '-webkit-box',
                                    '-webkit-line-clamp': 1,
                                    '-webkit-box-orient': 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    color: 'white',

                                }}
                            >
                                {file.name}
                            </Typography>
                            {/* <Typography variant='body2' style={{ fontSize: '12px' }}>
                                {Math.round(file.size / 100) / 10 > 1000
                                    ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                                    : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
                            </Typography> */}
                        </div>
                        <IconButton
                            style={{
                                position: 'absolute',
                                top: '1px',
                                left: '1px',
                                zIndex: 1,
                                color: 'white'
                            }}
                            onClick={() => handleRemoveFile(file)}
                        >
                            <Icon icon='mdi:close' fontSize={20} />
                        </IconButton>
                    </div>
                </ListItem>
            </Box>
        </Grow>
    ));

    const handleLinkClick = event => {
        event.preventDefault()
    }

    const handleRemoveAllFiles = () => {
        setFiles([])
    }

    return (
        <Fragment>
            <div  {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
                    <Img width={250} alt='Upload img' src='/images/misc/upload.png' />
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
                    <List>{fileList}</List>
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


