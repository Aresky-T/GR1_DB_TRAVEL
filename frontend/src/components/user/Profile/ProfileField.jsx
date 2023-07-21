import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button'
import { FormControl } from '@mui/material';
import { styled } from '@mui/material/styles'

const CustomButton = styled(Button)({
    borderRadius: '3px',
    color: 'var(--secondary-color)',
    alignSelf: 'flex-end',
    padding: '5px 5px',

    '&:hover': {
        backgroundColor: 'var(--primary-color)',
        color: 'white',
    }
})

const CustomTextField = styled('input')({
    width: '300px',
    alignSelf: 'center',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    padding: '10px',
    boxSizing: 'border-box',
    transition: 'all 0.2s ease',

    '&:focus': {
        borderColor: 'var(--primary-color)',
        boxShadow: '0 0 0 3px #ff80016a',
    },

    '&:hover': {
        borderColor: 'var(--primary-color)'
    }
})

const ProfileField = ({ label, name, type, inputValue, value, handleChange, handleSubmit, placeholder }) => {

    return (
        <>
            <Accordion sx={{
                boxShadow: 'none',
                margin: '10px 0',
                padding: '10px 0',
                borderBottom: '1px solid #ccc',

                '&::before': {
                    display: 'none'
                }
            }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                >
                    <Typography
                        sx={{
                            width: '100px',
                            fontWeight: 600,
                            fontSize: '13px'
                        }}
                    >{label}
                    </Typography>
                    <Typography
                        sx={{
                            width: '200px',
                            fontSize: '13px',
                            marginLeft: '30px',
                        }}
                    >{value || "Chưa có thông tin"}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControl sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                    }}>
                        <CustomTextField
                            type={type || "text"}
                            margin='normal'
                            name={name}
                            value={inputValue || ''}
                            placeholder={placeholder}
                            onChange={handleChange}
                        />
                        <CustomButton
                            type='button'
                            onClick={handleSubmit}
                        >Xong</CustomButton>
                    </FormControl>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default ProfileField