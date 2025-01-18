import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Button, Paper, Box } from "@mui/material";

function Userdetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const { userId } = location.state; // Access userId passed via state
    const [userDetails, setUserDetails] = useState(null);

    // Fetch user details based on userId
    const fetchUserDetails = async () => {
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
            setUserDetails(res.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, [userId]);

    // Handle Go Back button click
    const handleGoBack = () => {
        navigate("/home"); // Navigate back to home
    };

    if (!userDetails) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    return (
        <Container>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "center" }}>

                <Paper elevation={3} style={{ padding: "16px" }}>
                    <Typography variant="h4" component="h2" gutterBottom>
                        User Details
                    </Typography>

                    {/* User Details Display using Box and Flexbox */}
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="h6">Name:</Typography>
                            <Typography variant="body1">{userDetails.name}</Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="h6">Email:</Typography>
                            <Typography variant="body1">{userDetails.email}</Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="h6">Phone:</Typography>
                            <Typography variant="body1">{userDetails.phone}</Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="h6">Company:</Typography>
                            <Typography variant="body1">{userDetails.company.name}</Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="h6">Website:</Typography>
                            <Typography variant="body1">{userDetails.website}</Typography>
                        </Box>
                    </Box>
                </Paper>

                <Button variant="contained" color="primary" onClick={handleGoBack} style={{ marginBottom: "16px", maxWidth: "200px" }}>
                    Go Back
                </Button>
            </Box>
        </Container>
    );
}

export default Userdetail;
