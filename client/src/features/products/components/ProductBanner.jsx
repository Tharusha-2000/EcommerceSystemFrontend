import React, { useState, useEffect } from 'react';
import { Box, MobileStepper, useTheme } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

export const ProductBanner = ({ images, interval = 1700 }) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevStep) => (prevStep + 1) % maxSteps);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => (prevStep - 1 + maxSteps) % maxSteps);
    };

    // Auto-play effect
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStep((prevStep) => (prevStep + 1) % maxSteps);
        }, interval);
        return () => clearInterval(timer); // Clear timer on component unmount
    }, [interval, maxSteps]);

    return (
        <Box sx={{ width: '100%', position: 'relative' }}>
            <Box 
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '400px',
                    overflow: 'hidden',
                }}
            >
                <Box
                    component="img"
                    src={images[activeStep]}
                    alt={`Banner image ${activeStep + 1}`}
                    sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
            </Box>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                sx={{ justifyContent: 'center' }}
                nextButton={
                    <KeyboardArrowRight onClick={handleNext} />
                }
                backButton={
                    <KeyboardArrowLeft onClick={handleBack} />
                }
            />
        </Box>
    );
};
