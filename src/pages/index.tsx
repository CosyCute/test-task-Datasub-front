import { Box, Typography } from "@mui/material";
import PaymentCard from './../components/PaymentCard';


const index = () => {
    return (
        <div className="body">
            <Box>
                <Typography color="white" variant="h3">
                    Payment
                </Typography>
                <PaymentCard />
            </Box>
        </div>
    );
};

export default index;