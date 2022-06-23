import { Box, Button, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { ChangeEvent } from 'react';

const isNumber = (n: any): boolean => {
    return !isNaN(n) && !n.includes(' ')
}

const PaymentCard = () => {

    const [cardNumber, setCardNumber] = useState<string>('')
    const [cardDate, setCardDate] = useState<string>('')
    const [cardCVV, setCardCVV] = useState<string>('')
    const [amount, setAmount] = useState<string>('')
    const [payActive, setPayActive] = useState<boolean>(false)

    const handlerCard = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        if (isNumber(value) && value.length <= 16)
            setCardNumber(value)
    }
    const handlerDate = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        let month = value.split('/')[0]
        let year = value.split('/')[1]
        if (value.length === 0) setCardDate('')
        if ((month.length ? isNumber(month) : true) &&
            (year ? isNumber(year.replace('/', '')) : true) &&
            value.length <= 7 &&
            (value.length === 3 ? true : Number(month) <= 12)) {
            if (value.length === 3 && !value.includes('/')) setCardDate(value.substring(0, 2) + '/' + value.substring(2, 6))
            else setCardDate(value)
        }
    }
    const handlerCVV = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        if (isNumber(value) && value.length <= 3)
            setCardCVV(value)
    }
    const handlerAmount = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value
        if (isNumber(value)) setAmount(value)
    }

    const submitHandler = () => {
        console.log([cardNumber, cardDate, cardCVV, amount])
    }

    useEffect(() => {
        if (cardNumber.length === 16 && cardDate.length === 7 && cardCVV.length === 3 && amount.length) {
            setPayActive(true)
        }
        else setPayActive(false)
    }, [cardNumber, cardDate, cardCVV, amount])

    return (
        <Box sx={{ width: 400, height: 500, bgcolor: 'white', borderRadius: '30px', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <TextField value={cardNumber} onChange={handlerCard} placeholder='Card Number' />
            <TextField value={cardDate} onChange={handlerDate} placeholder='Expiration Date' />
            <TextField value={cardCVV} onChange={handlerCVV} placeholder='CVV' />
            <TextField value={amount} onChange={handlerAmount} placeholder='Amount' />
            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 3 }}>
                <Button sx={{ width: '100%' }}
                    onClick={submitHandler}
                    variant="contained"
                    disabled={!payActive}
                    type="submit">
                    <span>Pay</span>
                </Button>
            </Box>
        </Box>
    );
};

export default PaymentCard;