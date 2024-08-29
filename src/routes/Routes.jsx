/* eslint-disable react/prop-types */
import { Route, Routes } from 'react-router-dom'

import Home from '../pages/Home'
import Cart from '../pages/Cart'
import PageNotFound from '../pages/PageNotFound'


export default function AppRouter() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}
