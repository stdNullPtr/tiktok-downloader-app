import {Box, Button, TextField, Typography, Paper, CircularProgress} from '@mui/material';
import {useState} from 'react';
import {download} from '../lib/Api.ts';

function validateLink(link: string): boolean {
    return REGEX_TIKTOK_LINK.test(link.trim());
}

function parseUrl(link: string): URL {
    try {
        return new URL(link);
    } catch {
        throw new Error('Error parsing URL.');
    }
}

function App() {
    const [tiktokLink, setTiktokLink] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (value: string) => {
        setTiktokLink(value);
        setError(!validateLink(value) && value.trim() !== '');
    };

    const handleDownload = async () => {
        if (!error && tiktokLink.trim()) {
            setLoading(true);
            try {
                const url = parseUrl(tiktokLink);
                await download({url});
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
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
            px={2}
        >
            <Paper elevation={5} sx={paperStyle}>
                <Typography variant="h5" fontWeight="bold" textAlign="center">
                    TikTok Downloader
                </Typography>
                <TextField
                    label="TikTok Link (Share -> Copy Link)"
                    variant="outlined"
                    fullWidth
                    value={tiktokLink}
                    onChange={(e) => handleInputChange(e.target.value)}
                    error={error && tiktokLink.trim() !== ''}
                    helperText={error && tiktokLink.trim() !== '' ? 'Please enter a valid TikTok video link.' : ' '}
                    autoComplete="off"
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => void handleDownload()}
                    disabled={error || tiktokLink.trim() === '' || loading}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 48,
                    }}
                >
                    {loading ? <CircularProgress size={24} color="inherit"/> : 'Download'}
                </Button>
            </Paper>
        </Box>
    );
}

const REGEX_TIKTOK_LINK = /^(https?:\/\/(www\.)?tiktok\.com\/\S*|https?:\/\/vm\.tiktok\.com\/\S*)$/i;

const paperStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    p: 4,
    borderRadius: 3,
    gap: 3,
    width: '100%',
    maxWidth: '400px',
};

export default App;