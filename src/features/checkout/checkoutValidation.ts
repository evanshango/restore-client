import * as yup from 'yup'

export const validationSchema = [
    yup.object({
        fullName: yup.string().required('Full Name is required'),
        address1: yup.string().required('Address Line 1 is required'),
        address2: yup.string().required('Address Line 2 is required'),
        city: yup.string().required('City is required'),
        state: yup.string().required('State / Province / Region is required'),
        zipCode: yup.string().required('ZipCode is required'),
        country: yup.string().required('Country is required'),
    }),
    yup.object(),
    yup.object({
        nameOnCard: yup.string().required('Name on Card is required')
    })
]
