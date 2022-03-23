import React, {useState} from 'react';
import {
    Alert,
    AlertTitle,
    Button,
    ButtonGroup,
    Container,
    List,
    ListItem,
    Typography,
    useMediaQuery
} from "@mui/material";
import agent from "../../app/api/agent";

const AboutPage = () => {
    const matches = useMediaQuery("(min-width:720px)");
    const [validationErrors, setValidationErrors] = useState<string[]>([])

    const getValidationError = () => {
        agent.TestErrors.getValidationError()
            .then(() => console.log('Should not see this'))
            .catch(error => setValidationErrors(error))
    }

    return (
        <Container>
            <Typography gutterBottom variant='h5'>Errors For Testing Purposes</Typography>
            <ButtonGroup fullWidth orientation={`${matches ? `horizontal` : `vertical`}`}>
                <Button variant={'contained'}
                        onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>
                    Test 400 Error
                </Button>
                <Button variant={'contained'}
                        onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>
                    Test 401 Error
                </Button>
                <Button variant={'contained'}
                        onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>
                    Test 404 Error
                </Button>
                <Button variant={'contained'}
                        onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>
                    Test 500 Error
                </Button>
                <Button variant={'contained'} onClick={getValidationError}>Validation Error</Button>
            </ButtonGroup>
            {validationErrors.length > 0 && (
                <Alert severity={'warning'}>
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {validationErrors.map(error => (
                            <ListItem key={error}>{error}</ListItem>
                        ))}
                    </List>
                </Alert>
            )}
        </Container>
    );
};

export default AboutPage;
