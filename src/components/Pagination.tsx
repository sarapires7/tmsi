import React from "react";
import { Pagination as MuiPagination, Box } from "@mui/material";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
    const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
        onPageChange(page)
    }

    return (
        <Box display='flex' justifyContent='center' alignItems='center' mt={4}>
            <MuiPagination
                count={totalPages}
                page={currentPage}
                onChange={handleChange}
                color='primary'
            />
        </Box>
    )
}

export default Pagination;