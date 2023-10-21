// ** React Imports
import { Fragment, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Third Party Imports
import { useDropzone } from 'react-dropzone';
import { Grow } from '@mui/material';

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        marginRight: theme.spacing(10),
    },
    [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
        width: 250,
    },
}));

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(4),
    },
}));

const FileUploaderMultiple = () => {
    // ** State
    const [files, setFiles] = useState([]);

    // ** Hooks
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setFiles(acceptedFiles.map((file) => Object.assign(file)));
        },
    });

    const renderFilePreview = (file) => {
        if (file.type.startsWith('image')) {
            return <img width={150} height={150} alt={file.name} src={URL.createObjectURL(file)} />;
        } else {
            return <Icon icon='mdi:file-document-outline' />;
        }
    };

    const handleRemoveFile = (file) => {
        const uploadedFiles = files;
        const filtered = uploadedFiles.filter((i) => i.name !== file.name);
        setFiles([...filtered]);
    };

    const fileList = files.map((file, i) => (
        <Grow key={file.name} in timeout={(i + 1) * 700}>
            <ListItem style={{ width: '16.666666%', padding: 10 }}>
                <div className='file-details' style={{ position: 'relative', height: 150, width: 150 }}>
                    <div
                        className='file-preview'
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7))',
                        }}
                    >
                        {renderFilePreview(file)}
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            background: 'rgba(0, 0, 0, 0.9)',
                            color: 'white',
                            padding: '5px',
                        }}
                    >
                        <Typography className='file-name'>{file.name}</Typography>
                        <Typography className='file-size' variant='body2'>
                            {Math.round(file.size / 100) / 10 > 1000
                                ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                                : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
                        </Typography>
                    </div>
                    <IconButton
                        onClick={() => handleRemoveFile(file)}
                        style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, color: 'white' }}
                    >
                        <Icon icon='mdi:close' fontSize={20} />
                    </IconButton>
                </div>
            </ListItem>
        </Grow>
    ));

    const handleLinkClick = (event) => {
        event.preventDefault();
    };

    const handleRemoveAllFiles = () => {
        setFiles([]);
    };

    return (
        <Fragment>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: ['column', 'column', 'row'],
                        alignItems: 'center',
                    }}
                >
                    <Img width={300} alt='Upload img' src='/images/misc/upload.png' />
                    <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
                        <HeadingTypography variant='h5'>فایل ها را اینجا رها کنید یا برای آپلود کلیک کنید</HeadingTypography>
                        <Typography color='textSecondary'>
                            فایل ها را اینجا رها کنید یا بر روی{' '}
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
                    <List style={{ display: 'flex', flexWrap: 'wrap' }}>{fileList}</List>
                    <div className='buttons'>
                        <Button sx={{ fontFamily: 'inherit' }} color='error' variant='outlined' onClick={handleRemoveAllFiles}>
                            حذف همه
                        </Button>
                        <Button sx={{ fontFamily: 'inherit' }} variant='contained'>
                            بارگذاری فایل ها
                        </Button>
                    </div>
                </Fragment>
            ) : null}
        </Fragment>
    );
};

export default FileUploaderMultiple;