import {Box, Button, TextField, Typography, Paper} from '@mui/material';
import {useState} from 'react';
import {getTiktokDownloadUrl} from "../lib/Api.ts";

function App() {
    const [userLink, setUserLink] = useState('');
    const [error, setError] = useState(false);

    const handleInputChange = (value: string) => {
        setUserLink(value);
        const isValidLink = /^(https?:\/\/(www\.)?tiktok\.com\/\S*|https?:\/\/vm\.tiktok\.com\/\S*)$/i.test(value.trim());
        setError(!isValidLink && value.trim() !== '');
    };

    const handleDownload = async () => {
        if (!error && userLink.trim()) {
            const url = URL.parse(userLink);
            if (!url) {
                console.error('Error parsing URL.');
                return;
            }

            const downloadUrl = await getTiktokDownloadUrl({tiktokShareUrl: url});

            if (!downloadUrl) {
                console.error('Error fetching download URL.');
                return;
            }

            console.log(`Download URL: ${JSON.stringify(downloadUrl, null, 2)}`);

            //window.location.href = downloadUrl.url;
        } else {
            alert('Please enter a valid TikTok link.');
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="background.default"
            color="text.primary"
            px={2}
        >
            <Paper
                elevation={5}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 4,
                    borderRadius: 3,
                    gap: 3,
                    width: '100%',
                    maxWidth: '400px',
                }}
            >
                <Typography variant="h5" color="text.primary" fontWeight="bold" textAlign="center">
                    TikTok Downloader
                </Typography>
                <TextField
                    label="TikTok Link (Share -> Copy Link)"
                    variant="outlined"
                    fullWidth
                    value={userLink}
                    onChange={(e) => handleInputChange(e.target.value)}
                    error={error && userLink.trim() !== ''}
                    helperText={error && userLink.trim() !== '' ? "Please enter a valid Tiktok share video link." : " "}
                    autoComplete="off"
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => void handleDownload()}
                    disabled={error || userLink.trim() === ''}
                    sx={{width: '100%'}}
                >
                    Download
                </Button>
            </Paper>
        </Box>
    );
}

export default App;
