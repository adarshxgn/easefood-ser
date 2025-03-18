import React from 'react'
import { Link } from 'react-router-dom'
import { PiChefHatLight } from "react-icons/pi";



function Footer() {
    return (
        <>
            <div style={{ minHeight: '100px', marginTop: '250px' }} className="row w-100">
                <div className="col-1"></div>
                <div className="col-4">
                <div><PiChefHatLight size={30} className='Logo' /></div>
                    <Link className='footer-logo' style={{ color: 'black', textDecoration: 'none', fontSize: '25px'}} to={'/home-page'}>
                    <p>Ease<span className='Logo'>Food</span></p>
                    </Link>
                </div>
                <div style={{ lineHeight: '1.9' }} className="col-2 d-flex flex-column">
                    <h6 className='fw-bold'>About</h6>
                    <a style={{ textDecoration: 'none', color: 'black', fontSize: '14px' }} href="https://react.dev/" target='_blank'>React</a>
                    <a style={{ textDecoration: 'none', color: 'black', fontSize: '14px' }} href="https://react-bootstrap.netlify.app/" target='_blank'>React Bootstrap</a>
                    <a style={{ textDecoration: 'none', color: 'black', fontSize: '14px' }} href="https://mui.com/material-ui/" target='_blank'>Material UI</a>
                </div>
                <div style={{ lineHeight: '1.9' }} className="col-2 d-flex flex-column">
                    <h6 className='fw-bold'>Follow Us</h6>
                    <a style={{ textDecoration: 'none', color: 'black', fontSize: '14px' }} href='https://www.instagram.com/' target='_blank'>Instagram</a>
                    <a style={{ textDecoration: 'none', color: 'black', fontSize: '14px' }} href='https://www.youtube.com/' target='_blank'>Youtube</a>
                    <a style={{ textDecoration: 'none', color: 'black', fontSize: '14px' }} href='https://www.github.com/' target='_blank'>Github</a>
                    <a style={{ textDecoration: 'none', color: 'black', fontSize: '14px' }} href='https://in.linkedin.com/' target='_blank'>LinkedIn</a>
                </div>
                <div style={{ lineHeight: '1.9' }} className="col-2 d-flex flex-column">
                    <h6 className='fw-bold'>Links</h6>
                    <Link to={'/'} style={{ textDecoration: 'none', color: 'black', fontSize: '14px' }} >Home</Link>
                    <Link to={'/about'} style={{ textDecoration: 'none', color: 'black', fontSize: '14px' }} >Cart</Link>
                    <Link style={{ textDecoration: 'none', color: 'black', fontSize: '14px' }} >Menu</Link>
                    <Link to={'/cart'} style={{ textDecoration: 'none', color: 'black', fontSize: '14px' }} >About</Link>
                </div>
                <div className="col-1"></div>
            </div>
            <hr />
            <div style={{ minHeight: '100px' }} className='row w-100 mb-5'>
                <div className="col-3"></div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} className="col-6">
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '20px' }}>
                        <a href='https://www.instagram.com/' target='_blank'><i style={{ color: 'black' }}  class="fa-brands fa-instagram"></i></a>
                        <a href='https://www.youtube.com/' target='_blank'><i style={{ color: 'black' }} class="fa-brands fa-youtube"></i></a>
                        <a href='https://www.github.com/' target='_blank'><i style={{ color: 'black' }} class="fa-brands fa-github"></i></a>
                        <a href='https://in.linkedin.com/' target='_blank'><i style={{ color: 'black' }} class="fa-brands fa-linkedin-in"></i></a>
                    </div>
                    <p>&copy;Copyright All rights reserved</p>
                </div>
                <div className="col-3"></div>
            </div>
        </>
    )
}

export default Footer