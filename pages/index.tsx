import type { NextPage } from 'next'
import { Typography } from '@mui/material'
import { Layout } from '../components/layouts'

const HomePage: NextPage = () => {
  return (
    <Layout title='Desde Layout'> 
      <Typography variant='h1'>Hola Mundo</Typography>
    </Layout>
  )
}

export default HomePage
