import React from "react";
import { Pagination as MuiPagination, Box } from "@mui/material";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void
    count: number;
    page: number;
    onChange: (_event: React.ChangeEvent<unknown>, value: number) => void;
    color: string;
    showFirstButton: boolean;
    showLastButton: any;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
    const handleChange = (page: number) => {
        onPageChange(page)
    }

    return (
        <Box display='flex' justifyContent='center' alignItems='center' mt={4}>
            <MuiPagination
                count={totalPages}
                page={currentPage}
                onChange={() => handleChange(currentPage)}
                color='primary'
            />
        </Box>
    )
}

export default Pagination;