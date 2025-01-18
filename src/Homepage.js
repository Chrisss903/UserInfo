import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Paper, TextField, Select, MenuItem, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Homepage() {
    const [userData, setUserData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("");

    const navigate = useNavigate();

    // Fetch data from API
    const fetchData = async () => {
        try {
            const res = await axios.get("https://jsonplaceholder.typicode.com/users");
            setUserData(res.data);
            setFilteredData(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        setFilteredData(
            userData.filter((user) => user.name.toLowerCase().includes(value))
        );
    };

    const handleSort = (order) => {
        setSortOrder(order);
        const sortedData = [...filteredData].sort((a, b) => {
            if (order === "asc") return a.name.localeCompare(b.name);
            if (order === "desc") return b.name.localeCompare(a.name);
            return 0;
        });
        setFilteredData(sortedData);
    };

    const handleUserClick = (id) => {
        navigate(`/userdetail`, { state: { userId: id } });
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                All Users
            </Typography>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <TextField
                    label="Search by name"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ width: "60%" }}
                />
                <Select
                    value={sortOrder}
                    onChange={(e) => handleSort(e.target.value)}
                    displayEmpty
                    style={{ width: "30%" }}
                >
                    <MenuItem value="" disabled>
                        Sort by
                    </MenuItem>
                    <MenuItem value="asc">Name (A-Z)</MenuItem>
                    <MenuItem value="desc">Name (Z-A)</MenuItem>
                </Select>
            </div>

            <Box
                display="flex"
                flexWrap="wrap"
                gap={2}
                justifyContent="space-between"
            >
                {filteredData.map((user) => (
                    <Box key={user.id} flexBasis={{ xs: "100%", sm: "48%", md: "30%" }}>
                        <Paper
                            elevation={3}
                            style={{ padding: "16px", cursor: "pointer" }}
                            onClick={() => handleUserClick(user.id)}
                        >
                            <Typography variant="h6">{user.name}</Typography>
                            <Typography variant="body1">Email: {user.email}</Typography>
                            <Typography variant="body2">City: {user.address.city}</Typography>
                        </Paper>
                    </Box>
                ))}
            </Box>
        </Container>
    );
}

export default Homepage;
